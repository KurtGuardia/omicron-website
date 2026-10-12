import {readFile, writeFile} from 'node:fs/promises';

// The Markdown documents remain authoritative; JSON is a build-time transport.
const documents = {};
for (const locale of ['es', 'en']) {
  documents[locale] = {};
  for (const [key, filename] of [['terms', 'terms-of-use'], ['privacy', 'privacy-policy']]) {
    const source = new URL(`../docs/legal/${filename}-${locale}.md`, import.meta.url);
    const markdown = await readFile(source, 'utf8');
    if (!markdown.startsWith('# ')) throw new Error(`Missing legal title in ${source.pathname}`);
    documents[locale][key] = markdown;
  }
}
await writeFile(new URL('../data/legalDocuments.json', import.meta.url), JSON.stringify(documents, null, 2) + '\n');
