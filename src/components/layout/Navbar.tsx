'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Projekti', href: '/projects' },
  { label: 'Usluge', href: '/services' },
  { label: 'O nama', href: '/company' },
  { label: 'Kontakt', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled ? 'rgba(30,30,34,0.92)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
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
                className={`hover:text-white transition-colors ${isActive ? 'text-white' : ''}`}
              >
                {item.label}
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
