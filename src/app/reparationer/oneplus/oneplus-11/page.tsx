
import fs from 'fs';
import path from 'path';
import ModelRepairPage from '@/components/repairs/ModelRepairPage';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'repairs', 'oneplus', 'oneplus-11.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const modelData = JSON.parse(fileContents);

  return {
    title: `${modelData.model} reparation | Skærm, batteri m.m. – FrontDoorFix`,
    description: `${modelData.model} reparation og service i København og omegn. Vi kommer til dig og reparerer på 20-30 minutter.`,
    keywords: `${modelData.model}, reparation, skærm, batteri, kamera, ${modelData.brand}, mobilreparation, København`,
    openGraph: {
      title: `${modelData.model} reparation | FrontDoorFix`,
      description: `${modelData.model} reparation og service i København og omegn. Vi kommer til dig og reparerer på 20-30 minutter.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${modelData.model} reparation | FrontDoorFix`,
      description: `${modelData.model} reparation og service i København og omegn. Vi kommer til dig og reparerer på 20-30 minutter.`,
    },
  };
}

export default function Oneplus11Page() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'repairs', 'oneplus', 'oneplus-11.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const modelData = JSON.parse(fileContents);

  return <ModelRepairPage modelData={modelData} />;
}
