'use client'

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'
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
  const reduceMotion = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const springConfig = { stiffness: 150, damping: 20 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const rotateX = useTransform(springY, [0, 1], [5, -5])
  const rotateY = useTransform(springX, [0, 1], [-5, 5])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const newX = (e.clientX - rect.left) / rect.width
    const newY = (e.clientY - rect.top) / rect.height

    x.set(newX)
    y.set(newY)
    setMousePosition({ x: newX, y: newY })
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={reduceMotion ? {} : {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASING.power4 }}
      className="group relative"
    >
      <Link href={href}>
        <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-3xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]">

          {/* Glow effect following cursor */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
            style={{
              background: `radial-gradient(700px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(220, 38, 38, 0.1), transparent 40%)`,
            }}
          />

          {/* Image Section */}
          <div className="relative h-[300px] lg:h-[340px] overflow-hidden">
            <motion.div
              style={reduceMotion ? {} : { transform: 'translateZ(40px)' }}
              className="relative w-full h-full"
            >
              {image ? (
                <motion.div
                  className="relative w-full h-full"
                  animate={isHovered && !reduceMotion ? { scale: 1.08 } : { scale: 1 }}
                  transition={{ duration: 0.7, ease: EASING.power4 }}
                >
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F]">
                  <Image
                    src="/images/project-placeholder.svg"
                    alt={`${title} placeholder`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-10 opacity-30"
                  />
                  {/* Grid overlay for placeholder */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />
                </div>
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent" />
            </motion.div>

            {/* Tags floating above image */}
            {tags.length > 0 && (
              <motion.div
                style={reduceMotion ? {} : { transform: 'translateZ(60px)' }}
                className="absolute top-6 left-6 flex flex-wrap gap-2 z-20"
              >
                {tags.slice(0, 3).map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4, ease: EASING.power4 }}
                    className="px-3 py-1.5 rounded-full bg-[#0A0A0A]/70 backdrop-blur-md border border-white/[0.08] text-[10px] text-white/60 uppercase tracking-[0.15em] font-medium"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>

          {/* Content Section */}
          <motion.div
            style={reduceMotion ? {} : { transform: 'translateZ(50px)' }}
            className="p-8 lg:p-10"
          >
            {/* Location */}
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 mb-4 font-medium">
              {location}
            </p>

            {/* Title */}
            <motion.h3
              className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-[#DC2626] transition-colors duration-300"
              animate={isHovered && !reduceMotion ? { x: 4 } : { x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>

            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed mb-8 line-clamp-2">
              {description}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap gap-x-10 gap-y-4 mb-8 pb-8 border-b border-white/[0.06]">
              <div>
                <span className="block text-[10px] text-white/30 mb-1.5 uppercase tracking-[0.2em]">
                  Rok
                </span>
                <span className="text-sm text-white font-medium">{duration}</span>
              </div>
              <div>
                <span className="block text-[10px] text-white/30 mb-1.5 uppercase tracking-[0.2em]">
                  Model
                </span>
                <span className="text-sm text-white font-medium">{model}</span>
              </div>
            </div>

            {/* CTA Link */}
            <motion.div
              className="flex items-center gap-3 text-sm text-[#DC2626] font-medium"
              animate={isHovered ? { x: 8 } : { x: 0 }}
              transition={{ duration: 0.3, ease: EASING.power4 }}
            >
              <span className="uppercase tracking-[0.1em]">Pogledaj detalje</span>
              <motion.span
                animate={isHovered ? { x: 4, y: -4 } : { x: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASING.power4 }}
              >
                <ArrowUpRight size={18} />
              </motion.span>
            </motion.div>
          </motion.div>

          {/* 3D Shadow effect */}
          <motion.div
            className="absolute -inset-6 bg-[#DC2626]/5 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
            style={reduceMotion ? {} : { transform: 'translateZ(-40px)' }}
          />

          {/* Border glow on hover */}
          <div className="absolute inset-0 rounded-3xl border-2 border-[#DC2626]/0 group-hover:border-[#DC2626]/15 transition-all duration-500 pointer-events-none" />

          {/* Bottom accent line */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#DC2626] via-[#DC2626]/60 to-transparent"
            initial={{ scaleX: 0 }}
            animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
            style={{ transformOrigin: 'left' }}
            transition={{ duration: 0.5, ease: EASING.power4 }}
          />
        </div>
      </Link>
    </motion.div>
  )
}
