import HomeHero from '@/components/sections/HomeHero'
import SignalSection from '@/components/sections/SignalSection'
import ProofStrip from '@/components/sections/ProofStrip'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import ServicesSection from '@/components/sections/ServicesSection'
import ProcessSection from '@/components/sections/ProcessSection'
import StandardsSection from '@/components/sections/StandardsSection'
import CtaSection from '@/components/sections/CtaSection'

export default function Home() {
  return (
    <>
      <HomeHero />
      <SignalSection />
      <ProofStrip />
      <ServicesSection />
      <FeaturedProjects />
      <ProcessSection />
      <StandardsSection />
      <CtaSection />
    </>
  )
}
