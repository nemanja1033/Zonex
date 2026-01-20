"use client"

import { site } from '../../../data/site'
import Reveal from '@/components/motion/Reveal'

type ContactCardProps = {
  showMapLink?: boolean
}

export default function ContactCard({ showMapLink = true }: ContactCardProps) {
  return (
    <Reveal variant="fadeUp">
      <div className="card-surface space-y-6 rounded-lg p-6 md:p-8">
        <div>
          <p className="text-small text-white/70">Email</p>
          <p className="mt-2 text-small text-white/85">office@zonex.rs</p>
        </div>
        <div>
          <p className="text-small text-white/70">Telefon</p>
          <p className="mt-2 text-small text-white/85">+381 21 555 300</p>
        </div>
        <div>
          <p className="text-small text-white/70">Adresa</p>
          <p className="mt-2 text-small text-white/85">{site.company.location}</p>
        </div>
        {showMapLink && (
          <div className="rounded-md border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
            <p className="text-small text-white/70">Brza lokacija</p>
            <p className="mt-2 text-small text-white/75">Prikaži adresu bez teških embedova.</p>
            <a
              className="mt-4 inline-flex text-micro font-mono uppercase tracking-micro text-white/80 underline underline-offset-4"
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
            >
              Otvori u mapama
            </a>
          </div>
        )}
      </div>
    </Reveal>
  )
}
