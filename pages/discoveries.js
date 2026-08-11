import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Discoveries.module.css';

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
      'Dev.to': '#0a0a0a',
      'BetaList': '#00d4aa',
      'Indie Hackers': '#0e2439',
      'Launching Next': '#6366f1',
      'AlternativeTo': '#ff6b6b',
      'TechCrunch': '#0a9e01',
    };
    
    for (const [key, color] of Object.entries(colors)) {
      if (source.includes(key)) return color;
    }
    return '#6366f1';
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Discoveries - Web Discovery Bot</title>
      </Head>

      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>Web Discovery Bot</Link>
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/discoveries" className={styles.navLinkActive}>Discoveries</Link>
        </div>
      </nav>

      <main className={styles.main}>
        <h1 className={styles.title}>Latest Discoveries</h1>
        <p className={styles.subtitle}>{filtered.length} websites & tools found from {sources.length - 1} sources</p>
        
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search websites, tools, companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />
          <div className={styles.filters}>
            <button 
              className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({discoveries.length})
            </button>
            {sources.filter(s => s !== 'all').map(source => (
              <button 
                key={source}
                className={`${styles.filterBtn} ${filter === source ? styles.active : ''}`}
                onClick={() => setFilter(source)}
              >
                {source} ({discoveries.filter(d => d.source === source).length})
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading discoveries...</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((item, index) => (
              <a 
                key={index} 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.card}
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <div className={styles.cardHeader}>
                  <span 
                    className={styles.source}
                    style={{ background: `${getSourceColor(item.source)}20`, color: getSourceColor(item.source) }}
                  >
                    {item.source}
                  </span>
                  <span className={styles.votes}>
                    {item.source.includes('GitHub') ? '⭐' : '🔥'} {item.votes || item.stars || 0}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{item.name}</h3>
                <p className={styles.cardDesc}>{item.tagline}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.url}>{item.url ? (() => { try { return new URL(item.url).hostname } catch { return '' } })() : ''}</span>
                  <span className={styles.visitBtn}>Visit →</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className={styles.empty}>
            <p>No discoveries found. Run the scraper first!</p>
          </div>
        )}
      </main>
    </div>
  );
}