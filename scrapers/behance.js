const axios = require('axios');

async function scrapeBehance() {
  try {
    const response = await axios.get('https://www.behance.net/search/projects', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const projects = [];
    const regex = /href="\/gallery\/(\d+)\/[^"]+"/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      projects.push({
        name: `Project ${match[1]}`,
        tagline: 'Behance project',
        url: `https://www.behance.net/gallery/${match[1]}`,
        votes: 0,
        source: 'Behance',
        scrapedAt: new Date().toISOString()
      });
    }
    return [...new Map(projects.map(p => [p.url, p])).values()].slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeBehance };