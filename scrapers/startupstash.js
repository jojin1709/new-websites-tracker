const axios = require('axios');

async function scrapeStartupStash() {
  try {
    const response = await axios.get('https://startupstash.com/resources/', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const resources = [];
    const regex = /<h3[^>]*><a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      resources.push({
        name: match[2].trim(),
        tagline: 'Startup resource',
        url: match[1].startsWith('http') ? match[1] : `https://startupstash.com${match[1]}`,
        votes: 0,
        source: 'Startup Stash',
        scrapedAt: new Date().toISOString()
      });
    }
    return resources.slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeStartupStash };