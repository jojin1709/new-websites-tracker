import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Web Discovery Bot - Find New Websites & Tools Daily</title>
        <meta name="description" content="Discover the latest websites, tools, and companies launching every day" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
          <div className={styles.badges}>
            <span className={styles.badge}>Product Hunt</span>
            <span className={styles.badge}>Hacker News</span>
            <span className={styles.badge}>GitHub Trending</span>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>150+</div>
            <div className={styles.statLabel}>Daily Discoveries</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>3</div>
            <div className={styles.statLabel}>Data Sources</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>24/7</div>
            <div className={styles.statLabel}>Auto Updates</div>
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.icon}>🚀</div>
            <h3>Real-time Updates</h3>
            <p>Automated daily scraping of the latest launches</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.icon}>🔍</div>
            <h3>Multi-Source</h3>
            <p>Aggregated from multiple platforms</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.icon}>📊</div>
            <h3>Trending Data</h3>
            <p>See what's popular and gaining traction</p>
          </div>
        </div>
      </main>
    </div>
  );
}