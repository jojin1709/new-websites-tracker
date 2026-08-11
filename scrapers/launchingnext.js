const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeLaunchingNext() {
  const response = await axios.get('https://www.launchingnext.com/', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    timeout: 10000
  });
  
  const $ = cheerio.load(response.data);
  const startups = [];
  
  $('a[href*="/startup/"]').each((i, el) => {
    const name = $(el).find('h3, h4, strong').first().text().trim();
    const url = $(el).attr('href');
    
    if (name && name.length > 1 && url) {
      startups.push({
        name,
        tagline: 'New startup',
        url: url.startsWith('http') ? url : `https://www.launchingnext.com${url}`,
        votes: 0,
        source: 'Launching Next',
        scrapedAt: new Date().toISOString()
      });
    }
  });
  
  return startups.slice(0, 15);
}

module.exports = { scrapeLaunchingNext };