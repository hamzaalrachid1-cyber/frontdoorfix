import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Hent brand settings
export async function GET() {
  try {
    const settings = await prisma.brandSettings.findFirst();
    
    if (!settings) {
      // Returner default settings hvis ingen findes
      return NextResponse.json({
        name: 'FrontDoorFix',
        tagline: 'Tekniker til døren',
        logoUrl: null,
        logoHeight: 32,
        logoMaxWidth: 150,
        phone: '+45 93 54 54 57',
        email: 'info@frontdoorfix.dk',
        hours: 'Alle dage: 8:00 - 22:00',
        ctaPrimary: 'Bestil tid',
        ctaSecondary: null,
        status: 'Published'
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching brand settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch brand settings' },
      { status: 500 }
    );
  }
}

// PUT - Opdater brand settings
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Valider påkrævede felter
    if (!data.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Find første settings eller opret ny
    const existingSettings = await prisma.brandSettings.findFirst();
    
    const settings = existingSettings 
      ? await prisma.brandSettings.update({
          where: { id: existingSettings.id },
          data: {
            name: data.name,
            tagline: data.tagline || null,
            logoUrl: data.logoUrl || data.logoDefaultUrl || null,
            logoHeight: data.logoHeight || 32,
            logoMaxWidth: data.logoMaxWidth || null,
            phone: data.phone || data.contactPhone || null,
            email: data.email || data.contactEmail || null,
            hours: data.hours || data.openingHours || null,
            ctaPrimary: data.ctaPrimary || data.ctaText || null,
            ctaSecondary: data.ctaSecondary || null,
            status: data.status || 'Draft'
          }
        })
      : await prisma.brandSettings.create({
          data: {
            name: data.name,
            tagline: data.tagline || null,
            logoUrl: data.logoUrl || data.logoDefaultUrl || null,
            logoHeight: data.logoHeight || 32,
            logoMaxWidth: data.logoMaxWidth || null,
            phone: data.phone || data.contactPhone || null,
            email: data.email || data.contactEmail || null,
            hours: data.hours || data.openingHours || null,
            ctaPrimary: data.ctaPrimary || data.ctaText || null,
            ctaSecondary: data.ctaSecondary || null,
            status: data.status || 'Draft'
          }
        });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating brand settings:', error);
    return NextResponse.json(
      { error: 'Failed to update brand settings' },
      { status: 500 }
    );
  }
}
