const axios = require('axios');

async function scrapeProductHuntRSS() {
  try {
    const response = await axios.get('https://www.producthunt.com/feed', {
      timeout: 10000
    });
    const items = [];
    const regex = /<item>[\s\S]*?<title>([\s\S]*?)<\/title>[\s\S]*?<link>([\s\S]*?)<\/link>[\s\S]*?<description>([\s\S]*?)<\/description>/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      items.push({
        name: match[1].trim(),
        tagline: match[3].trim().slice(0, 120),
        url: match[2].trim(),
        votes: 0,
        source: 'Product Hunt RSS',
        scrapedAt: new Date().toISOString()
      });
    }
    return items.slice(0, 20);
  } catch (e) { return []; }
}

module.exports = { scrapeProductHuntRSS };