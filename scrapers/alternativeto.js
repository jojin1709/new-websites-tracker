const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeAlternativeTo() {
  const response = await axios.get('https://alternativeto.net/browse/new/', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    timeout: 10000
  });
  
  const $ = cheerio.load(response.data);
  const alternatives = [];
  
  $('a[href*="/software/"]').each((i, el) => {
    const name = $(el).text().trim().slice(0, 80);
    const url = $(el).attr('href');
    
    if (name && name.length > 2 && url && !alternatives.find(a => a.name === name)) {
      alternatives.push({
        name,
        tagline: 'New alternative',
        url: url.startsWith('http') ? url : `https://alternativeto.net${url}`,
        votes: 0,
        source: 'AlternativeTo',
        scrapedAt: new Date().toISOString()
      });
    }
  });
  
  return alternatives.slice(0, 15);
}

module.exports = { scrapeAlternativeTo };