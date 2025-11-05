
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

export default function HuaweiMateSerienPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Placeholder Huawei MateSerien models
  const mateserienModels: ModelData[] = [
    {
      id: "huawei-mate-60-pro",
      name: "Huawei Mate 60 Pro",
      image: "/images/iphones/iphone-11.png", // Placeholder
      year: "2023",
    },
    {
      id: "huawei-mate-50-pro",
      name: "Huawei Mate 50 Pro",
      image: "/images/iphones/iphone-11.png", // Placeholder
      year: "2022",
    },
    {
      id: "huawei-mate-40-pro",
      name: "Huawei Mate 40 Pro",
      image: "/images/iphones/iphone-11.png", // Placeholder
      year: "2020",
    }
  ];

  const filteredModels = mateserienModels.filter((model) =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.year.includes(searchTerm)
  );

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <nav className="bg-gray-100 py-3 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-pink-600">Forside</Link>
            <span>→</span>
            <Link href="/reparationer" className="hover:text-pink-600">Reparationer</Link>
            <span>→</span>
            <Link href="/reparationer/huawei" className="hover:text-pink-600">Huawei</Link>
            <span>→</span>
            <span className="text-gray-800 font-medium">Mate-serien</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-yellow-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Huawei Mate-serien Reparationer
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vi reparerer alle Huawei Mate-modeller med originale dele og 24 måneders garanti. 
              Hurtig service direkte på din adresse.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 mb-6">
              Vi reparerer alle Huawei Mate-modeller med originale eller kvalitetsgodkendte dele og op til 24 måneders garanti. 
              Vi kommer direkte til din adresse—hurtigt, sikkert og professionelt.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Søg model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Huawei Mate Models Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Vælg din Huawei Mate-model
          </h2>

          {filteredModels.length === 0 && (
            <p className="text-center text-gray-600 text-lg">Ingen Huawei Mate-modeller fundet, der matcher din søgning.</p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredModels.map((model) => {
              // Determine badges for each model
              const isNew = model.year === "2023";
              const isPopular = ["huawei-mate-60-pro", "huawei-mate-50-pro"].includes(model.id);
              
              return (
                <div 
                  key={model.id}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-pink-300 transition-all duration-300 relative"
                >
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    {isNew && (
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Ny
                      </span>
                    )}
                    {isPopular && (
                      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Mest valgt
                      </span>
                    )}
                  </div>
                  
                  {/* Phone Image */}
                  <div className="phone-card">
                    <Image
                      src={model.image || "/images/placeholder-huawei.jpg"}
                      alt={`${model.name} – front, bagside og sideprofil`}
                      width={200}
                      height={200}
                      loading="lazy"
                      decoding="async"
                      className="phone-card__img"
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgODBDMTEwLjQ5MSA4MCAxMjAgODkuNTA5IDEyMCAxMDBDMTIwIDExMC40OTEgMTEwLjQ5MSAxMjAgMTAwIDEyMEM4OS41MDkgMTIwIDgwIDExMC40OTEgODAgMTAwQzgwIDg5LjUwOSA4OS41MDkgODAgMTAwIDgwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 font-medium">{model.year}</p>
                    
                    {/* Model Info Chips */}
                    
                    <Link 
                      href={`/reparationer/huawei/${model.id}`}
                      className="btn-gradient px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 mt-2"
                    >
                      <span>👉</span>
                      Se priser & reparationer
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Hvorfor vælge os
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Reparation på din adresse</h3>
              <p className="text-gray-600 text-sm">Ingen ventetid - vi kommer til dig</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">24 mdr. garanti</h3>
              <p className="text-gray-600 text-sm">Skærme / 12 mdr. på batterier</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Originale dele</h3>
              <p className="text-gray-600 text-sm">Kvalitetsgodkendte reservedele</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">2.000+ reparationer</h3>
              <p className="text-gray-600 text-sm">5⭐ kundeanmeldelser</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-yellow-500">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Har du ikke fundet din model?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Ring til os på +45 93 54 54 57 eller send en besked
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+4593545457"
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              📞 Ring nu
            </a>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-colors">
              Send besked
            </button>
          </div>
        </div>
      </section>

      {/* Huawei Mate Repairs SEO Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Huawei Mate Reparation i København</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Vi specialiserer os i Huawei Mate reparationer med originale dele og 24 måneders garanti. 
              Vi kommer direkte til din adresse i København og omegn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
