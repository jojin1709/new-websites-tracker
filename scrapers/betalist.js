const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeBetaList() {
  try {
    const response = await axios.get('https://betalist.com/startups', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    
    const $ = cheerio.load(response.data);
    const startups = [];
    
    $('.startup-card, .card, [class*="startup"]').each((i, el) => {
      const name = $(el).find('h3, h4, .title, [class*="name"]').first().text().trim();
      const tagline = $(el).find('p, .tagline, [class*="desc"]').first().text().trim();
      const url = $(el).find('a').attr('href');
      
      if (name && name.length > 1) {
        startups.push({
          name,
          tagline: tagline || 'New startup on BetaList',
          url: url ? (url.startsWith('http') ? url : `https://betalist.com${url}`) : '',
          votes: 0,
          source: 'BetaList',
          scrapedAt: new Date().toISOString()
        });
      }
    });
    
    return startups.slice(0, 20);
  } catch (error) {
    console.error('Error scraping BetaList:', error.message);
    return [];
  }
}

module.exports = { scrapeBetaList };