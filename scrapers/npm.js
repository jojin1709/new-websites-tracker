const axios = require('axios');

async function scrapeNpmWeekly() {
  try {
    const response = await axios.get('https://api.npmjs.org/downloads/point/last-week', { timeout: 10000 });
    const packages = Object.keys(response.data).slice(0, 20);
    return packages.map(pkg => ({
      name: pkg,
      tagline: 'npm package',
      url: `https://www.npmjs.com/package/${pkg}`,
      votes: response.data[pkg] || 0,
      source: 'npm Weekly',
      scrapedAt: new Date().toISOString()
    }));
  } catch (e) { return []; }
}

module.exports = { scrapeNpmWeekly };