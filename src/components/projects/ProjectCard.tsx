'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { EASING } from '@/lib/animations'

interface ProjectCardProps {
  title: string
  location: string
  description: string
  duration: string
  model: string
  image?: string
  tags?: string[]
  href: string
  index?: number
}

export default function ProjectCard({
  title,
  location,
  description,
  duration,
  model,
  image,
  tags = [],
  href,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: EASING.power4 }}
      className="group"
    >
      <Link href={href} className="block transition-transform duration-300 hover:-translate-y-1">
        <div className="relative overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)]">

          {/* Image Section */}
          <div className="relative h-[280px] lg:h-[320px] overflow-hidden">
            <div className="relative w-full h-full">
              {image ? (
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a32] to-[#1f1f23] flex flex-col items-center justify-center gap-3">
                  <svg className="w-10 h-10 text-white/[0.08]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l6-4 6 4 6-4v14l-6 4-6-4-6 4V6z" />
                  </svg>
                  <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase">Foto uskoro</span>
                </div>
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#303036] via-[#303036]/40 to-transparent" />
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
                {tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-[#27272A]/90 border border-white/[0.12] text-[10px] text-white/60 uppercase tracking-[0.15em] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6 lg:p-8">
            {/* Location */}
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 mb-3 font-medium">
              {location}
            </p>

            {/* Title */}
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-[#DC2626] transition-colors duration-300">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed mb-6 line-clamp-2">
              {description}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-6 pb-6 border-b border-white/[0.12]">
              <div>
                <span className="block text-[10px] text-white/30 mb-1 uppercase tracking-[0.2em]">
                  Rok
                </span>
                <span className="text-sm text-white font-medium">{duration}</span>
              </div>
              <div>
                <span className="block text-[10px] text-white/30 mb-1 uppercase tracking-[0.2em]">
                  Model
                </span>
                <span className="text-sm text-white font-medium">{model}</span>
              </div>
            </div>

            {/* CTA Link */}
            <div className="flex items-center gap-2 text-sm text-[#DC2626] font-medium group-hover:gap-3 transition-all duration-300">
              <span className="uppercase tracking-[0.1em]">Pogledaj detalje</span>
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#DC2626] to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
        </div>
      </Link>
    </motion.div>
  )
}
