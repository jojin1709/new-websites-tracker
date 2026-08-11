const axios = require('axios');

async function scrapeRubyGems() {
  try {
    const response = await axios.get('https://rubygems.org/api/v1/gems/latest.json', {
      timeout: 10000
    });
    if (Array.isArray(response.data)) {
      return response.data.slice(0, 20).map(g => ({
        name: g.name,
        tagline: g.info || 'Ruby gem',
        url: `https://rubygems.org/gems/${g.name}`,
        votes: g.downloads || 0,
        source: 'RubyGems',
        scrapedAt: new Date().toISOString()
      }));
    }
    return [];
  } catch (e) { return []; }
}

module.exports = { scrapeRubyGems };