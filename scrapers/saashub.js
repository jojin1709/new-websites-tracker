const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeSaaSHub() {
  try {
    const response = await axios.get('https://saashub.com/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    
    const $ = cheerio.load(response.data);
    const products = [];
    
    $('.product-item, .card, [class*="product"]').each((i, el) => {
      const name = $(el).find('h3, h4, .name, [class*="title"]').first().text().trim();
      const tagline = $(el).find('p, .desc, [class*="description"]').first().text().trim();
      const url = $(el).find('a').first().attr('href');
      
      if (name && name.length > 1) {
        products.push({
          name,
          tagline: tagline || 'SaaS alternative',
          url: url ? (url.startsWith('http') ? url : `https://saashub.com${url}`) : '',
          votes: 0,
          source: 'SaaSHub',
          scrapedAt: new Date().toISOString()
        });
      }
    });
    
    return products.slice(0, 20);
  } catch (error) {
    console.error('Error scraping SaaSHub:', error.message);
    return [];
  }
}

module.exports = { scrapeSaaSHub };