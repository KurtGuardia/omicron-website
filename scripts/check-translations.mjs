import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const messages = Object.fromEntries(['es','en'].map(locale => [locale, JSON.parse(fs.readFileSync(`messages/${locale}.json`, 'utf8'))]));
const flatten = (value, prefix = '') => Object.entries(value).flatMap(([key, item]) => typeof item === 'string' ? [[`${prefix}${key}`, item]] : flatten(item, `${prefix}${key}.`));
const catalogs = Object.fromEntries(Object.entries(messages).map(([locale, value]) => [locale, Object.fromEntries(flatten(value))]));
assert.deepEqual(Object.keys(catalogs.es).sort(), Object.keys(catalogs.en).sort(), 'ES/EN message keys differ');
const signature = text => [...new Set([...text.matchAll(/\{(\w+)(?:,|\})/g)].map(match => match[1]))].sort();
for (const key of Object.keys(catalogs.es)) {
  assert(catalogs.es[key].trim() && catalogs.en[key].trim(), `Empty message: ${key}`);
  assert.deepEqual(signature(catalogs.es[key]), signature(catalogs.en[key]), `Interpolation mismatch: ${key}`);
  const tags = text => [...text.matchAll(/<\/?([a-z]+)>/g)].map(match => match[0]).sort();
  assert.deepEqual(tags(catalogs.es[key]), tags(catalogs.en[key]), `Rich text tag mismatch: ${key}`);
}
const files = directory => fs.readdirSync(directory, {withFileTypes:true}).flatMap(entry => entry.isDirectory() ? files(path.join(directory,entry.name)) : /\.tsx?$/.test(entry.name) ? [path.join(directory,entry.name)] : []);
let checkedCalls = 0;
const taxonomyValues = new Map();
for (const file of [...files('components'), ...files('app'), ...files('lib')]) {
  const source = ts.createSourceFile(file, fs.readFileSync(file,'utf8'), ts.ScriptTarget.Latest, true);
  const translators = new Map(), arrays = new Map();
  const walk = (node, callback) => {callback(node);ts.forEachChild(node,child => walk(child,callback));};
  walk(source, node => {
    if (!ts.isVariableDeclaration(node) || !ts.isIdentifier(node.name) || !node.initializer) return;
    let value = node.initializer;
    if (ts.isAsExpression(value)) value = value.expression;
    if (ts.isArrayLiteralExpression(value)) {
      const items=value.elements.filter(ts.isStringLiteral).map(item => item.text);
      arrays.set(node.name.text,items);
      if(file==='lib/projectLabels.ts')taxonomyValues.set(node.name.text,items);
    }
    if(file==='lib/projectLabels.ts' && node.name.text==='regionKey' && ts.isObjectLiteralExpression(value)) for(const prop of value.properties) if(ts.isPropertyAssignment(prop) && ts.isStringLiteral(prop.initializer)) for(const locale of ['es','en']) assert(catalogs[locale][`Experience.${prop.initializer.text}`], `Missing region label ${prop.initializer.text}`);
    if (ts.isAwaitExpression(value)) value=value.expression;
    if (!ts.isCallExpression(value) || !ts.isIdentifier(value.expression)) return;
    if (value.expression.text === 'useTranslations' && ts.isStringLiteral(value.arguments[0])) translators.set(node.name.text,value.arguments[0].text);
    if (value.expression.text === 'getTranslations' && ts.isObjectLiteralExpression(value.arguments[0])) {
      const namespace=value.arguments[0].properties.find(prop => ts.isPropertyAssignment(prop) && prop.name.getText(source)==='namespace');
      if(namespace && ts.isStringLiteral(namespace.initializer)) translators.set(node.name.text,namespace.initializer.text);
    }
  });
  const patterns = node => {
    if (!node) return [];
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return [node.text];
    if (ts.isTemplateExpression(node)) return [node.head.text + node.templateSpans.map(span => `*${span.literal.text}`).join('')];
    if (ts.isConditionalExpression(node)) return [...patterns(node.whenTrue),...patterns(node.whenFalse)];
    if (ts.isElementAccessExpression(node) && ts.isIdentifier(node.expression)) return arrays.get(node.expression.text)||[];
    if (ts.isIdentifier(node)) return arrays.get(node.text)||[];
    return [];
  };
  walk(source,node => {
    if (ts.isJsxText(node)) assert(!/[A-Za-zÀ-ÿ]/.test(node.text.trim()), `Hardcoded JSX copy in ${file}: ${node.text.trim()}`);
    if (ts.isJsxAttribute(node) && ['aria-label','alt','title','placeholder'].includes(node.name.getText(source)) && node.initializer && ts.isStringLiteral(node.initializer)) assert(!/[A-Za-zÀ-ÿ]/.test(node.initializer.text), `Hardcoded accessibility copy in ${file}`);
    if (!ts.isCallExpression(node)) return;
    const name=ts.isIdentifier(node.expression) ? node.expression.text : ts.isPropertyAccessExpression(node.expression) ? node.expression.expression.getText(source) : '';
    const namespace=translators.get(name);if(!namespace)return;
    for (const pattern of patterns(node.arguments[0])) {
      const key=`${namespace}.${pattern}`;
      const regex=new RegExp('^'+key.split('*').map(part => part.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('.*')+'$');
      assert(Object.keys(catalogs.es).some(candidate => regex.test(candidate)), `Missing translation: ${key} in ${file}`);
      checkedCalls++;
    }
  });
}
// Dynamic keys used by taxonomy helpers, metadata, map paths and filter controls.
for(const locale of ['es','en']) {
  for (const group of ['expertise','services']) for(let index=0;index<7;index++) assert(catalogs[locale][`Home.${group}.items.${index}`]);
  for(const key of ['expertise','service','country','client','year']) assert(catalogs[locale][`Experience.${key}`]);
  const map=fs.readFileSync('components/map/OmicronMap.tsx','utf8');
  for(const match of map.matchAll(/<path id="([A-Z]{2})"/g)) assert(catalogs[locale][`Countries.${match[1]}`], `Missing country ${match[1]}`);
  for(const page of ['home','experience']) for(const suffix of ['Title','Description']) assert(catalogs[locale][`Metadata.${page}${suffix}`]);
}
const projects=JSON.parse(fs.readFileSync('data/omicron-projects-v4-app-ready.json','utf8'));
for(const project of projects) for(const locale of ['es','en']) for(const field of ['title','summary','context','actions','results']) assert(Object.hasOwn(project,`${field}_${locale}`), `Missing bilingual field on ${project.slug}`);
for(const project of projects) {
  for(const value of project.expertise)assert(taxonomyValues.get('expertiseValues').includes(value), `Unmapped expertise: ${value}`);
  for(const value of project.services)assert(taxonomyValues.get('serviceValues').includes(value), `Unmapped service: ${value}`);
  for(const code of project.country_iso) for(const locale of ['es','en'])assert(catalogs[locale][`Countries.${code}`], `Missing dataset country ${code}`);
}
console.log(`ES/EN audit passed: ${Object.keys(catalogs.es).length} message keys, ${checkedCalls} source references, ${projects.length} bilingual projects and all map countries.`);
