'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Section from './ui/Section'
import Container from './ui/Container'
import { companyInfo } from '@/lib/content'
import styles from './Hero.module.css'

export default function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Section variant="light" className={styles.hero} ref={ref} number="01">
      <Container>
        <div className={styles.content}>
          {/* Company name */}
          <motion.h1
            className={styles.heading}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {companyInfo.name}
          </motion.h1>

          {/* Basic info */}
          <motion.div
            className={styles.info}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <p className={styles.tagline}>{companyInfo.tagline}</p>
            <p className={styles.description}>{companyInfo.description}</p>
          </motion.div>

          {/* Facts - table format */}
          <motion.table
            className={styles.facts}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <tbody>
              <tr>
                <td className={styles.factLabel}>Osnovano</td>
                <td className={styles.factValue}>{companyInfo.founded}</td>
              </tr>
              <tr>
                <td className={styles.factLabel}>Iskustvo</td>
                <td className={styles.factValue}>{companyInfo.yearsExperience} godina</td>
              </tr>
              <tr>
                <td className={styles.factLabel}>Projekti</td>
                <td className={styles.factValue}>150+</td>
              </tr>
            </tbody>
          </motion.table>
        </div>
      </Container>
    </Section>
  )
}