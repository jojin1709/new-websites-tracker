import Head from 'next/head';
import Link from 'next/link';
import { Icons } from '../components/Icons';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <Head>
        <title>404 - Page Not Found | LaunchRadar</title>
      </Head>

      <div className="text-center">
        <div className="text-9xl font-bold font-display text-gradient mb-8">404</div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-white/50 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-pink text-white font-semibold rounded-full hover:shadow-lg hover:shadow-accent-primary/30 transition-all duration-300">
            <Icons.Logo />
            Go Home
          </Link>
          <Link href="/discoveries" className="flex items-center gap-2 px-6 py-3 border border-white/10 text-white/70 font-medium rounded-full hover:bg-white/5 hover:border-white/20 transition-all duration-300">
            Browse Discoveries
          </Link>
        </div>
      </div>
    </div>
  );
}