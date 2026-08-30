import { readFile, writeFile } from 'node:fs/promises';

const path = new URL('../android/app/build.gradle', import.meta.url);
let text = await readFile(path, 'utf8');

const versionCode = 2;
const versionName = '1.1.0';

text = text.replace(/versionCode\s+\d+/, `versionCode ${versionCode}`);
text = text.replace(/versionName\s+"[^"]*"/, `versionName "${versionName}"`);

await writeFile(path, text);
console.log(`Set Android versionCode=${versionCode}, versionName=${versionName}`);
