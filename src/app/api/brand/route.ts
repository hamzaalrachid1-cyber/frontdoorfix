import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/brand - Get published brand settings
export async function GET() {
  try {
    const publishedSettings = await prisma.brandSettings.findFirst({
      where: { status: 'Published' },
      orderBy: { updatedAt: 'desc' }
    })

    if (!publishedSettings) {
      return NextResponse.json({ 
        error: 'No published brand settings found' 
      }, { status: 404 })
    }

    // Disable caching to ensure live updates
    return NextResponse.json(publishedSettings, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error) {
    console.error('Error fetching brand settings:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch brand settings' 
    }, { status: 500 })
  }
}