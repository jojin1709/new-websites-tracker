const axios = require('axios');

async function scrapeDevToRecent() {
  try {
    const response = await axios.get('https://dev.to/api/articles?per_page=20&state=rising', {
      timeout: 10000
    });
    if (!response.data || !Array.isArray(response.data)) return [];
    return response.data.map(a => ({
      name: a.title,
      tagline: a.description || 'Dev.to rising',
      url: a.url,
      votes: a.positive_reactions_count || 0,
      source: 'Dev.to Rising',
      scrapedAt: new Date().toISOString()
    }));
  } catch (e) { return []; }
}

module.exports = { scrapeDevToRecent };