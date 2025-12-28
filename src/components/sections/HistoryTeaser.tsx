import Container from '@/components/ui/Container'
import { timeline } from '@/content/content'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

export default function HistoryTeaser() {
  const items = timeline.slice(0, 3)

  return (
    <section className="section-divider bg-white section">
      <Container>
        <div className="section-head">
          <Reveal>
            <div>
              <div className="flex items-center gap-4">
                <span className="section-number">05</span>
                <span className="section-rule" />
                <span className="eyebrow">History</span>
              </div>
              <h2 className="mt-4 section-title">Kontinuitet rada od 1993.</h2>
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
