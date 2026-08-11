const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeProductHuntTopics() {
  try {
    const topics = ['ai', 'saas', 'developer-tools', 'productivity', 'design-tools'];
    const allProducts = [];
    
    for (const topic of topics) {
      try {
        const response = await axios.get(`https://www.producthunt.com/topics/${topic}`, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        
        const $ = cheerio.load(response.data);
        
        $('[data-test="post-item"], .styles_item__Dk_nz, [class*="post"]').each((i, el) => {
          const name = $(el).find('h3, [class*="name"]').first().text().trim();
          const tagline = $(el).find('p, [class*="tagline"]').first().text().trim();
          const url = $(el).find('a').first().attr('href');
          const votes = $(el).find('[class*="vote"], button').first().text().trim();
          
          if (name && name.length > 1) {
            allProducts.push({
              name,
              tagline: tagline || `Product Hunt - ${topic}`,
              url: url ? (url.startsWith('http') ? url : `https://www.producthunt.com${url}`) : '',
              votes: parseInt(votes) || 0,
              source: 'Product Hunt Topics',
              topic,
              scrapedAt: new Date().toISOString()
            });
          }
        });
      } catch (e) {
        console.error(`Error scraping PH topic ${topic}:`, e.message);
      }
    }
    
    return allProducts.slice(0, 30);
  } catch (error) {
    console.error('Error scraping Product Hunt Topics:', error.message);
    return [];
  }
}

module.exports = { scrapeProductHuntTopics };