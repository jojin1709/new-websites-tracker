const axios = require('axios');

async function scrapeKillercoding() {
  try {
    const response = await axios.get('https://www.killerstartups.com/', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const startups = [];
    const regex = /<h2[^>]*><a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      startups.push({
        name: match[2].trim(),
        tagline: 'Startup',
        url: match[1].startsWith('http') ? match[1] : `https://www.killerstartups.com${match[1]}`,
        votes: 0,
        source: 'Killer Startups',
        scrapedAt: new Date().toISOString()
      });
    }
    return startups.slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeKillercoding };