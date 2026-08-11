const axios = require('axios');

async function scrapeReddit() {
  const subreddits = ['SideProject', 'startups', 'webdev'];
  const allPosts = [];
  
  for (const sub of subreddits) {
    try {
      const response = await axios.get(`https://www.reddit.com/r/${sub}/hot.json?limit=10`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WebDiscoveryBot/1.0)' },
        timeout: 10000
      });
      
      if (response.data && response.data.data && response.data.data.children) {
        const posts = response.data.data.children
          .filter(p => !p.data.stickied && p.data.url)
          .map(p => ({
            name: p.data.title,
            tagline: p.data.selftext ? p.data.selftext.slice(0, 120) : `r/${sub}`,
            url: p.data.url_overridden_by_dest || `https://reddit.com${p.data.permalink}`,
            votes: p.data.ups || 0,
            source: `Reddit r/${sub}`,
            scrapedAt: new Date().toISOString()
          }));
        
        allPosts.push(...posts);
      }
    } catch (e) {
      // Skip failed subreddits
    }
  }
  
  return allPosts;
}

module.exports = { scrapeReddit };