const axios = require('axios');

async function scrapeHuggingFace() {
  try {
    const response = await axios.get('https://huggingface.co/api/models', {
      params: { sort: 'likes', direction: -1, limit: 20 },
      timeout: 10000
    });
    if (Array.isArray(response.data)) {
      return response.data.map(m => ({
        name: m.id || m.modelId,
        tagline: m.pipeline_tag || 'AI Model',
        url: `https://huggingface.co/${m.id || m.modelId}`,
        votes: m.likes || 0,
        source: 'Hugging Face',
        scrapedAt: new Date().toISOString()
      }));
    }
    return [];
  } catch (e) { return []; }
}

module.exports = { scrapeHuggingFace };