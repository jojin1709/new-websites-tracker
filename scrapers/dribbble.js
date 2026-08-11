const axios = require('axios');

async function scrapeDribbble() {
  try {
    const response = await axios.get('https://dribbble.com/shots/popular', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const shots = [];
    const regex = /href="\/shots\/(\d+)-[^"]+"/g;
    let match;
    while ((match = regex.exec(response.data)) !== null) {
      shots.push({
        name: `Shot #${match[1]}`,
        tagline: 'Dribbble design',
        url: `https://dribbble.com/shots/${match[1]}`,
        votes: 0,
        source: 'Dribbble',
        scrapedAt: new Date().toISOString()
      });
    }
    return [...new Map(shots.map(s => [s.url, s])).values()].slice(0, 15);
  } catch (e) { return []; }
}

module.exports = { scrapeDribbble };