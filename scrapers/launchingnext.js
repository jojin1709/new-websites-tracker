const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeLaunchingNext() {
  try {
    const response = await axios.get('https://www.launchingnext.com/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    
    const $ = cheerio.load(response.data);
    const startups = [];
    
    $('.startup-item, .card, [class*="startup"]').each((i, el) => {
      const name = $(el).find('h3, h4, .title').first().text().trim();
      const tagline = $(el).find('p, .tagline, .description').first().text().trim();
      const url = $(el).find('a').attr('href');
      
      if (name && name.length > 1) {
        startups.push({
          name,
          tagline: tagline || 'New startup',
          url: url ? (url.startsWith('http') ? url : `https://www.launchingnext.com${url}`) : '',
          votes: 0,
          source: 'Launching Next',
          scrapedAt: new Date().toISOString()
        });
      }
    });
    
    return startups.slice(0, 20);
  } catch (error) {
    console.error('Error scraping Launching Next:', error.message);
    return [];
  }
}

module.exports = { scrapeLaunchingNext };