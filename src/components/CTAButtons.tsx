'use client'

import Link from "next/link"
import { useBrandSettings } from '@/hooks/useBrandSettings'

export function CTAButtons() {
  const { brandSettings, loading } = useBrandSettings()

  const primaryCTA = brandSettings?.ctaPrimary || 'Bestil tid nu'
  const secondaryCTA = brandSettings?.ctaSecondary || 'Tjek priser'

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center mb-16">
      <button className="btn-gradient px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
        {primaryCTA}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
        </svg>
      </button>
      <Link href="/reparationer" className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent text-lg font-semibold underline hover:opacity-80 transition-opacity">
        {secondaryCTA}
      </Link>
    </div>
  )
}
