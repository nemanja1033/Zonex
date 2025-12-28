"use client"

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectListItem from '@/components/projects/ProjectListItem'
import { projects } from '@/content/content'

const types = ['All', 'Retail', 'Hospitality', 'Energy', 'Mixed']
const statuses = ['All', 'Završeno', 'U toku']
const locations = ['All', 'Zrenjanin', 'Zlatibor', 'Šimanovci']

export default function ProjectsGrid() {
  const [type, setType] = useState('All')
  const [status, setStatus] = useState('All')
  const [location, setLocation] = useState('All')

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesType = type === 'All' || project.type === type
      const matchesStatus = status === 'All' || project.status === status
      const matchesLocation =
        location === 'All' || project.location.toLowerCase().includes(location.toLowerCase())
      return matchesType && matchesStatus && matchesLocation
    })
  }, [type, status, location])

  return (
    <div className="space-y-10">
      <motion.div
        layout
        className="panel flex flex-wrap items-start gap-8 p-6 text-small"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        <FilterGroup label="Type" items={types} value={type} onChange={setType} />
        <FilterGroup label="Status" items={statuses} value={status} onChange={setStatus} />
        <FilterGroup label="Location" items={locations} value={location} onChange={setLocation} />
      </motion.div>
      <div className="grid gap-6 text-micro font-mono uppercase tracking-micro text-muted md:grid-cols-[200px_1.2fr_0.8fr]">
        <span>Preview</span>
        <span>Projekat</span>
        <span>Meta</span>
      </div>
      <motion.div layout className="border-t border-border">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            >
              <ProjectListItem project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

type FilterGroupProps = {
  label: string
  items: string[]
  value: string
  onChange: (value: string) => void
}

function FilterGroup({ label, items, value, onChange }: FilterGroupProps) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`rounded-full border px-4 py-1.5 text-micro font-mono uppercase tracking-micro transition-colors focus:outline-none focus:ring-1 focus:ring-accent ${
              value === item
                ? 'border-accent bg-grey-100 text-textDark shadow-[0_6px_16px_rgba(47,128,237,0.18)]'
                : 'border-border bg-white text-muted hover:bg-grey-100 hover:text-textDark'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
