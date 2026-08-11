const axios = require('axios');

async function scrapeLWN() {
  try {
    const response = await axios.get('https://lwn.net/headlines/rss', {
      timeout: 10000
    });
    const items = [];
    const regex = /<item>[\s\S]*?<title>([\s\S]*?)<\/title>[\s\S]*?<link>([\s\S]*?)<\/link>/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      items.push({
        name: match[1].trim(),
        tagline: 'Linux Weekly News',
        url: match[2].trim(),
        votes: 0,
        source: 'LWN',
        scrapedAt: new Date().toISOString()
      });
    }
    return items.slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeLWN };