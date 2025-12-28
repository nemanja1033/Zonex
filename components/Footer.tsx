import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer id="kontakt" className={`${styles.footer} navy-grid`}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.titleBlock}>
            <span className={styles.sectionNumber}>04</span>
            <div>
              <span className="micro-label text-muted">Kontakt</span>
              <h2>Jasan kanal komunikacije.</h2>
            </div>
          </div>
          <p className={styles.copy}>
            Kontakt podaci organizovani za jednostavnu razmenu tehnickih informacija i dokumentacije.
          </p>
          <div className={styles.contact}>
            <div>
              <span className="micro-label text-muted">Email</span>
              <p>office@zonex.rs</p>
            </div>
            <div>
              <span className="micro-label text-muted">Telefon</span>
              <p>+381 21 555 300</p>
            </div>
            <div>
              <span className="micro-label text-muted">Adresa</span>
              <p>Industrijska 12, Novi Sad</p>
            </div>
          </div>
        </div>
        <div className={styles.legal}>
          <div className={styles.legalBlock}>
            <span className="micro-label text-muted">Naziv</span>
            <p>ZONEX Inženjering d.o.o.</p>
          </div>
          <div className={styles.legalBlock}>
            <span className="micro-label text-muted">Sediste</span>
            <p>Novi Sad, Srbija</p>
          </div>
          <div className={styles.legalBlock}>
            <span className="micro-label text-muted">Delatnost</span>
            <p>Inzenjering i realizacija objekata</p>
          </div>
          <div className={styles.legalBlock}>
            <span className="micro-label text-muted">Napomena</span>
            <p>Detalji po zahtevu, uz relevantnu dokumentaciju.</p>
          </div>
        </div>
      </div>
      <div className={styles.watermark}>ZONEX</div>
      <div className={styles.footerBase}>
        <span>ZONEX Inženjering d.o.o.</span>
        <span>Sva prava zadrzana.</span>
      </div>
    </footer>
  )
}
