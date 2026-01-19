'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import Container from '@/components/ui/Container'
import LogoLockup from '@/components/brand/LogoLockup'

const navItems = [
  { label: 'Početna', href: '/' },
  { label: 'Projekti', href: '/projects' },
  { label: 'Usluge', href: '/services' },
  { label: 'O nama', href: '/company' },
  { label: 'Kontakt', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const mobileNavRef = useRef<HTMLElement | null>(null)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    firstLinkRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleTrap = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab') return
    const focusable = mobileNavRef.current?.querySelectorAll<HTMLElement>('a[href], button')
    if (!focusable || focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(7,10,15,0.85)] backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,transparent,rgba(178,30,42,0.7),rgba(255,255,255,0.2),transparent)]" />
      <Container className="flex items-center justify-between py-5">
        <Link href="/" className="inline-flex">
          <LogoLockup theme="light" size="sm" />
        </Link>
        <nav className="hidden items-center gap-8 text-micro font-mono uppercase tracking-micro text-white/70 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/projects' && pathname.startsWith('/projects/'))
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                className={`relative pb-1 transition-colors ${isActive ? 'text-white' : 'hover:text-white'}`}
              >
                {item.label}
                <span
                  className={`absolute left-0 top-full h-[2px] w-full bg-[linear-gradient(90deg,rgba(178,30,42,0.9),rgba(255,255,255,0.3))] transition-transform ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  style={{ transformOrigin: 'left' }}
                />
                <span
                  className={`absolute -right-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--accent)] transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </Link>
            )
          })}
        </nav>
        <button
          type="button"
          className="md:hidden rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-micro font-mono uppercase tracking-micro text-white/80 transition-colors hover:text-white"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? 'Zatvori' : 'Meni'}
        </button>
      </Container>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-nav"
            ref={mobileNavRef}
            initial={{ opacity: 0, y: -10, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, y: -10, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="md:hidden border-t border-white/10 bg-[rgba(7,10,15,0.95)] backdrop-blur"
            onKeyDown={handleTrap}
          >
            <Container className="flex flex-col gap-3 py-6 text-micro font-mono uppercase tracking-micro text-white/70">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href === '/projects' && pathname.startsWith('/projects/'))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                      isActive ? 'bg-white/5 text-white' : 'hover:bg-white/5 hover:text-white'
                    }`}
                    onClick={() => setIsOpen(false)}
                    ref={item.href === navItems[0].href ? firstLinkRef : undefined}
                  >
                    <span
                      className={`h-2 w-2 rounded-full border border-white/30 ${isActive ? 'bg-[var(--accent)]' : ''}`}
                    />
                    {item.label}
                  </Link>
                )
              })}
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
