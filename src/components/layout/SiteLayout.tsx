import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MotionProvider from '@/components/motion/MotionProvider'
import PageTransition from '@/components/motion/PageTransition'
import PrefetchRoutes from '@/components/routing/PrefetchRoutes'

type SiteLayoutProps = {
  children: ReactNode
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="site-noise" aria-hidden="true" />
      <Navbar />
      <MotionProvider>
        <PageTransition>
          <main className="relative z-10">{children}</main>
        </PageTransition>
      </MotionProvider>
      <PrefetchRoutes />
      <Footer />
    </div>
  )
}
