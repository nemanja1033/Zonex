"use client"

import Link from 'next/link'
import { site } from '../../../data/site'

export default function CtaSection() {
  return (
    <section className="py-24 md:py-32 bg-[#1a1a1e]">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
          {site.cta.title}
        </h2>
        <p className="text-gray-400 text-base leading-relaxed mb-8">
          {site.cta.description}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#b91c1c] text-white px-8 py-3.5 text-sm font-medium tracking-wide transition-colors"
        >
          {site.cta.button}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
