import Container from '@/components/ui/Container'

type PageHeaderProps = {
  eyebrow: string
  title: string
  subtitle?: string
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="page-hero">
      <div className="absolute inset-0 navy-scrim" aria-hidden="true" />
      <div className="absolute inset-0 blueprint-grid opacity-40" aria-hidden="true" />
      <Container className="relative z-10 py-[calc(var(--section-padding)+2.5rem)]">
        <div className="flex items-center gap-4">
          <span className="section-number text-white/80">01</span>
          <span className="section-rule bg-white/60" />
          <p className="eyebrow-light">{eyebrow}</p>
        </div>
        <h1 className="mt-4 hero-title">{title}</h1>
        {subtitle ? <p className="mt-4 max-w-2xl hero-copy">{subtitle}</p> : null}
      </Container>
    </section>
  )
}
