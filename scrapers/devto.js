const axios = require('axios');

async function scrapeDevTo() {
  const response = await axios.get('https://dev.to/api/articles?top=7&per_page=20', {
    timeout: 10000
  });
  
  if (!response.data || !Array.isArray(response.data)) {
    return [];
  }
  
  return response.data.map(article => ({
    name: article.title,
    tagline: article.description || 'Dev.to article',
    url: article.url || article.canonical_url,
    votes: article.positive_reactions_count || 0,
    source: 'Dev.to',
    scrapedAt: new Date().toISOString()
  }));
}

module.exports = { scrapeDevTo };