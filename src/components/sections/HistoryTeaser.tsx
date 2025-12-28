import Container from '@/components/ui/Container'
import { timeline } from '@/content/content'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

export default function HistoryTeaser() {
  const items = timeline.slice(0, 3)

  return (
    <section className="section-divider bg-white section">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <div>
              <p className="eyebrow">05 / History</p>
              <h2 className="mt-3 section-title">Kontinuitet rada od 1993.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/company" className="link-underline text-micro font-mono uppercase tracking-micro">
              Pogledajte istoriju
            </Link>
          </Reveal>
        </div>
        <div className="mt-10 space-y-6">
          {items.map((item, index) => (
            <Reveal key={item.year} delay={index * 0.05}>
              <div className="grid gap-4 border-l border-border pl-6 md:grid-cols-[120px_1fr]">
                <p className="text-h4 font-display">{item.year}</p>
                <div>
                  <h3 className="font-display text-h4">{item.title}</h3>
                  <p className="mt-2 body-muted">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
