const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeGitHubTrending() {
  try {
    const response = await axios.get('https://github.com/trending', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const repos = [];
    
    $('.Box-row').each((i, el) => {
      const name = $(el).find('h2 a').text().trim().replace(/\s+/g, '');
      const description = $(el).find('p').text().trim();
      const url = $(el).find('h2 a').attr('href');
      const stars = $(el).find('.d-inline-block.float-sm-right').text().trim();
      
      if (name) {
        repos.push({
          name,
          tagline: description || 'GitHub Trending',
          url: url ? `https://github.com${url}` : '',
          stars: parseInt(stars.replace(/[^\d]/g, '')) || 0,
          source: 'GitHub Trending',
          scrapedAt: new Date().toISOString()
        });
      }
    });
    
    return repos;
  } catch (error) {
    console.error('Error scraping GitHub Trending:', error.message);
    return [];
  }
}

module.exports = { scrapeGitHubTrending };