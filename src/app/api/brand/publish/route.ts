import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/brand/publish - Publish draft brand settings
export async function POST() {
  try {
    // Get the latest draft
    const draftSettings = await prisma.brandSettings.findFirst({
      where: { status: 'Draft' },
      orderBy: { updatedAt: 'desc' }
    })

    if (!draftSettings) {
      return NextResponse.json({ 
        error: 'No draft settings found' 
      }, { status: 404 })
    }

    // Create published version
    const publishedSettings = await prisma.brandSettings.create({
      data: {
        name: draftSettings.name,
        tagline: draftSettings.tagline,
        logoUrl: draftSettings.logoUrl,
        logoHeight: draftSettings.logoHeight,
        logoMaxWidth: draftSettings.logoMaxWidth,
        phone: draftSettings.phone,
        email: draftSettings.email,
        hours: draftSettings.hours,
        ctaPrimary: draftSettings.ctaPrimary,
        ctaSecondary: draftSettings.ctaSecondary,
        status: 'Published'
      }
    })

    return NextResponse.json(publishedSettings)
  } catch (error) {
    console.error('Error publishing brand settings:', error)
    return NextResponse.json({ 
      error: 'Failed to publish brand settings' 
    }, { status: 500 })
  }
}