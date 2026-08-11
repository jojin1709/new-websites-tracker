const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeBetaList() {
  const response = await axios.get('https://betalist.com/startups', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    timeout: 10000
  });
  
  const $ = cheerio.load(response.data);
  const startups = [];
  
  $('a[href*="/startups/"]').each((i, el) => {
    const name = $(el).find('h3, strong, .font-bold').first().text().trim();
    const url = $(el).attr('href');
    
    if (name && name.length > 1 && url) {
      startups.push({
        name,
        tagline: 'New startup on BetaList',
        url: url.startsWith('http') ? url : `https://betalist.com${url}`,
        votes: 0,
        source: 'BetaList',
        scrapedAt: new Date().toISOString()
      });
    }
  });
  
  return startups.slice(0, 15);
}

module.exports = { scrapeBetaList };