const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeGitHubTrending() {
  const response = await axios.get('https://github.com/trending', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    timeout: 10000
  });
  
  const $ = cheerio.load(response.data);
  const repos = [];
  
  $('article.Box-row').each((i, el) => {
    const nameEl = $(el).find('h2 a');
    const name = nameEl.text().trim().replace(/\s+/g, '');
    const url = nameEl.attr('href');
    const description = $(el).find('p').text().trim();
    const starsText = $(el).find('.d-inline-block.float-sm-right').text().trim();
    const stars = parseInt(starsText.replace(/[^\d]/g, '')) || 0;
    
    if (name && url) {
      repos.push({
        name,
        tagline: description || 'GitHub Trending',
        url: `https://github.com${url}`,
        stars,
        source: 'GitHub Trending',
        scrapedAt: new Date().toISOString()
      });
    }
  });
  
  return repos.slice(0, 25);
}

module.exports = { scrapeGitHubTrending };