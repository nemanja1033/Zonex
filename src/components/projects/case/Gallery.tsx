type GalleryProps = {
  title?: string
}

export default function Gallery({ title = 'Gallery' }: GalleryProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Gallery</p>
        <h3 className="mt-3 font-display text-h3">{title}</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="relative h-48 overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-grey-200 via-grey-100 to-grey-200"
          />
        ))}
      </div>
    </div>
  )
}
