const axios = require('axios');

async function scrapeGitHubExplore() {
  try {
    const response = await axios.get('https://github.com/explore', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const repos = [];
    const regex = /href="\/([^/]+\/[^/]+)"/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      const parts = match[1].split('/');
      if (parts.length === 2 && !parts[0].includes('.') && !repos.find(r => r.name === match[1])) {
        repos.push({
          name: match[1],
          tagline: 'GitHub Explore',
          url: `https://github.com/${match[1]}`,
          votes: 0,
          source: 'GitHub Explore',
          scrapedAt: new Date().toISOString()
        });
      }
    }
    return repos.slice(0, 20);
  } catch (e) { return []; }
}

module.exports = { scrapeGitHubExplore };