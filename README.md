> [!NOTE]
> **LaunchRadar** - Your daily radar for new websites, tools, and startups.

<div align="center">

# ◉ LaunchRadar

Automated bot that discovers the latest websites, tools, and companies launching every day.

**Live Website:** [new-websites-tracker.vercel.app](https://new-websites-tracker.vercel.app/)

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

## Features

- **Automated Daily Scraping** - GitHub Actions runs every day
- **Multiple Sources** - 4 data sources aggregated
- **Search & Filter** - Find exactly what you're looking for
- **Modern UI** - Tailwind CSS with smooth animations
- **Click to Visit** - Every discovery links to the actual website

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

## Tech Stack

| Layer | Technology |
|-------|------------|
| Scraping | Node.js, Fetch API |
| Frontend | Next.js 14, React 18 |
| Styling | Tailwind CSS v4 |
| Automation | GitHub Actions |
| Hosting | Vercel |

## License

This project is licensed under the **GNU Affero General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

**⚠️ Important:** You may not copy, modify, or distribute this code without permission. See license for full terms.

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating in this project.

## Contributing

Contributions are welcome! Please read the contributing guidelines first.

## Security

If you discover a security vulnerability, please report it responsibly. Do not open public issues for security vulnerabilities.

## Developer

**Built by [Jojin John](https://github.com/jojin1709)**

---

<p align="center">
  <b>Made with passion by <a href="https://github.com/jojin1709">Jojin John</a></b>
</p>