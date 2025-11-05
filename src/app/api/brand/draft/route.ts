import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/brand/draft - Get draft brand settings
export async function GET() {
  try {
    const draftSettings = await prisma.brandSettings.findFirst({
      where: { status: 'Draft' },
      orderBy: { updatedAt: 'desc' }
    })

    if (!draftSettings) {
      // Create default draft if none exists
      const defaultDraft = await prisma.brandSettings.create({
        data: {
          name: 'FrontDoorFix',
          tagline: 'Tekniker til døren',
          logoHeight: 32,
          status: 'Draft'
        }
      })
      return NextResponse.json(defaultDraft)
    }

    return NextResponse.json(draftSettings)
  } catch (error) {
    console.error('Error fetching draft settings:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch draft settings' 
    }, { status: 500 })
  }
}

// PUT /api/brand/draft - Update draft brand settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ 
        error: 'Name is required' 
      }, { status: 400 })
    }

    // Check if draft exists
    const existingDraft = await prisma.brandSettings.findFirst({
      where: { status: 'Draft' }
    })

    let updatedSettings
    if (existingDraft) {
      updatedSettings = await prisma.brandSettings.update({
        where: { id: existingDraft.id },
        data: {
          name: body.name,
          tagline: body.tagline,
          logoUrl: body.logoUrl,
          logoHeight: body.logoHeight || 32,
          logoMaxWidth: body.logoMaxWidth,
          phone: body.phone,
          email: body.email,
          hours: body.hours,
          ctaPrimary: body.ctaPrimary,
          ctaSecondary: body.ctaSecondary,
          status: 'Draft'
        }
      })
    } else {
      updatedSettings = await prisma.brandSettings.create({
        data: {
          name: body.name,
          tagline: body.tagline,
          logoUrl: body.logoUrl,
          logoHeight: body.logoHeight || 32,
          logoMaxWidth: body.logoMaxWidth,
          phone: body.phone,
          email: body.email,
          hours: body.hours,
          ctaPrimary: body.ctaPrimary,
          ctaSecondary: body.ctaSecondary,
          status: 'Draft'
        }
      })
    }

    return NextResponse.json(updatedSettings)
  } catch (error) {
    console.error('Error updating draft settings:', error)
    return NextResponse.json({ 
      error: 'Failed to update draft settings' 
    }, { status: 500 })
  }
}
