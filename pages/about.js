import Head from 'next/head';
import Link from 'next/link';
import { Icons } from '../components/Icons';

export default function About() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>About - LaunchRadar</title>
        <meta name="description" content="Learn about LaunchRadar - your daily radar for new websites, tools, and startups." />
      </Head>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 bg-dark-900/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold font-display text-white">
          <span className="text-accent-primary"><Icons.Logo /></span>
          LaunchRadar
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link>
          <Link href="/discoveries" className="text-sm text-white/60 hover:text-white transition-colors">Discoveries</Link>
          <Link href="/about" className="text-sm text-white hover:text-white transition-colors">About</Link>
        </div>
      </nav>

      <main className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-8">
            <span className="text-gradient">About LaunchRadar</span>
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-white/70 mb-6">
              LaunchRadar is an automated discovery engine that scans the internet daily to find new websites, tools, startups, and open-source projects.
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
            <p className="text-white/60 mb-6">
              The internet moves fast. New tools and websites launch every day, and it&apos;s impossible to keep track of everything manually. LaunchRadar closes that gap by automatically scanning the best sources of new tech and delivering a curated feed of discoveries.
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">How It Works</h2>
            <p className="text-white/60 mb-6">
              Every day, our automated scrapers scan multiple platforms including Hacker News, Dev.to, GitHub Trending, and Reddit. We collect all the new launches and trending tools, then present them in a clean, searchable dashboard.
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">Data Sources</h2>
            <ul className="text-white/60 space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-primary rounded-full" />
                Hacker News - Trending tech stories
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-secondary rounded-full" />
                Dev.to - Tech articles and tutorials
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-pink rounded-full" />
                GitHub Trending - Trending repositories
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-cyan rounded-full" />
                Reddit - Community discussions
              </li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">Built With</h2>
            <p className="text-white/60 mb-6">
              LaunchRadar is built with Next.js, Tailwind CSS, and deployed on Vercel. The scraping engine uses Node.js with the native Fetch API.
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4">Contact</h2>
            <p className="text-white/60 mb-6">
              Have questions or feedback? Reach out on{' '}
              <a href="https://github.com/jojin1709/new-websites-tracker" className="text-accent-primary hover:underline" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              {' '}or{' '}
              <a href="https://twitter.com/jojin1709" className="text-accent-primary hover:underline" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold font-display">
            <span className="text-accent-primary"><Icons.Logo /></span>
            LaunchRadar
          </div>
          <p className="text-sm text-white/40">
            Built by <a href="https://github.com/jojin1709" className="text-accent-primary hover:underline">Jojin John</a>
          </p>
        </div>
      </footer>
    </div>
  );
}