"use client"

import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Locale = 'en' | 'sr'

type TestimonialsContent = {
  title: string
  subtitle: string
  items: Array<{
    quote: string
    brand: string
    role: string
  }>
}

type Messages = {
  home: {
    testimonials: TestimonialsContent
  }
}

const MESSAGES: Record<Locale, Messages> = {
  en: {
    home: {
      testimonials: {
        title: 'What Our Clients Say',
        subtitle: 'Focused feedback from recent collaborations and studio briefs.',
        items: [
          {
            quote:
              'Zonex ran the build with a clear schedule and a weekly decision log, which kept our opening date realistic. The handover was orderly, and finishes matched the brand standards agreed at kickoff.',
            brand: 'Flat Burger',
            role: 'Operations Team',
          },
          {
            quote:
              'We needed a portfolio that explains technical projects without losing readability. The structure and documentation sped up internal reviews and removed ambiguity.',
            brand: 'Zonex Inženjering',
            role: 'Project Coordination',
          },
          {
            quote:
              'As a concept brief, the proposal translated the brand tone into a layout we could realistically build. The plan emphasized guest flow and back-of-house efficiency without over-designing the space.',
            brand: 'Ember Coffee House',
            role: 'Studio Brief',
          },
          {
            quote:
              'For the Pulse Campaign concept, the focus was on fast deployment and a clear spatial narrative at every touchpoint. The deliverables showed how the idea could scale across locations while staying consistent.',
            brand: 'Pulse Campaign',
            role: 'Campaign Owner',
          },
        ],
      },
    },
  },
  sr: {
    home: {
      testimonials: {
        title: 'Šta naši klijenti kažu',
        subtitle: 'Sažeti utisci iz realizovanih projekata i studijskih briefova.',
        items: [
          {
            quote:
              'Zonex je vodio izgradnju sa jasnim rasporedom i nedeljnim zapisnikom odluka, što je datum otvaranja držalo realnim. Primopredaja je bila uredna, a završne obrade su pratile standarde brenda dogovorene na početku.',
            brand: 'Flat Burger',
            role: 'Operativni tim',
          },
          {
            quote:
              'Za Zonex Inženjering bio nam je potreban portfolio koji objašnjava tehničke projekte bez gubitka čitljivosti. Struktura i dokumentacija ubrzale su interne provere i uklonile nedoumice.',
            brand: 'Zonex Inženjering',
            role: 'Koordinacija projekata',
          },
          {
            quote:
              'Kao konceptualni brief, predlog je preveo ton brenda u raspored koji je realno izvodljiv. Plan je naglasio tok kretanja gostiju i efikasnost pozadine, bez suvišnog dizajnerskog efekta.',
            brand: 'Ember Coffee House',
            role: 'Studijski brief',
          },
          {
            quote:
              'Za koncept Pulse Campaign fokus je bio na brzoj postavci i jasnoj prostornoj naraciji kroz sve tačke kontakta. Isporuke su pokazale kako se ideja može skalirati na više lokacija uz dosledan identitet.',
            brand: 'Pulse Campaign',
            role: 'Vlasnik kampanje',
          },
        ],
      },
    },
  },
}

type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  messages: Messages
}

const I18nContext = createContext<I18nContextValue | null>(null)

type I18nProviderProps = {
  children: ReactNode
  initialLocale?: Locale
}

const STORAGE_KEY = 'zonex-locale'

export function I18nProvider({ children, initialLocale = 'sr' }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored === 'en' || stored === 'sr') {
      setLocale(stored)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      messages: MESSAGES[locale],
    }),
    [locale]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
