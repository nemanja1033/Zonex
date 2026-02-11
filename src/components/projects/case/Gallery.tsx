type GalleryProps = {
  title?: string
}

export default function Gallery({ title = 'Gallery' }: GalleryProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Galerija</p>
        <h3 className="mt-3 font-display text-h3">{title}</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="card-surface relative h-48 overflow-hidden border border-white/[0.06]"
          />
        ))}
      </div>
    </div>
  )
}
