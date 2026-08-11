const axios = require('axios');

async function scrapeHashnode() {
  try {
    const response = await axios.get('https://hashnode.com/api/discover', {
      timeout: 10000
    });
    if (response.data?.posts) {
      return response.data.posts.map(p => ({
        name: p.title,
        tagline: p.brief || 'Hashnode post',
        url: `https://hashnode.com/${p.slug}`,
        votes: p.reactionCount || 0,
        source: 'Hashnode',
        scrapedAt: new Date().toISOString()
      }));
    }
    return [];
  } catch (e) { return []; }
}

module.exports = { scrapeHashnode };