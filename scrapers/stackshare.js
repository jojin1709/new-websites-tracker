const axios = require('axios');

async function scrapeStackShare() {
  try {
    const response = await axios.get('https://stackshare.io/stacks', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const stacks = [];
    const regex = /href="\/([^"]+)"/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      if (match[1].length > 2 && !match[1].includes('api')) {
        stacks.push({
          name: match[1].replace(/-/g, ' '),
          tagline: 'Tech stack',
          url: `https://stackshare.io/${match[1]}`,
          votes: 0,
          source: 'StackShare',
          scrapedAt: new Date().toISOString()
        });
      }
    }
    return [...new Map(stacks.map(s => [s.name, s])).values()].slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeStackShare };