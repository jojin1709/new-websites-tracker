const axios = require('axios');

async function scrapeLobsters() {
  try {
    const response = await axios.get('https://lobste.rs/hottest.json', {
      headers: { 'User-Agent': 'WebDiscoveryBot/1.0' },
      timeout: 10000
    });
    
    return response.data.map(item => ({
      name: item.title,
      tagline: item.tags ? item.tags.join(', ') : 'Lobste.rs',
      url: item.url || item.comments_url,
      votes: item.score || 0,
      source: 'Lobste.rs',
      comments: item.comment_count || 0,
      scrapedAt: new Date().toISOString()
    }));
  } catch (e) {
    console.error('Lobsters error:', e.message);
    return [];
  }
}

module.exports = { scrapeLobsters };