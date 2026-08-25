import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';

const packed = await readFile(new URL('../source/packed/original.html.gz.b64', import.meta.url), 'utf8');
const html = gunzipSync(Buffer.from(packed.trim(), 'base64'));
await mkdir(new URL('../source/', import.meta.url), { recursive: true });
await writeFile(new URL('../source/original.html', import.meta.url), html);
console.log('Unpacked source/original.html');
