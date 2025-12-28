export type Project = {
  slug: string
  name: string
  location: string
  status: 'Završeno' | 'U toku'
  deliveryModel?: string
  scope?: string
  works?: string
  timeline?: string
  clientType?: string
  summary: string
  challenge: string
  role: string
  solution: string
  result: string
  type: 'Retail' | 'Hospitality' | 'Energy' | 'Mixed'
}

export type Service = {
  title: string
  description: string
}

export type TimelineItem = {
  year: string
  title: string
  description: string
}

export type Client = {
  name: string
  sector: string
}

export const company = {
  name: 'Zonex Inženjering d.o.o.',
  founded: 1993,
  location: 'Novi Sad, Srbija',
  tagline: 'Inženjering i izvođenje objekata sa proverljivim rezultatima.',
}

export const about = {
  title: 'O nama',
  description:
    'Zonex inženjering doo je firma koja preko 30 godina uspešno posluje na polju građevinarstva. Od osnivanja naše firme 1993. godine do danas težimo da brzo, efikasno i kvalitetno pristupamo našim projektima. Naša posvećenost poslu, stručnost i iskustvo su razlozi zašto ispunjavamo svaki zahtev naših klijenata i uspešno realizujemo projekte, od početnih faza planiranja do najsitnijih detalja.',
  highlights: [
    '30+ godina iskustva u građevinarstvu',
    'Brzina, efikasnost i preciznost u realizaciji',
    'Kompletna odgovornost kroz sve faze projekta',
  ],
}

export const projects: Project[] = [
  {
    slug: 'mcdonalds-zrenjanin',
    name: "McDonald’s Zrenjanin",
    location: 'Tržni centar BIG, Zrenjanin',
    status: 'Završeno',
    deliveryModel: 'Ključ u ruke',
    scope: 'Kompletan projekat i realizacija objekta',
    works: 'Građevinski, instalaterski i završni radovi',
    timeline: '2022',
    clientType: 'Međunarodni lanac brze hrane',
    summary: 'Izgradnja objekta visoke frekvencije u okviru retail kompleksa sa preciznim rokovima i kontrolisanim budžetom.',
    challenge: 'Realizacija u aktivnom trgovačkom okruženju uz stroge logističke i bezbednosne uslove.',
    role: 'Vođenje projekta, koordinacija radova i kompletna isporuka objekta.',
    solution: 'Fazna organizacija gradilišta, centralizovana nabavka i svakodnevna kontrola kvaliteta.',
    result: 'Objekat predat u ugovorenom roku, uz jasno definisane standarde završne obrade.',
    type: 'Retail',
  },
  {
    slug: 'mcdonalds-ruklada',
    name: "McDonald’s Ruklada",
    location: 'Uz benzinsku stanicu MOL, autoput „Miloš Veliki“ (smer ka Beogradu)',
    status: 'Završeno',
    deliveryModel: 'Završni radovi',
    scope: 'Faza završnih i koordinacionih radova',
    works: 'Završni građevinski radovi i uređenje prostora',
    timeline: '2021',
    clientType: 'Međunarodni lanac brze hrane',
    summary: 'Finalizacija objekta u kompleksnom logističkom režimu uz stalnu dinamiku saobraćaja.',
    challenge: 'Usklađivanje radova sa režimom autoputa i bez prekida operativnog toka.',
    role: 'Izvođenje završnih radova i koordinacija podizvođača.',
    solution: 'Precizno planiranje i noćni radni režimi u dogovoru sa investitorom.',
    result: 'Usklađena završna obrada i predaja objekta bez zastoja u okolnoj infrastrukturi.',
    type: 'Retail',
  },
  {
    slug: 'zlatiborski-konaci',
    name: 'Zlatiborski konaci',
    location: 'Zlatibor',
    status: 'Završeno',
    deliveryModel: 'Građevinski i završni radovi',
    scope: 'Izvođenje građevinskih i završnih radova',
    works: 'Konstrukcija, završna obrada, unutrašnje uređenje',
    timeline: '2020',
    clientType: 'Investitor u hospitality segmentu',
    summary: 'Izgradnja objekata turističkog karaktera sa fokusom na kvalitet završne obrade.',
    challenge: 'Rad u planinskim uslovima i precizno usklađivanje sezonskih rokova.',
    role: 'Izvođenje radova sa stalnom kontrolom kvaliteta.',
    solution: 'Standardizovani procesi i kontrolne tačke na svakoj ključnoj etapi.',
    result: 'Objekti isporučeni uz visok nivo završne obrade i tehničke stabilnosti.',
    type: 'Hospitality',
  },
  {
    slug: 'knez-petrol-simanovci',
    name: 'Knez Petrol – Šimanovci',
    location: 'Šimanovci',
    status: 'U toku',
    deliveryModel: 'Izvođenje objekta',
    scope: 'Građevinski i instalaterski radovi',
    works: 'Izgradnja benzinske stanice',
    timeline: '2024',
    clientType: 'Energetski sektor',
    summary: 'Izgradnja benzinske stanice sa fokusom na bezbednosne standarde i operativnu efikasnost.',
    challenge: 'Koordinacija radova uz specifične bezbednosne protokole.',
    role: 'Izvođenje radova i koordinacija podizvođača.',
    solution: 'Definisane bezbednosne procedure i kontrola kritičnih tačaka.',
    result: 'Projekat u realizaciji uz stabilan napredak i jasnu evidenciju kvaliteta.',
    type: 'Energy',
  },
  {
    slug: 'kfc-zrenjanin',
    name: 'KFC Zrenjanin',
    location: 'Tržni centar BIG, Zrenjanin',
    status: 'U toku',
    deliveryModel: 'Izvođenje radova',
    scope: 'Izvođenje građevinskih i završnih radova',
    works: 'Radovi u okviru retail kompleksa',
    timeline: '2024',
    clientType: 'Međunarodni lanac brze hrane',
    summary: 'Objekat u neposrednoj blizini prethodno izvedenog McDonald’s projekta.',
    challenge: 'Usklađivanje radova sa postojećim objektom i aktivnim okruženjem.',
    role: 'Izvođenje radova uz koordinaciju sa vlasnikom kompleksa.',
    solution: 'Precizno faziranje i dnevna koordinacija sa tehničkim timovima.',
    result: 'U toku realizacije, sa fokusom na tačnost rokova i standarde investitora.',
    type: 'Retail',
  },
]

export const featuredProjectSlugs = ['knez-petrol-simanovci', 'mcdonalds-zrenjanin', 'zlatiborski-konaci']

export const services: Service[] = [
  {
    title: 'Projektovanje i razrada dokumentacije',
    description: 'Izrada tehničke dokumentacije sa jasnim faziranjem i definisanim standardima.',
  },
  {
    title: 'Građevinsko izvođenje',
    description: 'Organizacija gradilišta i izvođenje radova uz kontrolu kvaliteta na svim etapama.',
  },
  {
    title: 'Završni radovi i fit-out',
    description: 'Finalne obrade i koordinacija prostora uz poštovanje standarda investitora.',
  },
  {
    title: 'Inženjering „ključ u ruke“',
    description: 'Kompletna realizacija projekta, od pripreme do predaje objekta.',
  },
]

export const processSteps = [
  {
    title: 'Analiza i planiranje',
    description: 'Definisanje obima, rokova i resursa na osnovu ciljeva investitora.',
  },
  {
    title: 'Organizacija gradilišta',
    description: 'Postavljanje logistike, bezbednosnih protokola i koordinacija timova.',
  },
  {
    title: 'Izvođenje i kontrola',
    description: 'Praćenje izvedbe, kvaliteta i dnevno izveštavanje investitoru.',
  },
  {
    title: 'Predaja i garancija',
    description: 'Tehnička primopredaja i podrška u garantnom periodu.',
  },
]

export const standards = [
  {
    title: 'Kontrola kvaliteta',
    description: 'Jasne kontrolne tačke i zapisnici na svakoj ključnoj etapi.',
  },
  {
    title: 'Bezbednost na gradilištu',
    description: 'Standardi rada sa fokusom na sigurnost ljudi i infrastrukture.',
  },
  {
    title: 'Izveštavanje investitoru',
    description: 'Redovne informacije o statusu, rokovima i rizicima.',
  },
]

export const capabilities = [
  {
    title: 'Ljudi i timovi',
    description: 'Iskusni inženjeri, nadzor i koordinacija podizvođača sa jasnim odgovornostima.',
  },
  {
    title: 'Oprema i logistika',
    description: 'Planiranje resursa i logistike za stabilan tempo gradnje i bezbedan rad.',
  },
  {
    title: 'Procesi i standardi',
    description: 'Definisani postupci, zapisnici i kontrola kvaliteta po etapama.',
  },
  {
    title: 'Upravljanje rizicima',
    description: 'Identifikacija kritičnih tačaka i preventivne mere u toku realizacije.',
  },
]

export const timeline: TimelineItem[] = [
  {
    year: '1993',
    title: 'Osnivanje kompanije',
    description: 'Formiranje Zonex Inženjeringa sa fokusom na građevinsko izvođenje.',
  },
  {
    year: '2000',
    title: 'Rast u komercijalnim objektima',
    description: 'Širenje portfolija na retail i poslovne objekte u Vojvodini.',
  },
  {
    year: '2010',
    title: 'Regionalna ekspanzija',
    description: 'Partnerstva sa nacionalnim investitorima i izvođenje kompleksnijih sistema.',
  },
  {
    year: '2018',
    title: 'Fokus na turnkey modele',
    description: 'Povećan obim projekata u režimu „ključ u ruke“.',
  },
  {
    year: '2024',
    title: 'Kontinuitet i modernizacija procesa',
    description: 'Unapređenje internih standarda i digitalizacija upravljanja projektima.',
  },
]

export const clients: Client[] = [
  { name: 'McDonald’s', sector: 'Retail / Hospitality' },
  { name: 'KFC', sector: 'Retail / Hospitality' },
  { name: 'Knez Petrol', sector: 'Energy' },
  { name: 'MOL', sector: 'Energy' },
  { name: 'BIG Retail', sector: 'Retail' },
]

export const sectors = ['Retail', 'Hospitality', 'Energy', 'Mixed']

export const updates = [
  {
    title: 'U toku realizacija Knez Petrol projekta',
    date: '2024',
    summary: 'Faza izvođenja uz kontrolne tačke za bezbednost i kvalitet.',
  },
  {
    title: 'Završeni radovi na McDonald’s Ruklada',
    date: '2021',
    summary: 'Finalna obrada u okviru kompleksa pored autoputa.',
  },
  {
    title: 'Novi standardi interne kontrole',
    date: '2018',
    summary: 'Uvedeni dodatni protokoli za praćenje kvaliteta.',
  },
]
