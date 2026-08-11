const axios = require('axios');

async function scrapeHackerNews() {
  const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json', {
    timeout: 10000
  });
  
  const storyIds = response.data.slice(0, 25);
  const stories = [];
  
  for (const id of storyIds) {
    try {
      const story = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
        timeout: 5000
      });
      if (story.data && story.data.title) {
        stories.push(story.data);
      }
    } catch (e) {
      // Skip failed stories
    }
  }
  
  return stories
    .filter(s => s && s.title && s.url)
    .map(s => ({
      name: s.title,
      tagline: (() => { try { return new URL(s.url).hostname } catch { return 'Hacker News' } })(),
      url: s.url,
      votes: s.score || 0,
      source: 'Hacker News',
      scrapedAt: new Date().toISOString()
    }));
}

module.exports = { scrapeHackerNews };