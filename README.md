> [!NOTE]
> **LaunchRadar** - Your daily radar for new websites, tools, and startups.

<div align="center">

# ◉ LaunchRadar

Automated bot that discovers the latest websites, tools, and companies launching every day.

**Live Demo:** [new-websites-tracker.vercel.app](https://new-websites-tracker.vercel.app/)

---

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import)

</div>

---

## What is LaunchRadar?

LaunchRadar scans multiple platforms daily to find new websites, tools, startups, and open-source projects. Everything is aggregated into one clean, searchable dashboard.

### Data Sources

| Source | What It Tracks |
|--------|----------------|
| **Hacker News** | Trending tech stories and launches |
| **Dev.to** | Tech articles and tutorials |
| **GitHub Trending** | Trending repositories |
| **Reddit** | r/SideProject, r/startups, r/webdev |

## Quick Start

### Run Locally

```bash
git clone https://github.com/jojin1709/new-websites-tracker.git
cd new-websites-tracker
npm install
npm run scrape    # Fetch latest discoveries
npm run dev       # Start dashboard
```

Open [http://localhost:3000](http://localhost:3000)

### Deploy to Vercel

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Click Deploy

## How It Works

```text
┌─────────────────────────────┐
│   GitHub Actions (Cron)     │
│   Runs daily at 8 AM UTC    │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      Scraper Engine         │
│  ┌─────────┐ ┌───────────┐  │
│  │   HN    │ │  Dev.to   │  │
│  └────┬────┘ └─────┬─────┘  │
│       │            │        │
│  ┌────┴────┐ ┌─────┴─────┐  │
│  │ GitHub  │ │  Reddit   │  │
│  └────┬────┘ └─────┬─────┘  │
└───────┼────────────┼────────┘
        │            │
        ▼            ▼
┌─────────────────────────────┐
│   Vercel Dashboard          │
│   Search · Filter · Browse  │
└─────────────────────────────┘
```

## Features

- **Automated Daily Scraping** - GitHub Actions runs every day
- **Multiple Sources** - 4 data sources aggregated
- **Search & Filter** - Find exactly what you're looking for
- **Modern UI** - Tailwind CSS with smooth animations
- **Click to Visit** - Every discovery links to the actual website

## Tech Stack

| Layer | Technology |
|-------|------------|
| Scraping | Node.js, Fetch API |
| Frontend | Next.js 14, React 18 |
| Styling | Tailwind CSS v4 |
| Automation | GitHub Actions |
| Hosting | Vercel |

## Project Structure

```
├── .github/workflows/    # GitHub Actions
├── components/           # React components
├── data/                 # Scraped data (JSON)
├── pages/                # Next.js pages
├── scrapers/             # Scraper modules
├── styles/               # Global CSS
├── tailwind.config.js    # Tailwind config
└── postcss.config.js     # PostCSS config
```

## Developer

**Built by [Jojin John](https://github.com/jojin1709)**

---

<p align="center">
  <b>Made with passion by <a href="https://github.com/jojin1709">Jojin John</a></b>
</p>