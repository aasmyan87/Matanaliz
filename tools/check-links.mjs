const urls = [
  'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/',
  'https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/',
  'https://tutorial.math.lamar.edu/',
  'https://math.libretexts.org/Bookshelves/Calculus',
  'https://www.math.ubc.ca/~CLP/',
  'https://activecalculus.org/',
  'https://openstax.org/details/books/calculus-volume-1',
  'https://www.khanacademy.org/math/calculus-1',
  'https://mathworld.wolfram.com/',
  'https://encyclopediaofmath.org/',
  'https://proofwiki.org/',
  'https://www.desmos.com/calculator',
  'https://www.geogebra.org/',
  'https://www.gutenberg.org/ebooks/33283',
  'https://math.stackexchange.com/',
  'https://etudes.ru/',
  'https://kvant.mccme.ru/',
  'https://www.mathnet.ru/',
  'https://www.aft.org/sites/default/files/periodicals/Rosenshine.pdf',
  'https://deansforimpact.org/resources/the-science-of-learning/',
  'https://retrievalpractice.org/',
  'https://www.learningscientists.org/',
  'https://www.cmu.edu/teaching/',
  'https://tll.mit.edu/',
  'https://www.youcubed.org/',
  'https://nrich.maths.org/',
  'https://www.openmiddle.com/',
  'https://illustrativemathematics.org/',
];

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
};

for (const url of urls) {
  try {
    const res = await fetch(url, { redirect: 'follow', headers });
    console.log(`${res.status}\t${url}`);
    await res.body?.cancel();
  } catch (error) {
    console.log(`ERR\t${url}\t${error.message}`);
  }
}
