import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'

const proofs = [
  { label: 'Founded', value: '1993' },
  { label: '30+ years', value: 'Stability' },
  { label: 'Delivery', value: 'Turnkey' },
  { label: 'Works', value: 'Finishing' },
  { label: 'Focus', value: 'Retail + Hospitality' },
]

export default function ProofStrip() {
  return (
    <section className="section-divider bg-grey-100">
      <Container className="grid gap-6 py-[calc(var(--section-padding)-2.5rem)] md:grid-cols-5">
        {proofs.map((proof, index) => (
          <Reveal key={proof.label} delay={index * 0.05}>
            <div className="border-l border-border pl-4">
              <p className="eyebrow">{proof.label}</p>
              <p className="mt-2 font-display text-h4 text-textDark">{proof.value}</p>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  )
}
