const fs = require('fs');
const path = require('path');

// Template for placeholder pages
const placeholderTemplate = (brand, series, models) => `
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface ModelData {
  id: string;
  name: string;
  image: string;
  year: string;
  description: string;
}

export default function ${brand}${series}Page() {
  const [searchTerm, setSearchTerm] = useState("");

  // Placeholder ${brand} ${series} models
  const ${series.toLowerCase()}Models: ModelData[] = [
${models.map(model => `    {
      id: "${model.id}",
      name: "${model.name}",
      image: "/images/iphones/iphone-11.png", // Placeholder
      year: "${model.year}",
      description: "${model.description}"
    }`).join(',\n')}
  ];

  const filteredModels = ${series.toLowerCase()}Models.filter((model) =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.year.includes(searchTerm)
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-pink-500 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            ${brand} ${series} reparationer – Hurtigt & Nemt
          </h1>
          <p className="text-xl sm:text-2xl font-light opacity-90 mb-8">
            Vi reparerer alle ${brand} ${series} modeller – skærm, batteri, og mere. Få din ${series} som ny igen!
          </p>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Søg efter ${series} model..."
              className="w-full p-3 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredModels.length === 0 && (
          <p className="text-center text-gray-600 text-lg">Ingen ${brand} ${series} modeller fundet, der matcher din søgning.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredModels.map((model) => (
            <Link
              key={model.id}
              href={\`/reparationer/${brand.toLowerCase()}/\${model.id}\`}
              className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={model.image}
                  alt={model.name}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={false}
                  loading="lazy"
                />
              </div>
              <div className="p-5 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{model.name}</h2>
                <p className="text-sm text-gray-500 mb-3">{model.year}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{model.description}</p>
                <button className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-full text-white bg-pink-500 hover:bg-pink-600 transition-colors duration-200 shadow-md">
                  Se priser & reparationer
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SEO Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Om ${brand} ${series} reparation – hurtigt, sikkert og gennemsigtigt
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-6">
                ${brand} ${series} modeller er kendt for deres ydeevne og design. Når uheldet er ude, 
                reparerer vi hurtigt og professionelt – direkte på din adresse i København, 
                Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager og omegn.
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ny skærm til ${brand} ${series}</h3>
              <p className="text-gray-600 text-sm mb-6">
                En ridset eller knust skærm påvirker både udseende og brug. Vi udskifter med 
                original kalibreret del eller kompatibel A-kvalitet – du vælger efter behov og budget.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Nyt batteri til ${brand} ${series}</h3>
              <p className="text-gray-600 text-sm mb-6">
                Mister din telefon strøm for hurtigt? Et nyt batteri giver mærkbar forbedring 
                i både driftstid og ydeevne. Vi kalibrerer og funktionstester.
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Hvorfor vælge FrontDoorFix?</h3>
              <p className="text-gray-600 text-sm">
                Erfarne teknikere med over 2.000 gennemførte reparationer, gennemsigtige priser 
                og dele i topkvalitet. Vi rådgiver ærligt om, hvad der bedst kan betale sig.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

// Define all the pages to create
const pagesToCreate = [
  // Huawei Mate
  {
    brand: 'Huawei',
    series: 'MateSerien',
    path: '/Users/hamza/frontdoorfix/src/app/reparationer/huawei/mate-serien/page.tsx',
    models: [
      { id: 'huawei-mate-60-pro', name: 'Huawei Mate 60 Pro', year: '2023', description: 'Flagship Mate model med Kirin 9000S' },
      { id: 'huawei-mate-50-pro', name: 'Huawei Mate 50 Pro', year: '2022', description: 'Mate model med Snapdragon 8+ Gen 1' },
      { id: 'huawei-mate-40-pro', name: 'Huawei Mate 40 Pro', year: '2020', description: 'Mate model med Kirin 9000' }
    ]
  },
  // Motorola Edge
  {
    brand: 'Motorola',
    series: 'Edge',
    path: '/Users/hamza/frontdoorfix/src/app/reparationer/motorola/edge/page.tsx',
    models: [
      { id: 'motorola-edge-40', name: 'Motorola Edge 40', year: '2023', description: 'Edge model med MediaTek Dimensity 8020' },
      { id: 'motorola-edge-30', name: 'Motorola Edge 30', year: '2022', description: 'Edge model med Snapdragon 778G+' },
      { id: 'motorola-edge-20', name: 'Motorola Edge 20', year: '2021', description: 'Edge model med Snapdragon 778G' }
    ]
  },
  // Motorola G
  {
    brand: 'Motorola',
    series: 'G',
    path: '/Users/hamza/frontdoorfix/src/app/reparationer/motorola/g/page.tsx',
    models: [
      { id: 'motorola-g54', name: 'Motorola G54', year: '2023', description: 'G model med MediaTek Dimensity 7020' },
      { id: 'motorola-g53', name: 'Motorola G53', year: '2023', description: 'G model med Snapdragon 480+' },
      { id: 'motorola-g52', name: 'Motorola G52', year: '2022', description: 'G model med Snapdragon 680' }
    ]
  },
  // Google Pixel
  {
    brand: 'Google',
    series: 'Pixel',
    path: '/Users/hamza/frontdoorfix/src/app/reparationer/pixel/pixel/page.tsx',
    models: [
      { id: 'pixel-8-pro', name: 'Google Pixel 8 Pro', year: '2023', description: 'Flagship Pixel model med Tensor G3' },
      { id: 'pixel-8', name: 'Google Pixel 8', year: '2023', description: 'Pixel model med Tensor G3' },
      { id: 'pixel-7-pro', name: 'Google Pixel 7 Pro', year: '2022', description: 'Pixel model med Tensor G2' },
      { id: 'pixel-7', name: 'Google Pixel 7', year: '2022', description: 'Pixel model med Tensor G2' }
    ]
  },
  // PlayStation PS4
  {
    brand: 'PlayStation',
    series: 'PS4',
    path: '/Users/hamza/frontdoorfix/src/app/reparationer/playstation/ps4/page.tsx',
    models: [
      { id: 'ps4-pro', name: 'PlayStation 4 Pro', year: '2016', description: 'PS4 Pro konsol med 4K understøttelse' },
      { id: 'ps4-slim', name: 'PlayStation 4 Slim', year: '2016', description: 'PS4 Slim konsol med reduceret størrelse' },
      { id: 'ps4-original', name: 'PlayStation 4 Original', year: '2013', description: 'Original PS4 konsol' }
    ]
  },
  // PlayStation PS5
  {
    brand: 'PlayStation',
    series: 'PS5',
    path: '/Users/hamza/frontdoorfix/src/app/reparationer/playstation/ps5/page.tsx',
    models: [
      { id: 'ps5-digital', name: 'PlayStation 5 Digital', year: '2020', description: 'PS5 Digital Edition konsol' },
      { id: 'ps5-disc', name: 'PlayStation 5 Disc', year: '2020', description: 'PS5 med disc-drev' }
    ]
  },
  // PlayStation Controller
  {
    brand: 'PlayStation',
    series: 'Controller',
    path: '/Users/hamza/frontdoorfix/src/app/reparationer/playstation/controller/page.tsx',
    models: [
      { id: 'dualsense', name: 'DualSense Controller', year: '2020', description: 'PS5 DualSense controller' },
      { id: 'dualshock-4', name: 'DualShock 4 Controller', year: '2013', description: 'PS4 DualShock 4 controller' }
    ]
  },
  // Computer MacBook
  {
    brand: 'Apple',
    series: 'MacBook',
    path: '/Users/hamza/frontdoorfix/src/app/reparationer/computer/macbook/page.tsx',
    models: [
      { id: 'macbook-air-m3', name: 'MacBook Air M3', year: '2024', description: 'MacBook Air med M3 chip' },
      { id: 'macbook-pro-m3', name: 'MacBook Pro M3', year: '2023', description: 'MacBook Pro med M3 chip' },
      { id: 'macbook-air-m2', name: 'MacBook Air M2', year: '2022', description: 'MacBook Air med M2 chip' }
    ]
  },
  // Computer iMac
  {
    brand: 'Apple',
    series: 'iMac',
    path: '/Users/hamza/frontdoorfix/src/app/reparationer/computer/imac/page.tsx',
    models: [
      { id: 'imac-m3', name: 'iMac M3', year: '2024', description: 'iMac med M3 chip' },
      { id: 'imac-m1', name: 'iMac M1', year: '2021', description: 'iMac med M1 chip' }
    ]
  },
  // Computer Windows Bærbar
  {
    brand: 'Windows',
    series: 'Baerbar',
    path: '/Users/hamza/frontdoorfix/src/app/reparationer/computer/windows-baerbar/page.tsx',
    models: [
      { id: 'windows-laptop-asus', name: 'ASUS Laptop', year: '2023', description: 'ASUS Windows bærbar computer' },
      { id: 'windows-laptop-dell', name: 'Dell Laptop', year: '2023', description: 'Dell Windows bærbar computer' },
      { id: 'windows-laptop-hp', name: 'HP Laptop', year: '2023', description: 'HP Windows bærbar computer' }
    ]
  },
  // Computer Stationær PC
  {
    brand: 'Windows',
    series: 'StationaerPC',
    path: '/Users/hamza/frontdoorfix/src/app/reparationer/computer/stationaer-pc/page.tsx',
    models: [
      { id: 'gaming-pc', name: 'Gaming PC', year: '2023', description: 'Gaming stationær PC' },
      { id: 'office-pc', name: 'Office PC', year: '2023', description: 'Office stationær PC' },
      { id: 'workstation-pc', name: 'Workstation PC', year: '2023', description: 'Workstation stationær PC' }
    ]
  }
];

// Create all the pages
pagesToCreate.forEach(page => {
  const content = placeholderTemplate(page.brand, page.series, page.models);
  fs.writeFileSync(page.path, content);
  console.log(`Created: ${page.path}`);
});

console.log('All placeholder pages created successfully!');

