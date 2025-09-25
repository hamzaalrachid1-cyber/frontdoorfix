"use client";

import Link from "next/link";
import { useState } from "react";

type Variant = {
  id: string;
  label: string;
  price: number;
  warrantyMonths: number;
};

type Repair = {
  id: string;
  title: string;
  category: "screen" | "battery" | "camera" | "audio" | "port" | "software" | "other";
  description?: string;
  timeMin?: string;
  stock?: "in_stock" | "contact";
  price?: number;
  variants?: Variant[];
  contactOnly?: boolean;
};

type BookingLine = { 
  repairId: string; 
  variantId?: string; 
  price: number; 
  label: string; 
};

type Booking = {
  model: string;
  lines: BookingLine[];
  total: number;
  customer: {
    name: string; 
    phone: string; 
    email: string;
    address: string; 
    zip: string; 
    city: string;
  };
  datetime: string;
  note?: string;
};

export default function IPhone6Repairs() {
  const [activeFilter, setActiveFilter] = useState<string>('alle');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showBookingWizard, setShowBookingWizard] = useState<boolean>(false);
  const [showDetailsModal, setShowDetailsModal] = useState<string | null>(null);

  const repairs: Repair[] = [
    {
      id: "screen",
      title: "Skærmskift",
      category: "screen",
      description: "Glas + LCD udskiftes. Lys, farver og touch gendannes.",
      timeMin: "~30 min",
      stock: "in_stock",
      variants: [
        { id: "screen-original", label: "Original (kalibreret)", price: 799, warrantyMonths: 24 },
        { id: "screen-compat", label: "Kompatibel (A-kvalitet)", price: 599, warrantyMonths: 24 },
      ],
    },
    {
      id: "battery",
      title: "Batteriskift",
      category: "battery",
      description: "Nyt batteri med frisk kapacitet. Kalibrering + test.",
      timeMin: "~15–20 min",
      stock: "in_stock",
      variants: [
        { id: "battery-original", label: "Original (kalibreret)", price: 399, warrantyMonths: 12 },
        { id: "battery-compat", label: "Kompatibel (A-kvalitet)", price: 299, warrantyMonths: 12 },
      ],
    },
    {
      id: "ladeport",
      title: "Ladeport",
      category: "port",
      description: "Reparation af opladningsproblemer. Inkl. rensning.",
      timeMin: "~20–30 min",
      stock: "in_stock",
      price: 199,
    },
    {
      id: "mikrofon",
      title: "Mikrofon",
      category: "audio",
      description: "Udskiftning af mikrofon. Inkl. test.",
      timeMin: "~20–30 min",
      stock: "in_stock",
      price: 199,
    },
    {
      id: "forkamera",
      title: "For-kamera",
      category: "camera",
      description: "Udskiftning af forkamera. Inkl. test.",
      timeMin: "~20–30 min",
      stock: "in_stock",
      price: 299,
    },
    {
      id: "bagkamera",
      title: "Bag-kamera",
      category: "camera",
      description: "Udskiftning af bagkamera. Inkl. test.",
      timeMin: "~20–30 min",
      stock: "in_stock",
      price: 399,
    },
    {
      id: "hjemknap",
      title: "Hjem-knap",
      category: "other",
      description: "Udskiftning af hjem-knap + test. Touch ID kan ikke genskabes på iPhone 6.",
      timeMin: "~30–45 min",
      stock: "in_stock",
      price: 299,
    },
    {
      id: "ørehøjtaler",
      title: "Ørehøjtaler",
      category: "audio",
      description: "Udskiftning af ørehøjtaler. Inkl. test.",
      timeMin: "~20–30 min",
      stock: "in_stock",
      price: 199,
    },
    {
      id: "højtaler",
      title: "Højtaler (bund)",
      category: "audio",
      description: "Udskiftning af højtaler. Inkl. test.",
      timeMin: "~20–30 min",
      stock: "in_stock",
      price: 199,
    },
    {
      id: "software",
      title: "Software",
      category: "software",
      description: "Backup, gendannelse, opdatering (hvis muligt).",
      timeMin: "~15–45 min",
      stock: "in_stock",
      price: 99,
    },
    {
      id: "diagnose",
      title: "Fejlsøgning/diagnose",
      category: "other",
      description: "Fratrækkes ved reparation.",
      timeMin: "~15–30 min",
      stock: "in_stock",
      price: 99,
    },
    {
      id: "væskeskade",
      title: "Væskeskade-rens",
      category: "other",
      description: "Rensning og diagnosticering.",
      timeMin: "~30–60 min",
      stock: "contact",
      price: 199,
    },
    {
      id: "dataredning",
      title: "Dataredning",
      category: "software",
      description: "Gendannelse af data (hvis muligt).",
      timeMin: "Variabel",
      stock: "contact",
      contactOnly: true,
    }
  ];
  // Helper functions
  const getDisplayPrice = (repair: Repair): string => {
    if (repair.contactOnly) return "Pris efter fund";
    if (repair.variants) {
      const minPrice = Math.min(...repair.variants.map(v => v.price));
      return `fra ${minPrice} kr`;
    }
    return repair.price ? `${repair.price} kr` : "Kontakt os";
  };

  const filteredRepairs = repairs.filter(repair => {
    const matchesFilter = activeFilter === 'alle' || repair.category === activeFilter;
    const matchesSearch = repair.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (repair.description && repair.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // PriceRow Component
  const PriceRow = ({ repair, onDetails }: { repair: Repair; onDetails?: () => void }) => {
    const renderVariants = () => {
      if (!repair.variants) {
        return (
          <div className="flex items-start justify-between rounded-xl border border-[#eef2f7] bg-[#ffffff] px-5 py-3">
            <div>
              <div className="font-semibold text-slate-900">{repair.title}</div>
              {repair.description && <div className="text-sm text-[#6b7280] mt-1">{repair.description}</div>}
              <div className="flex gap-2 mt-2">
                {repair.timeMin && <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">{repair.timeMin}</span>}
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">12 mdr</span>
                {repair.stock === "in_stock" && <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">På lager</span>}
              </div>
              {onDetails && <button onClick={onDetails} className="text-sm mt-2 text-slate-500 hover:text-slate-700">Detaljer</button>}
            </div>
            <div className="text-right">
              {repair.contactOnly ? (
                <div className="font-semibold text-slate-600">Kontakt os</div>
              ) : (
                <div className="text-2xl font-bold text-[#0f172a]">{repair.price} kr</div>
              )}
            </div>
          </div>
        );
      }

      return repair.variants.map((variant) => (
        <div key={variant.id} className="flex items-start justify-between rounded-xl border border-[#eef2f7] bg-[#ffffff] px-5 py-3">
          <div>
            <div className="font-semibold text-slate-900">{repair.title} – {variant.label}</div>
            {repair.description && <div className="text-sm text-[#6b7280] mt-1">{repair.description}</div>}
            <div className="flex gap-2 mt-2">
              {repair.timeMin && <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">{repair.timeMin}</span>}
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">{variant.warrantyMonths} mdr</span>
              {repair.stock === "in_stock" && <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">På lager</span>}
            </div>
            {onDetails && <button onClick={onDetails} className="text-sm mt-2 text-slate-500 hover:text-slate-700">Detaljer</button>}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#0f172a]">{variant.price} kr</div>
          </div>
        </div>
      ));
    };

    return <div className="space-y-2">{renderVariants()}</div>;
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

      {/* Hero Section - Compact */}
      <section className="py-6 md:py-8 bg-gradient-to-r from-pink-50 to-yellow-50" style={{maxHeight: '260px'}}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="font-bold text-gray-800 mb-2" style={{fontSize: 'clamp(28px, 3.2vw, 36px)'}}>
                <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                  iPhone 6 Reparation
                </span>
              </h1>
              <p className="text-base text-gray-600 mb-4 leading-tight" style={{fontSize: '16px', marginTop: '6px'}}>
                Standard model med A8 chip – reparation på stedet på 20–30 min.
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Vi kommer til dig
                </div>
                <div className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  20–30 min
                </div>
                <div className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-600">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                  5★ anmeldelser
                </div>
              </div>

              <div className="flex gap-3">
                <button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
                  Bestil tid
                </button>
                <button 
                  onClick={() => document.getElementById('rep-list')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-gray-700 px-6 py-3 rounded-full font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Se reparationer
                </button>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src="/images/iphones/iphone-6.png"
                alt="iPhone 6 – front, bagside og sideprofil"
                className="h-auto object-contain"
                style={{width: 'clamp(140px, 18vw, 220px)'}}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Repairs & Prices - New Simple Structure */}
      <section id="rep-list" className="pt-4 pb-6 sm:pt-6 sm:pb-8 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-3xl font-bold text-center mb-3 text-gray-800" id="dele">
            Reparationer & Priser – iPhone 6
          </h1>
          <p className="text-center text-gray-600 mb-4 max-w-2xl mx-auto">
            Vælg din reparation nedenfor. Vi kommer til din adresse og reparerer på stedet på 20-30 minutter.
          </p>
          <div className="text-center mb-8">
            <a 
              href="/reservedele" 
              className="text-pink-600 hover:text-pink-700 transition-colors text-sm font-medium underline"
            >
              Læs om vores reservedele →
            </a>
          </div>

          {/* SEO Text */}
          <div className="text-center mb-8">
            <p className="text-gray-600 text-lg">
              iPhone 6 reparation i København – vi kommer til dig og reparerer på 20–30 min.
            </p>
            <div className="mt-2 flex items-center justify-center gap-2 relative">
              <span className="text-sm text-gray-500">Kvalitetsspørgsmål?</span>
              <button 
                className="text-pink-600 hover:text-pink-700 transition-colors"
                onClick={() => {
                  const tooltip = document.getElementById('quality-tooltip');
                  if (tooltip) {
                    tooltip.classList.toggle('hidden');
                  }
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div id="quality-tooltip" className="hidden absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-30 top-8 left-1/2 transform -translate-x-1/2">
                <button 
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    const tooltip = document.getElementById('quality-tooltip');
                    if (tooltip) {
                      tooltip.classList.add('hidden');
                    }
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <p className="text-sm text-gray-700">
                  <strong>Original:</strong> OEM-kvalitet, 24 mdr. garanti på skærm.<br/>
                  <strong>Kompatibel:</strong> A-kvalitet, 12 mdr. garanti.<br/>
                  Begge testes og kalibreres.
                </p>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="relative bg-transparent mb-8">
            <div className="space-y-4">
              {/* Search */}
              <div className="flex justify-center">
                <div className="mx-auto max-w-[520px] w-full">
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
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
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
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
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
          </div>

          {/* Price List - Clean Rows */}
          <div className="space-y-3">
            <style jsx>{`
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              :root {
                --fdx-price: #0f172a;
                --fdx-muted: #6b7280;
                --fdx-row-bg: #ffffff;
                --fdx-row-brd: #eef2f7;
              }
            `}</style>
            {filteredRepairs.map((repair) => (
              <PriceRow 
                key={repair.id} 
                repair={repair} 
                onDetails={() => setShowDetailsModal(repair.id)}
              />
            ))}
          </div>

          {/* Primary CTA */}
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => setShowBookingWizard(true)}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Bestil tid
            </button>
          </div>
          
          {/* Parts Quality Mini-Section */}
          <div className="mt-16 bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Delens kvalitet – kort fortalt
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⭐</span>
                </div>
                <h4 className="text-lg font-semibold mb-3 text-gray-800">Vil du have bedst mulig skærm og batteritid?</h4>
                <p className="text-gray-600 text-sm">
                  <strong>Vælg Original.</strong> Bedste farver, lysstyrke og batteriydelse.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💰</span>
                </div>
                <h4 className="text-lg font-semibold mb-3 text-gray-800">Vil du spare mest muligt på en ældre mobil?</h4>
                <p className="text-gray-600 text-sm">
                  <strong>Vælg Kompatibel (A-kvalitet)</strong> – fint til hverdagsbrug.
                </p>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                <span className="text-blue-600 text-lg">🤖</span>
                <span className="text-sm font-medium text-blue-800">Android (Samsung/Huawei/OnePlus)? Vi bruger originale servicepacks.</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="text-lg font-semibold mb-3 text-gray-800 text-center">Vi hjælper dig med at vælge</h4>
              <p className="text-center text-gray-600 mb-4">
                Er du i tvivl, så ring – vi anbefaler ærligt ud fra alder, brug og budget.
              </p>
              <div className="flex justify-center">
                <button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-4 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity">
                  Ring +45 93 54 54 57
                </button>
              </div>
            </div>
          </div>
          
          {/* SEO & Help */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Priser inkl. moms. 24 mdr. garanti på skærme / 12 mdr. på batterier & øvrige dele. Vand-/væskeskader er undtaget. Tætning genskabes efter bedste praksis, men fabriks-IP kan ikke garanteres.
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


      {/* Sticky Mobile CTA - Hidden when hero in viewport */}
      <div id="mobile-sticky-cta" className="fixed inset-x-4 bottom-4 z-50 md:hidden">
        <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center justify-between">
          <div>
            <div className="font-semibold text-sm">iPhone 6 Reparation</div>
            <div className="text-xs opacity-90">Vi kommer til dig på 20-30 min</div>
          </div>
          <button 
            onClick={() => document.getElementById('rep-list')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-pink-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Se priser
          </button>
        </div>
      </div>

      {/* IntersectionObserver Script for Mobile CTA & Tooltip */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const hero = document.querySelector('section[style*="maxHeight"]');
              const mobileCTA = document.getElementById('mobile-sticky-cta');
              
              if (hero && mobileCTA) {
                const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      mobileCTA.style.display = 'none';
                    } else {
                      mobileCTA.style.display = 'block';
                    }
                  });
                }, { threshold: 0.1 });
                
                observer.observe(hero);
              }

              // Close tooltip when clicking outside
              document.addEventListener('click', function(event) {
                const tooltip = document.getElementById('quality-tooltip');
                const button = event.target.closest('button');
                
                if (tooltip && !tooltip.contains(event.target) && (!button || !button.querySelector('svg'))) {
                  tooltip.classList.add('hidden');
                }
              });
            });
          `
        }}
      />

      {/* Booking Wizard */}
      {showBookingWizard && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/40">
          <div className="w-full max-w-4xl bg-white rounded-2xl p-6 mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Bestil tid til iPhone 6 reparation</h2>
              <button 
                onClick={() => setShowBookingWizard(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Booking-wizard kommer snart</h3>
              <p className="text-gray-600 mb-6">
                Vi arbejder på en komplet booking-wizard med 3 trin:<br/>
                1. Vælg reparationer<br/>
                2. Dine oplysninger<br/>
                3. Bekræft & send
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setShowBookingWizard(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors"
                >
                  Luk
                </button>
                <button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
                  Ring +45 93 54 54 57
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowDetailsModal(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Reparation detaljer</h3>
              <button 
                onClick={() => setShowDetailsModal(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                Detaljeret information om denne reparation kommer snart.
              </p>
            </div>
            
            <div className="mt-6 text-center">
              <a 
                href="/reservedele" 
                className="text-pink-600 hover:text-pink-700 transition-colors text-sm font-medium underline"
              >
                Læs mere om reservedele →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}