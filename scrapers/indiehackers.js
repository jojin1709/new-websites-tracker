const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeIndieHackers() {
  try {
    const response = await axios.get('https://www.indiehackers.com/products', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    
    const $ = cheerio.load(response.data);
    const products = [];
    
    $('.product-card, [class*="ProductCard"], [class*="product"]').each((i, el) => {
      const name = $(el).find('h3, h4, [class*="name"], [class*="title"]').first().text().trim();
      const tagline = $(el).find('p, [class*="desc"], [class*="tagline"]').first().text().trim();
      const url = $(el).find('a').attr('href');
      
      if (name && name.length > 1) {
        products.push({
          name,
          tagline: tagline || 'Indie Hackers product',
          url: url ? (url.startsWith('http') ? url : `https://www.indiehackers.com${url}`) : '',
          votes: 0,
          source: 'Indie Hackers',
          scrapedAt: new Date().toISOString()
        });
      }
    });
    
    return products.slice(0, 20);
  } catch (error) {
    console.error('Error scraping Indie Hackers:', error.message);
    return [];
  }
}

module.exports = { scrapeIndieHackers };