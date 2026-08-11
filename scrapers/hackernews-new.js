const axios = require('axios');

async function scrapeHackerNewsNew() {
  try {
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');
    const storyIds = response.data.slice(0, 30);
    
    const stories = await Promise.all(
      storyIds.map(async (id) => {
        try {
          const story = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return story.data;
        } catch (e) {
          return null;
        }
      })
    );
    
    return stories
      .filter(s => s && s.title && s.url)
      .map(s => ({
        name: s.title,
        tagline: s.url ? new URL(s.url).hostname : 'Hacker News',
        url: s.url || `https://news.ycombinator.com/item?id=${s.id}`,
        votes: s.score || 0,
        source: 'Hacker News New',
        comments: s.descendants || 0,
        scrapedAt: new Date().toISOString()
      }));
  } catch (error) {
    console.error('Error scraping HN New:', error.message);
    return [];
  }
}

module.exports = { scrapeHackerNewsNew };