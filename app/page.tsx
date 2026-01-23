import HeroSignature from '@/components/hero/HeroSignature'
import ProofStrip from '@/components/sections/ProofStrip'
import ServicesPinnedStory from '@/components/sections/ServicesPinnedStory'
import ProjectsShowcase from '@/components/sections/ProjectsShowcase'
import ProcessSection from '@/components/sections/ProcessSection'
import CtaSection from '@/components/sections/CtaSection'

export default function Home() {
  return (
    <>
      {/*
        Removed/Merged: duplicate control/standards blocks,
        simplified to core credibility, services, projects, process, and CTA.
      */}
      <HeroSignature />
      <ProofStrip />
      <ServicesPinnedStory />
      <ProjectsShowcase />
      <ProcessSection />
      <CtaSection />
    </>
  )
}
