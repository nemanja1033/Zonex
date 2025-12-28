import styles from './About.module.css'

const capabilities = [
  'Inzenjering infrastrukture i objekata',
  'Projektovanje i razrada tehnicke dokumentacije',
  'Izvodjenje radova uz definisane standarde kontrole',
  'Koordinacija podizvodjaca i uskladjivanje rokova',
]

export default function About() {
  return (
    <section id="onama" className={styles.about}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.titleBlock}>
            <span className={styles.sectionNumber}>03</span>
            <div>
              <span className="micro-label text-muted">O nama</span>
              <h2>Kontinuitet i jasno definisan nacin rada.</h2>
            </div>
          </div>
          <p className={styles.copy}>
            Zonex Inženjering posluje vise od tri decenije i fokusira se na stabilne procese, proverljive rezultate i
            disciplinu u realizaciji. Projekti se vode kroz definisane faze, sa jasnim nosiocima odgovornosti.
          </p>
        </div>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className="micro-label text-accent">Specijalnosti</span>
            <span className={styles.panelTitle}>Sistemski pristup izgradnji</span>
          </div>
          <ul className={styles.list}>
            {capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.metrics}>
            <div>
              <span className={styles.metricValue}>30+</span>
              <span className="micro-label text-muted">Godina iskustva</span>
            </div>
            <div>
              <span className={styles.metricValue}>1993</span>
              <span className="micro-label text-muted">Godina osnivanja</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
