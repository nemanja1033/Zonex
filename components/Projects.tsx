import Link from 'next/link'
import styles from './Projects.module.css'
import ProjectsTable from './ProjectsTable'
import { projects } from './projectsData'

export default function Projects() {
  return (
    <section id="projekti" className={styles.projects}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.titleBlock}>
            <span className={styles.sectionNumber}>02</span>
            <div>
              <span className="micro-label text-muted">Projekti / Reference</span>
              <h2>Referentni objekti i sistemi.</h2>
            </div>
          </div>
          <p className={styles.intro}>
            Pregled odabranih projekata koji ilustruju obim i tipologiju naseg rada.
          </p>
        </div>
        <ProjectsTable projects={projects} />
        <div className={styles.linkRow}>
          <Link className={styles.link} href="/projekti" prefetch>
            Pregled svih referenci
          </Link>
        </div>
      </div>
    </section>
  )
}
