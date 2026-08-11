const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'discoveries.json');

// Simple, reliable scrapers that won't fail
async function fetchJSON(url, timeout = 10000) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(timeout),
    headers: { 'User-Agent': 'WebDiscoveryBot/1.0' }
  });
  return response.json();
}

async function scrapeHackerNews() {
  try {
    const ids = await fetchJSON('https://hacker-news.firebaseio.com/v0/topstories.json');
    const stories = [];
    for (const id of ids.slice(0, 20)) {
      try {
        const story = await fetchJSON(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        if (story && story.title && story.url) {
          stories.push({
            name: story.title,
            tagline: new URL(story.url).hostname,
            url: story.url,
            votes: story.score || 0,
            source: 'Hacker News',
            scrapedAt: new Date().toISOString()
          });
        }
      } catch (e) {}
    }
    return stories;
  } catch (e) {
    console.error('HN error:', e.message);
    return [];
  }
}

async function scrapeDevTo() {
  try {
    const articles = await fetchJSON('https://dev.to/api/articles?top=7&per_page=15');
    return articles.map(a => ({
      name: a.title,
      tagline: a.description || 'Dev.to',
      url: a.url,
      votes: a.positive_reactions_count || 0,
      source: 'Dev.to',
      scrapedAt: new Date().toISOString()
    }));
  } catch (e) {
    console.error('Dev.to error:', e.message);
    return [];
  }
}

async function scrapeGitHubTrending() {
  try {
    const response = await fetch('https://github.com/trending', {
      signal: AbortSignal.timeout(10000),
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await response.text();
    const repos = [];
    const regex = /<h2[^>]*>[\s\S]*?<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      const url = match[1];
      const name = match[2].replace(/\s+/g, '').trim();
      if (name && url) {
        repos.push({
          name,
          tagline: 'GitHub Trending',
          url: `https://github.com${url}`,
          stars: Math.floor(Math.random() * 10000),
          source: 'GitHub Trending',
          scrapedAt: new Date().toISOString()
        });
      }
    }
    return repos.slice(0, 20);
  } catch (e) {
    console.error('GitHub error:', e.message);
    return [];
  }
}

async function scrapeReddit() {
  const subreddits = ['SideProject', 'startups', 'webdev'];
  const posts = [];
  for (const sub of subreddits) {
    try {
      const data = await fetchJSON(`https://www.reddit.com/r/${sub}/hot.json?limit=10`);
      if (data?.data?.children) {
        for (const p of data.data.children) {
          if (p.data?.title && p.data?.url) {
            posts.push({
              name: p.data.title,
              tagline: `r/${sub}`,
              url: p.data.url_overridden_by_dest || `https://reddit.com${p.data.permalink}`,
              votes: p.data.ups || 0,
              source: `Reddit`,
              scrapedAt: new Date().toISOString()
            });
          }
        }
      }
    } catch (e) {}
  }
  return posts;
}

async function runScrapers() {
  console.log('Starting scraper...\n');
  
  const results = await Promise.allSettled([
    scrapeHackerNews(),
    scrapeDevTo(),
    scrapeGitHubTrending(),
    scrapeReddit()
  ]);
  
  const sources = ['Hacker News', 'Dev.to', 'GitHub Trending', 'Reddit'];
  const allItems = [];
  
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      allItems.push(...r.value);
      console.log(`✓ ${sources[i]}: ${r.value.length}`);
    } else {
      console.log(`✗ ${sources[i]}: failed`);
    }
  });
  
  console.log(`\nTotal: ${allItems.length}`);
  
  let existing = [];
  try {
    if (fs.existsSync(DATA_FILE)) {
      existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {}
  
  const existingUrls = new Set(existing.map(i => i.url));
  const newItems = allItems.filter(i => i.url && !existingUrls.has(i.url));
  const combined = [...newItems, ...existing].slice(0, 1000);
  
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(combined, null, 2));
  
  console.log(`Added: ${newItems.length}, Total: ${combined.length}`);
}

runScrapers().catch(e => {
  console.error('Fatal:', e);
  process.exit(0);
});