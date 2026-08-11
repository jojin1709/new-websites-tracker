const axios = require('axios');

async function scrapeGitHubRepos() {
  try {
    const response = await axios.get('https://api.github.com/search/repositories?q=created:>=' + 
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 
      '&sort=stars&order=desc&per_page=20', {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
      timeout: 10000
    });
    
    if (response.data?.items) {
      return response.data.items.map(repo => ({
        name: repo.full_name,
        tagline: repo.description || 'GitHub repository',
        url: repo.html_url,
        stars: repo.stargazers_count || 0,
        source: 'GitHub New',
        scrapedAt: new Date().toISOString()
      }));
    }
    return [];
  } catch (e) {
    console.error('GitHub API error:', e.message);
    return [];
  }
}

module.exports = { scrapeGitHubRepos };