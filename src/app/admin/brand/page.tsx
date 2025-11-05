'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

interface BrandSettings {
  id?: string
  name: string
  tagline?: string
  logoUrl?: string
  logoHeight?: number
  logoMaxWidth?: number
  phone?: string
  email?: string
  hours?: string
  ctaPrimary?: string
  ctaSecondary?: string
  status?: string
}

export default function BrandAdmin() {
  const [settings, setSettings] = useState<BrandSettings>({
    name: 'FrontDoorFix',
    tagline: 'Tekniker til døren',
    logoHeight: 32
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Load draft settings on mount
  useEffect(() => {
    loadDraftSettings()
  }, [])

  const loadDraftSettings = async () => {
    try {
      const response = await fetch('/api/brand/draft')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Error loading draft settings:', error)
    }
  }

  const handleSaveDraft = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/brand/draft', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        toast.success('Draft saved successfully!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save draft')
      }
    } catch (error) {
      toast.error('Failed to save draft')
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/brand/publish', {
        method: 'POST'
      })

      if (response.ok) {
        toast.success('Settings published successfully!')
        await loadDraftSettings()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to publish')
      }
    } catch (error) {
      toast.error('Failed to publish')
    } finally {
      setLoading(false)
    }
  }

  const handleLogoUpload = async (file: File) => {
    setUploading(true)
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file (PNG or SVG)')
        return
      }

      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB')
        return
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'logo')

      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        
        setSettings(prev => ({
          ...prev,
          logoUrl: data.url
        }))
        
        toast.success('Logo uploaded successfully!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Upload failed')
      }
    } catch (error) {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const removeLogo = () => {
    setSettings(prev => ({
      ...prev,
      logoUrl: undefined
    }))
    toast.success('Logo removed')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Brand Settings</h1>
          
          {/* Basic Info */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={settings.tagline || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, tagline: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Site Logo</h2>
            
            {/* Preview */}
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
              <div className="flex items-center gap-3">
                {settings.logoUrl ? (
                  <div 
                    style={{ 
                      height: `${settings.logoHeight || 32}px`,
                      maxWidth: settings.logoMaxWidth ? `${settings.logoMaxWidth}px` : 'none'
                    }}
                    className="flex items-center"
                  >
                    <img 
                      src={settings.logoUrl} 
                      alt={`${settings.name} logo`} 
                      className="h-full w-auto object-contain"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-800">
                      {settings.name}
                    </span>
                    {settings.tagline && (
                      <span className="text-xs text-gray-500 -mt-1">
                        {settings.tagline}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Upload Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Logo (PNG or SVG)
                </label>
                <input
                  type="file"
                  accept=".svg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleLogoUpload(file)
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  disabled={uploading}
                />
                {uploading && (
                  <p className="text-sm text-gray-500 mt-1">Uploading...</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Maximum file size: 2MB. SVG files will be cleaned for security.
                </p>
              </div>

              {/* Size Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Height (px)
                  </label>
                  <input
                    type="number"
                    min="16"
                    max="128"
                    value={settings.logoHeight || 32}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      logoHeight: parseInt(e.target.value) || 32 
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Width (px) - Optional
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="500"
                    value={settings.logoMaxWidth || ''}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      logoMaxWidth: e.target.value ? parseInt(e.target.value) : undefined 
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Leave empty for no limit"
                  />
                </div>
              </div>

              {/* Remove Logo Button */}
              {settings.logoUrl && (
                <div>
                  <button
                    onClick={removeLogo}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                  >
                    Remove Logo
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={settings.phone || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.email || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={settings.hours || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, hours: e.target.value }))}
                  placeholder="e.g., Mon-Fri 8:00-18:00, Sat 9:00-15:00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* CTA Texts */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Call-to-Action Texts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary CTA
                </label>
                <input
                  type="text"
                  value={settings.ctaPrimary || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, ctaPrimary: e.target.value }))}
                  placeholder="e.g., Book Now"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary CTA
                </label>
                <input
                  type="text"
                  value={settings.ctaSecondary || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, ctaSecondary: e.target.value }))}
                  placeholder="e.g., Learn More"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleSaveDraft}
              disabled={loading}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              onClick={handlePublish}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}