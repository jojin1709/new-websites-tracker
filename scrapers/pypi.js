const axios = require('axios');

async function scrapePyPI() {
  try {
    const response = await axios.get('https://hugovk.github.io/top-pypi-packages/top-pypi-packages-30-days.min.json', {
      timeout: 10000
    });
    if (response.data?.rows) {
      return response.data.rows.slice(0, 20).map(r => ({
        name: r.project,
        tagline: 'PyPI package',
        url: `https://pypi.org/project/${r.project}/`,
        votes: r.download_count || 0,
        source: 'PyPI',
        scrapedAt: new Date().toISOString()
      }));
    }
    return [];
  } catch (e) { return []; }
}

module.exports = { scrapePyPI };