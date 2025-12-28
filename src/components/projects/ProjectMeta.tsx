type ProjectMetaProps = {
  label: string
  value: string
}

export default function ProjectMeta({ label, value }: ProjectMetaProps) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p className="mt-1 text-small text-textDark">{value}</p>
    </div>
  )
}
