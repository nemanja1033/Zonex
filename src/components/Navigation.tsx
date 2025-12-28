'use client'

import { useState, useEffect } from 'react'
import Logo from './brand/Logo'
import styles from './Navigation.module.css'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Projekti', href: '#projekti' },
    { label: 'O nama', href: '#o-nama' },
    { label: 'Kontakt', href: '#kontakt' },
  ]

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#" className={styles.logo}>
          <Logo variant="full" size="md" />
        </a>

        <div className={styles.desktopNav}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <hr className={styles.borderLine} />
    </nav>
  )
}