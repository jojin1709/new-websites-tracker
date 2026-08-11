const axios = require('axios');

async function scrapeTildes() {
  try {
    const response = await axios.get('https://tildes.net/api/topics', {
      headers: { 'Accept': 'application/json' },
      timeout: 10000
    });
    if (response.data?.topics) {
      return response.data.features.map(t => ({
        name: t.title,
        tagline: t.tags ? t.tags.join(', ') : 'Tildes',
        url: `https://tildes.net/${t.group}/${t.slug}`,
        votes: t.votes || 0,
        source: 'Tildes',
        scrapedAt: new Date().toISOString()
      }));
    }
    return [];
  } catch (e) { return []; }
}

module.exports = { scrapeTildes };