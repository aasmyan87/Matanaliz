import fs from 'node:fs';
import path from 'node:path';

const [url, out] = process.argv.slice(2);
if (!url || !out) {
  console.error('Использование: node download.mjs <url> <выходной pdf>');
  process.exit(2);
}

const res = await fetch(url, {
  redirect: 'follow',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    'Accept': 'application/pdf,text/html;q=0.9,*/*;q=0.8',
  },
});
if (!res.ok) {
  console.error(`HTTP ${res.status} ${res.statusText}: ${url}`);
  process.exit(1);
}

const type = res.headers.get('content-type') || '';
const buffer = Buffer.from(await res.arrayBuffer());
if (buffer.subarray(0, 4).toString() !== '%PDF') {
  console.error(`Ответ не PDF (${type}, ${buffer.length} байт): ${url}`);
  process.exit(2);
}

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, buffer);
console.log(`${(buffer.length / 1024 / 1024).toFixed(1)} MB | ${type} | ${out}`);
