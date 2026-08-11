const axios = require('axios');

async function scrapeAINews() {
  try {
    const response = await axios.get('https://www.artificialintelligence-news.com/', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const articles = [];
    const regex = /<h2[^>]*><a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      articles.push({
        name: match[2].trim(),
        tagline: 'AI News',
        url: match[1].startsWith('http') ? match[1] : `https://www.artificialintelligence-news.com${match[1]}`,
        votes: 0,
        source: 'AI News',
        scrapedAt: new Date().toISOString()
      });
    }
    return articles.slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeAINews };