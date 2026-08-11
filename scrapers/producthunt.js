const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeProductHunt() {
  try {
    const response = await axios.get('https://www.producthunt.com', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const products = [];
    
    $('[data-test="post-item"]').each((i, el) => {
      const name = $(el).find('[data-test="post-name"]').text().trim();
      const tagline = $(el).find('[data-test="post-tagline"]').text().trim();
      const url = $(el).find('a').attr('href');
      const votes = $(el).find('[data-test="vote-button"]').text().trim();
      
      if (name) {
        products.push({
          name,
          tagline,
          url: url ? `https://www.producthunt.com${url}` : '',
          votes: parseInt(votes) || 0,
          source: 'Product Hunt',
          scrapedAt: new Date().toISOString()
        });
      }
    });
    
    return products;
  } catch (error) {
    console.error('Error scraping Product Hunt:', error.message);
    return [];
  }
}

module.exports = { scrapeProductHunt };