'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Section from './ui/Section'
import Container from './ui/Container'
import { projects, Project } from '@/lib/content'
import styles from './Projects.module.css'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [filter, setFilter] = useState<'Svi' | 'U toku' | 'Završeno'>('Svi')

  const filteredProjects = filter === 'Svi' 
    ? projects 
    : projects.filter(p => p.status === filter)

  return (
    <Section variant="light" id="projekti" ref={ref} number="02">
      <Container>
        {/* Header */}
        <div className={styles.header}>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Projekti
          </motion.h2>
        </div>

        {/* Filters */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {(['Svi', 'U toku', 'Završeno'] as const).map((status) => (
            <button
              key={status}
              className={`${styles.filter} ${filter === status ? styles.active : ''}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </motion.div>

        {/* Projects Table - Data Format */}
        <motion.table
          className={styles.projectsTable}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <thead>
            <tr>
              <th className={styles.tableHeader}>Naziv</th>
              <th className={styles.tableHeader}>Klijent</th>
              <th className={styles.tableHeader}>Lokacija</th>
              <th className={styles.tableHeader}>Tip</th>
              <th className={styles.tableHeader}>Status</th>
              <th className={styles.tableHeader}>Godina</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </tbody>
        </motion.table>
      </Container>
    </Section>
  )
}

function ProjectRow({ project }: { project: Project; index: number }) {
  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableCell}>
        <strong>{project.title}</strong>
      </td>
      <td className={styles.tableCell}>{project.client}</td>
      <td className={styles.tableCell}>{project.location}</td>
      <td className={styles.tableCell}>{project.type}</td>
      <td className={styles.tableCell}>
        <span className={`${styles.status} ${styles[project.status.toLowerCase().replace(' ', '-')]}`}>
          {project.status}
        </span>
      </td>
      <td className={styles.tableCell}>{project.year || '—'}</td>
    </tr>
  )
}