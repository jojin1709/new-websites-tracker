const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'discoveries.json');

const scrapers = [
  // APIs (most reliable)
  { name: 'Hacker News', fn: () => require('./hackernews').scrapeHackerNews() },
  { name: 'HN Best', fn: () => require('./hackernews-best').scrapeHackerNewsBest() },
  { name: 'HN Show', fn: () => require('./hackernews-show').scrapeHackerNewsShow() },
  { name: 'HN Ask', fn: () => require('./hackernews-ask').scrapeHackerNewsAsk() },
  { name: 'Dev.to', fn: () => require('./devto').scrapeDevTo() },
  { name: 'Dev.to Rising', fn: () => require('./devto-recent').scrapeDevToRecent() },
  { name: 'GitHub Trending', fn: () => require('./github').scrapeGitHubTrending() },
  { name: 'GitHub Daily', fn: () => require('./github-daily').scrapeGitHubTrendingDaily() },
  { name: 'GitHub New', fn: () => require('./github-api').scrapeGitHubRepos() },
  { name: 'GitHub Explore', fn: () => require('./github-explore').scrapeGitHubExplore() },
  { name: 'Reddit', fn: () => require('./reddit').scrapeReddit() },
  { name: 'Reddit Programming', fn: () => require('./reddit-programming').scrapeRedditProgramming() },
  { name: 'Reddit JavaScript', fn: () => require('./reddit-javascript').scrapeRedditJavaScript() },
  { name: 'Reddit Python', fn: () => require('./reddit-python').scrapeRedditPython() },
  { name: 'Reddit ML', fn: () => require('./reddit-ml').scrapeRedditMachineLearning() },
  { name: 'Reddit WebDev', fn: () => require('./reddit-webdev').scrapeRedditWebDev() },
  { name: 'Lobste.rs', fn: () => require('./lobsters').scrapeLobsters() },
  { name: 'Papers With Code', fn: () => require('./paperswithcode').scrapePapersWithCode() },
  { name: 'Hugging Face', fn: () => require('./huggingface').scrapeHuggingFace() },
  { name: 'PyPI', fn: () => require('./pypi').scrapePyPI() },
  { name: 'npm Weekly', fn: () => require('./npm').scrapeNpmWeekly() },
  { name: 'RubyGems', fn: () => require('./rubygems').scrapeRubyGems() },
  
  // RSS Feeds
  { name: 'TechCrunch RSS', fn: () => require('./techcrunch-rss').scrapeTechCrunchRSS() },
  { name: 'Ars Technica', fn: () => require('./arstechnica').scrapeArsTechnica() },
  { name: 'The Verge', fn: () => require('./theverge').scrapeTheVerge() },
  { name: 'Wired', fn: () => require('./wired').scrapeWired() },
  { name: 'Mashable', fn: () => require('./mashable').scrapeMashable() },
  { name: 'VentureBeat', fn: () => require('./venturebeat').scrapeVentureBeat() },
  { name: 'Engadget', fn: () => require('./engadget').scrapeEngadget() },
  { name: 'TechRadar', fn: () => require('./techradar').scrapeTechRadar() },
  { name: 'ReadWrite', fn: () => require('./readwrite').scrapeReadwrite() },
  { name: 'Phoronix', fn: () => require('./phoronix').scrapePhoronix() },
  { name: 'LWN', fn: () => require('./lwn').scrapeLWN() },
  { name: 'Smashing Mag', fn: () => require('./smashingmag').scrapeSmashingMag() },
  { name: 'CSS Tricks', fn: () => require('./csstricks').scrapeCSSTricks() },
  { name: 'Codrops', fn: () => require('./codrops').scrapeCodrops() },
  { name: 'Indie Hackers RSS', fn: () => require('./indiehackers-rss').scrapeIndieHackersRSS() },
  { name: 'Hashnode', fn: () => require('./hashnode').scrapeHashnode() },
  { name: 'AI News', fn: () => require('./ainews').scrapeAINews() },
  
  // HTML Scraping
  { name: 'Product Hunt RSS', fn: () => require('./producthunt-rss').scrapeProductHuntRSS() },
  { name: 'Dribbble', fn: () => require('./dribbble').scrapeDribbble() },
  { name: 'Behance', fn: () => require('./behance').scrapeBehance() },
  { name: 'CodePen', fn: () => require('./codepen').scrapeCodePen() },
  { name: 'StackShare', fn: () => require('./stackshare').scrapeStackShare() },
  { name: 'BetaPage', fn: () => require('./betapage').scrapeBetaPage() },
  { name: 'Killer Startups', fn: () => require('./killerstartups').scrapeKillercoding() },
  { name: 'Startup Stash', fn: () => require('./startupstash').scrapeStartupStash() },
  { name: 'Wellfound', fn: () => require('./wellfound').scrapeWellfound() },
  { name: 'AngelList', fn: () => require('./angellist').scrapeAngelList() },
  { name: 'DevHunt', fn: () => require('./devhunt').scrapeDevhunt() },
  { name: 'GitLab', fn: () => require('./gitlab').scrapeGitLabTrending() },
  { name: 'Tildes', fn: () => require('./tildes').scrapeTildes() },
  { name: 'Substack', fn: () => require('./substack').scrapeSubstack() },
];

async function runScrapers() {
  console.log(`Starting scraper with ${scrapers.length} sources...\n`);
  
  const allItems = [];
  
  for (const scraper of scrapers) {
    try {
      const items = await scraper.fn();
      if (Array.isArray(items) && items.length > 0) {
        allItems.push(...items);
        console.log(`✓ ${scraper.name}: ${items.length}`);
      } else {
        console.log(`○ ${scraper.name}: 0`);
      }
    } catch (error) {
      console.log(`✗ ${scraper.name}: ${error.message}`);
    }
  }
  
  console.log(`\nTotal: ${allItems.length}`);
  
  let existing = [];
  try {
    if (fs.existsSync(DATA_FILE)) {
      existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {}
  
  const existingUrls = new Set(existing.map(i => i.url));
  const newItems = allItems.filter(i => i.url && !existingUrls.has(i.url));
  const combined = [...newItems, ...existing].slice(0, 5000);
  
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(combined, null, 2));
  
  console.log(`Added: ${newItems.length}, Total: ${combined.length}`);
}

runScrapers().catch(e => {
  console.error('Fatal:', e);
  process.exit(0);
});