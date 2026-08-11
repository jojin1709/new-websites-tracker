const axios = require('axios');

async function scrapeHackerNewsBest() {
  try {
    const ids = await axios.get('https://hacker-news.firebaseio.com/v0/beststories.json', {
      timeout: 10000
    });
    const stories = [];
    for (const id of ids.data.slice(0, 20)) {
      try {
        const story = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
          timeout: 5000
        });
        if (story.data && story.data.title && story.data.url) {
          stories.push({
            name: story.data.title,
            tagline: new URL(story.data.url).hostname,
            url: story.data.url,
            votes: story.data.score || 0,
            source: 'HN Best',
            scrapedAt: new Date().toISOString()
          });
        }
      } catch (e) {}
    }
    return stories;
  } catch (e) { return []; }
}

module.exports = { scrapeHackerNewsBest };