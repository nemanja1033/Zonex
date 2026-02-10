"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { site } from '../../../data/site'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1a1a1e]" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 py-32">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Tagline */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="h-[2px] w-10 bg-[#DC2626]" />
            <span className="text-[#DC2626] text-[11px] font-medium tracking-[0.15em] uppercase">
              {site.hero.tagline}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {site.hero.title}<br />
            <span className="text-gray-500">{site.hero.titleAccent}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-lg mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {site.hero.subtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/projects"
              className="bg-[#DC2626] hover:bg-[#b91c1c] text-white px-7 py-3.5 text-sm font-medium tracking-wide transition-colors"
            >
              Pogledajte projekte
            </Link>
            <Link
              href="/contact"
              className="border border-white/15 hover:border-white/30 text-white px-7 py-3.5 text-sm font-medium tracking-wide transition-colors"
            >
              Kontakt
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/[0.06]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {site.stats.map((stat, i) => (
              <div key={i} className="py-5 px-4 md:px-6">
                <div className={`font-semibold text-sm md:text-base ${i === 0 ? 'text-[#DC2626]' : 'text-white'}`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 text-[11px] tracking-wider uppercase mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
