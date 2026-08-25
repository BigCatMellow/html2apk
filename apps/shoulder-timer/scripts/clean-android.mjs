import { rm } from 'node:fs/promises';

await rm(new URL('../android/', import.meta.url), { recursive: true, force: true });
console.log('Removed generated Android project');
