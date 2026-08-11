const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeMakers() {
  try {
    const response = await axios.get('https://makers.wtf/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    
    const $ = cheerio.load(response.data);
    const projects = [];
    
    $('.post, .project, article, [class*="item"]').each((i, el) => {
      const name = $(el).find('h2, h3, .title, a').first().text().trim();
      const tagline = $(el).find('p, .desc, .content').first().text().trim();
      const url = $(el).find('a').first().attr('href');
      
      if (name && name.length > 1) {
        projects.push({
          name,
          tagline: tagline ? tagline.slice(0, 150) : 'Maker project',
          url: url ? (url.startsWith('http') ? url : `https://makers.wtf${url}`) : '',
          votes: 0,
          source: 'Makers',
          scrapedAt: new Date().toISOString()
        });
      }
    });
    
    return projects.slice(0, 20);
  } catch (error) {
    console.error('Error scraping Makers:', error.message);
    return [];
  }
}

module.exports = { scrapeMakers };