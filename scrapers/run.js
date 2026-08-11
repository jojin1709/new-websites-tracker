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
const { scrapeSaaSHub } = require('./saashub');
const { scrapeF6S } = require('./f6s');
const { scrapeWIP } = require('./wip');
const { scrapeMakers } = require('./makers');

const DATA_FILE = path.join(__dirname, '..', 'data', 'discoveries.json');

async function runScrapers() {
  console.log('Starting web discovery scan...\n');
  
  const scrapers = [
    { name: 'Product Hunt', fn: scrapeProductHunt },
    { name: 'Hacker News', fn: scrapeHackerNews },
    { name: 'GitHub Trending', fn: scrapeGitHubTrending },
    { name: 'Reddit', fn: scrapeReddit },
    { name: 'Dev.to', fn: scrapeDevTo },
    { name: 'BetaList', fn: scrapeBetaList },
    { name: 'Indie Hackers', fn: scrapeIndieHackers },
    { name: 'Launching Next', fn: scrapeLaunchingNext },
    { name: 'AlternativeTo', fn: scrapeAlternativeTo },
    { name: 'HN New', fn: scrapeHackerNewsNew },
    { name: 'PH Topics', fn: scrapeProductHuntTopics },
    { name: 'TechCrunch', fn: scrapeTechCrunch },
    { name: 'SaaSHub', fn: scrapeSaaSHub },
    { name: 'F6S', fn: scrapeF6S },
    { name: 'WIP', fn: scrapeWIP },
    { name: 'Makers', fn: scrapeMakers }
  ];
  
  const results = await Promise.allSettled(
    scrapers.map(s => s.fn())
  );
  
  const allItems = [];
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && Array.isArray(result.value)) {
      allItems.push(...result.value);
      console.log(`✓ ${scrapers[index].name}: ${result.value.length} items`);
    } else {
      console.log(`✗ ${scrapers[index].name}: failed`);
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
  const newItems = allItems.filter(i => i.url && !existingUrls.has(i.url));
  
  const combined = [...newItems, ...existing].slice(0, 2000);
  
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(combined, null, 2));
  
  console.log(`\nNew items added: ${newItems.length}`);
  console.log(`Total in database: ${combined.length}`);
  console.log('\nDone!');
}

runScrapers().catch(console.error);