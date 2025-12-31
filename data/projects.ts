export type FocusBadge = 'Vreme' | 'Kvalitet' | 'Bezbednost' | 'Standardi' | 'Životna sredina'

export type ProjectCategory = 'Fast food' | 'Retail' | 'Residential'

export type Project = {
  slug: string
  name: string
  category: ProjectCategory
  location: string
  city: string
  delivery: string
  scope: string
  timeline: string
  opened: string
  summary: string
  highlights: string[]
  focus: FocusBadge[]
  image?: string
  images?: Array<{ src: string; alt: string }>
}

export const projects: Project[] = [
  {
    slug: 'mcdonalds-zrenjanin',
    name: "McDonald's Zrenjanin",
    category: 'Fast food',
    location: 'BIG Shopping Center, Zrenjanin',
    city: 'Zrenjanin',
    delivery: 'Ključ u ruke',
    scope: 'Kompletna izgradnja od temelja do završnih radova.',
    timeline: '120 dana',
    opened: 'Februar 2025',
    summary:
      'Realizacija objekta u okviru retail kompleksa uz strogo definisane rokove i fokus na brzinu i kvalitet.',
    highlights: [
      'Realizacija kompletnog objekta u kratkom roku.',
      'Koordinacija svih faza i podizvođača.',
      'Kontrola kvaliteta završne obrade i standarda brenda.',
    ],
    focus: ['Vreme', 'Kvalitet', 'Standardi'],
  },
  {
    slug: 'mcdonalds-ruklada',
    name: "McDonald's Ruklada",
    category: 'Fast food',
    location: 'Uz MOL stanicu, autoput "Miloš Veliki" (smer ka Beogradu)',
    city: 'Ruklada',
    delivery: 'Završni radovi',
    scope: 'Finalni građevinski i završni radovi na objektu.',
    timeline: 'Definisani ugovoreni rokovi',
    opened: 'Mart 2025',
    summary:
      "Objekat realizovan uz poštovanje standarda McDonald's sistema i pouzdanu isporuku u zadatim rokovima.",
    highlights: [
      "Dugoročna saradnja na McDonald's projektima u Srbiji.",
      "Završetak 38. McDonald's objekta u Srbiji.",
      'Precizna koordinacija i kontrola detalja završne obrade.',
    ],
    focus: ['Standardi', 'Vreme', 'Kvalitet'],
  },
  {
    slug: 'zlatiborski-konaci',
    name: 'Zlatiborski konaci',
    category: 'Residential',
    location: 'Zlatibor',
    city: 'Zlatibor',
    delivery: 'Kompleksna izgradnja',
    scope: 'Više objekata u okviru apartmanskog kompleksa.',
    timeline: 'Višefazna realizacija',
    opened: 'Nije navedeno',
    summary:
      'Apartmanski kompleks na više od 3 hektara sa više objekata i desetinama konaka.',
    highlights: [
      'Kompleks na više od 3 hektara.',
      'Više objekata u okviru jedne celine.',
      'Fazna koordinacija i kontrola kvaliteta.',
    ],
    focus: ['Kvalitet', 'Standardi'],
  },
  {
    slug: 'knez-petrol-simanovci',
    name: 'Knez Petrol – Šimanovci',
    category: 'Retail',
    location: 'Šimanovci',
    city: 'Šimanovci',
    delivery: 'Kompletno izvođenje',
    scope: 'Grubi radovi, instalacije i završna obrada.',
    timeline: 'Definisani ugovoreni rokovi',
    opened: '2022',
    summary:
      'Izgradnja benzinske stanice uz stroge bezbednosne i ekološke standarde na lokaciji visokog protoka.',
    highlights: [
      'Kompletna izvedba svih faza radova.',
      'Fokus na bezbednost i zaštitu životne sredine.',
      'Realizacija na zahtevnoj lokaciji visokog protoka.',
    ],
    focus: ['Bezbednost', 'Životna sredina', 'Standardi'],
  },
  {
    slug: 'kfc-zrenjanin',
    name: 'KFC Zrenjanin',
    category: 'Fast food',
    location: 'BIG Shopping Center, Zrenjanin',
    city: 'Zrenjanin',
    delivery: 'Grubi radovi',
    scope: 'Grubi radovi i priprema za završne radove investitora.',
    timeline: '120 dana',
    opened: 'Decembar 2025',
    summary:
      'Objekat realizovan kao nastavak uspešne saradnje sa investitorom, uz precizno planiranje rokova.',
    highlights: [
      'Usklađivanje sa postojećim objektima u okviru kompleksa.',
      'Isporuka u planiranom roku.',
      'Jasno definisan obim i koordinacija sa timom investitora.',
    ],
    focus: ['Vreme', 'Kvalitet', 'Standardi'],
    image: '/images/projects/kfc-zrenjanin-01.jpg',
    images: [
      { src: '/images/projects/kfc-zrenjanin-01.jpg', alt: 'KFC Zrenjanin - gradilište' },
      { src: '/images/projects/kfc-zrenjanin-02.jpg', alt: 'KFC Zrenjanin - konstrukcija u toku' },
      { src: '/images/projects/kfc-zrenjanin-03.jpg', alt: 'KFC Zrenjanin - fasadni radovi' },
      { src: '/images/projects/kfc-zrenjanin-04.jpg', alt: 'KFC Zrenjanin - završni radovi' },
      { src: '/images/projects/kfc-zrenjanin-05.jpg', alt: 'KFC Zrenjanin - izrada ploča' },
    ],
  },
]
