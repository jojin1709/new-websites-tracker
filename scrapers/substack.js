const axios = require('axios');

async function scrapeSubstack() {
  try {
    const response = await axios.get('https://substack.com/api/v1/publication首页', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const pubs = [];
    const regex = /href="https:\/\/[^.]+\.substack\.com"/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      pubs.push({
        name: match[0].split('https://')[1].split('.substack')[0],
        tagline: 'Substack newsletter',
        url: match[0].split('href="')[1].split('"')[0],
        votes: 0,
        source: 'Substack',
        scrapedAt: new Date().toISOString()
      });
    }
    return [...new Map(pubs.map(p => [p.name, p])).values()].slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeSubstack };