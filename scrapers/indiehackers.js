const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeIndieHackers() {
  const response = await axios.get('https://www.indiehackers.com/', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    timeout: 10000
  });
  
  const $ = cheerio.load(response.data);
  const products = [];
  
  $('a[href*="/product/"], a[href*="/post/"]').each((i, el) => {
    const name = $(el).text().trim().slice(0, 100);
    const url = $(el).attr('href');
    
    if (name && name.length > 5 && url) {
      products.push({
        name,
        tagline: 'Indie Hackers',
        url: url.startsWith('http') ? url : `https://www.indiehackers.com${url}`,
        votes: 0,
        source: 'Indie Hackers',
        scrapedAt: new Date().toISOString()
      });
    }
  });
  
  return products.slice(0, 15);
}

module.exports = { scrapeIndieHackers };