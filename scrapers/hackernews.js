const axios = require('axios');

async function scrapeHackerNews() {
  try {
    const topStories = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = topStories.data.slice(0, 30);
    
    const stories = await Promise.all(
      storyIds.map(async (id) => {
        const story = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return story.data;
      })
    );
    
    return stories
      .filter(s => s && s.title)
      .map(s => ({
        name: s.title,
        tagline: s.url ? new URL(s.url).hostname : 'Hacker News',
        url: s.url || `https://news.ycombinator.com/item?id=${s.id}`,
        votes: s.score || 0,
        source: 'Hacker News',
        comments: s.descendants || 0,
        scrapedAt: new Date().toISOString()
      }));
  } catch (error) {
    console.error('Error scraping Hacker News:', error.message);
    return [];
  }
}

module.exports = { scrapeHackerNews };