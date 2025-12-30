import type { Metadata } from 'next'
import './globals.css'
import SiteLayout from '@/components/layout/SiteLayout'

export const metadata: Metadata = {
  title: 'Zonex Inženjering d.o.o. - Inženjering izvrsnosti od 1993.',
  description: 'Više od 30 godina iskustva u izgradnji i projektovanju. Brzina, efikasnost i kvalitet u svakom projektu.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  )
}
