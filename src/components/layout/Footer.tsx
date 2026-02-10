'use client'

import Link from 'next/link'
import { site } from '../../../data/site'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] py-12 md:py-16 bg-[#1a1a1e]">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <span className="text-white font-semibold text-lg">Zonex Inženjering</span>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
              {site.company.location}<br />
              info@zonex.rs
            </p>
          </div>

          {/* Links - horizontal, no heading */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500">
            <Link href="/" className="hover:text-white transition-colors">Početna</Link>
            <Link href="/projects" className="hover:text-white transition-colors">Projekti</Link>
            <Link href="/services" className="hover:text-white transition-colors">Usluge</Link>
            <Link href="/company" className="hover:text-white transition-colors">O nama</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Kontakt</Link>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/[0.04] text-[11px] text-gray-700">
          © {currentYear} {site.company.name}
        </div>
      </div>
    </footer>
  )
}
