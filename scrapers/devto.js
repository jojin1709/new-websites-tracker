const axios = require('axios');

async function scrapeDevTo() {
  try {
    const response = await axios.get('https://dev.to/api/articles?top=7&per_page=20');
    
    return response.data.map(article => ({
      name: article.title,
      tagline: article.description || 'Dev.to article',
      url: article.url || article.canonical_url,
      votes: article.positive_reactions_count || 0,
      source: 'Dev.to',
      comments: article.comments_count || 0,
      tags: article.tag_list || [],
      scrapedAt: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error scraping Dev.to:', error.message);
    return [];
  }
}

module.exports = { scrapeDevTo };