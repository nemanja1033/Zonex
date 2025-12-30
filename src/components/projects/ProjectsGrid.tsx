"use client"

import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ProjectCard from '@/components/projects/ProjectCard'
import { projects } from '../../../data/projects'

const types = [
  { label: 'Svi', value: 'All' },
  { label: 'Fast food', value: 'Fast food' },
  { label: 'Retail', value: 'Retail' },
  { label: 'Residential', value: 'Residential' },
]

export default function ProjectsGrid() {
  const reduceMotion = useReducedMotion()
  const [type, setType] = useState('All')
  const [location, setLocation] = useState('All')

  const locations = useMemo(() => {
    const unique = Array.from(new Set(projects.map((project) => project.city)))
    return [{ label: 'Sve', value: 'All' }, ...unique.map((city) => ({ label: city, value: city }))]
  }, [])

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesType = type === 'All' || project.category === type
      const matchesLocation = location === 'All' || project.city === location
      return matchesType && matchesLocation
    })
  }, [type, location])

  return (
    <div className="space-y-10">
      <motion.div
        layout
        className="flex flex-wrap items-start gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-small shadow-[0_20px_45px_rgba(3,6,12,0.4)] backdrop-blur"
        initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        <FilterGroup label="Tip" items={types} value={type} onChange={setType} />
        <FilterGroup label="Lokacija" items={locations} value={location} onChange={setLocation} />
      </motion.div>
      <motion.div layout className="grid gap-8 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={reduceMotion ? undefined : { opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 24, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

type FilterGroupProps = {
  label: string
  items: Array<{ label: string; value: string }>
  value: string
  onChange: (value: string) => void
}

function FilterGroup({ label, items, value, onChange }: FilterGroupProps) {
  return (
    <div>
      <p className="text-micro font-mono uppercase tracking-micro text-white/60">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`rounded-full border px-4 py-1.5 text-micro font-mono uppercase tracking-micro transition-all focus:outline-none focus:ring-1 focus:ring-accent ${
              value === item.value
                ? 'border-[rgba(178,30,42,0.7)] bg-[linear-gradient(135deg,rgba(178,30,42,0.15),rgba(12,12,14,0.2))] text-white shadow-[0_8px_20px_rgba(178,30,42,0.22)]'
                : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
