const axios = require('axios');

async function scrapeReddit() {
  try {
    const subreddits = ['SideProject', 'startups', 'webdev', 'InternetIsBeautiful'];
    const allPosts = [];
    
    for (const sub of subreddits) {
      try {
        const response = await axios.get(`https://www.reddit.com/r/${sub}/hot.json?limit=15`, {
          headers: { 'User-Agent': 'WebDiscoveryBot/1.0' }
        });
        
        const posts = response.data.data.children
          .filter(p => !p.data.stickied)
          .map(p => ({
            name: p.data.title,
            tagline: p.data.selftext ? p.data.selftext.slice(0, 150) : `r/${sub}`,
            url: p.data.url_overridden_by_dest || `https://reddit.com${p.data.permalink}`,
            votes: p.data.ups || 0,
            source: `Reddit r/${sub}`,
            comments: p.data.num_comments || 0,
            scrapedAt: new Date().toISOString()
          }));
        
        allPosts.push(...posts);
      } catch (e) {
        console.error(`Error scraping r/${sub}:`, e.message);
      }
    }
    
    return allPosts;
  } catch (error) {
    console.error('Error scraping Reddit:', error.message);
    return [];
  }
}

module.exports = { scrapeReddit };