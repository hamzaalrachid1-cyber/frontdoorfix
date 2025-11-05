import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'src', 'data', 'company-settings.json');

const defaultSettings = {
  companyName: 'FrontDoorFix',
  companyEmail: 'info@frontdoorfix.dk',
  companyPhone: '+45 12 34 56 78',
  whatsappNumber: '+45 12 34 56 78',
  address: 'Hovedgade 123',
  city: 'København',
  postalCode: '2100',
  country: 'Danmark',
  vatNumber: 'DK12345678',
  registrationNumber: '12345678',
  openingHours: {
    monday: { open: '08:00', close: '18:00', closed: false },
    tuesday: { open: '08:00', close: '18:00', closed: false },
    wednesday: { open: '08:00', close: '18:00', closed: false },
    thursday: { open: '08:00', close: '18:00', closed: false },
    friday: { open: '08:00', close: '18:00', closed: false },
    saturday: { open: '09:00', close: '15:00', closed: false },
    sunday: { open: '10:00', close: '14:00', closed: false }
  },
  serviceAreas: ['København', 'Frederiksberg', 'Gentofte', 'Lyngby', 'Rødovre'],
  trustpilotReviewUrl: 'https://dk.trustpilot.com/review/frontdoorfix.dk',
  googleMapsUrl: 'https://maps.google.com/?q=Hovedgade+123+København',
  featureFlags: {
    enableBooking: true,
    enableReviews: true,
    enableBlog: false,
    enableMultiLanguage: false,
    enableDarkMode: false,
    enableMaintenanceMode: false
  }
};

// Helper to read settings
async function getSettings() {
  if (!fs.existsSync(SETTINGS_FILE)) {
    await fs.promises.writeFile(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2), 'utf8');
    return defaultSettings;
  }
  
  const fileContents = await fs.promises.readFile(SETTINGS_FILE, 'utf8');
  try {
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error parsing settings:', error);
    return defaultSettings;
  }
}

// Helper to write settings
async function setSettings(data: any) {
  await fs.promises.writeFile(SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const settings = await request.json();
    
    // Validate required fields
    if (!settings.companyName || !settings.companyEmail) {
      return NextResponse.json({ error: 'Missing required company fields' }, { status: 400 });
    }

    await setSettings(settings);
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}