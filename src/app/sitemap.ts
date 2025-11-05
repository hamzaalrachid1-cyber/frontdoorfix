import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://frontdoorfix.dk'
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/reparationer`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reparationer/apple`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reparationer/apple/iphone`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reparationer/samsung`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reparationer/huawei`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reparationer/motorola`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reparationer/oneplus`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reparationer/pixel`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reparationer/playstation`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reparationer/computer`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  // Dynamic iPhone model pages
  const iphoneModels = [
    'iphone-6',
    'iphone-6-plus', 
    'iphone-6s',
    'iphone-6s-plus',
    'iphone-7',
    'iphone-7-plus',
    'iphone-8',
    'iphone-8-plus',
    'iphone-x',
    'iphone-xr',
    'iphone-xs',
    'iphone-xs-max',
    'iphone-11',
    'iphone-11-pro',
    'iphone-11-pro-max',
    'iphone-12-mini',
    'iphone-12',
    'iphone-12-pro',
    'iphone-12-pro-max',
    'iphone-13-mini',
    'iphone-13',
    'iphone-13-pro',
    'iphone-13-pro-max',
    'iphone-14',
    'iphone-14-plus',
    'iphone-14-pro',
    'iphone-14-pro-max',
    'iphone-15',
    'iphone-15-plus',
    'iphone-15-pro',
    'iphone-15-pro-max',
    'iphone-16',
    'iphone-16-plus',
    'iphone-16-pro',
    'iphone-16-pro-max'
  ]

  const dynamicPages = iphoneModels.map((model) => ({
    url: `${baseUrl}/reparationer/apple/${model}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...dynamicPages]
}
