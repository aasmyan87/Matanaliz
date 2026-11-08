import fs from 'node:fs';
import path from 'node:path';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const [file, pageArg, outArg, scaleArg] = process.argv.slice(2);
if (!file || !pageArg || !outArg) {
  console.error('Использование: node render.mjs <pdf> <номер страницы> <выходной png> [масштаб]');
  process.exit(2);
}

const data = new Uint8Array(fs.readFileSync(file));
const wasmUrl = new URL('./node_modules/pdfjs-dist/wasm/', import.meta.url).href;
const doc = await pdfjs.getDocument({ data, verbosity: 0, wasmUrl }).promise;
const n = Number(pageArg);
if (!Number.isInteger(n) || n < 1 || n > doc.numPages) {
  console.error(`Нет страницы ${pageArg} (всего ${doc.numPages})`);
  process.exit(2);
}

const scale = Number(scaleArg) || 1.2;
const page = await doc.getPage(n);
const viewport = page.getViewport({ scale });
const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
const context = canvas.getContext('2d');

await page.render({ canvasContext: context, viewport, canvas }).promise;
fs.mkdirSync(path.dirname(outArg), { recursive: true });
fs.writeFileSync(outArg, canvas.toBuffer('image/png'));
console.log(`Страница ${n} -> ${outArg} (${canvas.width}x${canvas.height})`);
