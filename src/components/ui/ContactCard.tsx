"use client"

import { site } from '../../../data/site'
import Reveal from '@/components/motion/Reveal'

type ContactCardProps = {
  showMapLink?: boolean
}

export default function ContactCard({ showMapLink = true }: ContactCardProps) {
  return (
    <Reveal variant="scale">
      <div className="card-surface space-y-6 rounded-3xl p-6 shadow-[0_20px_50px_rgba(3,6,12,0.45)] backdrop-blur md:p-8">
        <div>
          <p className="text-micro font-mono uppercase tracking-micro text-white/60">Email</p>
          <p className="mt-2 text-small text-white/85">office@zonex.rs</p>
        </div>
        <div>
          <p className="text-micro font-mono uppercase tracking-micro text-white/60">Telefon</p>
          <p className="mt-2 text-small text-white/85">+381 21 555 300</p>
        </div>
        <div>
          <p className="text-micro font-mono uppercase tracking-micro text-white/60">Adresa</p>
          <p className="mt-2 text-small text-white/85">{site.company.location}</p>
        </div>
        {showMapLink && (
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(140deg,rgba(255,255,255,0.04),rgba(178,30,42,0.08))] p-4">
            <div className="flex items-center justify-between text-micro font-mono uppercase tracking-micro text-white/60">
              <span>Mapa</span>
              <span>Lite</span>
            </div>
            <p className="mt-3 text-small text-white/75">Brza lokacija bez teških embedova.</p>
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
