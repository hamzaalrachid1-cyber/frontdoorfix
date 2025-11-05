import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import ModelRepairPage from '@/components/repairs/ModelRepairPage';

const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs', 'samsung');

export async function generateStaticParams() {
  const files = fs.readdirSync(MODELS_DIR).filter(file => file.endsWith('.json'));
  
  return files.map(file => ({
    slug: file.replace('.json', ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const filePath = path.join(MODELS_DIR, `${slug}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const modelData = JSON.parse(fileContents);
    
    const title = `${modelData.model} reparation | Skærm, batteri m.m. – Frontdoorfix`;
    const description = `Vi reparerer ${modelData.model} med originale dele og 24 måneders garanti. Skærmskift, batteriskift, kamera og mere. Vi kommer til dig i København.`;
    
    return {
      title,
      description,
      keywords: `${modelData.model} reparation, Samsung reparation, skærmskift Samsung, batteriskift Samsung, Samsung reparation København`,
      openGraph: {
        title,
        description,
        type: 'website',
        locale: 'da_DK',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  } catch (error) {
    return {
      title: 'Samsung Reparation | Frontdoorfix',
      description: 'Vi reparerer Samsung telefoner med originale dele og 24 måneders garanti.',
    };
  }
}

export default async function SamsungModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const filePath = path.join(MODELS_DIR, `${slug}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const modelData = JSON.parse(fileContents);
    
    return <ModelRepairPage modelData={modelData} />;
  } catch (error) {
    console.error(`Error loading Samsung model ${slug}:`, error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Model ikke fundet</h1>
          <p className="text-gray-600">Den ønskede Samsung model kunne ikke findes.</p>
        </div>
      </div>
    );
  }
}
