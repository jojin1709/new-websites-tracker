const axios = require('axios');

async function scrapeAngelList() {
  try {
    const response = await axios.get('https://angel.co/companies', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const startups = [];
    const regex = /href="\/([^"]*)-\d+"/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      startups.push({
        name: match[1].replace(/-/g, ' '),
        tagline: 'Startup',
        url: `https://angel.co/${match[1]}`,
        votes: 0,
        source: 'AngelList',
        scrapedAt: new Date().toISOString()
      });
    }
    return [...new Map(startups.map(s => [s.name, s])).values()].slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeAngelList };