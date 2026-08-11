const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeF6S() {
  const response = await axios.get('https://www.f6s.com/companies', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    timeout: 10000
  });
  
  const $ = cheerio.load(response.data);
  const startups = [];
  
  $('a[href*="/company/"]').each((i, el) => {
    const name = $(el).find('h3, h4, strong').first().text().trim();
    const url = $(el).attr('href');
    
    if (name && name.length > 1 && url) {
      startups.push({
        name,
        tagline: 'Startup on F6S',
        url: url.startsWith('http') ? url : `https://www.f6s.com${url}`,
        votes: 0,
        source: 'F6S',
        scrapedAt: new Date().toISOString()
      });
    }
  });
  
  return startups.slice(0, 15);
}

module.exports = { scrapeF6S };