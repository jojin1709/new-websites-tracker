const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeAlternativeTo() {
  try {
    const response = await axios.get('https://alternativeto.net/browse/new/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    
    const $ = cheerio.load(response.data);
    const alternatives = [];
    
    $('.app-item, .list-item, [class*="app"]').each((i, el) => {
      const name = $(el).find('h3, h2, .app-name, [class*="name"]').first().text().trim();
      const tagline = $(el).find('p, .description, [class*="desc"]').first().text().trim();
      const url = $(el).find('a').attr('href');
      
      if (name && name.length > 1) {
        alternatives.push({
          name,
          tagline: tagline || 'New alternative',
          url: url ? (url.startsWith('http') ? url : `https://alternativeto.net${url}`) : '',
          votes: 0,
          source: 'AlternativeTo',
          scrapedAt: new Date().toISOString()
        });
      }
    });
    
    return alternatives.slice(0, 20);
  } catch (error) {
    console.error('Error scraping AlternativeTo:', error.message);
    return [];
  }
}

module.exports = { scrapeAlternativeTo };