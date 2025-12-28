export type Project = {
  name: string
  location?: string
  workType?: string
  objectType?: string
  status: string
  note?: string
}

export const projects: Project[] = [
  {
    name: "McDonald's Zrenjanin",
    location: 'Tržni centar BIG, Zrenjanin',
    workType: 'Sistem „ključ u ruke“',
    status: 'Završeno',
  },
  {
    name: "McDonald's Ruklada",
    location: 'Uz benzinsku stanicu MOL, autoput „Miloš Veliki“ (smer ka Beogradu)',
    workType: 'Završni radovi',
    status: 'Završeno',
  },
  {
    name: 'Zlatiborski konaci',
    location: 'Zlatibor',
    workType: 'Građevinski i završni radovi',
    status: 'Završeno',
  },
  {
    name: 'Knez Petrol – Šimanovci',
    objectType: 'Benzinska stanica',
    status: 'U toku',
  },
  {
    name: 'KFC Zrenjanin',
    location: 'Tržni centar BIG, Zrenjanin',
    note: "U neposrednoj blizini McDonald's objekta koji smo prethodno izveli",
    status: 'U toku',
  },
]
