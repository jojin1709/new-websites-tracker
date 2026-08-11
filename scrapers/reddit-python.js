const axios = require('axios');

async function scrapeRedditPython() {
  try {
    const response = await axios.get('https://www.reddit.com/r/python/hot.json?limit=15', {
      headers: { 'User-Agent': 'WebDiscoveryBot/1.0' },
      timeout: 10000
    });
    if (response.data?.data?.children) {
      return response.data.data.children
        .filter(p => p.data?.url && !p.data.stickied)
        .map(p => ({
          name: p.data.title,
          tagline: 'r/python',
          url: p.data.url_overridden_by_dest || `https://reddit.com${p.data.permalink}`,
          votes: p.data.ups || 0,
          source: 'Reddit Python',
          scrapedAt: new Date().toISOString()
        }));
    }
    return [];
  } catch (e) { return []; }
}

module.exports = { scrapeRedditPython };