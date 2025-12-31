import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/layout/PageTransition'
import CursorAura from '@/components/ui/CursorAura'
import MotionGate from '@/components/layout/MotionGate'

type SiteLayoutProps = {
  children: ReactNode
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(178,30,42,0.18),transparent_70%)] blur-3xl" />
        <div className="absolute right-[-8%] top-[40%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(12,18,28,0.6),transparent_70%)] blur-3xl" />
      </div>
      <div className="site-sheen" aria-hidden="true" />
      <div className="site-noise" aria-hidden="true" />
      <CursorAura />
      <Navbar />
      <MotionGate>
        <PageTransition>
          <main className="relative z-10">{children}</main>
        </PageTransition>
      </MotionGate>
      <Footer />
    </div>
  )
}
