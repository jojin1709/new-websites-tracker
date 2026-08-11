import Head from 'next/head';
import Link from 'next/link';
import { Icons } from '../components/Icons';

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Privacy Policy - LaunchRadar</title>
        <meta name="description" content="Privacy Policy for LaunchRadar" />
      </Head>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 bg-dark-900/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold font-display text-white">
          <span className="text-accent-primary"><Icons.Logo /></span>
          LaunchRadar
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link>
          <Link href="/discoveries" className="text-sm text-white/60 hover:text-white transition-colors">Discoveries</Link>
          <Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors">About</Link>
        </div>
      </nav>

      <main className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-8">
            <span className="text-gradient">Privacy Policy</span>
          </h1>
          
          <div className="prose prose-invert max-w-none text-white/60">
            <p className="mb-6">Last updated: August 12, 2026</p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              LaunchRadar is a public website that displays publicly available information from various sources. We do not collect personal information from users.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. How We Use Information</h2>
            <p className="mb-4">
              The information displayed on LaunchRadar is aggregated from public sources including Hacker News, Dev.to, GitHub, and Reddit. We do not use this information for any purpose other than displaying it on our dashboard.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Third-Party Services</h2>
            <p className="mb-4">
              We use Vercel for hosting. Vercel may collect anonymous usage data. We do not have access to this data.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Cookies</h2>
            <p className="mb-4">
              LaunchRadar does not use cookies or tracking technologies.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Data Security</h2>
            <p className="mb-4">
              We do not store any personal data. The data displayed on LaunchRadar is publicly available information.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">6. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this privacy policy from time to time. Any changes will be posted on this page.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">7. Contact</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy, please contact us via{' '}
              <a href="https://github.com/jojin1709/new-websites-tracker" className="text-accent-primary hover:underline" target="_blank" rel="noopener noreferrer">
                GitHub
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