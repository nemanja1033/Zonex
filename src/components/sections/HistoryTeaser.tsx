"use client"

import Container from '@/components/ui/Container'
import { timeline } from '@/content/content'
import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'

export default function HistoryTeaser() {
  const items = timeline.slice(0, 3)

  return (
    <section className="section-divider section section-surface">
      <Container>
        <div className="section-head">
          <Reveal>
            <div>
              <p className="eyebrow">Istorija</p>
              <h2 className="mt-4 section-title">Kontinuitet rada od 1993.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/company" className="link-underline text-micro font-mono uppercase tracking-micro">
              Pogledajte istoriju
            </Link>
          </Reveal>
        </div>
        <div className="mt-10 space-y-6">
          {items.map((item, index) => (
            <Reveal key={item.year} delay={index * 0.05}>
              <div className="card-surface grid gap-4 rounded-lg p-6 md:grid-cols-[120px_1fr]">
                <p className="text-h4 font-display text-white">{item.year}</p>
                <div>
                  <h3 className="font-display text-h4 text-white">{item.title}</h3>
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
