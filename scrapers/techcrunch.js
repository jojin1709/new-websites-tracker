const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeTechCrunch() {
  try {
    const response = await axios.get('https://techcrunch.com/category/startups/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    
    const $ = cheerio.load(response.data);
    const articles = [];
    
    $('article, .post-block, [class*="article"]').each((i, el) => {
      const title = $(el).find('h2, h3, .post-block__title').first().text().trim();
      const excerpt = $(el).find('p, .post-block__content').first().text().trim();
      const url = $(el).find('a').first().attr('href');
      
      if (title && title.length > 1) {
        articles.push({
          name: title,
          tagline: excerpt ? excerpt.slice(0, 150) : 'TechCrunch article',
          url: url || '',
          votes: 0,
          source: 'TechCrunch',
          scrapedAt: new Date().toISOString()
        });
      }
    });
    
    return articles.slice(0, 15);
  } catch (error) {
    console.error('Error scraping TechCrunch:', error.message);
    return [];
  }
}

module.exports = { scrapeTechCrunch };