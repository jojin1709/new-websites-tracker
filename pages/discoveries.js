import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Icons } from '../components/Icons';

export default function Discoveries() {
  const [discoveries, setDiscoveries] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/discoveries')
      .then(res => res.json())
      .then(data => {
        setDiscoveries(data);
        setLoading(false);
      })
      .catch(() => {
        setDiscoveries([]);
        setLoading(false);
      });
  }, []);

  const sources = ['all', ...new Set(discoveries.map(d => d.source))];

  const filtered = discoveries.filter(item => {
    const matchesFilter = filter === 'all' || item.source === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                         item.tagline.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getSourceColor = (source) => {
    const colors = {
      'Product Hunt': '#ff6154',
      'Hacker News': '#ff6600',
      'GitHub Trending': '#8b5cf6',
      'Reddit': '#ff4500',
      'Dev.to': '#ffffff',
      'BetaList': '#00d4aa',
      'Indie Hackers': '#0e2439',
      'Launching Next': '#6366f1',
      'AlternativeTo': '#ff6b6b',
      'TechCrunch': '#0a9e01',
      'SaaSHub': '#3b82f6',
      'F6S': '#8b5cf6',
      'WIP': '#f59e0b',
      'Makers': '#ec4899',
    };
    
    for (const [key, color] of Object.entries(colors)) {
      if (source.includes(key)) return color;
    }
    return '#6366f1';
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Discoveries - LaunchRadar</title>
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 bg-dark-900/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold font-display text-white">
          <span className="text-accent-primary"><Icons.Logo /></span>
          LaunchRadar
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link>
          <Link href="/discoveries" className="text-sm text-white hover:text-white transition-colors">Discoveries</Link>
          <Link href="/discoveries" className="px-5 py-2 bg-gradient-to-r from-accent-primary to-accent-pink text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-accent-primary/30 transition-all duration-300 hover:-translate-y-0.5">
            Explore
          </Link>
        </div>
      </nav>

      <main className="pt-28 pb-16 px-4 md:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              <span className="text-gradient">Latest Discoveries</span>
            </h1>
            <p className="text-white/50">
              {filtered.length} websites & tools found from {sources.length - 1} sources
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-6 mb-10">
            {/* Search */}
            <div className="relative max-w-2xl mx-auto w-full">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                <Icons.Search />
              </div>
              <input
                type="text"
                placeholder="Search websites, tools, companies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-dark-700 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              <button 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === 'all' 
                    ? 'bg-gradient-to-r from-accent-primary to-accent-pink text-white' 
                    : 'bg-dark-700 text-white/60 hover:text-white hover:bg-dark-600 border border-white/10'
                }`}
                onClick={() => setFilter('all')}
              >
                All ({discoveries.length})
              </button>
              {sources.filter(s => s !== 'all').map(source => (
                <button 
                  key={source}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === source 
                      ? 'bg-gradient-to-r from-accent-primary to-accent-pink text-white' 
                      : 'bg-dark-700 text-white/60 hover:text-white hover:bg-dark-600 border border-white/10'
                  }`}
                  onClick={() => setFilter(source)}
                >
                  {source} ({discoveries.filter(d => d.source === source).length})
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-2 border-white/10 border-t-accent-primary rounded-full animate-spin mb-4" />
              <p className="text-white/50">Loading discoveries...</p>
            </div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((item, index) => (
                  <a 
                    key={index} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group block p-6 bg-glass rounded-2xl hover:bg-glass-hover hover:-translate-y-1 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span 
                        className="px-3 py-1 text-xs font-semibold rounded-full"
                        style={{ 
                          background: `${getSourceColor(item.source)}15`,
                          color: getSourceColor(item.source)
                        }}
                      >
                        {item.source}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-white/50">
                        {item.source.includes('GitHub') ? (
                          <Icons.Star />
                        ) : (
                          <Icons.Zap />
                        )}
                        {item.votes || item.stars || 0}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                    
                    <p className="text-sm text-white/50 mb-4 line-clamp-2 leading-relaxed">
                      {item.tagline}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-xs text-white/30 truncate max-w-[150px]">
                        {item.url ? (() => { try { return new URL(item.url).hostname } catch { return '' } })() : ''}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Visit <Icons.ArrowRight />
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Empty state */}
              {!loading && filtered.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white/30">
                    <Icons.Search />
                  </div>
                  <p className="text-white/50">No discoveries found. Try a different search.</p>
                </div>
              )}
            </>
          )}
        </div>
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