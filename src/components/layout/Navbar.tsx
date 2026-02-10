'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navItems = [
  { label: 'Projekti', href: '/projects' },
  { label: 'Usluge', href: '/services' },
  { label: 'O nama', href: '/company' },
  { label: 'Kontakt', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!navRef.current) return

    // Navbar hide/show based on scroll direction
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      onUpdate: (self) => {
        if (!navRef.current) return

        if (self.direction === 1 && self.scroll() > 300) {
          // Scrolling down — hide
          gsap.to(navRef.current, {
            yPercent: -100,
            duration: 0.3,
            ease: 'power2.in',
          })
        } else {
          // Scrolling up — show
          gsap.to(navRef.current, {
            yPercent: 0,
            duration: 0.3,
            ease: 'power2.out',
          })
        }
      },
    })

    // Background blur on scroll
    ScrollTrigger.create({
      start: 'top -50',
      onToggle: (self) => {
        if (!navRef.current) return
        if (self.isActive) {
          navRef.current.classList.add('nav-scrolled')
        } else {
          navRef.current.classList.remove('nav-scrolled')
        }
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-[background,border,backdrop-filter] duration-500"
      style={{
        background: 'transparent',
        borderBottom: '1px solid transparent',
      }}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-white font-semibold text-base tracking-wide">
          Zonex
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] text-gray-400">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/projects' && pathname.startsWith('/projects/'))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative group hover:text-white transition-colors ${isActive ? 'text-white' : ''}`}
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#DC2626] transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Meni"
        >
          {isOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1e1e22] border-t border-white/[0.05]">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Početna
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
