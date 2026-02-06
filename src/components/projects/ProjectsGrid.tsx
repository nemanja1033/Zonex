"use client"

import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ProjectCard from '@/components/projects/ProjectCard'
import { projects } from '../../../data/projects'
import useCoarsePointer from '@/components/hooks/useCoarsePointer'
import { EASING } from '@/lib/animations'

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
        className="flex flex-wrap items-start gap-8 rounded-2xl bg-[#242424] border border-white/8 p-6"
        initial={shouldReduce ? undefined : isLite ? { opacity: 0, y: 8 } : { opacity: 0, y: 12 }}
        animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
        transition={
          shouldReduce
            ? { duration: 0 }
            : isLite
              ? { duration: 0.15, ease: EASING.power4 }
              : { duration: 0.3, ease: EASING.power4 }
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
                    ? { duration: 0.15, delay: Math.min(index * 0.04, 0.2), ease: EASING.power4 }
                    : { duration: 0.3, delay: Math.min(index * 0.05, 0.25), ease: EASING.power4 }
              }
            >
              <ProjectCard
                title={project.name}
                location={project.location}
                description={project.summary}
                duration={project.timeline}
                model={project.delivery}
                image={project.image}
                tags={project.focus}
                href={`/projects/${project.slug}`}
                index={index}
              />
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
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">{label}</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={`${label} filter`}>
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            aria-pressed={value === item.value}
            className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              value === item.value
                ? 'bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20'
                : 'bg-white/5 text-white/60 border border-white/8 hover:bg-white/10 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
