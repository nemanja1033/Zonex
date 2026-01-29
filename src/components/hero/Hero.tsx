"use client"

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import Container from '@/components/ui/Container'
import { EASING, SPRING, staggerContainer, staggerItem, VIEWPORT } from '@/lib/animations'
import { site } from '../../../data/site'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLElement | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Particles for floating effect
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 3,
      })),
    []
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  // Mouse parallax effect for grid
  useEffect(() => {
    if (reduceMotion || !isDesktop) return
    const node = containerRef.current
    if (!node) return

    let frame = 0
    const handleMove = (event: globalThis.MouseEvent) => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        node.style.setProperty('--hero-x', `${(x * 16).toFixed(2)}px`)
        node.style.setProperty('--hero-y', `${(y * 12).toFixed(2)}px`)
        frame = 0
      })
    }

    const handleLeave = () => {
      node.style.setProperty('--hero-x', '0px')
      node.style.setProperty('--hero-y', '0px')
    }

    node.addEventListener('mousemove', handleMove)
    node.addEventListener('mouseleave', handleLeave)

    return () => {
      node.removeEventListener('mousemove', handleMove)
      node.removeEventListener('mouseleave', handleLeave)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [isDesktop, reduceMotion])

  const title = site.hero.title
  const titleLines = title.split(', ')

  return (
    <section
      ref={containerRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1E] via-[#252527] to-[#1C1C1E]" />
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
          animate={reduceMotion ? {} : {
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Glow spots */}
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#FF3B30]/5 rounded-full blur-[120px]"
          style={{ animation: reduceMotion ? 'none' : 'pulse 4s ease-in-out infinite' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF3B30]/3 rounded-full blur-[100px]"
          style={{ animation: reduceMotion ? 'none' : 'pulse 4s ease-in-out infinite 1s' }}
        />
      </div>

      {/* Noise texture */}
      <div className="hero-noise" aria-hidden="true" />

      {/* Floating particles */}
      {!reduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#FF3B30] rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div
        style={isDesktop && !reduceMotion ? { y, opacity } : {}}
        className="relative z-10 w-full pt-32 lg:pt-40"
      >
        <Container>
          <div className="max-w-5xl mx-auto text-center">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASING.power4 }}
              className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-full border border-[#FF3B30]/20 bg-[#FF3B30]/5 backdrop-blur-sm"
            >
              <motion.div
                animate={reduceMotion ? {} : {
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.6, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles size={16} className="text-[#FF3B30]" />
              </motion.div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#FF3B30] font-semibold">
                Generalni izvođač
              </span>
            </motion.div>

            {/* Main heading - Split text animation */}
            <div className="mb-8">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] text-white"
                initial="hidden"
                animate="visible"
                variants={staggerContainer(0.04, 0.4)}
              >
                {titleLines.map((line, lineIndex) => (
                  <span key={lineIndex} className="block overflow-hidden">
                    {line.split(' ').map((word, wordIndex) => (
                      <span key={wordIndex} className="inline-block overflow-hidden mr-3 lg:mr-4">
                        <motion.span
                          className={`inline-block ${
                            lineIndex === titleLines.length - 1
                              ? 'bg-gradient-to-r from-white via-[#EBEBF5] to-[#FF3B30] bg-clip-text text-transparent'
                              : ''
                          }`}
                          variants={{
                            hidden: { y: '110%', opacity: 0 },
                            visible: {
                              y: 0,
                              opacity: 1,
                              transition: {
                                duration: 0.8,
                                ease: EASING.power4,
                              },
                            },
                          }}
                        >
                          {word}
                        </motion.span>
                      </span>
                    ))}
                    {lineIndex < titleLines.length - 1 && ','}
                  </span>
                ))}
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1, ease: EASING.power4 }}
              className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              {site.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: EASING.power4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            >
              <MagneticButton href="/projects" variant="primary">
                <span>Naši projekti</span>
                <ArrowRight size={18} />
              </MagneticButton>
              
              <MagneticButton href="/contact" variant="secondary">
                <span>Kontaktirajte tim</span>
                <ArrowRight size={18} />
              </MagneticButton>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.1, 1.5)}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
            >
              {site.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  whileHover={{ y: -5 }}
                  className="group relative p-8 rounded-2xl bg-[#2C2C2E] border border-white/8 hover:border-white/12 transition-all duration-300"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FF3B30]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-3xl lg:text-4xl font-bold text-white">
                        {stat.value.replace(/[^0-9+]/g, '')}
                      </span>
                      {stat.value.includes(' ') && (
                        <span className="text-sm text-white/40">
                          {stat.value.split(' ').slice(1).join(' ')}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2, ease: EASING.power4 }}
      >
        <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          animate={reduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-[#FF3B30]/60 rounded-full"
            animate={reduceMotion ? {} : { y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1C1C1E] to-transparent pointer-events-none" />
    </section>
  )
}

// Magnetic button with advanced hover effects
function MagneticButton({
  children,
  href,
  variant = 'primary',
}: {
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'secondary'
}) {
  const reduceMotion = useReducedMotion()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return
    const { clientX, clientY } = e
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    setPosition({ x, y })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  const isPrimary = variant === 'primary'

  return (
    <Link href={href}>
      <motion.div
        onMouseMove={handleMouse}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          reset()
        }}
        animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
        transition={{ type: 'spring', ...SPRING.snappy }}
        className={`group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-sm overflow-hidden transition-all duration-300 ${
          isPrimary
            ? 'bg-[#FF3B30] text-white hover:shadow-[0_8px_32px_rgba(255,59,48,0.4)]'
            : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
        }`}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={isHovered && !reduceMotion ? { x: ['200%', '-200%'] } : {}}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.5,
            ease: 'linear',
          }}
          style={{ x: '-200%' }}
        />

        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.div>
    </Link>
  )
}
