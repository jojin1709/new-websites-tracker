import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const SOURCES = [
  { name: 'Product Hunt', icon: '🚀', color: '#ff6154' },
  { name: 'Hacker News', icon: '📰', color: '#ff6600' },
  { name: 'GitHub Trending', icon: '💻', color: '#8b5cf6' },
  { name: 'Reddit', icon: '🤖', color: '#ff4500' },
  { name: 'Dev.to', icon: '👨‍💻', color: '#0a0a0a' },
  { name: 'BetaList', icon: ' beta', color: '#00d4aa' },
  { name: 'Indie Hackers', icon: '🎯', color: '#0e2439' },
  { name: 'Launching Next', icon: '🌟', color: '#6366f1' },
  { name: 'AlternativeTo', icon: '🔄', color: '#ff6b6b' },
  { name: 'TechCrunch', icon: '📊', color: '#0a9e01' },
  { name: 'SaaSHub', icon: '☁️', color: '#3b82f6' },
  { name: 'F6S', icon: '🚀', color: '#8b5cf6' },
  { name: 'WIP', icon: '⚡', color: '#f59e0b' },
  { name: 'Makers', icon: '🛠️', color: '#ec4899' },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Web Discovery Bot - Find New Websites & Tools Daily</title>
        <meta name="description" content="Discover the latest websites, tools, and companies launching every day" />
      </Head>

      <nav className={styles.nav}>
        <div className={styles.logo}>Web Discovery Bot</div>
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/discoveries" className={styles.navLink}>Discoveries</Link>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.glow}></div>
          <h1 className={styles.title}>
            <span className={styles.gradient}>Web Discovery</span>
            <br />
            <span className={styles.subtitle}>Bot</span>
          </h1>
          <p className={styles.description}>
            Discover new websites, tools, and companies launching every day
          </p>
          
          <div className={styles.sourceGrid}>
            {SOURCES.map((source, i) => (
              <div 
                key={i} 
                className={styles.sourceItem}
                style={{ 
                  borderColor: `${source.color}40`,
                  animationDelay: `${i * 0.05}s`
                }}
              >
                <span className={styles.sourceIcon}>{source.icon}</span>
                <span className={styles.sourceName}>{source.name}</span>
              </div>
            ))}
          </div>
          
          <Link href="/discoveries" className={styles.ctaButton}>
            View All Discoveries →
          </Link>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>16+</div>
            <div className={styles.statLabel}>Data Sources</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>24/7</div>
            <div className={styles.statLabel}>Auto Updates</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>1000+</div>
            <div className={styles.statLabel}>Websites Tracked</div>
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.icon}>🔍</div>
            <h3>Multi-Source Aggregation</h3>
            <p>Scrapes from 16+ platforms including Product Hunt, Reddit, Dev.to, and more</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.icon}>⚡</div>
            <h3>Real-time Updates</h3>
            <p>GitHub Actions runs daily to keep the database fresh with new discoveries</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.icon}>🎯</div>
            <h3>Smart Filtering</h3>
            <p>Search and filter by source to find exactly what you're looking for</p>
          </div>
        </div>
      </main>
    </div>
  );
}