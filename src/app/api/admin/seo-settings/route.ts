import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SEO_SETTINGS_FILE = path.join(process.cwd(), 'src', 'data', 'seo-settings.json');

const defaultSEOSettings = {
  global: {
    siteName: 'Frontdoorfix',
    defaultTitle: 'Mobilreparation i København | Frontdoorfix',
    defaultDescription: 'Hurtig og pålidelig mobil- og elektronikreparation direkte på din adresse i København. 24 måneders garanti på skærme.',
    defaultKeywords: 'mobilreparation, iPhone reparation, Samsung reparation, skærmskift, batteriskift, København',
    defaultAuthor: 'Frontdoorfix',
    defaultLanguage: 'da',
    defaultLocale: 'da_DK',
    twitterHandle: '@frontdoorfix',
    facebookAppId: '',
    googleAnalyticsId: '',
    googleTagManagerId: ''
  },
  social: {
    ogImage: '/images/og-image.jpg',
    twitterCard: 'summary_large_image',
    twitterImage: '/images/twitter-image.jpg',
    facebookImage: '/images/facebook-image.jpg'
  },
  technical: {
    canonicalBaseUrl: 'https://frontdoorfix.dk',
    robotsDefault: 'index, follow',
    sitemapEnabled: true,
    sitemapUrl: '/sitemap.xml',
    hreflangEnabled: false,
    structuredDataEnabled: true
  },
  schema: {
    organization: {
      enabled: true,
      name: 'Frontdoorfix',
      url: 'https://frontdoorfix.dk',
      logo: 'https://frontdoorfix.dk/logo.png',
      description: 'Udkørende værksted for mobilreparation i København',
      address: 'København, Danmark',
      phone: '+45 93 54 54 57',
      email: 'info@frontdoorfix.dk',
      openingHours: 'Mo-Su 08:00-22:00'
    },
    localBusiness: {
      enabled: true,
      name: 'Frontdoorfix',
      description: 'Mobilreparation i København',
      url: 'https://frontdoorfix.dk',
      telephone: '+45 93 54 54 57',
      address: 'København, Danmark',
      openingHours: 'Mo-Su 08:00-22:00',
      priceRange: '$$'
    },
    product: {
      enabled: true,
      brand: 'Frontdoorfix',
      category: 'Mobile Phone Repair'
    },
    faq: {
      enabled: true
    }
  }
};

export async function GET() {
  try {
    if (!fs.existsSync(SEO_SETTINGS_FILE)) {
      // Create default SEO settings file if it doesn't exist
      const dir = path.dirname(SEO_SETTINGS_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(SEO_SETTINGS_FILE, JSON.stringify(defaultSEOSettings, null, 2));
      return NextResponse.json(defaultSEOSettings);
    }

    const fileContents = fs.readFileSync(SEO_SETTINGS_FILE, 'utf8');
    const settings = JSON.parse(fileContents);
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error reading SEO settings:', error);
    return NextResponse.json(defaultSEOSettings);
  }
}

export async function POST(request: Request) {
  try {
    const settings = await request.json();
    
    // Validate the settings structure
    if (!settings.global || !settings.social || !settings.technical || !settings.schema) {
      return NextResponse.json({ error: 'Invalid SEO settings structure' }, { status: 400 });
    }
    
    // Ensure directory exists
    const dir = path.dirname(SEO_SETTINGS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Save settings
    fs.writeFileSync(SEO_SETTINGS_FILE, JSON.stringify(settings, null, 2));
    
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Error saving SEO settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

