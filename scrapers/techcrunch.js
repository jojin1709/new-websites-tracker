const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeTechCrunch() {
  const response = await axios.get('https://techcrunch.com/category/startups/', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    timeout: 10000
  });
  
  const $ = cheerio.load(response.data);
  const articles = [];
  
  $('h2 a, h3 a').each((i, el) => {
    const title = $(el).text().trim();
    const url = $(el).attr('href');
    
    if (title && title.length > 5 && url && url.includes('techcrunch.com')) {
      articles.push({
        name: title,
        tagline: 'TechCrunch article',
        url,
        votes: 0,
        source: 'TechCrunch',
        scrapedAt: new Date().toISOString()
      });
    }
  });
  
  return articles.slice(0, 15);
}

module.exports = { scrapeTechCrunch };