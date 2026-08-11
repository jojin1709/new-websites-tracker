const axios = require('axios');

async function scrapePapersWithCode() {
  try {
    const response = await axios.get('https://paperswithcode.com/api/v1/papers/', {
      params: { items_per_page: 20, order_by: '-published' },
      timeout: 10000
    });
    if (response.data?.results) {
      return response.data.results.map(p => ({
        name: p.title,
        tagline: p.abstract ? p.abstract.slice(0, 120) : 'AI Research',
        url: p.url_abs || `https://paperswithcode.com${p.id}`,
        votes: p.stars || 0,
        source: 'Papers With Code',
        scrapedAt: new Date().toISOString()
      }));
    }
    return [];
  } catch (e) { return []; }
}

module.exports = { scrapePapersWithCode };