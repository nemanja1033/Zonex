import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import { about } from '@/content/content'

export default function AboutSection() {
  return (
    <section className="section-divider bg-white section">
      <Container>
        <div className="section-head">
          <Reveal>
            <div>
              <div className="flex items-center gap-4">
                <span className="section-number">02</span>
                <span className="section-rule" />
                <span className="eyebrow">O nama</span>
              </div>
              <h2 className="mt-4 section-title">{about.title}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl body-muted">{about.description}</p>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {about.highlights.map((item) => (
            <div key={item} className="panel p-6">
              <p className="text-h3 font-display text-textDark">{item}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
