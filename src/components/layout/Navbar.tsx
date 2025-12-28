'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Container from '@/components/ui/Container'
import LogoLockup from '@/components/brand/LogoLockup'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Company', href: '/company' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,240,234,0.75))] backdrop-blur shadow-[0_16px_40px_rgba(12,17,23,0.12)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,transparent,rgba(155,14,28,0.7),rgba(10,10,12,0.7),transparent)]" />
      <Container className="flex items-center justify-between py-5">
        <Link href="/" className="inline-flex">
          <LogoLockup theme="dark" size="sm" />
        </Link>
        <nav className="hidden items-center gap-8 text-micro font-mono uppercase tracking-micro text-muted md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/projects' && pathname.startsWith('/projects/'))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-1 transition-colors ${isActive ? 'text-textDark' : 'hover:text-textDark'}`}
              >
                {item.label}
                <span
                  className={`absolute left-0 top-full h-[2px] w-full bg-[linear-gradient(90deg,rgba(155,14,28,0.9),rgba(10,10,12,0.9))] transition-transform ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  style={{ transformOrigin: 'left' }}
                />
                <span
                  className={`absolute -right-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--accent-cool)] transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </Link>
            )
          })}
        </nav>
        <button
          type="button"
          className="md:hidden text-micro font-mono uppercase tracking-micro text-muted"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </Container>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="md:hidden border-t border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,240,234,0.9))]"
          >
            <Container className="flex flex-col gap-4 py-6 text-micro font-mono uppercase tracking-micro text-muted">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href === '/projects' && pathname.startsWith('/projects/'))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 ${isActive ? 'text-textDark' : 'hover:text-textDark'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span
                      className={`h-2 w-2 rounded-full border border-border ${isActive ? 'bg-[var(--accent)]' : ''}`}
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
