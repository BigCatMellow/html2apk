import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';

const packedDir = new URL('../source/packed/', import.meta.url);
const parts = (await readdir(packedDir)).filter(n => n.startsWith('index.html.gz.b64.part')).sort();
const b64 = (await Promise.all(parts.map(n => readFile(new URL(n, packedDir), 'utf8')))).join('');
const html = gunzipSync(Buffer.from(b64, 'base64'));
await mkdir(new URL('../source/', import.meta.url), { recursive: true });
await writeFile(new URL('../source/index.html', import.meta.url), html);
console.log('Unpacked source/index.html');
