import fs from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const [svgPath, pngPath, widthArg] = process.argv.slice(2);
if (!svgPath || !pngPath) {
  console.error('Использование: node svg-preview.mjs <svg> <png> [ширина]');
  process.exit(2);
}

const svg = fs.readFileSync(svgPath);
const width = Number(widthArg) || 1600;
const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: width },
  background: '#ffffff',
});
fs.writeFileSync(pngPath, resvg.render().asPng());
console.log(`${pngPath} (${width}px)`);
