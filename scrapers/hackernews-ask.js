const axios = require('axios');

async function scrapeHackerNewsAsk() {
  try {
    const ids = await axios.get('https://hacker-news.firebaseio.com/v0/askstories.json', {
      timeout: 10000
    });
    const stories = [];
    for (const id of ids.data.slice(0, 15)) {
      try {
        const story = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
          timeout: 5000
        });
        if (story.data && story.data.title) {
          stories.push({
            name: story.data.title,
            tagline: story.data.text ? story.data.text.slice(0, 100) : 'HN Ask',
            url: story.data.url || `https://news.ycombinator.com/item?id=${story.data.id}`,
            votes: story.data.score || 0,
            source: 'HN Ask',
            scrapedAt: new Date().toISOString()
          });
        }
      } catch (e) {}
    }
    return stories;
  } catch (e) { return []; }
}

module.exports = { scrapeHackerNewsAsk };