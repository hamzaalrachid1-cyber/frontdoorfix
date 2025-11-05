const fs = require('fs');
const path = require('path');

// Template for model page that uses ModelRepairPage component
const modelPageTemplate = (brand, modelSlug) => `
import fs from 'fs';
import path from 'path';
import ModelRepairPage from '@/components/repairs/ModelRepairPage';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'repairs', '${brand.toLowerCase()}', '${modelSlug}.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const modelData = JSON.parse(fileContents);

  return {
    title: \`\${modelData.model} reparation | Skærm, batteri m.m. – FrontDoorFix\`,
    description: \`\${modelData.model} reparation og service i København og omegn. Vi kommer til dig og reparerer på 20-30 minutter.\`,
    keywords: \`\${modelData.model}, reparation, skærm, batteri, kamera, \${modelData.brand}, mobilreparation, København\`,
    openGraph: {
      title: \`\${modelData.model} reparation | FrontDoorFix\`,
      description: \`\${modelData.model} reparation og service i København og omegn. Vi kommer til dig og reparerer på 20-30 minutter.\`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: \`\${modelData.model} reparation | FrontDoorFix\`,
      description: \`\${modelData.model} reparation og service i København og omegn. Vi kommer til dig og reparerer på 20-30 minutter.\`,
    },
  };
}

export default function ${modelSlug.charAt(0).toUpperCase() + modelSlug.slice(1).replace(/-/g, '')}Page() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'repairs', '${brand.toLowerCase()}', '${modelSlug}.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const modelData = JSON.parse(fileContents);

  return <ModelRepairPage modelData={modelData} />;
}
`;

// Template for model JSON data
const modelJsonTemplate = (brand, model, modelSlug, year, description, chip) => `
{
  "brand": "${brand}",
  "model": "${model}",
  "slug": "${modelSlug}",
  "hasBackGlass": true,
  "order": 1,
  "hero": {
    "title": "${model} Reparation",
    "tags": ["${chip}", "${description}"]
  },
  "repairs": [
    {
      "id": "screen-original",
      "category": "Skærm",
      "title": "Skærmskift – Original",
      "type": "original",
      "price": 1299,
      "time": "~45 min",
      "warranty": "24 mdr",
      "description": "Glas + LCD udskiftes. Lys, farver og touch gendannes.",
      "badges": [],
      "notes": null,
      "showDetailsLink": true
    },
    {
      "id": "screen-compatible",
      "category": "Skærm",
      "title": "Skærmskift – Kompatibel",
      "type": "compatible",
      "price": 999,
      "time": "~45 min",
      "warranty": "24 mdr",
      "description": "Glas + LCD udskiftes (kompatibel kvalitet).",
      "badges": [],
      "notes": null,
      "showDetailsLink": true
    },
    {
      "id": "battery-original",
      "category": "Batteri",
      "title": "Batteriskift – Original",
      "type": "original",
      "price": 599,
      "time": "~30–45 min",
      "warranty": "12 mdr",
      "description": "Nyt batteri med frisk kapacitet. Kalibrering + test.",
      "badges": [],
      "notes": null,
      "showDetailsLink": true
    },
    {
      "id": "battery-compatible",
      "category": "Batteri",
      "title": "Batteriskift – Kompatibel",
      "type": "compatible",
      "price": 449,
      "time": "~30–45 min",
      "warranty": "12 mdr",
      "description": "Kompatibelt batteri. Kalibrering + test.",
      "badges": [],
      "notes": null,
      "showDetailsLink": true
    },
    {
      "id": "charging-port",
      "category": "Porte",
      "title": "Ladeport (USB-C)",
      "type": "service",
      "price": 349,
      "time": "~30–45 min",
      "warranty": "12 mdr",
      "description": "Reparation af opladningsproblemer. Inkl. rensning.",
      "badges": [],
      "notes": null,
      "showDetailsLink": true
    },
    {
      "id": "back-camera",
      "category": "Kamera",
      "title": "Bag-kamera",
      "type": "service",
      "price": 699,
      "time": "~30–45 min",
      "warranty": "12 mdr",
      "description": "Udskiftning af bag-kamera. Inkl. test.",
      "badges": [],
      "notes": null,
      "showDetailsLink": true
    },
    {
      "id": "front-camera",
      "category": "Kamera",
      "title": "For-kamera",
      "type": "service",
      "price": 499,
      "time": "~30–45 min",
      "warranty": "12 mdr",
      "description": "Udskiftning af for-kamera. Inkl. test.",
      "badges": [],
      "notes": null,
      "showDetailsLink": true
    },
    {
      "id": "speaker",
      "category": "Lyd/Knapper",
      "title": "Højttaler",
      "type": "service",
      "price": 349,
      "time": "~30–45 min",
      "warranty": "12 mdr",
      "description": "Udskiftning af højttaler. Inkl. test.",
      "badges": [],
      "notes": null,
      "showDetailsLink": true
    },
    {
      "id": "microphone",
      "category": "Lyd/Knapper",
      "title": "Mikrofon",
      "type": "service",
      "price": 349,
      "time": "~30–45 min",
      "warranty": "12 mdr",
      "description": "Udskiftning af mikrofon. Inkl. test.",
      "badges": [],
      "notes": null,
      "showDetailsLink": true
    },
    {
      "id": "back-glass",
      "category": "Bagcover",
      "title": "Bagglas",
      "type": "service",
      "price": 499,
      "time": "~30–45 min",
      "warranty": "12 mdr",
      "description": "Udskiftning af bagglas. Inkl. test.",
      "badges": [],
      "notes": null,
      "showDetailsLink": true
    },
    {
      "id": "software",
      "category": "Software/Andet",
      "title": "Software",
      "type": "service",
      "price": 149,
      "time": "~30–60 min",
      "warranty": "Ingen",
      "description": "Backup, gendannelse, opdatering (hvis muligt).",
      "badges": [],
      "notes": null,
      "showDetailsLink": true
    },
    {
      "id": "diagnostics",
      "category": "Software/Andet",
      "title": "Fejlsøgning/diagnose",
      "type": "service",
      "price": 149,
      "time": "~30–45 min",
      "warranty": "Ingen",
      "description": "Fratrækkes ved reparation.",
      "badges": [],
      "notes": null,
      "showDetailsLink": true
    }
  ]
}`;

// Define models to create
const modelsToCreate = [
  // OnePlus
  { brand: 'OnePlus', model: 'OnePlus Nord 2T', slug: 'oneplus-nord-2t', year: '2022', description: 'Nord model', chip: 'MediaTek Dimensity 1300' },
  { brand: 'OnePlus', model: 'OnePlus Nord 2', slug: 'oneplus-nord-2', year: '2021', description: 'Nord model', chip: 'MediaTek Dimensity 1200' },
  { brand: 'OnePlus', model: 'OnePlus 11', slug: 'oneplus-11', year: '2023', description: 'Flagship model', chip: 'Snapdragon 8 Gen 2' },
  { brand: 'OnePlus', model: 'OnePlus 10T', slug: 'oneplus-10t', year: '2022', description: 'Pro model', chip: 'Snapdragon 8+ Gen 1' },
  
  // Huawei
  { brand: 'Huawei', model: 'Huawei P60 Pro', slug: 'huawei-p60-pro', year: '2023', description: 'P model', chip: 'Snapdragon 8+ Gen 1' },
  { brand: 'Huawei', model: 'Huawei P60', slug: 'huawei-p60', year: '2023', description: 'P model', chip: 'Snapdragon 778G' },
  { brand: 'Huawei', model: 'Huawei Mate 60 Pro', slug: 'huawei-mate-60-pro', year: '2023', description: 'Mate model', chip: 'Kirin 9000S' },
  { brand: 'Huawei', model: 'Huawei Mate 50 Pro', slug: 'huawei-mate-50-pro', year: '2022', description: 'Mate model', chip: 'Snapdragon 8+ Gen 1' },
  
  // Motorola
  { brand: 'Motorola', model: 'Motorola Edge 40', slug: 'motorola-edge-40', year: '2023', description: 'Edge model', chip: 'MediaTek Dimensity 8020' },
  { brand: 'Motorola', model: 'Motorola Edge 30', slug: 'motorola-edge-30', year: '2022', description: 'Edge model', chip: 'Snapdragon 778G+' },
  { brand: 'Motorola', model: 'Motorola G54', slug: 'motorola-g54', year: '2023', description: 'G model', chip: 'MediaTek Dimensity 7020' },
  { brand: 'Motorola', model: 'Motorola G53', slug: 'motorola-g53', year: '2023', description: 'G model', chip: 'Snapdragon 480+' },
  
  // Google Pixel
  { brand: 'Google', model: 'Google Pixel 8 Pro', slug: 'pixel-8-pro', year: '2023', description: 'Pixel model', chip: 'Tensor G3' },
  { brand: 'Google', model: 'Google Pixel 8', slug: 'pixel-8', year: '2023', description: 'Pixel model', chip: 'Tensor G3' },
  { brand: 'Google', model: 'Google Pixel 7 Pro', slug: 'pixel-7-pro', year: '2022', description: 'Pixel model', chip: 'Tensor G2' },
  { brand: 'Google', model: 'Google Pixel 7', slug: 'pixel-7', year: '2022', description: 'Pixel model', chip: 'Tensor G2' }
];

// Create directories and files
modelsToCreate.forEach(({ brand, model, slug, year, description, chip }) => {
  const brandDir = `/Users/hamza/frontdoorfix/src/data/repairs/${brand.toLowerCase()}`;
  const modelDir = `/Users/hamza/frontdoorfix/src/app/reparationer/${brand.toLowerCase()}/${slug}`;
  
  // Create brand data directory if it doesn't exist
  if (!fs.existsSync(brandDir)) {
    fs.mkdirSync(brandDir, { recursive: true });
  }
  
  // Create model directory if it doesn't exist
  if (!fs.existsSync(modelDir)) {
    fs.mkdirSync(modelDir, { recursive: true });
  }
  
  // Create JSON data file
  const jsonContent = modelJsonTemplate(brand, model, slug, year, description, chip);
  const jsonPath = `${brandDir}/${slug}.json`;
  fs.writeFileSync(jsonPath, jsonContent);
  console.log(`Created JSON: ${jsonPath}`);
  
  // Create model page file
  const pageContent = modelPageTemplate(brand, slug);
  const pagePath = `${modelDir}/page.tsx`;
  fs.writeFileSync(pagePath, pageContent);
  console.log(`Created page: ${pagePath}`);
});

console.log('All consistent model pages created successfully!');

