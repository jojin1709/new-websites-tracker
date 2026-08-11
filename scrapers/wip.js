const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWIP() {
  const response = await axios.get('https://wip.co/', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    timeout: 10000
  });
  
  const $ = cheerio.load(response.data);
  const projects = [];
  
  $('a[href*="/"]').each((i, el) => {
    const name = $(el).text().trim().slice(0, 80);
    const url = $(el).attr('href');
    
    if (name && name.length > 3 && url && !projects.find(p => p.name === name)) {
      projects.push({
        name,
        tagline: 'WIP project',
        url: url.startsWith('http') ? url : `https://wip.co${url}`,
        votes: 0,
        source: 'WIP',
        scrapedAt: new Date().toISOString()
      });
    }
  });
  
  return projects.slice(0, 15);
}

module.exports = { scrapeWIP };