import ProjectMeta from '@/components/projects/ProjectMeta'
import type { Project } from '@/content/content'

type MetaGridProps = {
  project: Project
}

export default function MetaGrid({ project }: MetaGridProps) {
  return (
    <div className="surface-elevated grid gap-6 p-6 md:grid-cols-3">
      <ProjectMeta label="Scope" value={project.scope ?? '—'} />
      <ProjectMeta label="Delivery model" value={project.deliveryModel ?? '—'} />
      <ProjectMeta label="Works performed" value={project.works ?? '—'} />
      <ProjectMeta label="Timeline" value={project.timeline ?? '—'} />
      <ProjectMeta label="Client type" value={project.clientType ?? '—'} />
      <ProjectMeta label="Status" value={project.status} />
    </div>
  )
}
