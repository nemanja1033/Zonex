'use client'

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { EASING, SPRING } from '@/lib/animations'

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

  const springConfig = { stiffness: 100, damping: 15 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const rotateX = useTransform(springY, [0, 1], [8, -8])
  const rotateY = useTransform(springX, [0, 1], [-8, 8])

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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASING.power4 }}
      className="group relative"
    >
      <Link href={href}>
        <div className="relative bg-[#242424] rounded-3xl overflow-hidden border border-white/8 hover:border-white/12 transition-all duration-500">
          
          {/* Glow effect following cursor */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(220, 38, 38, 0.12), transparent 40%)`,
            }}
          />

          {/* Image Section */}
          <div className="relative h-[280px] lg:h-[320px] overflow-hidden">
            <motion.div
              style={reduceMotion ? {} : { transform: 'translateZ(50px)' }}
              whileHover={reduceMotion ? {} : { scale: 1.05 }}
              transition={{ duration: 0.6, ease: EASING.power4 }}
              className="relative w-full h-full"
            >
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#2C2C2E] to-[#242424]">
                  <Image
                    src="/images/project-placeholder.svg"
                    alt={`${title} placeholder`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-10 opacity-40"
                  />
                  {/* Grid overlay for placeholder */}
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                      `,
                      backgroundSize: '32px 32px',
                    }}
                  />
                </div>
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#242424] via-[#242424]/60 to-transparent" />
            </motion.div>

            {/* Tags floating above image */}
            {tags.length > 0 && (
              <motion.div
                style={reduceMotion ? {} : { transform: 'translateZ(80px)' }}
                className="absolute top-6 left-6 flex flex-wrap gap-2 z-20"
              >
                {tags.slice(0, 3).map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: EASING.power4 }}
                    className="px-3 py-1.5 rounded-full bg-[#1A1A1A]/80 backdrop-blur-md border border-white/10 text-[10px] text-white/70 uppercase tracking-[0.15em] font-medium"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>

          {/* Content Section */}
          <motion.div
            style={reduceMotion ? {} : { transform: 'translateZ(75px)' }}
            className="p-8"
          >
            {/* Location */}
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-medium">
              {location}
            </p>

            {/* Title */}
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-[#DC2626] transition-colors duration-300">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/60 leading-relaxed mb-6 line-clamp-2">
              {description}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-6 pb-6 border-b border-white/8">
              <div>
                <span className="block text-[10px] text-white/40 mb-1 uppercase tracking-[0.15em]">
                  Rok
                </span>
                <span className="text-sm text-white font-medium">{duration}</span>
              </div>
              <div>
                <span className="block text-[10px] text-white/40 mb-1 uppercase tracking-[0.15em]">
                  Model
                </span>
                <span className="text-sm text-white font-medium">{model}</span>
              </div>
            </div>

            {/* CTA Link */}
            <motion.div
              className="flex items-center gap-2 text-sm text-[#DC2626] font-medium"
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ duration: 0.3, ease: EASING.power4 }}
            >
              <span>Pogledaj detalje</span>
              <motion.span
                animate={isHovered ? { x: 3, y: -3 } : { x: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASING.power4 }}
              >
                <ArrowUpRight size={16} />
              </motion.span>
            </motion.div>
          </motion.div>

          {/* 3D Shadow effect */}
          <motion.div
            className="absolute -inset-4 bg-[#DC2626]/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
            style={reduceMotion ? {} : { transform: 'translateZ(-50px)' }}
          />

          {/* Border glow on hover */}
          <div className="absolute inset-0 rounded-3xl border border-[#DC2626]/0 group-hover:border-[#DC2626]/20 transition-all duration-500 pointer-events-none" />
          
          {/* Bottom accent line */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#DC2626] to-[#DC2626]/50"
            initial={{ scaleX: 0 }}
            animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
            style={{ transformOrigin: 'left' }}
            transition={{ duration: 0.4, ease: EASING.power4 }}
          />
        </div>
      </Link>
    </motion.div>
  )
}
