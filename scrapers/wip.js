const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWIP() {
  try {
    const response = await axios.get('https://wip.co/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    
    const $ = cheerio.load(response.data);
    const projects = [];
    
    $('.task, .project, [class*="task"], [class*="project"]').each((i, el) => {
      const name = $(el).find('h3, h4, .title, a').first().text().trim();
      const tagline = $(el).find('p, .desc').first().text().trim();
      const url = $(el).find('a').first().attr('href');
      
      if (name && name.length > 1) {
        projects.push({
          name,
          tagline: tagline || 'WIP project',
          url: url ? (url.startsWith('http') ? url : `https://wip.co${url}`) : '',
          votes: 0,
          source: 'WIP',
          scrapedAt: new Date().toISOString()
        });
      }
    });
    
    return projects.slice(0, 20);
  } catch (error) {
    console.error('Error scraping WIP:', error.message);
    return [];
  }
}

module.exports = { scrapeWIP };