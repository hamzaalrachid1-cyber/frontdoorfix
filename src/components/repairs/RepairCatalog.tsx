'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ModelSpec } from '@/data/apple/types';
import { buildRepairs, RepairItem } from '@/lib/buildRepairs';

interface RepairCatalogProps {
  modelSpec: ModelSpec;
}

export default function RepairCatalog({ modelSpec }: RepairCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showDetailsModal, setShowDetailsModal] = useState<string | null>(null);

  const repairs = buildRepairs(modelSpec);
  const categories = ['Skærm', 'Batteri', 'Kamera', 'Lyd/Knapper', 'Porte', 'Software/Andet'];

  // Filter repairs based on search and category
  const filteredRepairs = repairs.filter((repair) => {
    const matchesCategory = !selectedCategory || repair.category === selectedCategory;
    const matchesSearch = repair.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (repair.subtitle && repair.subtitle.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
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
              <Link href="/reparationer/apple" className="hover:text-pink-600">Apple</Link>
              <span>→</span>
              <span className="text-gray-900 font-medium">{modelSpec.name}</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-50 via-yellow-50 to-white py-8 sm:py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {modelSpec.name} Reparation
                </h1>
                <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                  Vi kommer til din adresse i Storkøbenhavn – reparation på stedet på 20-30 min. 24 mdr. garanti på skærme, 12 mdr. på batterier.
                </p>
                <button 
                  data-book-now
                  data-brand={modelSpec.brand}
                  data-model={modelSpec.name}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-full font-semibold text-lg hover:from-pink-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl"
                >
                  Se priser & book
                </button>
              </div>
              
              <div className="flex-shrink-0">
                <div className="phone-hero">
                  <img 
                    src={`/images/iphones/${modelSpec.id}.png`}
                    alt={`${modelSpec.name} reparation`}
                    className="phone-hero__img"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSI0MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIyMjAiIHJ4PSIyMCIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Repairs & Prices */}
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

            {/* Search and Filter */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
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
              
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === ''
                      ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white'
                      : 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Alle
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white'
                        : 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Grid - Dense Layout */}
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                <style jsx>{`
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
