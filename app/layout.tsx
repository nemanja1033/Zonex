import type { Metadata } from 'next'
import './globals.css'
import SiteLayout from '@/components/layout/SiteLayout'
import SmoothScroll from '@/components/SmoothScroll'
import Preloader from '@/components/Preloader'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'Zonex Inženjering d.o.o. — Generalni izvođač od 1993. | Beograd',
  description: 'Više od 30 godina iskustva u izgradnji i projektovanju. Zonex vodi projekte kroz jasne faze, kontrolu kvaliteta i preciznu koordinaciju svih učesnika.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      <body>
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          <SiteLayout>{children}</SiteLayout>
        </SmoothScroll>
      </body>
    </html>
  )
}
