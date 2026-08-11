const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeF6S() {
  try {
    const response = await axios.get('https://www.f6s.com/companies', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    
    const $ = cheerio.load(response.data);
    const startups = [];
    
    $('.company-item, .card, [class*="company"]').each((i, el) => {
      const name = $(el).find('h3, h4, .name').first().text().trim();
      const tagline = $(el).find('p, .description, .tagline').first().text().trim();
      const url = $(el).find('a').first().attr('href');
      
      if (name && name.length > 1) {
        startups.push({
          name,
          tagline: tagline || 'Startup on F6S',
          url: url ? (url.startsWith('http') ? url : `https://www.f6s.com${url}`) : '',
          votes: 0,
          source: 'F6S',
          scrapedAt: new Date().toISOString()
        });
      }
    });
    
    return startups.slice(0, 20);
  } catch (error) {
    console.error('Error scraping F6S:', error.message);
    return [];
  }
}

module.exports = { scrapeF6S };