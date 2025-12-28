import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/layout/PageTransition'

type SiteLayoutProps = {
  children: ReactNode
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(155,14,28,0.18),transparent_70%)] blur-3xl" />
        <div className="absolute right-[-8%] top-[40%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(10,10,12,0.16),transparent_70%)] blur-3xl" />
      </div>
      <div className="site-sheen" aria-hidden="true" />
      <div className="site-noise" aria-hidden="true" />
      <Navbar />
      <PageTransition>
        <main className="relative z-10">{children}</main>
      </PageTransition>
      <Footer />
    </div>
  )
}
