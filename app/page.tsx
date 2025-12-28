import HomeHero from '@/components/sections/HomeHero'
import ProofStrip from '@/components/sections/ProofStrip'
import AboutSection from '@/components/sections/AboutSection'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import ServicesSection from '@/components/sections/ServicesSection'
import ProcessSection from '@/components/sections/ProcessSection'
import HistoryTeaser from '@/components/sections/HistoryTeaser'
import StandardsSection from '@/components/sections/StandardsSection'
import CtaSection from '@/components/sections/CtaSection'

export default function Home() {
  return (
    <>
      <HomeHero />
      <ProofStrip />
      <AboutSection />
      <FeaturedProjects />
      <ServicesSection />
      <ProcessSection />
      <HistoryTeaser />
      <StandardsSection />
      <CtaSection />
    </>
  )
}

