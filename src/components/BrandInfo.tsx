'use client'

import { useBrandSettings } from '@/hooks/useBrandSettings'

export function BrandInfo() {
  const { brandSettings, loading } = useBrandSettings()

  if (loading || !brandSettings) {
    return null
  }

  return (
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-bold text-gray-800">
        {brandSettings.name}
      </h2>
      {brandSettings.tagline && (
        <p className="text-gray-600">
          {brandSettings.tagline}
        </p>
      )}
      {brandSettings.phone && (
        <p className="text-gray-600">
          📞 {brandSettings.phone}
        </p>
      )}
      {brandSettings.hours && (
        <p className="text-gray-600">
          🕒 {brandSettings.hours}
        </p>
      )}
    </div>
  )
}
