'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
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
      className={`fixed top-0 z-50 w-full border-b border-white/5 ${
        isScrolled ? 'bg-black/70 backdrop-blur-xl' : 'bg-transparent'
      }`}
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      initial="visible"
      animate={isHidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <Container className="flex items-center justify-between py-5">
        <Link href="/" className="inline-flex">
          <span className="relative inline-flex items-center gap-3">
            <LogoLockup theme="light" size="sm" />
            <span className="pointer-events-none absolute -bottom-2 left-0 h-px w-16 bg-gradient-to-r from-[var(--accent)] to-transparent" />
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-micro font-mono uppercase tracking-micro text-white/70 md:flex">
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
          className="md:hidden min-h-[44px] rounded-md border border-white/20 bg-white/5 px-4 py-2 text-micro font-mono uppercase tracking-micro text-white/80 transition-colors hover:text-white"
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
            className="md:hidden border-t border-white/10 bg-[rgba(15,16,18,0.98)]"
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
                    className={`flex min-h-[44px] items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                      isActive ? 'bg-white/5 text-white' : 'hover:bg-white/5 hover:text-white'
                    }`}
                    onClick={() => setIsOpen(false)}
                    ref={item.href === navItems[0].href ? firstLinkRef : undefined}
                    onMouseEnter={() => router.prefetch(item.href)}
                    onTouchStart={() => router.prefetch(item.href)}
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
      className={`group relative pb-1 transition-colors ${isActive ? 'text-white' : 'hover:text-white'}`}
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
          x: hovered ? offset.x * 0.12 : 0,
          y: hovered ? offset.y * 0.12 : 0,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 18, mass: 0.2 }}
      >
        {label}
      </motion.span>
      <motion.span
        className="absolute -bottom-1 left-0 h-[2px] bg-[var(--accent)]"
        initial={false}
        animate={{ width: hovered || isActive ? '100%' : '0%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </Link>
  )
}
