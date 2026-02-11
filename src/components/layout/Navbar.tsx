'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site } from '../../../data/site'

gsap.registerPlugin(ScrollTrigger)

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
      className="fixed top-0 left-0 right-0 z-50 transition-[background,border,backdrop-filter] duration-500 bg-[#0F1114]/80 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="font-bold text-lg tracking-wide">{site.nav.logo}</span>
          <span className="text-gray-500 font-light">—</span>
          <span className="text-gray-400 text-sm tracking-wide">{site.nav.logoSuffix}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {site.nav.items.map((item) => {
            const isActive = pathname === item.href || (item.href === '/projects' && pathname.startsWith('/projects/'))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[13px] tracking-wide transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="hidden lg:inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#b91c1c] text-white px-5 py-2.5 text-xs font-semibold tracking-wider uppercase rounded transition-colors"
        >
          {site.nav.cta}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Meni"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0F1114] border-t border-white/[0.05]">
          <nav className="container mx-auto px-6 py-8 flex flex-col gap-1">
            {site.nav.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors py-3 text-lg"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-[#DC2626] hover:bg-[#b91c1c] text-white px-6 py-4 text-sm font-semibold tracking-wider uppercase rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {site.nav.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
