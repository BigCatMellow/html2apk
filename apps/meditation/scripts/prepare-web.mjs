import { mkdir, rm, readdir, readFile, writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';

const packedDir = new URL('../source/packed/', import.meta.url);
const parts = (await readdir(packedDir))
  .filter(name => name.startsWith('index.html.gz.b64.part'))
  .sort();

if (!parts.length) throw new Error('No packed Meditation Guide source parts found');

const b64 = (await Promise.all(parts.map(name => readFile(new URL(name, packedDir), 'utf8')))).join('');
const html = gunzipSync(Buffer.from(b64, 'base64'));

const www = new URL('../www/', import.meta.url);
await rm(www, { recursive: true, force: true });
await mkdir(www, { recursive: true });
await writeFile(new URL('index.html', www), html);
console.log(`Prepared Meditation Guide web source from ${parts.length} packed parts`);
