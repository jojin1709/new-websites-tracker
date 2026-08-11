const axios = require('axios');

async function scrapeGitLabTrending() {
  try {
    const response = await axios.get('https://gitlab.com/explore/projects', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const projects = [];
    const regex = /href="\/([^/]+\/[^/]+)"/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      const parts = match[1].split('/');
      if (parts.length === 2 && !projects.find(p => p.name === match[1])) {
        projects.push({
          name: match[1],
          tagline: 'GitLab project',
          url: `https://gitlab.com/${match[1]}`,
          votes: 0,
          source: 'GitLab',
          scrapedAt: new Date().toISOString()
        });
      }
    }
    return projects.slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeGitLabTrending };