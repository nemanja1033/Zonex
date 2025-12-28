import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/layout/PageTransition'

type SiteLayoutProps = {
  children: ReactNode
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageTransition>
        <main className="relative z-10">{children}</main>
      </PageTransition>
      <Footer />
    </div>
  )
}
