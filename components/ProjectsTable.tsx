import styles from './ProjectsTable.module.css'
import type { Project } from './projectsData'

type ProjectsTableProps = {
  projects: Project[]
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Projekat</th>
            <th>Lokacija</th>
            <th>Vrsta radova / objekta</th>
            <th>Status</th>
            <th>Napomena</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.name}>
              <td className={styles.name}>{project.name}</td>
              <td>{project.location ?? '—'}</td>
              <td>{project.workType ?? project.objectType ?? '—'}</td>
              <td>
                <span className={styles.status}>{project.status}</span>
              </td>
              <td className={styles.note}>{project.note ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
