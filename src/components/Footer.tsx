'use client'

import { motion } from 'framer-motion'
import Section from './ui/Section'
import Container from './ui/Container'
import Logo from './brand/Logo'
import { companyInfo } from '@/lib/content'
import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    company: [
      { label: 'O nama', href: '#o-nama' },
      { label: 'Projekti', href: '#projekti' },
      { label: 'Usluge', href: '#usluge' },
      { label: 'Karijere', href: '#karijere' },
    ],
    contact: [
      { label: 'info@zonex.rs', href: 'mailto:info@zonex.rs' },
      { label: '+381 XX XXX XXXX', href: 'tel:+381XXXXXXXXX' },
      { label: 'Beograd, Srbija', href: '#' },
    ],
  }

  return (
    <Section variant="navy" id="kontakt" className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <Logo variant="full" size="md" className={styles.logo} />
            <p className={styles.description}>
              {companyInfo.name}
            </p>
            <p className={styles.description}>
              {companyInfo.tagline}
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h4 className={styles.heading}>Kompanija</h4>
            <ul className={styles.linkList}>
              {links.company.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h4 className={styles.heading}>Kontakt</h4>
            <ul className={styles.linkList}>
              {links.contact.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <hr className={styles.divider} />

        {/* Copyright */}
        <motion.div
          className={styles.copyright}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <p className="small text-muted">
            © {currentYear} {companyInfo.name}. Sva prava zadržana.
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}