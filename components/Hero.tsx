import styles from './Hero.module.css'

const stats = [
  { label: 'Godina osnivanja', value: '1993' },
  { label: 'Klijenti', value: '120+' },
  { label: 'Projekti', value: '480+' },
]

export default function Hero() {
  return (
    <section id="hero" className={`${styles.hero} navy-grid`}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.wordmark}>
            <span className={styles.wordStrong}>ZONEX</span>
            <span className={styles.wordSeparator} />
            <span className={styles.wordLight}>INŽENJERING</span>
          </div>
          <span className={styles.sectionNumber}>01</span>
          <h1>
            Inzenjering infrastrukture sa jasnom strukturom i dugim vekom trajanja.
          </h1>
          <p className={styles.lede}>
            Od projektovanja do izvodjenja, fokus je na tehnickoj preciznosti, disciplini izvodjenja i proverljivim rezultatima.
          </p>
          <div className={styles.actions}>
            <a className={styles.link} href="#projekti">
              Referentni projekti
            </a>
            <a className={styles.link} href="#kontakt">
              Kontakt
            </a>
          </div>
          <div className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className="micro-label text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.profile}>
          <span className="micro-label text-muted">Profil</span>
          <h3>Tehnicka pouzdanost kao standard rada.</h3>
          <div className={styles.profileList}>
            <div>
              <span className="micro-label text-muted">Sediste</span>
              <p>Novi Sad, Srbija</p>
            </div>
            <div>
              <span className="micro-label text-muted">Delatnost</span>
              <p>Projektovanje i izvodjenje gradjevinskih sistema</p>
            </div>
            <div>
              <span className="micro-label text-muted">Standard</span>
              <p>Interni sistem kontrole kvaliteta</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
