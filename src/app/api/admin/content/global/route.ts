import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const GLOBAL_CONTENT_FILE = path.join(process.cwd(), 'src', 'data', 'global-content.json');

const defaultGlobalContent = {
  siteSettings: {
    siteName: 'FrontDoorFix',
    siteTagline: 'Udkørende værksted',
    siteDescription: 'Professionel reparation af telefoner og tablets direkte på din adresse',
    contactPhone: '+45 93 54 54 57',
    contactEmail: 'info@frontdoorfix.dk',
    contactAddress: 'København, Danmark',
    openingHours: 'Alle dage 8:00-22:00'
  },
  seoSettings: {
    defaultTitle: 'Reparationer af telefoner og tablets - FrontDoorFix',
    defaultDescription: 'Professionel reparation af iPhone, iPad, Samsung Galaxy og andre enheder. Vi kommer til dig - hurtig service med garanti.',
    defaultKeywords: ['reparation', 'iPhone', 'iPad', 'Samsung', 'skærmreparation', 'batteri', 'service']
  },
  footerContent: {
    companyInfo: 'Vi leverer professionel reparation af telefoner og tablets direkte på din adresse. Hurtig service med garanti.',
    openingHours: 'Alle dage: 8:00 - 22:00\nVi kommer til dig hele dagen',
    socialLinks: [
      { id: 'facebook', platform: 'Facebook', url: '#', icon: '📘' },
      { id: 'instagram', platform: 'Instagram', url: '#', icon: '📷' },
      { id: 'trustpilot', platform: 'Trustpilot', url: '#', icon: '⭐' }
    ]
  },
  commonTexts: {
    ctaButton: 'Bestil tid',
    readMore: 'Læs mere',
    contactUs: 'Kontakt os',
    getQuote: 'Få tilbud',
    learnMore: 'Lær mere',
    bookAppointment: 'Book tid',
    viewAll: 'Se alle',
    showMore: 'Vis mere',
    showLess: 'Vis mindre',
    loading: 'Indlæser...',
    error: 'Der opstod en fejl',
    success: 'Handling gennemført'
  },
  pageTitles: {
    home: 'Forside',
    reparationer: 'Reparationer',
    apple: 'Apple Reparationer',
    samsung: 'Samsung Reparationer',
    kontakt: 'Kontakt os',
    erhverv: 'Erhvervsaftaler',
    privatlivspolitik: 'Privatlivspolitik',
    handelsbetingelser: 'Handelsbetingelser'
  }
};

// Helper to read global content
async function getGlobalContent() {
  if (!fs.existsSync(GLOBAL_CONTENT_FILE)) {
    await fs.promises.writeFile(GLOBAL_CONTENT_FILE, JSON.stringify(defaultGlobalContent, null, 2), 'utf8');
    return defaultGlobalContent;
  }
  
  const fileContents = await fs.promises.readFile(GLOBAL_CONTENT_FILE, 'utf8');
  try {
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error parsing global content:', error);
    return defaultGlobalContent;
  }
}

// Helper to write global content
async function setGlobalContent(data: any) {
  await fs.promises.writeFile(GLOBAL_CONTENT_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET() {
  try {
    const content = await getGlobalContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching global content:', error);
    return NextResponse.json({ error: 'Failed to fetch global content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const content = await request.json();
    await setGlobalContent(content);
    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error('Error updating global content:', error);
    return NextResponse.json({ error: 'Failed to update global content' }, { status: 500 });
  }
}

