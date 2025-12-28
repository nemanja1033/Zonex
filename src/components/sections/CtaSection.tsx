import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'

export default function CtaSection() {
  return (
    <section className="bg-navy-900 text-white section">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <div className="space-y-4">
              <p className="eyebrow-light">07 / Next step</p>
              <h2 className="section-title-light">Spremni za projekat sa jasnim standardima?</h2>
              <p className="text-small text-white/90">
                Pošaljite osnovne informacije o projektu, a mi vraćamo strukturu, obim i predlog dinamike.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex items-center justify-start md:justify-end">
            <Button href="/contact">Započnite razgovor</Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
