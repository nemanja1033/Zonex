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

export default function ParallaxImage({ src, alt, className = '', priority = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current) return

    // Only apply parallax on desktop
    const mm = gsap.matchMedia()

    mm.add('(min-width: 769px)', () => {
      gsap.fromTo(imageRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      )
    })

    return () => mm.revert()
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={imageRef} className="parallax-img relative w-full h-[120%] -mt-[10%]">
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
    </div>
  )
}
