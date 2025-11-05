
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

export default function WindowsBaerbarPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Placeholder Windows Baerbar models
  const baerbarModels: ModelData[] = [
    {
      id: "windows-laptop-asus",
      name: "ASUS Laptop",
      image: "/images/iphones/iphone-11.png", // Placeholder
      year: "2023",
      description: "ASUS Windows bærbar computer"
    },
    {
      id: "windows-laptop-dell",
      name: "Dell Laptop",
      image: "/images/iphones/iphone-11.png", // Placeholder
      year: "2023",
      description: "Dell Windows bærbar computer"
    },
    {
      id: "windows-laptop-hp",
      name: "HP Laptop",
      image: "/images/iphones/iphone-11.png", // Placeholder
      year: "2023",
      description: "HP Windows bærbar computer"
    }
  ];

  const filteredModels = baerbarModels.filter((model) =>
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
            Windows Baerbar reparationer – Hurtigt & Nemt
          </h1>
          <p className="text-xl sm:text-2xl font-light opacity-90 mb-8">
            Vi reparerer alle Windows Baerbar modeller – skærm, batteri, og mere. Få din Baerbar som ny igen!
          </p>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Søg efter Baerbar model..."
              className="w-full p-3 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredModels.length === 0 && (
          <p className="text-center text-gray-600 text-lg">Ingen Windows Baerbar modeller fundet, der matcher din søgning.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredModels.map((model) => (
            <Link
              key={model.id}
              href={`/reparationer/windows/${model.id}`}
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
                <button 
                    data-book-now
                    data-brand="Windows"
                    data-model={model.name}
                    className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-full text-white bg-pink-500 hover:bg-pink-600 transition-colors duration-200 shadow-md">
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
              Om Windows Baerbar reparation – hurtigt, sikkert og gennemsigtigt
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-6">
                Windows Baerbar modeller er kendt for deres ydeevne og design. Når uheldet er ude, 
                reparerer vi hurtigt og professionelt – direkte på din adresse i København, 
                Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn.
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ny skærm til Windows Baerbar</h3>
              <p className="text-gray-600 text-sm mb-6">
                En ridset eller knust skærm påvirker både udseende og brug. Vi udskifter med 
                original kalibreret del eller kompatibel A-kvalitet – du vælger efter behov og budget.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Nyt batteri til Windows Baerbar</h3>
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
