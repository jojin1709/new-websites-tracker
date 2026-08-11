const fs = require('fs');
const path = require('path');

const { scrapeProductHunt } = require('./producthunt');
const { scrapeHackerNews } = require('./hackernews');
const { scrapeGitHubTrending } = require('./github');
const { scrapeReddit } = require('./reddit');
const { scrapeDevTo } = require('./devto');
const { scrapeBetaList } = require('./betalist');
const { scrapeIndieHackers } = require('./indiehackers');
const { scrapeLaunchingNext } = require('./launchingnext');
const { scrapeAlternativeTo } = require('./alternativeto');
const { scrapeHackerNewsNew } = require('./hackernews-new');
const { scrapeProductHuntTopics } = require('./producthunt-topics');
const { scrapeTechCrunch } = require('./techcrunch');

const DATA_FILE = path.join(__dirname, '..', 'data', 'discoveries.json');

async function runScrapers() {
  console.log('Starting web discovery scan...');
  console.log('Running all scrapers...\n');
  
  const results = await Promise.allSettled([
    scrapeProductHunt(),
    scrapeHackerNews(),
    scrapeGitHubTrending(),
    scrapeReddit(),
    scrapeDevTo(),
    scrapeBetaList(),
    scrapeIndieHackers(),
    scrapeLaunchingNext(),
    scrapeAlternativeTo(),
    scrapeHackerNewsNew(),
    scrapeProductHuntTopics(),
    scrapeTechCrunch()
  ]);
  
  const sources = [
    'Product Hunt', 'Hacker News', 'GitHub Trending', 
    'Reddit', 'Dev.to', 'BetaList', 'Indie Hackers',
    'Launching Next', 'AlternativeTo', 'HN New', 
    'PH Topics', 'TechCrunch'
  ];
  
  const allItems = [];
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && Array.isArray(result.value)) {
      allItems.push(...result.value);
      console.log(`✓ ${sources[index]}: ${result.value.length} items`);
    } else {
      console.log(`✗ ${sources[index]}: failed`);
    }
  });
  
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
  const newItems = allItems.filter(i => !existingUrls.has(i.url));
  
  const combined = [...newItems, ...existing].slice(0, 1000);
  
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(combined, null, 2));
  
  console.log(`\nNew items added: ${newItems.length}`);
  console.log(`Total in database: ${combined.length}`);
  console.log('Done!');
}

runScrapers().catch(console.error);