'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export default function RevealImage({ src, alt, className = '', priority = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const overlay = containerRef.current.querySelector('.reveal-overlay')
    const image = containerRef.current.querySelector('img')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
    })

    // 1. Overlay slides from top to bottom (reveals image)
    tl.fromTo(overlay,
      { scaleY: 1 },
      { scaleY: 0, duration: 0.8, ease: 'power3.inOut', transformOrigin: 'top' }
    )

    // 2. Image subtle zoom out (starts zoomed, scales down)
    tl.fromTo(image,
      { scale: 1.3 },
      { scale: 1, duration: 1.2, ease: 'power2.out' },
      '-=0.6'
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Overlay that animates */}
      <div className="reveal-overlay absolute inset-0 z-10 bg-[#27272A] origin-bottom" />

      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
        quality={75}
      />
    </div>
  )
}
