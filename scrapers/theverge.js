const axios = require('axios');

async function scrapeTheVerge() {
  try {
    const response = await axios.get('https://www.theverge.com/rss/index.xml', {
      timeout: 10000
    });
    const items = [];
    const regex = /<entry>[\s\S]*?<title[^>]*>([\s\S]*?)<\/title>[\s\S]*?<link[^>]*href="([^"]*)"[^>]*\/>[\s\S]*?<summary[^>]*>([\s\S]*?)<\/summary>/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      items.push({
        name: match[1].trim(),
        tagline: match[3].trim().replace(/<[^>]*>/g, '').slice(0, 120),
        url: match[2].trim(),
        votes: 0,
        source: 'The Verge',
        scrapedAt: new Date().toISOString()
      });
    }
    return items.slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeTheVerge };