const axios = require('axios');

async function scrapeWellfound() {
  try {
    const response = await axios.get('https://wellfound.com/startups', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const startups = [];
    const regex = /href="\/company\/([^"]*)"/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      startups.push({
        name: match[1].replace(/-/g, ' '),
        tagline: 'Startup on Wellfound',
        url: `https://wellfound.com/company/${match[1]}`,
        votes: 0,
        source: 'Wellfound',
        scrapedAt: new Date().toISOString()
      });
    }
    return [...new Map(startups.map(s => [s.name, s])).values()].slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeWellfound };