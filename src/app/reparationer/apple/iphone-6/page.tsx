"use client";

import Link from "next/link";
import { useState } from "react";

type Quality = 'original' | 'kompatibel';
type Category = 'screen' | 'battery' | 'camera' | 'audio' | 'ports' | 'buttons' | 'software' | 'other';
type Badge = 'mest_valgt' | 'paa_lager' | 'advarsel';

type Repair = {
  key: string;
  title: string;
  category: Category;
  time: string;
  warranty: string;
  price: { original?: number; kompatibel?: number; fixed?: number };
  badges?: Badge[];
  warning?: string;
  excerpt: string;
  includes?: string[];
};

export default function IPhone6Repairs() {
  const [selectedRepairs, setSelectedRepairs] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('alle');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const repairs: Repair[] = [
    {
      key: "skærm-original",
      title: "Skærmskift – Original kvalitet",
      category: "screen",
      time: "30 min",
      warranty: "24 mdr",
      price: { fixed: 799 },
      badges: ["paa_lager"],
      excerpt: "Glas + LCD udskiftes. Lys, farver og touch gendannes.",
      includes: ["Glas + LCD", "Kalibrering", "Test af touch"]
    },
    {
      key: "skærm-kompatibel",
      title: "Skærmskift – Kompatibel (uoriginal)",
      category: "screen",
      time: "30 min",
      warranty: "24 mdr",
      price: { fixed: 599 },
      badges: ["paa_lager"],
      excerpt: "Glas + LCD udskiftes (kompatibel kvalitet).",
      includes: ["Kompatibel glas + LCD", "Kalibrering", "Test af touch"]
    },
    {
      key: "batteri-original",
      title: "Batteriskift – Original",
      category: "battery",
      time: "15–20 min",
      warranty: "12 mdr",
      price: { fixed: 399 },
      badges: ["paa_lager"],
      excerpt: "Nyt batteri med frisk kapacitet. Kalibrering + test.",
      includes: ["Original batteri", "Kalibrering", "Kapacitetstest"]
    },
    {
      key: "batteri-kompatibel",
      title: "Batteriskift – Kompatibel",
      category: "battery",
      time: "15–20 min",
      warranty: "12 mdr",
      price: { fixed: 299 },
      badges: ["paa_lager"],
      excerpt: "Kompatibelt batteri. Kalibrering + test.",
      includes: ["Kompatibel batteri", "Kalibrering", "Kapacitetstest"]
    },
    {
      key: "ladeport",
      title: "Ladeport",
      category: "ports",
      time: "20–30 min",
      warranty: "12 mdr",
      price: { fixed: 199 },
      badges: ["paa_lager"],
      excerpt: "Reparation af opladningsproblemer. Inkl. rensning.",
      includes: ["Ladeport", "Rensning", "Test"]
    },
    {
      key: "mikrofon",
      title: "Mikrofon",
      category: "audio",
      time: "20–30 min",
      warranty: "12 mdr",
      price: { original: 199, kompatibel: 149 },
      badges: ["paa_lager"],
      excerpt: "Udskiftning af mikrofon. Inkl. test.",
      includes: ["Mikrofon", "Test"]
    },
    {
      key: "forkamera",
      title: "For-kamera",
      category: "camera",
      time: "20–30 min",
      warranty: "12 mdr",
      price: { original: 299, kompatibel: 199 },
      badges: ["paa_lager"],
      excerpt: "Udskiftning af forkamera. Inkl. test.",
      includes: ["Kamera", "Test"]
    },
    {
      key: "bagkamera",
      title: "Bag-kamera",
      category: "camera",
      time: "20–30 min",
      warranty: "12 mdr",
      price: { original: 399, kompatibel: 299 },
      badges: ["paa_lager"],
      excerpt: "Udskiftning af bagkamera. Inkl. test.",
      includes: ["Kamera", "Test"]
    },
    {
      key: "hjemknap",
      title: "Hjem-knap",
      category: "buttons",
      time: "30–45 min",
      warranty: "12 mdr",
      price: { original: 299, kompatibel: 199 },
      badges: ["advarsel"],
      warning: "Touch ID kan ikke genskabes på iPhone 6",
      excerpt: "Udskiftning af hjem-knap + test.",
      includes: ["Hjem-knap", "Test"]
    },
    {
      key: "ørehøjtaler",
      title: "Ørehøjtaler",
      category: "audio",
      time: "20–30 min",
      warranty: "12 mdr",
      price: { original: 199, kompatibel: 149 },
      badges: ["paa_lager"],
      excerpt: "Udskiftning af ørehøjtaler. Inkl. test.",
      includes: ["Ørehøjtaler", "Test"]
    },
    {
      key: "højtaler",
      title: "Højtaler (bund)",
      category: "audio",
      time: "20–30 min",
      warranty: "12 mdr",
      price: { original: 199, kompatibel: 149 },
      badges: ["paa_lager"],
      excerpt: "Udskiftning af højtaler. Inkl. test.",
      includes: ["Højtaler", "Test"]
    },
    {
      key: "software",
      title: "Software",
      category: "software",
      time: "15–45 min",
      warranty: "Ingen",
      price: { fixed: 99 },
      excerpt: "Backup, gendannelse, opdatering (hvis muligt).",
      includes: ["Diagnose", "Backup", "Opdatering"]
    },
    {
      key: "diagnose",
      title: "Fejlsøgning/diagnose",
      category: "other",
      time: "15–30 min",
      warranty: "Ingen",
      price: { fixed: 99 },
      excerpt: "Fratrækkes ved reparation.",
      includes: ["Diagnose", "Rapport"]
    },
    {
      key: "væskeskade",
      title: "Væskeskade-rens",
      category: "other",
      time: "30–60 min",
      warranty: "Ingen",
      price: { fixed: 199 },
      excerpt: "Rensning og diagnosticering.",
      includes: ["Rensning", "Diagnose"]
    },
    {
      key: "dataredning",
      title: "Dataredning",
      category: "software",
      time: "Variabel",
      warranty: "Ingen",
      price: { fixed: 0 },
      excerpt: "Gendannelse af data (hvis muligt).",
      includes: ["Dataredning", "Backup"]
    }
  ];
  // Helper functions
  const getPrice = (repair: Repair): string => {
    if (repair.price.fixed !== undefined) {
      return repair.price.fixed === 0 ? "Pris efter fund" : `${repair.price.fixed} kr`;
    }
    return "Kontakt os";
  };

  const filteredRepairs = repairs.filter(repair => {
    const matchesFilter = activeFilter === 'alle' || repair.category === activeFilter;
    const matchesSearch = repair.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repair.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });


  const toggleRepairSelection = (repairKey: string) => {
    setSelectedRepairs(prev => 
      prev.includes(repairKey) 
        ? prev.filter(key => key !== repairKey)
        : [...prev, repairKey]
    );
  };

  const getSubtotal = (): number => {
    return selectedRepairs.reduce((total, repairKey) => {
      const repair = repairs.find(r => r.key === repairKey);
      if (!repair) return total;
      
      return total + (repair.price.fixed || 0);
    }, 0);
  };

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
            <Link href="/reparationer/apple" className="hover:text-pink-600">iPhone</Link>
            <span>→</span>
            <span className="text-gray-800 font-medium">iPhone 6</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-yellow-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                  iPhone 6 Reparation
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Standard model med A8 chip – reparation på stedet på 20–30 min.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  A8 chip
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  4.7&quot; Retina
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  2014
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Vi kommer til din adresse
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  20–30 min
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-600">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                  5★ anmeldelser
                </div>
              </div>
            </div>
            <div className="phone-hero">
              <img
                src="/images/iphones/iphone-6.png"
                alt="iPhone 6 – front, bagside og sideprofil"
                width="400"
                height="400"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="phone-hero__img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Repairs & Prices - New Simple Structure */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Reparationer & Priser – iPhone 6
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Vælg din reparation nedenfor. Vi kommer til din adresse og reparerer på stedet på 20-30 minutter.
          </p>


          {/* Filters & Search */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Søg reparation… (fx 'kamera')"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'alle', label: 'Alle' },
                { key: 'screen', label: 'Skærm' },
                { key: 'battery', label: 'Batteri' },
                { key: 'camera', label: 'Kamera' },
                { key: 'audio', label: 'Lyd/Knapper' },
                { key: 'ports', label: 'Porte' },
                { key: 'software', label: 'Software/Andet' }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter.key
                      ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Repair Grid - Compact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredRepairs.map((repair) => (
              <div key={repair.key} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-100 relative min-h-[140px]">
                {repair.badges?.map((badge) => (
                  <div key={badge} className={`absolute -top-2 -right-2 text-xs px-2 py-1 rounded-full font-semibold ${
                    badge === 'mest_valgt' ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white' :
                    badge === 'paa_lager' ? 'bg-green-100 text-green-800' :
                    badge === 'advarsel' ? 'bg-red-100 text-red-800' : ''
                  }`}>
                    {badge === 'mest_valgt' ? 'Mest valgt' :
                     badge === 'paa_lager' ? 'På lager' :
                     badge === 'advarsel' ? 'Advarsel' : badge}
                  </div>
                ))}
                
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="w-9 h-9 bg-gradient-to-r from-pink-100 to-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {repair.category === 'screen' && (
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    )}
                    {repair.category === 'battery' && (
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7h3v10h-3V7zM5 7a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7z" />
                      </svg>
                    )}
                    {repair.category === 'ports' && (
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {repair.category === 'camera' && (
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      </svg>
                    )}
                    {repair.category === 'audio' && (
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 12a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    )}
                    {repair.category === 'buttons' && (
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                    )}
                    {repair.category === 'software' && (
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      </svg>
                    )}
                    {repair.category === 'other' && (
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-semibold text-gray-800 leading-tight">{repair.title}</h3>
                      <div className="text-lg font-bold text-gray-800 ml-2">
                        {getPrice(repair)}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{repair.excerpt}</p>
                    
                    {repair.warning && (
                      <div className="bg-red-50 border border-red-200 rounded-md p-2 mb-3">
                        <p className="text-red-800 text-xs font-medium">⚠️ {repair.warning}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                          ~{repair.time}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                          {repair.warranty}
                        </span>
                        {repair.badges?.includes('paa_lager') && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            På lager
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleRepairSelection(repair.key)}
                          className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm min-h-[36px] ${
                            selectedRepairs.includes(repair.key)
                              ? 'bg-green-600 text-white'
                              : 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:opacity-90'
                          }`}
                        >
                          {selectedRepairs.includes(repair.key) ? '✓ Valgt' : 'Vælg'}
                        </button>
                        <button className="text-xs text-gray-500 hover:text-pink-600 transition-colors p-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* SEO & Help */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Priser inkl. moms. 24 mdr. på skærm / 12 mdr. på batteri & øvrige dele.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                🚗 Vi kommer til dig
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                ⭐ 5★ anmeldelser
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                ⏱️ 20–30 min
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Se også: <Link href="/reparationer/apple/iphone-6s" className="text-pink-600 hover:underline">iPhone 6s</Link> · 
                <Link href="/reparationer/apple/iphone-6-plus" className="text-pink-600 hover:underline ml-1">iPhone 6 Plus</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Step CTA */}
      <section id="next-step-cta" className="py-12 px-6 md:py-14">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl shadow-lg p-8 md:p-12 text-center relative overflow-hidden">
            {/* Subtle overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
            
            {/* Overline */}
            <p className="text-xs md:text-sm font-semibold text-white opacity-75 mb-4 relative z-10" style={{fontSize: '12px'}}>
              Klar til at komme videre?
            </p>
            
            {/* Main Title */}
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 relative z-10" style={{textShadow: '0 1px 1px rgba(0,0,0,.25)'}}>
              Klar til at reparere din iPhone 6?
            </h2>
            
            {/* Subtitle */}
            <p className="text-lg text-white opacity-80 mb-8 max-w-2xl mx-auto relative z-10" style={{textShadow: '0 1px 1px rgba(0,0,0,.25)'}}>
              Book en tid nu og få din iPhone repareret på under 30 minutter.
            </p>
            
            {/* Button Row */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8 relative z-10">
              <a
                href="/bestil?model=iphone-6"
                className="bg-white text-pink-600 px-6 py-4 h-14 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none"
                data-analytics="cta_book_model"
                data-model="iphone-6"
                aria-label="Bestil tid til iPhone 6 reparation"
              >
                <span>📅</span>
                Bestil tid til iPhone 6 reparation
              </a>
              <a
                href="tel:+4593545457"
                className="bg-transparent border-2 border-white text-white px-6 py-4 h-14 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-colors inline-flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none"
                data-analytics="cta_call_model"
                data-model="iphone-6"
                aria-label="Ring til FrontDoorFix på +45 93 54 54 57"
              >
                <span>📞</span>
                Ring +45 93 54 54 57
              </a>
            </div>
            
            {/* Trust Line */}
            <div className="flex flex-wrap justify-center gap-3 text-white opacity-85 text-sm relative z-10">
              <div className="flex items-center gap-2">
                <span>✔</span>
                Vi kommer til din adresse
              </div>
              <div className="flex items-center gap-2">
                <span>⭐</span>
                5★ kundeanmeldelser
              </div>
              <div className="flex items-center gap-2">
                <span>⏱</span>
                20–30 min
              </div>
              <div className="flex items-center gap-2">
                <span>🛡</span>
                24 mdr. skærm / 12 mdr. batteri
              </div>
            </div>
            
            {/* Micro Legal */}
            <p className="text-xs text-white opacity-70 mt-6 relative z-10">
              Priser inkl. moms. Garanti gælder fra reparationsdato.
            </p>
          </div>
        </div>
      </section>

      {/* Related Models */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Se også
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/reparationer/apple/iphone-6s" className="group">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-600 transition-colors">
                  iPhone 6s
                </h3>
                <p className="text-gray-600" style={{display: "none"}}>Opgraderet model med A9 chip og Touch ID</p>
              </div>
            </Link>
            <Link href="/reparationer/apple/iphone-6-plus" className="group">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-600 transition-colors">
                  iPhone 6 Plus
                </h3>
                <p className="text-gray-600">Større model med 5.5&quot; skærm</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Ofte stillede spørgsmål
          </h2>
          <div className="faq" data-faq>
            <details>
              <summary>
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    Hvor lang tid tager en iPhone 6 reparation?
                  </div>
                  <div className="teaser">Typisk 20–30 min. på din adresse</div>
                </div>
                <svg className="chev w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="answer">
                De fleste reparationer er færdige på <strong>20–30 min.</strong> på din adresse.<br/>
                • Skærm: <strong>15–25 min</strong><br/>
                • Batteri: <strong>15–20 min</strong><br/>
                • Ladeport/kamera/højttaler: <strong>20–30 min</strong><br/>
                Ved flere reparationer på én gang kan der komme <strong>10–15 min</strong> ekstra.
              </div>
            </details>
            <details>
              <summary>
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    Mister jeg data ved reparationen?
                  </div>
                  <div className="teaser">Vi sletter ikke dine data</div>
                </div>
                <svg className="chev w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="answer">
                Nej, normalt ikke. Vi nulstiller ikke din telefon, og vi arbejder uden at slette data. Vi anbefaler dog altid backup før reparation som ekstra sikkerhed. For at teste efter reparation kan vi have brug for din <strong>adgangskode</strong> – alle data behandles fortroligt.
              </div>
            </details>
            <details>
              <summary>
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    Kan Touch ID genskabes på iPhone 6?
                  </div>
                  <div className="teaser">Touch ID kan ikke genskabes ved hjem-knap skift</div>
                </div>
                <svg className="chev w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="answer">
                Nej. På iPhone 6 er <strong>Touch ID bundet til bundkortet</strong>. Ved udskiftning af hjem-knappen fungerer knappen stadig, men <strong>Touch ID/Apple Pay</strong> kan ikke genskabes. Vi informerer altid inden vi går i gang.
              </div>
            </details>
            <details>
              <summary>
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    Hvilke dele bruger I, og hvilken garanti får jeg?
                  </div>
                  <div className="teaser">Originale eller A-kvalitets dele + op til 24 mdr. garanti</div>
                </div>
                <svg className="chev w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="answer">
                Vi bruger originale eller A-kvalitets kompatible reservedele fra godkendte leverandører.<br/>
                • Skærm: <strong>24 mdr. garanti</strong><br/>
                • Batteri & øvrige dele: <strong>12 mdr. garanti</strong><br/>
                Garantien dækker funktionsfejl på delen – ikke ny fysisk skade, fugt eller åbninger foretaget andre steder. Du får kvittering og garantibevis.
              </div>
            </details>
            <details>
              <summary>
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    Kommer I ud til min adresse?
                  </div>
                  <div className="teaser">Storkøbenhavn, gratis kørsel inden for 25 km</div>
                </div>
                <svg className="chev w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="answer">
                Ja. Vi dækker hele Storkøbenhavn og kommer ud til dig uden beregning inden for <strong>25 km</strong>. Åbent alle dage <strong>8:00–22:00</strong>. Vi reparerer på stedet (servicebil/hos dig). Uden for zonen kan vi stadig hjælpe – mod tillæg eller med indsendelse.
              </div>
            </details>
            <details>
              <summary>
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    Hvad hvis fejlen er ukendt eller ikke på listen?
                  </div>
                  <div className="teaser">Diagnose 99 kr – fratrækkes ved reparation</div>
                </div>
                <svg className="chev w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="answer">
                Vi laver en diagnose og finder fejlen. Pris <strong>99 kr</strong> – fratrækkes hvis du vælger reparation. Vi kontakter dig med pris og løsning før vi gør noget. Takker du nej, betaler du kun diagnose.
              </div>
            </details>
            <details>
              <summary>
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    Giver I garanti ved væskeskader?
                  </div>
                  <div className="teaser">Rens/rediag – ingen garanti på væskeskader</div>
                </div>
                <svg className="chev w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="answer">
                Vi tilbyder rens og redning af væskeskader (typisk <strong>199 kr</strong>). Da fugt kan give senfølger/korrosion, kan vi ikke give garanti på væskeskader. Vi rådgiver om dataredning (pris efter fund).
              </div>
            </details>
          </div>
          
          {/* Mini CTA under FAQ */}
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 mb-6">Klar til at komme videre?</p>
            <a
              href="/bestil?model=iphone-6"
              className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              📅 Bestil tid til iPhone 6
            </a>
          </div>
        </div>

        {/* FAQ Accordion Styles */}
        <style jsx>{`
          :root {
            --fdf-pink: #ff4d8d;
            --fdf-orange: #f6b73c;
            --fdf-grad: linear-gradient(90deg, var(--fdf-pink), var(--fdf-orange));
            --fdf-faq-bg: #f9fafb;
            --fdf-faq-hov: #fff7ed;
            --fdf-faq-br: #e5e7eb;
            --fdf-faq-tz: #6b7280;
          }
          
          @media (prefers-color-scheme: dark) {
            :root {
              --fdf-faq-bg: #0f172a;
              --fdf-faq-hov: #1e293b;
              --fdf-faq-br: #334155;
              --fdf-faq-tz: #94a3b8;
            }
          }
          
          .faq details {
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            background: #f9fafb;
            overflow: hidden;
            margin-bottom: 1.5rem;
          }
          
          .faq summary {
            list-style: none;
            cursor: pointer;
            background: #f9fafb;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            padding: 16px 18px;
            position: relative;
            transition: background-color 0.2s ease;
            color: #111827;
          }
          
          .faq summary::-webkit-details-marker {
            display: none;
          }
          
          .faq summary:hover {
            background: #fff7ed;
          }
          
          .faq summary:focus-visible {
            outline: 2px solid transparent;
            box-shadow: 0 0 0 3px rgba(255,77,141,.35), 0 0 0 6px rgba(246,183,60,.25);
            border-radius: 12px;
          }
          
          .faq .teaser {
            color: #6b7280;
            font-size: 0.95rem;
            margin-top: 4px;
            font-weight: normal;
          }
          
          .faq details[open] summary::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: var(--fdf-grad);
          }
          
          .faq summary .chev {
            transition: transform 0.2s ease, color 0.2s ease;
            color: #64748b;
            margin-left: 1rem;
            flex-shrink: 0;
          }
          
          .faq details[open] summary .chev {
            transform: rotate(180deg);
            color: var(--fdf-pink);
          }
          
          .faq .answer {
            padding: 14px 18px 18px;
            background: #f9fafb;
            color: #374151;
          }
          
          .faq .answer b,
          .faq .answer strong {
            color: #111827;
          }
          
          /* Dark mode disabled for now to ensure light theme consistency */
          /*
          @media (prefers-color-scheme: dark) {
            .faq details,
            .faq summary,
            .faq .answer {
              background: #0b1220;
            }
            
            .faq .answer {
              color: #d1d5db;
            }
            
            .faq .answer b,
            .faq .answer strong {
              color: #e2e8f0;
            }
            
            .faq summary {
              color: #f3f4f6;
            }
          }
          */
        `}</style>

        {/* FAQ Accordion JavaScript */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                const faqContainer = document.querySelector('[data-faq]');
                if (!faqContainer) return;
                
                const faqItems = faqContainer.querySelectorAll('.faq-item');
                
                faqItems.forEach(item => {
                  item.addEventListener('toggle', function() {
                    if (this.open) {
                      // Close all other FAQ items
                      faqItems.forEach(otherItem => {
                        if (otherItem !== this && otherItem.open) {
                          otherItem.open = false;
                        }
                      });
                    }
                  });
                });
              });
            `
          }}
        />
      </section>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "iPhone 6 Reparation",
            "description": "Vi reparerer iPhone 6 med originale dele. Skærm, batteri, kamera, knapper og mere. 24 mdr garanti på skærme, 12 mdr på øvrige dele.",
            "brand": {
              "@type": "Brand",
              "name": "Apple"
            },
            "model": "iPhone 6",
            "offers": {
              "@type": "Offer",
              "price": "699",
              "priceCurrency": "DKK",
              "availability": "https://schema.org/InStock",
              "description": "Skærmreparation fra 699 kr"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Reparationstid",
                "value": "15-25 min"
              },
              {
                "@type": "PropertyValue",
                "name": "Garanti",
                "value": "24 mdr på skærme"
              }
            ]
          })
        }}
      />

      {/* FAQ Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Hvor lang tid tager en iPhone 6 reparation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "De fleste reparationer er færdige på 20–30 min. på din adresse. Skærm: 15–25 min, Batteri: 15–20 min, Ladeport/kamera/højttaler: 20–30 min. Ved flere reparationer på én gang kan der komme 10–15 min ekstra."
                }
              },
              {
                "@type": "Question",
                "name": "Mister jeg data ved reparationen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nej, normalt ikke. Vi nulstiller ikke din telefon, og vi arbejder uden at slette data. Vi anbefaler dog altid backup før reparation som ekstra sikkerhed. For at teste efter reparation kan vi have brug for din adgangskode – alle data behandles fortroligt."
                }
              },
              {
                "@type": "Question",
                "name": "Kan Touch ID genskabes på iPhone 6?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nej. På iPhone 6 er Touch ID bundet til bundkortet. Ved udskiftning af hjem-knappen fungerer knappen stadig, men Touch ID/Apple Pay kan ikke genskabes. Vi informerer altid inden vi går i gang."
                }
              },
              {
                "@type": "Question",
                "name": "Hvilke dele bruger I, og hvilken garanti får jeg?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Vi bruger originale eller A-kvalitets kompatible reservedele fra godkendte leverandører. Skærm: 24 mdr. garanti, Batteri & øvrige dele: 12 mdr. garanti. Garantien dækker funktionsfejl på delen – ikke ny fysisk skade, fugt eller åbninger foretaget andre steder. Du får kvittering og garantibevis."
                }
              },
              {
                "@type": "Question",
                "name": "Kommer I ud til min adresse?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja. Vi dækker hele Storkøbenhavn og kommer ud til dig uden beregning inden for 25 km. Åbent alle dage 8:00–22:00. Vi reparerer på stedet (servicebil/hos dig). Uden for zonen kan vi stadig hjælpe – mod tillæg eller med indsendelse."
                }
              },
              {
                "@type": "Question",
                "name": "Hvad hvis fejlen er ukendt eller ikke på listen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Vi laver en diagnose og finder fejlen. Pris 99 kr – fratrækkes hvis du vælger reparation. Vi kontakter dig med pris og løsning før vi gør noget. Takker du nej, betaler du kun diagnose."
                }
              },
              {
                "@type": "Question",
                "name": "Giver I garanti ved væskeskader?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Vi tilbyder rens og redning af væskeskader (typisk 199 kr). Da fugt kan give senfølger/korrosion, kan vi ikke give garanti på væskeskader. Vi rådgiver om dataredning (pris efter fund)."
                }
              }
            ]
          })
        }}
      />

      {/* Sticky Mobile CTA */}
      <div id="sticky-cta" className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 safe-area-padding">
        <div className="flex items-center justify-between px-4 py-3 h-16">
          <a
            href="/bestil?model=iphone-6"
            className="flex-1 bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-4 py-3 rounded-full font-semibold text-center mr-2 focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:outline-none"
            data-analytics="cta_book_model"
            data-model="iphone-6"
            aria-label="Bestil tid til iPhone 6 reparation"
          >
            Bestil tid
          </a>
          <a
            href="tel:+4593545457"
            className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:outline-none"
            data-analytics="cta_call_model"
            data-model="iphone-6"
            aria-label="Ring til FrontDoorFix på +45 93 54 54 57"
          >
            📞
          </a>
        </div>
      </div>

      {/* Sticky Booking Bar */}
      {selectedRepairs.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedRepairs.map((repairKey) => {
                    const repair = repairs.find(r => r.key === repairKey);
                    if (!repair) return null;
                    return (
                      <div key={repairKey} className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-2">
                        <span className="text-sm font-medium">{repair.title}</span>
                        <button
                          onClick={() => toggleRepairSelection(repairKey)}
                          className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>🚗 Vi kommer til dig</span>
                  <span>⭐ 5★ anmeldelser</span>
                  <span>⏱️ 20–30 min</span>
                </div>
              </div>
              
              <div className="text-right ml-6">
                <div className="text-lg font-bold text-gray-800 mb-2">
                  Total: {getSubtotal()} kr
                  {selectedRepairs.length > 1 && (
                    <span className="text-sm text-green-600 ml-2">(Samlerabat)</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-300 transition-colors">
                    Få tilbud pr. SMS
                  </button>
                  <button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity">
                    Færdiggør booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}