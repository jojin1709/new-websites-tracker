import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Icons } from '../components/Icons';

const SOURCES = [
  { name: 'Product Hunt', icon: Icons.Rocket },
  { name: 'Hacker News', icon: Icons.Newspaper },
  { name: 'GitHub', icon: Icons.Code },
  { name: 'Reddit', icon: Icons.MessageSquare },
  { name: 'Dev.to', icon: Icons.Layout },
  { name: 'BetaList', icon: Icons.Box },
  { name: 'Indie Hackers', icon: Icons.Users },
  { name: 'TechCrunch', icon: Icons.TrendingUp },
];

function AnimatedCounter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return <span>{count}</span>;
}

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Head>
        <title>LaunchRadar - Discover What&apos;s New on the Internet</title>
        <meta name="description" content="Track new websites, tools, and startups launching daily" />
      </Head>

      {/* Cursor glow effect */}
      <div 
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-10 transition-all duration-300 ease-out"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
        }}
      />

      {/* Background orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_70%)] rounded-full animate-float" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(236,72,153,0.1)_0%,transparent_70%)] rounded-full animate-float-reverse" />
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent_70%)] rounded-full animate-float" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 bg-dark-900/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold font-display text-white">
          <span className="text-accent-primary"><Icons.Logo /></span>
          LaunchRadar
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link>
          <Link href="/discoveries" className="text-sm text-white/60 hover:text-white transition-colors">Discoveries</Link>
          <Link href="/discoveries" className="px-5 py-2 bg-gradient-to-r from-accent-primary to-accent-pink text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-accent-primary/30 transition-all duration-300 hover:-translate-y-0.5">
            Explore
          </Link>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 border border-accent-primary/20 rounded-full text-sm text-accent-primary mb-8 animate-fade-in-down">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Tracking 16+ sources daily
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight mb-6 animate-fade-in-up">
            Discover What&apos;s
            <br />
            <span className="text-gradient">Launching Next</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-xl mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Your radar for new websites, tools, and startups. 
            We scan the internet daily so you don&apos;t have to.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link href="/discoveries" className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-pink text-white font-semibold rounded-full hover:shadow-xl hover:shadow-accent-primary/30 transition-all duration-300 hover:-translate-y-1">
              Start Exploring
              <span className="group-hover:translate-x-1 transition-transform"><Icons.ArrowRight /></span>
            </Link>
            <a href="#sources" className="px-8 py-4 border border-white/10 text-white/70 font-medium rounded-full hover:bg-white/5 hover:border-white/20 transition-all duration-300">
              See Sources
            </a>
          </div>

          {/* Radar visualization */}
          <div className="mt-20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="relative w-[280px] h-[280px]">
              <div className="absolute inset-0 border border-accent-primary/30 rounded-full animate-radar" />
              <div className="absolute inset-5 border border-accent-secondary/20 rounded-full animate-radar" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-10 border border-accent-pink/10 rounded-full animate-radar" style={{ animationDelay: '2s' }} />
              
              {/* Orbiting dots */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-10 h-10 bg-dark-700 border border-white/10 rounded-full flex items-center justify-center">
                  <Icons.Rocket />
                </div>
              </div>
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                <div className="w-10 h-10 bg-dark-700 border border-white/10 rounded-full flex items-center justify-center">
                  <Icons.Code />
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="w-10 h-10 bg-dark-700 border border-white/10 rounded-full flex items-center justify-center">
                  <Icons.Box />
                </div>
              </div>
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
                <div className="w-10 h-10 bg-dark-700 border border-white/10 rounded-full flex items-center justify-center">
                  <Icons.Users />
                </div>
              </div>
              
              {/* Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="text-accent-primary animate-glow"><Icons.Logo /></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-y border-white/5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            <div className="text-center">
              <div className="text-5xl font-bold font-display text-gradient"><AnimatedCounter end={16} />+</div>
              <div className="text-white/50 mt-2">Data Sources</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/10" />
            <div className="text-center">
              <div className="text-5xl font-bold font-display text-gradient"><AnimatedCounter end={1000} />+</div>
              <div className="text-white/50 mt-2">Websites Tracked</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/10" />
            <div className="text-center">
              <div className="text-5xl font-bold font-display text-gradient">24/7</div>
              <div className="text-white/50 mt-2">Live Updates</div>
            </div>
          </div>
        </section>

        {/* Sources Section */}
        <section id="sources" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold font-display text-center mb-4">Sources We Monitor</h2>
            <p className="text-white/50 text-center mb-12">We scrape the best platforms to find new launches before they blow up</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SOURCES.map((source, i) => {
                const Icon = source.icon;
                return (
                  <div 
                    key={i}
                    className="group flex flex-col items-center gap-4 p-6 bg-glass rounded-2xl hover:bg-glass-hover transition-all duration-300 hover:-translate-y-1 cursor-default animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/70 group-hover:text-accent-primary group-hover:bg-accent-primary/10 transition-all duration-300">
                      <Icon />
                    </div>
                    <span className="text-sm text-white/60 font-medium">{source.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-4 bg-gradient-to-b from-transparent via-accent-primary/5 to-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold font-display text-center mb-16">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative p-8 bg-glass rounded-2xl">
                <div className="text-6xl font-bold font-display text-white/5 absolute top-4 right-4">01</div>
                <div className="w-12 h-12 bg-accent-primary/10 rounded-xl flex items-center justify-center text-accent-primary mb-6">
                  <Icons.Search />
                </div>
                <h3 className="text-xl font-semibold mb-3">We Scan</h3>
                <p className="text-white/50 leading-relaxed">Every day, our bots scan 16+ platforms for new launches and trending tools</p>
              </div>
              
              <div className="relative p-8 bg-glass rounded-2xl">
                <div className="text-6xl font-bold font-display text-white/5 absolute top-4 right-4">02</div>
                <div className="w-12 h-12 bg-accent-secondary/10 rounded-xl flex items-center justify-center text-accent-secondary mb-6">
                  <Icons.Layers />
                </div>
                <h3 className="text-xl font-semibold mb-3">We Collect</h3>
                <p className="text-white/50 leading-relaxed">All discoveries are aggregated into one clean, searchable database</p>
              </div>
              
              <div className="relative p-8 bg-glass rounded-2xl">
                <div className="text-6xl font-bold font-display text-white/5 absolute top-4 right-4">03</div>
                <div className="w-12 h-12 bg-accent-pink/10 rounded-xl flex items-center justify-center text-accent-pink mb-6">
                  <Icons.Target />
                </div>
                <h3 className="text-xl font-semibold mb-3">You Discover</h3>
                <p className="text-white/50 leading-relaxed">Browse, search, and find the next big thing before everyone else</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 text-center">
          <h2 className="text-4xl font-bold font-display mb-4">Ready to Discover?</h2>
          <p className="text-white/50 mb-8">Start exploring thousands of new websites and tools</p>
          <Link href="/discoveries" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-pink text-white font-semibold rounded-full hover:shadow-xl hover:shadow-accent-primary/30 transition-all duration-300 hover:-translate-y-1">
            Go to Dashboard
            <Icons.ArrowRight />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/5">
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