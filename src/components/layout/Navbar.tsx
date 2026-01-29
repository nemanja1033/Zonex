'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import Container from '@/components/ui/Container'
import LogoLockup from '@/components/brand/LogoLockup'
import { transition } from '@/lib/motion'

const navItems = [
  { label: 'Početna', href: '/' },
  { label: 'Projekti', href: '/projects' },
  { label: 'Usluge', href: '/services' },
  { label: 'O nama', href: '/company' },
  { label: 'Kontakt', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const mobileNavRef = useRef<HTMLElement | null>(null)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)
  const lastScrollState = useRef(false)
  const { scrollY } = useScroll()

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

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    const nextScrolled = latest > 20
    if (nextScrolled !== lastScrollState.current) {
      lastScrollState.current = nextScrolled
      setIsScrolled(nextScrolled)
    }
    if (latest > previous && latest > 150) {
      setIsHidden(true)
    } else {
      setIsHidden(false)
    }
  })

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
    <motion.header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-350 ${
        isScrolled
          ? 'border-[var(--border-light)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-[var(--shadow-sm)]'
          : 'border-transparent bg-transparent'
      }`}
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      initial="visible"
      animate={isHidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: [0.77, 0, 0.175, 1] }}
    >
      <Container className="flex items-center justify-between py-5">
        <Link href="/" className="inline-flex group">
          <span className="relative inline-flex items-center gap-3 transition-transform duration-300 group-hover:scale-105">
            <span className="text-lg font-bold tracking-tight text-[var(--text-secondary)]">
              ZONEX <span className="text-[var(--text-tertiary)]">— INŽENJERING</span>
            </span>
            <span className="pointer-events-none absolute -bottom-2 left-0 h-px w-16 bg-gradient-to-r from-[var(--brand-red)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-micro font-mono uppercase tracking-micro text-[var(--text-secondary)] md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/projects' && pathname.startsWith('/projects/'))
            return (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={isActive}
                onPrefetch={() => router.prefetch(item.href)}
              />
            )
          })}
        </nav>
        <button
          type="button"
          className="md:hidden min-h-[44px] rounded-md border border-[var(--border-light)] bg-white/80 px-4 py-2 text-micro font-mono uppercase tracking-micro text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--brand-red)] hover:shadow-md"
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
            transition={transition.fast}
            className="md:hidden border-t border-[var(--border-light)] bg-white/95 backdrop-blur-xl"
            onKeyDown={handleTrap}
          >
            <Container className="flex flex-col gap-3 py-6 text-micro font-mono uppercase tracking-micro text-[var(--text-secondary)]">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href || (item.href === '/projects' && pathname.startsWith('/projects/'))
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      prefetch
                      className={`flex min-h-[44px] items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 ${
                        isActive
                          ? 'bg-[var(--brand-red-bg)] text-[var(--brand-red)]'
                          : 'hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                      }`}
                      onClick={() => setIsOpen(false)}
                      ref={item.href === navItems[0].href ? firstLinkRef : undefined}
                      onMouseEnter={() => router.prefetch(item.href)}
                      onTouchStart={() => router.prefetch(item.href)}
                    >
                      <span
                        className={`h-2 w-2 rounded-full border transition-all duration-300 ${
                          isActive ? 'border-[var(--brand-red)] bg-[var(--brand-red)]' : 'border-[var(--border-medium)]'
                        }`}
                      />
                      {item.label}
                    </Link>
                  </motion.div>
                )
              })}
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

type NavItemProps = {
  href: string
  label: string
  isActive: boolean
  onPrefetch: () => void
}

function NavItem({ href, label, isActive, onPrefetch }: NavItemProps) {
  const [hovered, setHovered] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    setOffset({ x, y })
  }

  return (
    <Link
      href={href}
      prefetch
      className={`group relative pb-1 transition-colors duration-300 ${
        isActive ? 'text-[var(--text-primary)]' : 'hover:text-[var(--text-primary)]'
      }`}
      onMouseEnter={() => {
        setHovered(true)
        onPrefetch()
      }}
      onMouseLeave={() => {
        setHovered(false)
        setOffset({ x: 0, y: 0 })
      }}
      onMouseMove={handleMove}
      onTouchStart={onPrefetch}
    >
      <motion.span
        className="inline-block"
        animate={{
          x: hovered ? offset.x * 0.15 : 0,
          y: hovered ? offset.y * 0.15 : 0,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      >
        {label}
      </motion.span>
      <motion.span
        className="absolute -bottom-1 left-0 h-[2px] bg-[var(--brand-red)]"
        initial={false}
        animate={{ scaleX: hovered || isActive ? 1 : 0 }}
        style={{ transformOrigin: 'left' }}
        transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
      />
    </Link>
  )
}
