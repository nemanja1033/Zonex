"use client"

import Image from 'next/image'
import Link from 'next/link'
import { projects } from '../../../data/projects'

export default function ProjectsShowcase() {
  const featured = projects.slice(0, 4)

  return (
    <section className="py-32 md:py-40 bg-[#1a1a1e]">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#DC2626]" />
            <span className="text-[#DC2626] text-[11px] font-medium tracking-[0.15em] uppercase">
              Projekti
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Izgrađeno
            </h2>
            <p className="text-gray-500 text-base max-w-sm">
              Pogledajte šta smo uradili u poslednjih 30 godina.
            </p>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid md:grid-cols-12 gap-4">
          {/* Featured project - large */}
          <Link href={`/projects/${featured[0].slug}`} className="md:col-span-7 group block">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#2a2a32]">
              {featured[0].image ? (
                <Image
                  src={featured[0].image}
                  alt={featured[0].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#2f2f38] to-[#25252d] flex items-center justify-center">
                  <span className="text-white/10 text-xs tracking-[0.2em] uppercase">Foto uskoro</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-white/60 text-xs tracking-wider uppercase mb-1">{featured[0].location}</p>
                <h3 className="text-white text-2xl md:text-3xl font-semibold">{featured[0].name}</h3>
              </div>
            </div>
          </Link>

          {/* Second project - tall */}
          <Link href={`/projects/${featured[1].slug}`} className="md:col-span-5 group block">
            <div className="relative aspect-[4/5] md:aspect-auto md:h-full overflow-hidden bg-[#2a2a32]">
              {featured[1].image ? (
                <Image
                  src={featured[1].image}
                  alt={featured[1].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#2f2f38] to-[#25252d] flex items-center justify-center">
                  <span className="text-white/10 text-xs tracking-[0.2em] uppercase">Foto uskoro</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/60 text-xs tracking-wider uppercase mb-1">{featured[1].location}</p>
                <h3 className="text-white text-xl font-semibold">{featured[1].name}</h3>
              </div>
            </div>
          </Link>

          {/* Third project */}
          <Link href={`/projects/${featured[2].slug}`} className="md:col-span-6 group block">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#2a2a32]">
              {featured[2].image ? (
                <Image
                  src={featured[2].image}
                  alt={featured[2].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#2f2f38] to-[#25252d] flex items-center justify-center">
                  <span className="text-white/10 text-xs tracking-[0.2em] uppercase">Foto uskoro</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/60 text-xs tracking-wider uppercase mb-1">{featured[2].city}</p>
                <h3 className="text-white text-xl font-semibold">{featured[2].name}</h3>
              </div>
            </div>
          </Link>

          {/* Fourth project */}
          <Link href={`/projects/${featured[3].slug}`} className="md:col-span-6 group block">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#2a2a32]">
              {featured[3].image ? (
                <Image
                  src={featured[3].image}
                  alt={featured[3].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#2f2f38] to-[#25252d] flex items-center justify-center">
                  <span className="text-white/10 text-xs tracking-[0.2em] uppercase">Foto uskoro</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/60 text-xs tracking-wider uppercase mb-1">{featured[3].city}</p>
                <h3 className="text-white text-xl font-semibold">{featured[3].name}</h3>
              </div>
            </div>
          </Link>
        </div>

        {/* Link */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            Svi projekti
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
