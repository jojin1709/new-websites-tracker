const axios = require('axios');

async function scrapeBetaPage() {
  try {
    const response = await axios.get('https://betapage.co/startups', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const startups = [];
    const regex = /href="\/startup\/([^"]*)"/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      startups.push({
        name: match[1].replace(/-/g, ' '),
        tagline: 'Beta startup',
        url: `https://betapage.co/startup/${match[1]}`,
        votes: 0,
        source: 'BetaPage',
        scrapedAt: new Date().toISOString()
      });
    }
    return [...new Map(startups.map(s => [s.name, s])).values()].slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeBetaPage };