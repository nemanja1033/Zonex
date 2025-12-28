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
      <div className="panel flex flex-wrap items-start gap-8 p-6 text-small">
        <FilterGroup label="Type" items={types} value={type} onChange={setType} />
        <FilterGroup label="Status" items={statuses} value={status} onChange={setStatus} />
        <FilterGroup label="Location" items={locations} value={location} onChange={setLocation} />
      </div>
      <div className="grid gap-6 text-micro font-mono uppercase tracking-micro text-muted md:grid-cols-[180px_1.3fr_0.7fr]">
        <span>Preview</span>
        <span>Projekat</span>
        <span>Meta</span>
      </div>
      <motion.div layout className="border-t border-border">
        <AnimatePresence>
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
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
            className={`border px-3 py-1.5 text-micro font-mono uppercase tracking-micro transition-colors focus:outline-none focus:ring-1 focus:ring-accent ${
              value === item
                ? 'border-accent bg-grey-100 text-textDark'
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
