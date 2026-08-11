import Head from 'next/head';
import Link from 'next/link';
import { Icons } from '../components/Icons';

export default function Terms() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Terms of Service - LaunchRadar</title>
        <meta name="description" content="Terms of Service for LaunchRadar" />
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
            <span className="text-gradient">Terms of Service</span>
          </h1>
          
          <div className="prose prose-invert max-w-none text-white/60">
            <p className="mb-6">Last updated: August 12, 2026</p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using LaunchRadar, you agree to be bound by these Terms of Service. If you do not agree, do not use the service.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. Description of Service</h2>
            <p className="mb-4">
              LaunchRadar is a discovery platform that aggregates publicly available information from various sources. We display links to third-party websites and tools.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Intellectual Property</h2>
            <p className="mb-4">
              All content on LaunchRadar, including design, code, and branding, is the intellectual property of Jojin John and is protected by applicable laws.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Prohibited Uses</h2>
            <p className="mb-4">You may not:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Copy, modify, or distribute our code without permission</li>
              <li>Use automated tools to scrape our website</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use our service for any unlawful purpose</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Disclaimer</h2>
            <p className="mb-4">
              LaunchRadar is provided &quot;as is&quot; without warranties of any kind. We are not responsible for the content of third-party websites linked on our platform.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">6. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall LaunchRadar be liable for any indirect, incidental, special, or consequential damages arising out of your use of the service.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">7. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">8. Contact</h2>
            <p className="mb-4">
              For questions about these Terms, contact us via{' '}
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