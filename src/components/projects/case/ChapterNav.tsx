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
    <div className="sticky top-28 space-y-6 rounded-3xl border border-border/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.95),rgba(247,242,236,0.9))] p-6 shadow-[0_24px_55px_rgba(12,17,23,0.14)] backdrop-blur">
      <div>
        <p className="eyebrow">Chapters</p>
        <div className="mt-2 h-[2px] w-full bg-grey-200">
          <div
            className="h-full bg-[linear-gradient(90deg,rgba(255,122,26,0.9),rgba(23,176,168,0.9))] transition-[width] duration-200"
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
                ? 'border-[rgba(255,122,26,0.9)] text-textDark'
                : 'border-grey-200 text-muted hover:text-textDark'
            }`}
          >
            {chapter.label}
          </a>
        ))}
      </div>
    </div>
  )
}
