import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const HOMEPAGE_FILE = path.join(process.cwd(), 'src', 'data', 'homepage-content.json');

const defaultHomepageContent = {
  hero: {
    title: 'Reparationer af telefoner og tablets',
    subtitle: 'Vi kommer til dig - hurtig service med garanti',
    description: 'Professionel reparation af iPhone, iPad, Samsung Galaxy og andre enheder. Vi reparationer skærm, batteri, opladning og meget mere.',
    ctaText: 'Bestil tid nu',
    ctaLink: '/reparationer'
  },
  uspCards: [
    {
      id: 'usp-1',
      title: 'Vi kommer til dig',
      description: 'Ingen transport - vi reparationer på stedet',
      icon: '🚗',
      order: 1
    },
    {
      id: 'usp-2',
      title: 'Hurtig service',
      description: 'De fleste reparationer klaret på 20-30 minutter',
      icon: '⚡',
      order: 2
    },
    {
      id: 'usp-3',
      title: 'Garanti på alt arbejde',
      description: '24 måneder på skærm, 12 måneder på batteri',
      icon: '🛡️',
      order: 3
    }
  ],
  callouts: [
    {
      id: 'callout-1',
      title: 'iPhone & iPad Reparationer',
      description: 'Alle modeller fra iPhone 6 til iPhone 16 Pro Max',
      link: '/reparationer/apple',
      image: '/images/apple-devices.jpg',
      order: 1
    },
    {
      id: 'callout-2',
      title: 'Samsung Galaxy Reparationer',
      description: 'Galaxy S, A, Z og XCover serier',
      link: '/reparationer/samsung',
      image: '/images/samsung-devices.jpg',
      order: 2
    }
  ],
  testimonials: []
};

// Helper to read homepage content
async function getHomepageContent() {
  if (!fs.existsSync(HOMEPAGE_FILE)) {
    await fs.promises.writeFile(HOMEPAGE_FILE, JSON.stringify(defaultHomepageContent, null, 2), 'utf8');
    return defaultHomepageContent;
  }
  
  const fileContents = await fs.promises.readFile(HOMEPAGE_FILE, 'utf8');
  try {
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error parsing homepage content:', error);
    return defaultHomepageContent;
  }
}

// Helper to write homepage content
async function setHomepageContent(data: any) {
  await fs.promises.writeFile(HOMEPAGE_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET() {
  try {
    const content = await getHomepageContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return NextResponse.json({ error: 'Failed to fetch homepage content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const content = await request.json();
    await setHomepageContent(content);
    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error('Error updating homepage content:', error);
    return NextResponse.json({ error: 'Failed to update homepage content' }, { status: 500 });
  }
}

