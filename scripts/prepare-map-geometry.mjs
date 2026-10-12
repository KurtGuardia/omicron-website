// Refresh the inline geometry after replacing the approved SVG. Metadata stays separate.
import {readFile, writeFile} from 'node:fs/promises';
const source = await readFile(new URL('../public/images/map/omicron-latin-america-map.svg', import.meta.url), 'utf8');
const viewBox = source.match(/viewBox="([^"]+)"/)?.[1];
const paths = [...source.matchAll(/<path\b([^>]*)>/g)].map(([, attributes]) => Object.fromEntries(
  [...attributes.matchAll(/([\w-]+)="([^"]*)"/g)]
    .filter(([, key]) => key === 'id' || key === 'd' || key.startsWith('data-'))
    .map(([, key, value]) => [key, value])
));
if (!viewBox || !paths.length || paths.some(path => !path.id || !path.d)) throw new Error('SVG country geometry is incomplete');
await writeFile(new URL('../data/mapGeometry.json', import.meta.url), JSON.stringify({viewBox, paths}, null, 2) + '\n');
console.log(`Prepared ${paths.length} country paths, preserving IDs and data attributes.`);
