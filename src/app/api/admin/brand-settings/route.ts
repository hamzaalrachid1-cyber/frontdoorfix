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
        logoDefaultUrl: null,
        logoSmallUrl: null,
        logoDarkUrl: null,
        logoHeight: 32,
        logoMaxWidth: 150,
        useCustomIcon: false,
        companyName: 'FrontDoorFix',
        companyTagline: 'Tekniker til døren',
        ctaText: 'Bestil tid',
        contactPhone: '+45 93 54 54 57',
        contactEmail: 'info@frontdoorfix.dk',
        contactAddress: 'København, Danmark',
        openingHours: 'Alle dage: 8:00 - 22:00',
        openingHoursSubtext: 'Vi kommer til dig hele dagen'
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
    if (!data.name || !data.companyName) {
      return NextResponse.json(
        { error: 'Name and company name are required' },
        { status: 400 }
      );
    }

    // Opdater eller opret settings
    const settings = await prisma.brandSettings.upsert({
      where: { id: 1 }, // Vi bruger altid ID 1
      update: {
        name: data.name,
        tagline: data.tagline || '',
        logoDefaultUrl: data.logoDefaultUrl || null,
        logoSmallUrl: data.logoSmallUrl || null,
        logoDarkUrl: data.logoDarkUrl || null,
        logoHeight: data.logoHeight || 32,
        logoMaxWidth: data.logoMaxWidth || 150,
        useCustomIcon: data.useCustomIcon || false,
        companyName: data.companyName,
        companyTagline: data.companyTagline || '',
        ctaText: data.ctaText || 'Bestil tid',
        contactPhone: data.contactPhone || '+45 93 54 54 57',
        contactEmail: data.contactEmail || 'info@frontdoorfix.dk',
        contactAddress: data.contactAddress || 'København, Danmark',
        openingHours: data.openingHours || 'Alle dage: 8:00 - 22:00',
        openingHoursSubtext: data.openingHoursSubtext || 'Vi kommer til dig hele dagen'
      },
      create: {
        id: 1,
        name: data.name,
        tagline: data.tagline || '',
        logoDefaultUrl: data.logoDefaultUrl || null,
        logoSmallUrl: data.logoSmallUrl || null,
        logoDarkUrl: data.logoDarkUrl || null,
        logoHeight: data.logoHeight || 32,
        logoMaxWidth: data.logoMaxWidth || 150,
        useCustomIcon: data.useCustomIcon || false,
        companyName: data.companyName,
        companyTagline: data.companyTagline || '',
        ctaText: data.ctaText || 'Bestil tid',
        contactPhone: data.contactPhone || '+45 93 54 54 57',
        contactEmail: data.contactEmail || 'info@frontdoorfix.dk',
        contactAddress: data.contactAddress || 'København, Danmark',
        openingHours: data.openingHours || 'Alle dage: 8:00 - 22:00',
        openingHoursSubtext: data.openingHoursSubtext || 'Vi kommer til dig hele dagen'
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
