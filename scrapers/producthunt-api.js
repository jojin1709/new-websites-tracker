const axios = require('axios');

async function scrapePhocktail() {
  try {
    const response = await axios.get('https://api.producthunt.com/v2/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {
        query: `{
          posts(order: VOTES, postedAfter: "${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}") {
            edges {
              node {
                name
                tagline
                url
                votesCount
                createdAt
              }
            }
          }
        }`
      },
      timeout: 10000
    });
    
    if (response.data?.data?.posts?.edges) {
      return response.data.data.posts.edges.map(e => ({
        name: e.node.name,
        tagline: e.node.tagline || 'Product Hunt',
        url: e.node.url,
        votes: e.node.votesCount || 0,
        source: 'Product Hunt API',
        scrapedAt: new Date().toISOString()
      }));
    }
    return [];
  } catch (e) {
    console.error('PH API error:', e.message);
    return [];
  }
}

module.exports = { scrapePhocktail };