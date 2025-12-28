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
      <Container className="relative z-10 py-[calc(var(--section-padding)+2.5rem)]">
        <p className="eyebrow-light">{eyebrow}</p>
        <h1 className="mt-4 hero-title">{title}</h1>
        {subtitle ? <p className="mt-4 max-w-2xl hero-copy">{subtitle}</p> : null}
      </Container>
    </section>
  )
}
