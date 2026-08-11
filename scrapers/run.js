const fs = require('fs');
const path = require('path');
const { scrapeProductHunt } = require('./producthunt');
const { scrapeHackerNews } = require('./hackernews');
const { scrapeGitHubTrending } = require('./github');

const DATA_FILE = path.join(__dirname, '..', 'data', 'discoveries.json');

async function runScrapers() {
  console.log('Starting web discovery scan...');
  
  const [producthunt, hackernews, github] = await Promise.all([
    scrapeProductHunt(),
    scrapeHackerNews(),
    scrapeGitHubTrending()
  ]);
  
  const allItems = [...producthunt, ...hackernews, ...github];
  
  let existing = [];
  if (fs.existsSync(DATA_FILE)) {
    existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  
  const combined = [...allItems, ...existing].slice(0, 500);
  
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(combined, null, 2));
  
  console.log(`Scraped ${allItems.length} items total`);
  console.log(`Product Hunt: ${producthunt.length}`);
  console.log(`Hacker News: ${hackernews.length}`);
  console.log(`GitHub Trending: ${github.length}`);
}

runScrapers().catch(console.error);