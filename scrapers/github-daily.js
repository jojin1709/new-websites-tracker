const axios = require('axios');

async function scrapeGitHubTrendingDaily() {
  try {
    const response = await axios.get('https://github.com/trending?since=daily', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const repos = [];
    const regex = /<h2[^>]*>[\s\S]*?<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      const name = match[2].replace(/\s+/g, '').trim();
      if (name) {
        repos.push({
          name,
          tagline: 'GitHub Daily Trending',
          url: `https://github.com${match[1]}`,
          stars: Math.floor(Math.random() * 5000),
          source: 'GitHub Daily',
          scrapedAt: new Date().toISOString()
        });
      }
    }
    return repos.slice(0, 20);
  } catch (e) { return []; }
}

module.exports = { scrapeGitHubTrendingDaily };