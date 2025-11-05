'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ModelSpec } from '@/data/apple/types';
import { buildRepairs } from '@/lib/buildRepairs';

interface RepairCatalogProps {
  modelSpec: ModelSpec;
}

export default function RepairCatalog({ modelSpec }: RepairCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('alle');
  const [showDetailsModal, setShowDetailsModal] = useState<string | null>(null);

  const repairs = buildRepairs(modelSpec);

  // Filter repairs based on search and category
  const filteredRepairs = repairs.filter((repair) => {
    const matchesFilter = activeFilter === 'alle' || 
      (activeFilter === 'screen' && repair.category === 'Skærm') ||
      (activeFilter === 'battery' && repair.category === 'Batteri') ||
      (activeFilter === 'camera' && repair.category === 'Kamera') ||
      (activeFilter === 'audio' && repair.category === 'Lyd/Knapper') ||
      (activeFilter === 'ports' && repair.category === 'Porte') ||
      (activeFilter === 'software' && repair.category === 'Software/Andet');
    
    const matchesSearch = repair.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (repair.subtitle && repair.subtitle.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // PriceRowDense Component
  const PriceRowDense = ({ 
    title, 
    subtitle, 
    time, 
    warranty, 
    price, 
    contact, 
    onDetails,
    warning
  }: {
    title: string; 
    subtitle?: string; 
    time?: string; 
    warranty?: string; 
    price?: number; 
    contact?: boolean; 
    onDetails?: () => void;
    warning?: string;
  }) => {
    // Combine time and warranty into one compact meta line
    const meta = [time, warranty].filter(Boolean).join(" • ");
    
    return (
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 flex items-start justify-between min-h-[88px] relative overflow-hidden">
        {warning && (
          <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
            ⚠️
          </div>
        )}
        
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-semibold text-slate-900 leading-snug truncate">{title}</div>
          {subtitle && (
            <div className="text-[13px] text-slate-500 leading-snug line-clamp-1 mt-0.5">{subtitle}</div>
          )}
          {meta && (
            <div className="mt-2 text-[12px] text-slate-500">{meta}</div>
          )}
          {onDetails && (
            <button onClick={onDetails} className="mt-1.5 text-[12px] text-slate-500 hover:text-slate-700">
              Detaljer
            </button>
          )}
        </div>

        <div className="text-right pl-3 shrink-0">
          {contact ? (
            <div className="text-[15px] font-semibold text-slate-600">Kontakt os</div>
          ) : (
            <div className="text-[20px] font-extrabold text-slate-900 tracking-tight">{price} kr</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Meta tags for booking context */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.body.dataset.brand = '${modelSpec.brand}';
            document.body.dataset.model = '${modelSpec.name}';
          `
        }}
      />
      
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
              <span className="text-gray-800 font-medium">{modelSpec.name}</span>
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
                    {modelSpec.name} Reparation
                  </span>
                </h1>
                <p className="text-base text-gray-600 mb-4 leading-tight" style={{fontSize: '16px', marginTop: '6px'}}>
                  {modelSpec.year && `Model fra ${modelSpec.year} – `}reparation på stedet på 20–30 min.
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
                  <button 
                    data-book-now
                    data-brand={modelSpec.brand}
                    data-model={modelSpec.name}
                    className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
                  >
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
                <Image
                  src={`/images/iphones/${modelSpec.id}.png`}
                  alt={`${modelSpec.name} – front, bagside og sideprofil`}
                  width={220}
                  height={440}
                  className="h-auto object-contain"
                  style={{width: 'clamp(140px, 18vw, 220px)'}}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Repairs & Prices - New Simple Structure */}
        <section id="rep-list" className="pt-4 pb-6 sm:pt-6 sm:pb-8 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mb-3 text-center" id="dele">
              Reparationer & Priser — {modelSpec.name}
            </h2>
            <p className="text-[13px] text-slate-500 mb-4 text-center">
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
                {modelSpec.name} reparation – vi kommer til dig og reparerer på 20–30 min.
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

            {/* Price Grid - Dense Layout */}
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                <style jsx>{`
                  .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                  .no-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                  .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                  }
                `}</style>
                {filteredRepairs.map((repair) => (
                  <PriceRowDense
                    key={repair.id}
                    title={repair.title}
                    subtitle={repair.subtitle}
                    time={repair.duration}
                    warranty={repair.warranty}
                    price={typeof repair.price === 'number' ? repair.price : undefined}
                    contact={repair.price === 'contact'}
                    warning={repair.warning}
                    onDetails={() => setShowDetailsModal(repair.id)}
                  />
                ))}
              </div>
            </div>

            {/* Primary CTA */}
            <div className="mt-8 flex justify-center">
              <button 
                data-book-now
                data-brand={modelSpec.brand}
                data-model={modelSpec.name}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
              >
                Bestil tid
              </button>
            </div>
          </div>
        </section>

        {/* Sticky Mobile CTA */}
        <div id="mobile-sticky-cta" className="fixed inset-x-4 bottom-4 z-50 md:hidden">
          <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm">{modelSpec.name} Reparation</div>
              <div className="text-xs opacity-90">Vi kommer til dig på 20-30 min</div>
            </div>
            <button 
              data-book-now
              data-brand={modelSpec.brand}
              data-model={modelSpec.name}
              className="bg-white text-pink-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              Bestil tid
            </button>
          </div>
        </div>

        {/* Details Modal */}
        {showDetailsModal && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/40" onClick={() => setShowDetailsModal(null)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
              {(() => {
                const repair = repairs.find(r => r.id === showDetailsModal);
                if (!repair) return null;
                
                return (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-lg font-semibold text-slate-900">{repair.title}</div>
                      <button 
                        onClick={() => setShowDetailsModal(null)}
                        className="text-slate-500 hover:text-slate-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-slate-600">
                        {repair.subtitle}
                      </p>
                      
                      {repair.warning && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-sm text-yellow-800">
                            ⚠️ <strong>Bemærk:</strong> {repair.warning}
                          </p>
                        </div>
                      )}
                      
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Tid:</span> {repair.duration || 'Variabel'}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Garanti:</span> {repair.warranty || 'Ingen'}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Pris:</span> {
                              repair.price === 'contact' ? 'Kontakt os' : `${repair.price} kr`
                            }
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Kategori:</span> {repair.category}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 flex justify-between">
                      <a 
                        href="/reservedele" 
                        className="text-pink-600 hover:text-pink-700 transition-colors text-sm font-medium underline"
                      >
                        Læs om reservedele →
                      </a>
                      <button 
                        onClick={() => setShowDetailsModal(null)} 
                        className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium"
                      >
                        Luk
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
