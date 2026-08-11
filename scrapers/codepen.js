const axios = require('axios');

async function scrapeCodePen() {
  try {
    const response = await axios.get('https://codepen.io/trending', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const pens = [];
    const regex = /href="\/([^/]+)\/pen\/([^"]+)"/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      pens.push({
        name: `${match[1]}'s pen`,
        tagline: 'CodePen creation',
        url: `https://codepen.io/${match[1]}/pen/${match[2]}`,
        votes: 0,
        source: 'CodePen',
        scrapedAt: new Date().toISOString()
      });
    }
    return [...new Map(pens.map(p => [p.url, p])).values()].slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeCodePen };