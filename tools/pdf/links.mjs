const [url] = process.argv.slice(2);
if (!url) {
  console.error('Использование: node links.mjs <url>');
  process.exit(2);
}

const res = await fetch(url, {
  redirect: 'follow',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml',
  },
});
console.log('status', res.status, res.url);
const text = await res.text();
console.log('bytes', text.length);

const hrefs = [...text.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
const interesting = hrefs.filter((h) => /bitstream|download|\.pdf/i.test(h));
for (const h of [...new Set(interesting)].slice(0, 30)) console.log(h);
