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
  // List of available models
  const models = [
    'iphone-6',
    'iphone-6-plus', 
    'iphone-6s',
    'iphone-6s-plus',
    'iphone-7',
    'iphone-7-plus',
    'iphone-8',
    'iphone-8-plus',
    'iphone-x',
    'iphone-xr',
    'iphone-xs',
    'iphone-xs-max',
    'iphone-11',
    'iphone-11-pro',
    'iphone-11-pro-max',
    'iphone-12-mini',
    'iphone-12',
    'iphone-12-pro',
    'iphone-12-pro-max',
    'iphone-13-mini',
    'iphone-13',
    'iphone-13-pro',
    'iphone-13-pro-max',
    'iphone-14',
    'iphone-14-plus',
    'iphone-14-pro',
    'iphone-14-pro-max',
    'iphone-15',
    'iphone-15-plus',
    'iphone-15-pro',
    'iphone-15-pro-max',
    'iphone-16',
    'iphone-16-plus',
    'iphone-16-pro',
    'iphone-16-pro-max'
  ];

  return models.map((model) => ({
    model: model,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;
  const modelData = await getModelData(model);
  
  if (!modelData) {
    return {
      title: 'Model ikke fundet - Frontdoorfix',
    };
  }

  return {
    title: `${modelData.model} Reparation - Frontdoorfix`,
    description: `${modelData.model} reparation i København. Vi kommer til din adresse og reparerer på 20-30 min. 24 mdr. garanti på skærme.`,
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
