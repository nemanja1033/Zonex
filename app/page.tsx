import HomeHero from '@/components/sections/HomeHero'
import ProofStrip from '@/components/sections/ProofStrip'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import ServicesSection from '@/components/sections/ServicesSection'
import ProcessSection from '@/components/sections/ProcessSection'
import CtaSection from '@/components/sections/CtaSection'

export default function Home() {
  return (
    <>
      {/*
        Removed/Merged: duplicate control/standards blocks,
        simplified to core credibility, services, projects, process, and CTA.
      */}
      <HomeHero />
      <ProofStrip />
      <ServicesSection />
      <FeaturedProjects />
      <ProcessSection />
      <CtaSection />
    </>
  )
}
