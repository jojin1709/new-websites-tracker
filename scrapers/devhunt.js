const axios = require('axios');

async function scrapeDevhunt() {
  try {
    const response = await axios.get('https://devhunt.org/', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const tools = [];
    const regex = /href="\/tool\/([^"]*)"/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      tools.push({
        name: match[1].replace(/-/g, ' '),
        tagline: 'Developer tool',
        url: `https://devhunt.org/tool/${match[1]}`,
        votes: 0,
        source: 'DevHunt',
        scrapedAt: new Date().toISOString()
      });
    }
    return [...new Map(tools.map(t => [t.name, t])).values()].slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeDevhunt };