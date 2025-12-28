'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './Navigation.module.css'

const navItems = [
  { label: 'Projekti', href: '#projekti', id: 'projekti' },
  { label: 'O nama', href: '#onama', id: 'onama' },
  { label: 'Kontakt', href: '#kontakt', id: 'kontakt' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((item): item is HTMLElement => Boolean(item))

    if (sections.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0.1 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`${styles.header} navy-grid ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.wordmark}>
            <span className={styles.brandStrong}>ZONEX</span>
            <span className={styles.separator} />
            <span className={styles.brandLight}>INŽENJERING</span>
          </span>
          <span className={styles.brandSub}>Inženjering d.o.o.</span>
        </Link>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.link}
              aria-current={activeSection === item.id}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
