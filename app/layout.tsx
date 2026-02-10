import type { Metadata } from 'next'
import './globals.css'
import SiteLayout from '@/components/layout/SiteLayout'
import SmoothScroll from '@/components/SmoothScroll'
import Preloader from '@/components/Preloader'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  metadataBase: new URL('https://zonextest.vercel.app'),
  title: {
    default: 'Zonex Inženjering d.o.o. — Generalni izvođač od 1993. | Beograd',
    template: '%s | Zonex Inženjering',
  },
  description: 'Zonex Inženjering je generalni izvođač radova iz Beograda sa preko 30 godina iskustva. Izgradnja objekata ključ u ruke — McDonald\'s, KFC, benzinske stanice, stambeni kompleksi.',
  keywords: ['generalni izvođač', 'građevinska firma Beograd', 'izgradnja objekata', 'ključ u ruke', 'Zonex Inženjering', 'građevinski radovi Srbija', 'inženjering Beograd'],
  authors: [{ name: 'Zonex Inženjering d.o.o.' }],
  creator: 'Zonex Inženjering d.o.o.',
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    url: 'https://zonextest.vercel.app',
    siteName: 'Zonex Inženjering',
    title: 'Zonex Inženjering d.o.o. — Generalni izvođač od 1993.',
    description: 'Izgradnja objekata ključ u ruke. Preko 30 godina iskustva u realizaciji zahtevnih projekata u Srbiji.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Zonex Inženjering' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zonex Inženjering — Generalni izvođač od 1993.',
    description: 'Izgradnja objekata ključ u ruke. Beograd, Srbija.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: 'https://zonextest.vercel.app',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: 'Zonex Inženjering d.o.o.',
  description: 'Generalni izvođač radova sa preko 30 godina iskustva. Izgradnja objekata ključ u ruke.',
  url: 'https://zonextest.vercel.app',
  logo: 'https://zonextest.vercel.app/logo.png',
  foundingDate: '1993',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Beograd',
    addressCountry: 'RS',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Serbia',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Građevinske usluge',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Izgradnja objekata ključ u ruke' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Završni radovi' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Projektno vođenje' } },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
