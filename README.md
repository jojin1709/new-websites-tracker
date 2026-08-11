# Web Discovery Bot 🚀

Automated bot that scrapes new websites, tools, and companies from multiple sources daily.

## Features

- **Multi-Source Scraping**: Product Hunt, Hacker News, GitHub Trending
- **Daily Automation**: GitHub Actions runs daily
- **Beautiful Dashboard**: Next.js frontend with animations
- **Search & Filter**: Find exactly what you're looking for

## Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Run scraper: `npm run scrape`
4. Start dev server: `npm run dev`

## Deployment

### Vercel
1. Push to GitHub
2. Import in Vercel
3. Deploy

### GitHub Actions
The workflow runs daily at 8 AM UTC automatically.

## Tech Stack

- **Scraper**: Node.js + Axios + Cheerio
- **Frontend**: Next.js + CSS Modules
- **Automation**: GitHub Actions
- **Deployment**: Vercel