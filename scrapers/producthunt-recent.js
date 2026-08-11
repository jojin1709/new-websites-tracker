const axios = require('axios');

async function scrapeProductHuntRecent() {
  try {
    const days = 7;
    const allProducts = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      try {
        const response = await axios.get(`https://www.producthunt.com/leaderboard/daily/${dateStr}/all`, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        
        const $ = cheerio.load(response.data);
        
        $('[data-test="post-item"], [class*="styles_item"]').each((i, el) => {
          const name = $(el).find('h3, [class*="name"]').first().text().trim();
          const tagline = $(el).find('p, [class*="tagline"]').first().text().trim();
          const url = $(el).find('a').first().attr('href');
          const votes = $(el).find('button, [class*="vote"]').first().text().trim();
          
          if (name) {
            allProducts.push({
              name,
              tagline: tagline || 'Product Hunt',
              url: url ? `https://www.producthunt.com${url}` : '',
              votes: parseInt(votes) || 0,
              source: 'Product Hunt Daily',
              date: dateStr,
              scrapedAt: new Date().toISOString()
            });
          }
        });
      } catch (e) {
        // Continue to next day
      }
    }
    
    return allProducts.slice(0, 50);
  } catch (error) {
    console.error('Error scraping PH Recent:', error.message);
    return [];
  }
}

const cheerio = require('cheerio');
module.exports = { scrapeProductHuntRecent };