'use client'

import { useState, useEffect } from 'react'

interface BrandSettings {
  id: string
  name: string
  tagline?: string
  logoUrl?: string
  logoDefaultUrl?: string
  logoSmallUrl?: string
  logoDarkUrl?: string
  logoHeight?: number
  logoMaxWidth?: number
  phone?: string
  email?: string
  hours?: string
  ctaPrimary?: string
  ctaSecondary?: string
}

export function useBrandSettings() {
  const [brandSettings, setBrandSettings] = useState<BrandSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBrandSettings() {
      try {
        const response = await fetch('/api/admin/brand-settings')
        if (!response.ok) {
          throw new Error('Failed to fetch brand settings')
        }
        const data = await response.json()
        setBrandSettings(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('Error fetching brand settings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBrandSettings()
  }, [])

  return { brandSettings, loading, error }
}
