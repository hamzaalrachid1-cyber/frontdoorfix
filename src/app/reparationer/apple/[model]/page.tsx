import { notFound } from 'next/navigation';
import ModelRepairPage from '@/components/repairs/ModelRepairPage';
import fs from 'fs';
import path from 'path';

interface ModelData {
  brand: string;
  model: string;
  slug: string;
  hasBackGlass: boolean;
  hero: {
    title: string;
    tags: string[];
  };
  repairs: Array<{
    id: string;
    category: string;
    title: string;
    type: 'original' | 'compatible' | 'oem' | 'service';
    price: number | 'contact';
    time: string;
    warranty: string;
    description: string;
    badges: string[];
    notes: string | null;
    showDetailsLink: boolean;
  }>;
}

async function getModelData(slug: string): Promise<ModelData | null> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'repairs', 'apple', `${slug}.json`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const modelData = JSON.parse(fileContents) as ModelData;
    
    return modelData;
  } catch (error) {
    console.error('Error loading model data:', error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    // Dynamically read all model files
    const fs = require('fs');
    const path = require('path');
    
    const modelsDir = path.join(process.cwd(), 'src', 'data', 'repairs', 'apple');
    
    if (!fs.existsSync(modelsDir)) {
      return [];
    }

    const files = fs.readdirSync(modelsDir).filter((file: string) => file.endsWith('.json'));
    const models = [];

    for (const file of files) {
      try {
        const filePath = path.join(modelsDir, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const modelData = JSON.parse(fileContents);
        
        models.push({
          model: modelData.slug,
        });
      } catch (error) {
        console.error(`Error reading ${file}:`, error);
      }
    }

    return models;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;
  const modelData = await getModelData(model);
  
  if (!modelData) {
    return {
      title: 'Model ikke fundet - Frontdoorfix',
    };
  }

  const canonicalUrl = `https://frontdoorfix.dk/reparationer/apple/${model}`;

  return {
    title: `${modelData.model} reparation – hurtig service på din adresse | Frontdoorfix`,
    description: `${modelData.model} reparation i København og omegn. Vi kommer til dig og reparerer på 20-30 min. 24 mdr. garanti på skærme, 12 mdr. på batterier. Originale og kompatible dele.`,
    keywords: `${modelData.model}, reparation, skærm, batteri, kamera, ladeport, København, mobile reparation, iPhone service`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${modelData.model} reparation – hurtig service på din adresse | Frontdoorfix`,
      description: `${modelData.model} reparation i København og omegn. Vi kommer til dig og reparerer på 20-30 min. 24 mdr. garanti på skærme, 12 mdr. på batterier.`,
      url: canonicalUrl,
      siteName: 'Frontdoorfix',
      locale: 'da_DK',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${modelData.model} reparation – hurtig service på din adresse | Frontdoorfix`,
      description: `${modelData.model} reparation i København og omegn. Vi kommer til dig og reparerer på 20-30 min. 24 mdr. garanti på skærme, 12 mdr. på batterier.`,
    },
  };
}

export default async function AppleModelPage({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;
  const modelData = await getModelData(model);

  if (!modelData) {
    notFound();
  }

  return <ModelRepairPage modelData={modelData} />;
}
