"use client"

import { site } from '../../../data/site'

export default function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-[#1e1e22]">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#DC2626]" />
            <span className="text-[#DC2626] text-[11px] font-medium tracking-[0.15em] uppercase">
              Proces
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Kako radimo
            </h2>
            <p className="text-gray-500 text-base max-w-sm">
              Četiri faze. Jasan rok. Bez iznenađenja.
            </p>
          </div>
        </div>

        {/* Minimal timeline */}
        <div className="grid md:grid-cols-4 gap-0 border-t border-white/[0.06]">
          {site.process.map((step, i) => (
            <div
              key={step.title}
              className={`p-6 md:p-8 ${i > 0 ? 'md:border-l border-white/[0.06]' : ''} ${i < 2 ? 'border-b md:border-b-0 border-white/[0.06]' : ''}`}
            >
              <span className="text-[#DC2626] text-sm font-mono">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-white text-lg font-semibold mt-3 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
