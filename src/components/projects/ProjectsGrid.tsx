"use client"

import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ProjectCard from '@/components/projects/ProjectCard'
import { projects } from '../../../data/projects'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'
import { transition } from '@/lib/motion'

const types = [
  { label: 'Svi', value: 'All' },
  { label: 'Fast food', value: 'Fast food' },
  { label: 'Retail', value: 'Retail' },
  { label: 'Residential', value: 'Residential' },
]

export default function ProjectsGrid() {
  const reduceMotion = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const shouldReduce = reduceMotion
  const disableLayout = reduceMotion || isCoarse
  const isLite = isCoarse && !reduceMotion
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
        layout={!disableLayout}
        className="card-surface flex flex-wrap items-start gap-8 rounded-lg p-5 text-small md:p-6"
        initial={shouldReduce ? undefined : isLite ? { opacity: 0, y: 8 } : { opacity: 0, y: 12 }}
        animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
        transition={
          shouldReduce
            ? { duration: 0 }
            : isLite
              ? transition.fast
              : transition.base
        }
      >
        <FilterGroup label="Tip" items={types} value={type} onChange={setType} />
        <FilterGroup label="Lokacija" items={locations} value={location} onChange={setLocation} />
      </motion.div>
      <motion.div layout={!disableLayout} className="grid gap-8 md:grid-cols-2">
        <AnimatePresence mode={shouldReduce ? 'sync' : 'popLayout'}>
          {filtered.map((project, index) => (
            <motion.div
              key={project.slug}
              layout={!disableLayout}
              initial={shouldReduce ? undefined : isLite ? { opacity: 0, y: 10 } : { opacity: 0, y: 20 }}
              animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
              exit={shouldReduce ? undefined : isLite ? { opacity: 0, y: 10 } : { opacity: 0, y: 20 }}
              transition={
                shouldReduce
                  ? { duration: 0 }
                  : isLite
                    ? { ...transition.fast, delay: Math.min(index * 0.04, 0.2) }
                    : { ...transition.base, delay: Math.min(index * 0.05, 0.25) }
              }
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
      <div className="mt-3 segmented-control" role="group" aria-label={`${label} filter`}>
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            aria-pressed={value === item.value}
            className={`segmented-pill relative overflow-hidden border border-transparent px-3 py-2 font-mono uppercase tracking-micro transition-all focus:outline-none focus:ring-1 focus:ring-accent sm:px-4 sm:py-1.5 ${
              value === item.value ? 'segmented-pill--active text-white' : 'text-white/70 hover:text-white'
            }`}
          >
            {value === item.value && (
              <motion.span
                layoutId={`segmented-${label}`}
                className="absolute inset-0 rounded-full bg-[var(--accent-soft)]"
                transition={transition.fast}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
