const fs = require('fs');
const path = require('path');

const scrapers = [
  { name: 'Product Hunt', fn: () => require('./producthunt').scrapeProductHunt() },
  { name: 'Hacker News', fn: () => require('./hackernews').scrapeHackerNews() },
  { name: 'GitHub Trending', fn: () => require('./github').scrapeGitHubTrending() },
  { name: 'Reddit', fn: () => require('./reddit').scrapeReddit() },
  { name: 'Dev.to', fn: () => require('./devto').scrapeDevTo() },
  { name: 'BetaList', fn: () => require('./betalist').scrapeBetaList() },
  { name: 'Indie Hackers', fn: () => require('./indiehackers').scrapeIndieHackers() },
  { name: 'Launching Next', fn: () => require('./launchingnext').scrapeLaunchingNext() },
  { name: 'AlternativeTo', fn: () => require('./alternativeto').scrapeAlternativeTo() },
  { name: 'HN New', fn: () => require('./hackernews-new').scrapeHackerNewsNew() },
  { name: 'TechCrunch', fn: () => require('./techcrunch').scrapeTechCrunch() },
  { name: 'SaaSHub', fn: () => require('./saashub').scrapeSaaSHub() },
  { name: 'F6S', fn: () => require('./f6s').scrapeF6S() },
  { name: 'WIP', fn: () => require('./wip').scrapeWIP() },
  { name: 'Makers', fn: () => require('./makers').scrapeMakers() },
];

const DATA_FILE = path.join(__dirname, '..', 'data', 'discoveries.json');

async function runScrapers() {
  console.log('Starting web discovery scan...\n');
  
  const allItems = [];
  
  for (const scraper of scrapers) {
    try {
      const items = await scraper.fn();
      if (Array.isArray(items) && items.length > 0) {
        allItems.push(...items);
        console.log(`✓ ${scraper.name}: ${items.length} items`);
      } else {
        console.log(`○ ${scraper.name}: 0 items`);
      }
    } catch (error) {
      console.log(`✗ ${scraper.name}: ${error.message}`);
    }
  }
  
  console.log(`\nTotal scraped: ${allItems.length} items`);
  
  let existing = [];
  if (fs.existsSync(DATA_FILE)) {
    try {
      existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (e) {
      existing = [];
    }
  }
  
  const existingUrls = new Set(existing.map(i => i.url));
  const newItems = allItems.filter(i => i.url && !existingUrls.has(i.url));
  
  const combined = [...newItems, ...existing].slice(0, 2000);
  
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(combined, null, 2));
  
  console.log(`\nNew items added: ${newItems.length}`);
  console.log(`Total in database: ${combined.length}`);
  console.log('\nDone!');
}

runScrapers().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});