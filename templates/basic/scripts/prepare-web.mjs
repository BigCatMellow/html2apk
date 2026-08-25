import { mkdir, rm, copyFile } from 'node:fs/promises';

const www = new URL('../www/', import.meta.url);
await rm(www, { recursive: true, force: true });
await mkdir(www, { recursive: true });
await copyFile(new URL('../index.html', import.meta.url), new URL('../www/index.html', import.meta.url));
console.log('Prepared www/index.html');
