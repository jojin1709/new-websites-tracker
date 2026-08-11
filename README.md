> [!NOTE]
> **Web Discovery Bot** automatically scrapes new websites, tools, and companies launching every day.

<div align="center">

# Web Discovery Bot

Automated bot that discovers the latest websites, tools, and companies from multiple sources — every single day.

**This repository contains the full scraper agent and dashboard, deployable to Vercel with one click.**

---

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import)

</div>

---

## Table of Contents

- [What is Web Discovery Bot?](#what-is-web-discovery-bot)
- [Demo](#demo)
- [Quick Start](#quick-start)
- [Key Capabilities](#key-capabilities)
- [Data Sources](#data-sources)
- [Architecture](#architecture)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Tech Stack](#tech-stack)
- [Limitations](#limitations)
- [License](#license)
- [Developer](#developer)
- [Community and Support](#community-and-support)

## What is Web Discovery Bot?

Web Discovery Bot is an automated discovery engine that scans multiple platforms daily to find new websites, tools, startups, and open-source projects.

It aggregates data from **Product Hunt**, **Hacker News**, and **GitHub Trending**, then presents everything in a beautiful, searchable dashboard — so you never miss what's new on the internet.

### Why This Exists

New tools, websites, and companies launch every day. It's impossible to keep track of everything manually. Web Discovery Bot closes that gap by automatically scanning the best sources of new tech and delivering a curated feed of discoveries — updated daily.

## Demo

<p align="center">
  <img src="https://via.placeholder.com/800x400/0f0f23/6366f1?text=Web+Discovery+Bot+Dashboard" alt="Dashboard Preview" width="100%">
</p>

**Live Demo:** [new-websites-tracker.vercel.app](https://new-websites-tracker.vercel.app/)

## Quick Start

### Prerequisites

- **Node.js 18+** or **npm**
- **Git**

### Run Locally

```bash
# Clone the repository
git clone https://github.com/jojin1709/new-websites-tracker.git
cd new-websites-tracker

# Install dependencies
npm install

# Run the scrapers
npm run scrape

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

> [!TIP]
> The scraper stores results in `data/discoveries.json`. Run `npm run scrape` periodically to fetch fresh discoveries.

## Key Capabilities

- **Multi-Source Scraping** — Aggregates data from Product Hunt, Hacker News, and GitHub Trending in a single run.
- **Daily Automation** — GitHub Actions workflow runs every day at 8 AM UTC, no manual intervention needed.
- **Beautiful Dashboard** — Next.js frontend with smooth CSS animations, gradient themes, and responsive design.
- **Search & Filter** — Instantly search across all discoveries or filter by source.
- **Auto-Deploy** — Push to GitHub and Vercel auto-deploys the latest version.
- **Resumable Data** — New scrapes append to existing data without overwriting previous discoveries.

## Data Sources

| Source | What It Tracks | Update Frequency |
| --- | --- | --- |
| **Product Hunt** | New products, tools, and startups | Daily |
| **Hacker News** | Trending tech posts, launches, and discussions | Daily |
| **GitHub Trending** | Trending repositories and new open-source projects | Daily |

## Architecture

```text
┌─────────────────────────────────────┐
│       GitHub Actions (Cron)         │
│     Runs daily at 8 AM UTC          │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│         Scraper Engine              │
│  ┌───────────┐ ┌─────────────────┐  │
│  │ Product   │ │   Hacker News   │  │
│  │ Hunt      │ │   API           │  │
│  └─────┬─────┘ └───────┬─────────┘  │
│        │               │            │
│  ┌─────┴─────┐ ┌───────┴─────────┐  │
│  │  GitHub   │ │   Data Storage  │  │
│  │ Trending  │ │   (JSON)        │  │
│  └─────┬─────┘ └───────┬─────────┘  │
│        │               │            │
└────────┼───────────────┼────────────┘
         │               │
         ▼               ▼
┌─────────────────────────────────────┐
│      Vercel Dashboard (Next.js)     │
│   Search · Filter · Responsive UI   │
└─────────────────────────────────────┘
```

**How it works:**

- **GitHub Actions** triggers the scraper on a daily cron schedule.
- **Scraper modules** fetch data from each source using HTTP requests and parse HTML/JSON.
- **Data storage** combines new results with existing discoveries in a local JSON file.
- **Vercel dashboard** reads the data and displays it in a searchable, filterable UI.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository.
4. Click **Deploy**.
5. Done! Your dashboard is live.

> [!TIP]
> Vercel automatically redeploys every time you push to `main`.

### GitHub Actions

1. Go to your repo → **Actions** tab.
2. Click **"I understand my workflows, go ahead and enable them"**.
3. The workflow runs daily at 8 AM UTC automatically.
4. To run manually: **Actions** → **Daily Web Discovery** → **Run workflow**.

## Configuration

### Environment Variables

No environment variables are required for basic usage. The scrapers use public APIs.

### Customizing Sources

Edit the scraper files in `/scrapers` to add or remove data sources:

| File | Source |
| --- | --- |
| `scrapers/producthunt.js` | Product Hunt |
| `scrapers/hackernews.js` | Hacker News |
| `scrapers/github.js` | GitHub Trending |
| `scrapers/run.js` | Main runner (combines all sources) |

### Changing Schedule

Edit `.github/workflows/daily-scrape.yml` to change the cron schedule:

```yaml
schedule:
  - cron: '0 8 * * *'  # Default: every day at 8 AM UTC
```

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Scraper** | Node.js, Axios, Cheerio |
| **Frontend** | Next.js 14, React 18, CSS Modules |
| **Styling** | Custom CSS with gradients and animations |
| **Automation** | GitHub Actions |
| **Hosting** | Vercel |

## Limitations

- Scraping depends on public APIs and page structure — changes may break scrapers.
- Product Hunt scraping may be limited without an API key.
- Data is stored locally in JSON — no database for persistence across deployments.
- Rate limits may apply on some APIs during heavy usage.

## License

This project is open source and available under the [MIT License](LICENSE).

## Developer

<p align="center">
  <b>Developed by <a href="https://github.com/jojin1709">JOJIN JOHN</a></b>
</p>

## Community and Support

- [GitHub Issues](https://github.com/jojin1709/new-websites-tracker/issues) — Report bugs or request features
- [GitHub](https://github.com/jojin1709/new-websites-tracker) — Source code

---

<p align="center">
  <b>Built with passion by <a href="https://github.com/jojin1709">JOJIN JOHN</a></b>
</p>