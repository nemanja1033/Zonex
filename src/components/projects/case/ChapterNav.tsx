"use client"

import { useEffect, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'

type Chapter = {
  id: string
  label: string
}

type ChapterNavProps = {
  chapters: Chapter[]
}

export default function ChapterNav({ chapters }: ChapterNavProps) {
  const { scrollYProgress } = useScroll()
  const [active, setActive] = useState(chapters[0]?.id ?? '')
  const [progress, setProgress] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest)
  })

  useEffect(() => {
    const observers = chapters.map((chapter) => {
      const section = document.getElementById(chapter.id)
      if (!section) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(chapter.id)
        },
        { rootMargin: '-35% 0px -60% 0px', threshold: 0.1 }
      )
      observer.observe(section)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [chapters])

  return (
    <div className="card-surface sticky top-28 space-y-6 rounded-lg p-6">
      <div>
        <p className="eyebrow">Poglavlja</p>
        <div className="mt-2 h-[2px] w-full bg-white/10">
          <div
            className="h-full bg-[var(--accent)] transition-[width] duration-200"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
      <div className="space-y-3 text-small">
        {chapters.map((chapter) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className={`block border-l-2 pl-3 transition-colors ${
              active === chapter.id
                ? 'border-[var(--accent)] text-white'
                : 'border-white/15 text-white/70 hover:text-white'
            }`}
          >
            {chapter.label}
          </a>
        ))}
      </div>
    </div>
  )
}
