import { copyFile, mkdir, rm } from 'node:fs/promises';

const outputDir = new URL('../www/', import.meta.url);
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await copyFile(new URL('../index.html', import.meta.url),
  new URL('../www/index.html', import.meta.url));
console.log('Prepared StarCraft TMG Companion Android fallback assets');
