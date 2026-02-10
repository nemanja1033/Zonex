'use client'

import { site } from '../../../data/site'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function ServicesHorizontal() {
  const ref = useScrollReveal()
  const services = site.services.slice(0, 4)
  const [mainService, ...otherServices] = services

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#1e1e22]">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header - left aligned */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4" data-reveal="up">
            <span className="h-[2px] w-8 bg-[#DC2626]" />
            <span className="text-[#DC2626] text-[11px] font-medium tracking-[0.15em] uppercase">
              Usluge
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white" data-reveal="up" data-reveal-delay="0.1">
              Šta radimo
            </h2>
            <p className="text-gray-500 text-base max-w-md" data-reveal="up" data-reveal-delay="0.15">
              Od temelja do ključa — preuzimamo odgovornost za ceo proces.
            </p>
          </div>
        </div>

        {/* Asymmetric grid - 1 big left + 3 small stacked right */}
        <div className="grid lg:grid-cols-12 gap-4">
          {/* Main service - big card */}
          <div
            className="lg:col-span-7 bg-[#2a2a32] p-8 md:p-10 border border-white/[0.04] group hover:border-[#DC2626]/15 transition-all duration-500"
            data-reveal="up"
            data-reveal-delay="0.2"
          >
            <span className="text-[#DC2626]/25 text-6xl font-bold">01</span>
            <h3 className="text-2xl md:text-3xl font-semibold text-white mt-4 mb-3 group-hover:text-[#DC2626] transition-colors">
              {mainService.title}
            </h3>
            <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-md">
              {mainService.description}
            </p>
            {mainService.tags && (
              <div className="flex flex-wrap gap-2">
                {mainService.tags.map(tag => (
                  <span key={tag} className="text-[10px] tracking-wider uppercase text-gray-500 border border-white/[0.06] px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Other services - small cards stacked */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {otherServices.map((service, i) => (
              <div
                key={service.title}
                className="bg-[#2a2a32] p-6 border border-white/[0.04] group hover:border-[#DC2626]/15 transition-all duration-500 flex items-start gap-5"
                data-reveal="up"
                data-reveal-delay={`${0.25 + i * 0.08}`}
              >
                <span className="text-[#DC2626]/20 text-3xl font-bold shrink-0">
                  {String(i + 2).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1.5 group-hover:text-[#DC2626] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Link */}
        <div className="mt-10" data-reveal="up" data-reveal-delay="0.5">
          <a
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            Sve usluge
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
