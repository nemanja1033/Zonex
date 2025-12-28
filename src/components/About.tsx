'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Section from './ui/Section'
import Container from './ui/Container'
import { aboutContent } from '@/lib/content'
import styles from './About.module.css'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Section variant="light" id="o-nama" ref={ref} number="03">
      <Container>
        {/* Header */}
        <div className={styles.header}>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            O nama
          </motion.h2>
        </div>

        {/* Content */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className={styles.description}>{aboutContent.description}</p>

          {/* Values - List Format */}
          <div className={styles.values}>
            <h3 className={styles.valuesHeading}>Naše vrednosti</h3>
            <ul className={styles.valuesList}>
              {aboutContent.values.map((value) => (
                <li key={value.title} className={styles.valueItem}>
                  <strong>{value.title}</strong>
                  <span className={styles.valueDescription}>{value.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}