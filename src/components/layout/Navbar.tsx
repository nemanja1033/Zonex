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
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Clients', href: '/clients' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-900/90 backdrop-blur">
      <Container className="flex items-center justify-between py-5">
        <Link href="/" className="inline-flex">
          <LogoLockup theme="light" size="sm" />
        </Link>
        <nav className="hidden items-center gap-8 text-micro font-mono uppercase tracking-micro text-white/80 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/projects' && pathname.startsWith('/projects/'))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-1 transition-colors ${isActive ? 'text-white' : 'hover:text-white'}`}
              >
                {item.label}
                <span
                  className={`absolute left-0 top-full h-[2px] w-full bg-accent transition-transform ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  style={{ transformOrigin: 'left' }}
                />
              </Link>
            )
          })}
        </nav>
        <button
          type="button"
          className="md:hidden text-micro font-mono uppercase tracking-micro text-white/80"
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
            className="md:hidden border-t border-white/10 bg-navy-900/95"
          >
            <Container className="flex flex-col gap-4 py-6 text-micro font-mono uppercase tracking-micro text-white/80">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href === '/projects' && pathname.startsWith('/projects/'))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={isActive ? 'text-white' : 'hover:text-white'}
                    onClick={() => setIsOpen(false)}
                  >
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
