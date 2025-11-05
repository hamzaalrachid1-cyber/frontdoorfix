import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SEO_SETTINGS_FILE = path.join(process.cwd(), 'src', 'data', 'seo-settings.json');

const defaultSEOSettings = {
  siteName: 'FrontDoorFix',
  defaultTitle: 'Reparationer af telefoner og tablets - FrontDoorFix',
  defaultDescription: 'Professionel reparation af iPhone, iPad, Samsung Galaxy og andre enheder. Vi kommer til dig - hurtig service med garanti.',
  defaultKeywords: ['reparation', 'iPhone', 'iPad', 'Samsung', 'skærmreparation', 'batteri', 'service'],
  ogImage: '/images/og-default.jpg',
  twitterCard: 'summary_large_image',
  twitterSite: '@frontdoorfix',
  robotsIndex: true,
  robotsFollow: true,
  canonicalDomain: 'https://frontdoorfix.dk',
  sitemapEnabled: true,
  structuredDataEnabled: true,
  breadcrumbsEnabled: true,
  googleAnalytics: '',
  googleTagManager: '',
  facebookPixel: ''
};

// Helper to read SEO settings
async function getSEOSettings() {
  if (!fs.existsSync(SEO_SETTINGS_FILE)) {
    await fs.promises.writeFile(SEO_SETTINGS_FILE, JSON.stringify(defaultSEOSettings, null, 2), 'utf8');
    return defaultSEOSettings;
  }
  
  const fileContents = await fs.promises.readFile(SEO_SETTINGS_FILE, 'utf8');
  try {
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error parsing SEO settings:', error);
    return defaultSEOSettings;
  }
}

// Helper to write SEO settings
async function setSEOSettings(data: any) {
  await fs.promises.writeFile(SEO_SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET() {
  try {
    const settings = await getSEOSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return NextResponse.json({ error: 'Failed to fetch SEO settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const settings = await request.json();
    
    // Validate required fields
    if (!settings.siteName || !settings.defaultTitle || !settings.defaultDescription) {
      return NextResponse.json({ error: 'Missing required SEO fields' }, { status: 400 });
    }

    await setSEOSettings(settings);
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Error updating SEO settings:', error);
    return NextResponse.json({ error: 'Failed to update SEO settings' }, { status: 500 });
  }
}

