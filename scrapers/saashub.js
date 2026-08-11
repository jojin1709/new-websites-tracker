const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeSaaSHub() {
  const response = await axios.get('https://saashub.com/', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    timeout: 10000
  });
  
  const $ = cheerio.load(response.data);
  const products = [];
  
  $('a[href*="/"]').each((i, el) => {
    const name = $(el).find('h3, h4, strong').first().text().trim();
    const url = $(el).attr('href');
    
    if (name && name.length > 2 && url && !products.find(p => p.name === name)) {
      products.push({
        name,
        tagline: 'SaaS alternative',
        url: url.startsWith('http') ? url : `https://saashub.com${url}`,
        votes: 0,
        source: 'SaaSHub',
        scrapedAt: new Date().toISOString()
      });
    }
  });
  
  return products.slice(0, 15);
}

module.exports = { scrapeSaaSHub };