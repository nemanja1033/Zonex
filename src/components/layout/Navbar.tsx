'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import Container from '@/components/ui/Container'
import { EASING, SPRING } from '@/lib/animations'

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
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? 'bg-[#27272A]/95 backdrop-blur-sm border-b border-white/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.2)]'
          : 'bg-transparent border-b border-transparent'
      }`}
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      initial="visible"
      animate={isHidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: EASING.power4 }}
    >
      <Container className="flex items-center justify-between h-20 lg:h-24">
        {/* Logo */}
        <Link href="/" className="group relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASING.power4 }}
            className="flex items-center gap-3"
          >
            <span className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              ZONEX
            </span>
            <span className="text-white/20 font-light">|</span>
            <span className="text-sm lg:text-base text-white/50 font-medium tracking-wide">
              INZENJERING
            </span>

            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#DC2626] to-transparent"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3, ease: EASING.power4 }}
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href || (item.href === '/projects' && pathname.startsWith('/projects/'))
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.05, ease: EASING.power4 }}
              >
                <NavItem
                  href={item.href}
                  label={item.label}
                  isActive={isActive}
                  onPrefetch={() => router.prefetch(item.href)}
                />
              </motion.div>
            )
          })}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6, ease: EASING.power4 }}
            className="ml-8"
          >
            <Link
              href="/contact"
              className="group relative px-7 py-3 bg-[#DC2626] text-white text-[13px] font-semibold uppercase tracking-[0.1em] rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(220,38,38,0.4)]"
            >
              <span className="relative z-10">Započnite projekat</span>

              {/* Hover shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5, ease: 'linear' }}
              />
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          className="lg:hidden min-h-[48px] rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#DC2626]/40 hover:bg-white/10"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((prev) => !prev)}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? 'Zatvori' : 'Meni'}
        </motion.button>
      </Container>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-nav"
            ref={mobileNavRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASING.power4 }}
            className="lg:hidden border-t border-white/[0.12] bg-[#27272A] overflow-hidden"
            onKeyDown={handleTrap}
          >
            <Container className="flex flex-col gap-2 py-6">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href || (item.href === '/projects' && pathname.startsWith('/projects/'))
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.3, ease: EASING.power4 }}
                  >
                    <Link
                      href={item.href}
                      prefetch
                      className={`flex min-h-[56px] items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 ${
                        isActive
                          ? 'bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20'
                          : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                      onClick={() => setIsOpen(false)}
                      ref={item.href === navItems[0].href ? firstLinkRef : undefined}
                      onMouseEnter={() => router.prefetch(item.href)}
                      onTouchStart={() => router.prefetch(item.href)}
                    >
                      <span
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          isActive ? 'bg-[#DC2626]' : 'border border-white/20'
                        }`}
                      />
                      <span className="text-sm font-medium uppercase tracking-[0.15em]">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                )
              })}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3, ease: EASING.power4 }}
                className="mt-4 pt-4 border-t border-white/[0.12]"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center min-h-[56px] rounded-xl bg-[#DC2626] text-white text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#EF4444] hover:shadow-[0_8px_32px_rgba(220,38,38,0.3)]"
                  onClick={() => setIsOpen(false)}
                >
                  Započnite projekat
                </Link>
              </motion.div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// Magnetic Nav Link with micro-interactions
type NavItemProps = {
  href: string
  label: string
  isActive: boolean
  onPrefetch: () => void
}

function NavItem({ href, label, isActive, onPrefetch }: NavItemProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    })
  }

  return (
    <Link href={href} prefetch onMouseEnter={onPrefetch} onTouchStart={onPrefetch}>
      <motion.div
        className="relative px-4 py-2.5 text-sm font-medium cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setMousePosition({ x: 0, y: 0 })
        }}
        animate={{
          x: isHovered ? mousePosition.x * 0.12 : 0,
          y: isHovered ? mousePosition.y * 0.12 : 0,
        }}
        transition={{ type: 'spring', ...SPRING.snappy }}
      >
        <span
          className={`relative z-10 transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-white/50 hover:text-white'
          }`}
        >
          {label}
        </span>

        {/* Hover background */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-white/[0.04]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.2, ease: EASING.power4 }}
        />

        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute -bottom-1 left-4 right-4 h-[2px] bg-[#DC2626] rounded-full"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </motion.div>
    </Link>
  )
}
