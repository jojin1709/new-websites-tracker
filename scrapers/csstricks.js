const axios = require('axios');

async function scrapeCSSTricks() {
  try {
    const response = await axios.get('https://css-tricks.com/feed/', {
      timeout: 10000
    });
    const items = [];
    const regex = /<item>[\s\S]*?<title>([\s\S]*?)<\/title>[\s\S]*?<link>([\s\S]*?)<\/link>/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      items.push({
        name: match[1].trim(),
        tagline: 'CSS Tricks',
        url: match[2].trim(),
        votes: 0,
        source: 'CSS Tricks',
        scrapedAt: new Date().toISOString()
      });
    }
    return items.slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeCSSTricks };