import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SITE_CONTENT_FILE = path.join(process.cwd(), 'src', 'data', 'siteContent.json');

const defaultSiteContent = {
  hero: {
    headline: "Vi fikser din mobil – dér hvor du er",
    description: "Nem og tryg reparation uden at forlade hjemmet eller kontoret. Hurtigt, professionelt og med garanti.",
    ctaButton: "Bestil tid nu",
    ctaLink: "/booking"
  },
  howItWorks: {
    title: "Sådan fungerer det – nem reparation i 3 trin",
    steps: [
      {
        number: "1",
        title: "Book en tid",
        description: "Vælg din reparation online eller ring direkte til os. Hurtigt og enkelt."
      },
      {
        number: "2", 
        title: "Vi kommer til dig",
        description: "Vores tekniker kører hjem til dig eller til dit kontor med alt udstyr."
      },
      {
        number: "3",
        title: "Reparation på stedet", 
        description: "Din mobil repareres på under 30 minutter – sikkert og med garanti."
      }
    ]
  },
  brands: {
    title: "Vi reparerer alle mærker",
    description: "Vi reparerer alle populære mærker – altid med garanti",
    brandList: ["Huawei", "OnePlus", "Motorola", "Samsung", "iPhone", "Google", "Sony", "Nokia"]
  },
  services: {
    title: "Hvad vi kan hjælpe dig med",
    description: "Vi tilbyder omfattende reparationer på alle enheder",
    items: [
      {
        icon: "📱",
        title: "Skærmskift",
        description: "Hurtigt skærmskift på alle telefoner og tablets med originale dele"
      },
      {
        icon: "🔋",
        title: "Batteriskift", 
        description: "Nyt batteri der holder længere og lader hurtigere"
      },
      {
        icon: "📷",
        title: "Kamera reparation",
        description: "Reparation af kamera og optik på alle enheder"
      },
      {
        icon: "💧",
        title: "Vandskade",
        description: "Professionel reparation af vandskadede enheder"
      }
    ]
  },
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        question: "Hvor lang tid tager en reparation?",
        answer: "De fleste reparationer tager mellem 20-60 minutter afhængigt af skaden."
      },
      {
        question: "Hvilke dele bruger I?",
        answer: "Vi bruger kun originale dele fra producenten for at sikre bedste kvalitet."
      },
      {
        question: "Hvor længe er garantien?",
        answer: "Vi giver 24 måneders garanti på skærme og 12 måneder på andre dele."
      }
    ]
  },
  contact: {
    phone: "+45 93 54 54 57",
    email: "info@frontdoorfix.dk", 
    address: "København, Danmark",
    hours: "Alle dage: 8:00 - 22:00"
  },
  company: {
    name: "Frontdoorfix",
    tagline: "Udkørende værksted",
    description: "Hurtig og pålidelig mobil- og elektronikreparation direkte på din adresse i København. 24 måneders garanti på skærme."
  }
};

export async function GET() {
  try {
    if (!fs.existsSync(SITE_CONTENT_FILE)) {
      // Create default file if it doesn't exist
      fs.writeFileSync(SITE_CONTENT_FILE, JSON.stringify(defaultSiteContent, null, 2), 'utf8');
      return NextResponse.json(defaultSiteContent);
    }

    const fileContents = fs.readFileSync(SITE_CONTENT_FILE, 'utf8');
    const content = JSON.parse(fileContents);
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error reading site content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const contentData = await request.json();
    
    // Validate the data structure
    if (!contentData || typeof contentData !== 'object') {
      return NextResponse.json({ error: 'Invalid content data' }, { status: 400 });
    }

    // Merge with default content to ensure all fields exist
    const mergedContent = {
      ...defaultSiteContent,
      ...contentData
    };

    // Ensure arrays have proper structure
    if (mergedContent.howItWorks?.steps) {
      mergedContent.howItWorks.steps = mergedContent.howItWorks.steps.map((step: any, index: number) => ({
        number: step.number || (index + 1).toString(),
        title: step.title || `Trin ${index + 1}`,
        description: step.description || ''
      }));
    }

    if (mergedContent.services?.items) {
      mergedContent.services.items = mergedContent.services.items.map((item: any) => ({
        icon: item.icon || '🔧',
        title: item.title || 'Service',
        description: item.description || ''
      }));
    }

    if (mergedContent.faq?.items) {
      mergedContent.faq.items = mergedContent.faq.items.map((item: any) => ({
        question: item.question || 'Spørgsmål',
        answer: item.answer || 'Svar'
      }));
    }

    // Write to file
    fs.writeFileSync(SITE_CONTENT_FILE, JSON.stringify(mergedContent, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, content: mergedContent });
  } catch (error) {
    console.error('Error updating site content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

