import ProjectMeta from '@/components/projects/ProjectMeta'
import type { Project } from '@/content/content'

type MetaGridProps = {
  project: Project
}

export default function MetaGrid({ project }: MetaGridProps) {
  return (
    <div className="lux-border lux-sheen grid gap-6 rounded-3xl bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(247,242,236,0.9))] p-6 shadow-[0_22px_55px_rgba(12,17,23,0.12)] md:grid-cols-3">
      <ProjectMeta label="Scope" value={project.scope ?? '—'} />
      <ProjectMeta label="Delivery model" value={project.deliveryModel ?? '—'} />
      <ProjectMeta label="Works performed" value={project.works ?? '—'} />
      <ProjectMeta label="Timeline" value={project.timeline ?? '—'} />
      <ProjectMeta label="Client type" value={project.clientType ?? '—'} />
      <ProjectMeta label="Status" value={project.status} />
    </div>
  )
}
