import fs from 'node:fs';
import path from 'node:path';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const argv = process.argv.slice(2);
if (argv.length < 2) {
  console.error('Использование:');
  console.error('  node search.mjs <pdf> <фраза> [ещё фраза...]');
  console.error('  node search.mjs <pdf> --page <номер PDF-страницы>');
  process.exit(2);
}

const file = argv[0];
const data = new Uint8Array(fs.readFileSync(file));
const doc = await pdfjs.getDocument({
  data,
  useSystemFonts: false,
  disableFontFace: true,
  verbosity: 0,
}).promise;
console.log(`PDF: ${path.basename(file)}; страниц: ${doc.numPages}`);

async function pageText(n) {
  const page = await doc.getPage(n);
  const content = await page.getTextContent();
  return content.items.map((i) => i.str + (i.hasEOL ? '\n' : ' ')).join('');
}

if (argv[1] === '--page') {
  const n = Number(argv[2]);
  if (!Number.isInteger(n) || n < 1 || n > doc.numPages) {
    console.error(`Нет страницы ${argv[2]} (всего ${doc.numPages})`);
    process.exit(2);
  }
  console.log(`\n===== PDF-страница ${n} =====\n`);
  console.log(await pageText(n));
  process.exit(0);
}

const queries = argv.slice(1);
let found = 0;
for (let p = 1; p <= doc.numPages; p++) {
  const text = await pageText(p);
  const lower = text.toLowerCase();
  for (const q of queries) {
    const idx = lower.indexOf(q.toLowerCase());
    if (idx === -1) continue;
    found++;
    const start = Math.max(0, idx - 180);
    const snippet = text
      .slice(start, Math.min(text.length, idx + q.length + 260))
      .replace(/\s+/g, ' ')
      .trim();
    const head = text.replace(/\s+/g, ' ').trim().slice(0, 90);
    console.log(`\n[PDF-стр. ${p}] «${q}»`);
    console.log(`начало страницы: ${head}`);
    console.log(`… ${snippet} …`);
    break;
  }
}
console.log(`\nСовпавших страниц: ${found}`);
