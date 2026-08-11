import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Discoveries.module.css';

export default function Discoveries() {
  const [discoveries, setDiscoveries] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/discoveries')
      .then(res => res.json())
      .then(data => setDiscoveries(data))
      .catch(() => setDiscoveries([]));
  }, []);

  const filtered = discoveries.filter(item => {
    const matchesFilter = filter === 'all' || item.source.toLowerCase().includes(filter);
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                         item.tagline.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Discoveries - Web Discovery Bot</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Latest Discoveries</h1>
        
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search discoveries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />
          <div className={styles.filters}>
            <button 
              className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`${styles.filterBtn} ${filter === 'product' ? styles.active : ''}`}
              onClick={() => setFilter('product')}
            >
              Product Hunt
            </button>
            <button 
              className={`${styles.filterBtn} ${filter === 'hacker' ? styles.active : ''}`}
              onClick={() => setFilter('hacker')}
            >
              Hacker News
            </button>
            <button 
              className={`${styles.filterBtn} ${filter === 'github' ? styles.active : ''}`}
              onClick={() => setFilter('github')}
            >
              GitHub
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {filtered.map((item, index) => (
            <div key={index} className={styles.card} style={{ animationDelay: `${index * 0.05}s` }}>
              <div className={styles.cardHeader}>
                <span className={styles.source}>{item.source}</span>
                <span className={styles.votes}>🔥 {item.votes || item.stars || 0}</span>
              </div>
              <h3 className={styles.cardTitle}>{item.name}</h3>
              <p className={styles.cardDesc}>{item.tagline}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                View →
              </a>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p>No discoveries found. Run the scraper first!</p>
          </div>
        )}
      </main>
    </div>
  );
}