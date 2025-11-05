'use client';

import { useState } from 'react';
import Link from 'next/link';
import ModelSeoCopy from '@/components/ModelSeoCopy';
import SchemaOrg from "@/components/SchemaOrg";
import { validateModelContent } from "@/lib/seo-quality";
import { getModelSeoContent } from '@/content/models';
import HeroPhone from '../HeroPhone';

interface RepairData {
  id: string;
  category: string;
  title: string;
  type: 'original' | 'compatible' | 'oem' | 'service';
  price: number | 'contact';
  time: string;
  warranty: string;
  description: string;
  badges: string[];
  notes: string | null;
  showDetailsLink: boolean;
}

interface ModelData {
  brand: string;
  model: string;
  slug: string;
  hasBackGlass: boolean;
  image?: string;
  hero: {
    title: string;
    tags: string[];
    image?: string;
  };
  repairs: RepairData[];
}

interface ModelRepairPageProps {
  modelData: ModelData;
}


export default function ModelRepairPage({ modelData }: ModelRepairPageProps) {
  // SEO Quality Gate
  const seoContent = getModelSeoContent(modelData);
  const contentText = seoContent.intro + " " + Object.values(seoContent.sections).join(" ");
  const { isValid } = validateModelContent(contentText, modelData.model);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('alle');
  const [showDetailsModal, setShowDetailsModal] = useState<string | null>(null);

  // Filter repairs based on search and category
  const filteredRepairs = modelData.repairs.filter((repair) => {
    // Filter out backglass repairs if model doesn't have back glass
    if (!modelData.hasBackGlass && repair.category === 'Bagcover') {
      return false;
    }

    const matchesFilter = activeFilter === 'alle' || 
      (activeFilter === 'screen' && repair.category === 'Skærm') ||
      (activeFilter === 'battery' && repair.category === 'Batteri') ||
      (activeFilter === 'camera' && repair.category === 'Kamera') ||
      (activeFilter === 'audio' && repair.category === 'Lyd/Knapper') ||
      (activeFilter === 'ports' && repair.category === 'Porte') ||
      (activeFilter === 'software' && repair.category === 'Software/Andet') ||
      (activeFilter === 'bagcover' && repair.category === 'Bagcover');
    
    const matchesSearch = (repair.title?.toLowerCase() || repair.type?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (repair.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // PriceRowDense Component - exact copy from iPhone 6 page
  const PriceRowDense = ({ 
    title, 
    subtitle, 
    time, 
    warranty, 
    price, 
    contact, 
    onDetails,
    badges
  }: {
    title: string; 
    subtitle?: string; 
    time?: string; 
    warranty?: string; 
    price?: number; 
    contact?: boolean; 
    onDetails?: () => void;
    badges?: string[];
  }) => {
    // Combine time and warranty into one compact meta line
    const meta = [time, warranty].filter(Boolean).join(" • ");
    
    return (
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 flex items-start justify-between min-h-[88px] relative overflow-hidden">
        
        {badges && badges.length > 0 && (
          <div className="absolute top-2 left-2">
            {badges.map((badge, index) => (
              <span key={index} className="badge-original px-2 py-1 rounded-full text-xs font-medium">
                {badge}
              </span>
            ))}
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
      {/* SEO Quality Gate - NoIndex if low quality */}
      {!isValid && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const meta = document.createElement("meta");
              meta.name = "robots";
              meta.content = "noindex, nofollow";
              document.head.appendChild(meta);
            `
          }}
        />
      )}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.body.dataset.brand = '${modelData.brand}';
            document.body.dataset.model = '${modelData.model}';
          `
        }}
      />
      
      <div className="min-h-screen">
        {/* Breadcrumbs */}
        <nav className="bg-gray-100 py-3 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/">Forside</Link>
              <span>→</span>
              <Link href="/reparationer">Reparationer</Link>
              <span>→</span>
              <Link href="/reparationer/apple">iPhone</Link>
              <span>→</span>
              <span className="text-gray-800 font-medium">{modelData.model}</span>
            </div>
          </div>
        </nav>

        {/* Hero Section - Compact - exact copy from iPhone 6 */}
        <section className="py-6 md:py-8 hero-gradient min-h-[280px] md:min-h-[320px]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center content-center h-full">
              <div>
                <h1 className="font-bold text-gray-800 mb-2" style={{fontSize: 'clamp(28px, 3.2vw, 36px)'}}>
                  <span className="text-gradient">
                    {modelData.hero.title}
                  </span>
                </h1>
                <p className="text-base text-gray-600 mb-4 leading-tight" style={{fontSize: '16px', marginTop: '6px'}}>
                  {modelData.hero.tags.join(' • ')} – reparation på stedet på 20–30 min.
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
                    data-brand={modelData.brand}
                    data-model={modelData.model}
                    className="btn-primary-gradient px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
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
                <HeroPhone
                  src={modelData.image || modelData.hero?.image || `/images/iphones/${modelData.slug}.png`}
                  alt={`${modelData.model} – front, bagside og sideprofil`}
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
              Reparationer & Priser — {modelData.model}
            </h2>
            <p className="text-[13px] text-slate-500 mb-4 text-center">
              Vælg din reparation nedenfor. Vi kommer til din adresse og reparerer på stedet på 20-30 minutter.
            </p>
            <div className="text-center mb-8">
              <a 
                href="/reservedele" 
                className="transition-colors text-sm font-medium underline"
              >
                Læs om vores reservedele →
              </a>
            </div>

            {/* SEO Text */}
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg">
                {modelData.model} reparation – vi kommer til dig og reparerer på 20–30 min.
              </p>
              <div className="mt-2 flex items-center justify-center gap-2 relative">
                <span className="text-sm text-gray-500">Kvalitetsspørgsmål?</span>
                <button 
                  className="transition-colors"
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
                    { key: 'software', label: 'Software/Andet' },
                    ...(modelData.hasBackGlass ? [{ key: 'bagcover', label: 'Bagcover' }] : [])
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
                    subtitle={repair.description}
                    time={repair.time}
                    warranty={repair.warranty}
                    price={typeof repair.price === 'number' ? repair.price : undefined}
                    contact={repair.price === 'contact'}
                    warning={repair.notes || undefined}
                    badges={repair.badges}
                    onDetails={() => setShowDetailsModal(repair.id)}
                  />
                ))}
              </div>
            </div>

            {/* Bestil nu Button */}
            <div className="mt-12 md:mt-16 flex justify-center">
              <button 
                data-book-now
                data-brand={modelData.brand}
                data-model={modelData.model}
                className="btn-primary-gradient px-8 py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
              >
                Bestil nu
              </button>
            </div>
          </div>
        </section>

        {/* Sådan foregår det Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mb-3">
                Sådan foregår det – nem reparation i 3 trin
              </h2>
              <p className="text-gray-600 text-lg">
                Det er hurtigt, trygt og ligetil – her er hvad der sker.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {/* Step 1 */}
              <div className="card rounded-lg p-5 md:p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0V7a4 4 0 118 0v4" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Book tid</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                      Vælg reparation online, eller ring til os. Vi hjælper dig gerne med at vælge.
                    </p>
                    <p className="text-xs text-slate-500">Typisk svar inden for 5 min.</p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="card rounded-lg p-5 md:p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Vi kommer til dig</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                      Vores tekniker kører til din adresse med alt udstyr på det aftalte tidspunkt.
                    </p>
                    <p className="text-xs text-slate-500">København og omegn</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="card rounded-lg p-5 md:p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Reparation på stedet</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                      Din iPhone repareres på stedet på ca. 20–30 min. inkl. test og garanti.
                    </p>
                    <p className="text-xs text-slate-500">24 mdr. skærm • 12 mdr. batteri</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kvalitet & garanti Section */}
        <section id="kvalitet-og-garanti" className="py-16 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mb-3">
                Kvalitet & garanti – kort fortalt
              </h2>
              <p className="text-gray-600 text-lg">
                Vi bruger kun kvalitetsdele og giver dig den bedste service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Original Card */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Original</h3>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-2">
                      <p>• Ægte Apple-dele, ofte &quot;pulled&quot; fra donor-enheder og kvalitetstestet.</p>
                      <p>• Bevarer korrekt farve/lys og touch-respons; True Tone/lyssensor fungerer (hvor muligt).</p>
                      <p>• Kalibreret og gennemtestet før/efter montering.</p>
                      <p className="text-xs text-slate-500 mt-3">iPhone kan vise &quot;Brugt/Ukendt del&quot; efter skærm/batteriskift – det er forventet og påvirker ikke funktion eller vores garanti.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kompatibel Card */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Kompatibel</h3>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-2">
                      <p>• Stærk, prisvenlig løsning – særligt til ældre modeller og hverdagsbrug.</p>
                      <p>• Ca. 10–15 % højere strømforbrug og lidt lavere lysstyrke/farver end original.</p>
                      <p>• Touch kan føles en anelse anderledes.</p>
                      <p>• Kalibreret, testet og ombyttes ved DOA.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Du får altid Card */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.31 9.754v7.356a.75.75 0 00.722.515 11.209 11.209 0 017.877 3.08.75.75 0 001.032 0 11.209 11.209 0 017.877-3.08.75.75 0 00.722-.515 12.74 12.74 0 00.575-3.989V9.754a12.74 12.74 0 00-.575-3.989.75.75 0 00-.722-.515 11.209 11.209 0 01-7.877-3.08zM15.75 9.75a.75.75 0 00-1.5 0v2.25H12a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H18a.75.75 0 000-1.5h-2.25V9.75z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Du får altid</h3>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-2">
                      <p>• 24 mdr. garanti på skærm · 12 mdr. på batteri & øvrige dele.</p>
                      <p>• Reparation på stedet (typisk 20–30 min) – vi kommer til dig.</p>
                      <p>• Kalibrering & fuld test før/efter.</p>
                      <p>• Ærlig rådgivning, så du vælger det rigtige.</p>
                      <p>• Priser inkl. moms.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Copy Section */}
        <ModelSeoCopy seoContent={getModelSeoContent(modelData)} />
        {/* Schema.org Structured Data */}
        <SchemaOrg type="Product" data={modelData} />
        <SchemaOrg type="FAQPage" data={null} />
        <SchemaOrg type="BreadcrumbList" data={[
          { name: "Forside", url: "https://frontdoorfix.dk" },
          { name: "Reparation & priser", url: "https://frontdoorfix.dk/reparationer" },
          { name: "Apple", url: "https://frontdoorfix.dk/reparationer/apple" },
          { name: modelData.model, url: `https://frontdoorfix.dk/reparationer/apple/${modelData.slug}` }
        ]} />

        {/* FAQ Section */}
        <section className="py-10 md:py-14 bg-white">
          <div className="mx-auto max-w-[900px] px-4 md:px-6">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mb-3">
                Ofte stillede spørgsmål
              </h2>
              <p className="text-gray-600 text-lg">
                Find svar på de mest almindelige spørgsmål om iPhone reparation
              </p>
            </div>

            <div className="space-y-3">
              <style jsx>{`
                .faq-item {
                  transition: all 200ms ease;
                }
                .faq-item.open {
                  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
                }
                .faq-content {
                  transition: all 200ms ease;
                  overflow: hidden;
                }
                .chevron {
                  transition: transform 200ms ease;
                }
                .chevron.rotated {
                  transform: rotate(90deg);
                }
              `}</style>
              {[
                {
                  q: "Hvor lang tid tager en reparation?",
                  a: "De fleste reparationer tager 20–30 minutter på din adresse. Softwareopgaver tager typisk 15–45 minutter, og væske-/vandskader 30–60 minutter."
                },
                {
                  q: "Mister jeg data under reparationen?",
                  a: "Nej. Vi sletter ikke dine data, og vi behøver ikke at se dit indhold. Lav gerne en backup for en sikkerheds skyld."
                },
                {
                  q: "Hvorfor står der \"Brugt/Ukendt del\" efter skærm- eller batteriskift på iPhone?",
                  a: "Apple kan vise denne info, når vi bruger originale, kalibrerede \"pulled\" dele. Det påvirker ikke funktion eller kvalitet – delen er testet og leveres med garanti."
                },
                {
                  q: "Bevarer skærmen funktioner som True Tone og auto-lys?",
                  a: "Ja. Med original/kalibreret skærm fungerer farver, lysstyrke og hvidbalance korrekt. Hvor muligt overfører vi også model-/EEPROM-data."
                },
                {
                  q: "Kan Touch ID eller Face ID genskabes?",
                  a: "Hvis selve hjem-knappen/Face-ID-modulet er defekt, kan funktionen ikke genskabes. Resten af telefonen fungerer normalt."
                },
                {
                  q: "Hvad hvis fejlen ikke er på listen?",
                  a: "Vælg \"Fejlsøgning/diagnose\". Den koster 99 kr og fratrækkes prisen, hvis vi reparerer."
                },
                {
                  q: "Dækker I mit område?",
                  a: "Ja, vi kører i København og omegn. Er du i tvivl, så kontakt os – vi finder en løsning."
                },
                {
                  q: "Hvilke reservedele bruger I?",
                  a: "iPhone: Original (kalibreret/pulled) eller Kompatibel (A-kvalitet). Android (Samsung, Huawei, OnePlus m.fl.): Originale servicepacks (nye)."
                },
                {
                  q: "Hvilken garanti får jeg?",
                  a: "Skærm: 24 mdr. • Batteri & øvrige dele: 12 mdr. (Væske-/vandskader er undtaget garanti.)"
                },
                {
                  q: "Er prisen inkl. alt?",
                  a: "Ja – moms, reservedele, montering, test og funktionskontrol. Ingen skjulte gebyrer."
                },
                {
                  q: "Hvordan betaler jeg?",
                  a: "Kort eller MobilePay. Kvittering sendes på e-mail."
                },
                {
                  q: "Hvad hvis problemet vender tilbage?",
                  a: "Skriv eller ring – vi laver et gratis eftertjek. Er det en garantisag, udbedrer vi uden beregning."
                },
                {
                  q: "Kan I komme ud til min arbejdsplads?",
                  a: "Ja, vi reparerer gerne på kontoret. Vi tilbyder også erhvervsaftaler."
                },
                {
                  q: "Skal jeg forberede noget før I kommer?",
                  a: "Sørg for min. 20% strøm, hav adgangskoden klar til test, og lav gerne en backup."
                }
              ].map((faq, index) => (
                <div key={index} id={`faq-item-${index}`} className="faq-item bg-white rounded-[14px] border border-slate-200 shadow-sm hover:bg-slate-50 transition-all">
                  <button
                    id={`faq-button-${index}`}
                    className="w-full px-5 md:px-6 py-[18px] md:py-5 text-left flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 rounded-[14px]"
                    onClick={() => {
                      const content = document.getElementById(`faq-content-${index}`);
                      const chevron = document.getElementById(`faq-chevron-${index}`);
                      const item = document.getElementById(`faq-item-${index}`);
                      const isOpen = content?.classList.contains('hidden') === false;
                      
                      // Close all other FAQs
                      document.querySelectorAll('[id^="faq-content-"]').forEach(el => el.classList.add('hidden'));
                      document.querySelectorAll('[id^="faq-chevron-"]').forEach(el => el.classList.remove('rotated'));
                      document.querySelectorAll('[id^="faq-item-"]').forEach(el => el.classList.remove('open'));
                      document.querySelectorAll('[id^="faq-button-"]').forEach(el => el.setAttribute('aria-expanded', 'false'));
                      
                      if (isOpen) {
                        content?.classList.add('hidden');
                        chevron?.classList.remove('rotated');
                        item?.classList.remove('open');
                        document.getElementById(`faq-button-${index}`)?.setAttribute('aria-expanded', 'false');
                      } else {
                        content?.classList.remove('hidden');
                        chevron?.classList.add('rotated');
                        item?.classList.add('open');
                        document.getElementById(`faq-button-${index}`)?.setAttribute('aria-expanded', 'true');
                      }
                    }}
                    aria-expanded="false"
                    aria-controls={`faq-content-${index}`}
                  >
                    <span 
                      className="text-slate-900 font-semibold pr-4 flex-1 min-w-0"
                      style={{
                        fontSize: 'clamp(18px, 1.6vw, 20px)',
                        lineHeight: '1.3',
                        color: '#0f172a'
                      }}
                    >
                      {faq.q}
                    </span>
                    <div className="w-9 h-9 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        id={`faq-chevron-${index}`}
                        className="chevron w-4 h-4 text-slate-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                  <div
                    id={`faq-content-${index}`}
                    className="faq-content hidden"
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                  >
                    <div className="border-t border-slate-200 mx-5 md:mx-6"></div>
                    <div className="px-5 md:px-6 pt-3 pb-6">
                      <p 
                        className="text-slate-600 mt-2 max-w-[70ch]"
                        style={{
                          fontSize: 'clamp(15px, 1.3vw, 16px)',
                          lineHeight: '1.6',
                          color: '#475569'
                        }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Strip */}
            <div className="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-4 text-center">
              <p className="text-sm text-gray-600 mb-3">
                Fandt du ikke svaret? Ring +45 93 54 54 57 eller skriv på info@frontdoorfix.dk
              </p>
              <div className="flex justify-center gap-3">
                <a
                  href="tel:+4593545457"
                  className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-700 transition-colors"
                >
                  Ring
                </a>
                <a
                  href="mailto:info@frontdoorfix.dk"
                  className="bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Skriv
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Bestil tid nu Card */}
        <section className="py-8 md:py-12 xl:py-16 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex justify-center">
              <div className="btn-primary-gradient rounded-2xl shadow-lg p-8 max-w-md w-full mx-4">
                <div className="text-center text-white">
                  <div className="mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Bestil tid nu</h3>
                  <p className="text-sm opacity-90 mb-4">Bestille tid og få repareret din {modelData.model}</p>
                  <button 
                    data-book-now
                    data-brand={modelData.brand}
                    data-model={modelData.model}
                    className="bg-white text-pink-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Bestil tid nu
              </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Mobile CTA */}
        <div id="mobile-sticky-cta" className="fixed inset-x-4 bottom-4 z-50 md:hidden">
          <div className="mobile-sticky-cta px-6 py-3 rounded-full shadow-lg flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm">{modelData.model} Reparation</div>
              <div className="text-xs opacity-90">Vi kommer til dig på 20-30 min</div>
            </div>
            <button 
              data-book-now
              data-brand={modelData.brand}
              data-model={modelData.model}
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
                const repair = modelData.repairs.find(r => r.id === showDetailsModal);
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
                        {repair.description}
                      </p>
                      
                      {repair.notes && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-sm text-yellow-800">
                            <strong>Bemærk:</strong> {repair.notes}
                          </p>
                        </div>
                      )}
                      
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Tid:</span> {repair.time}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Garanti:</span> {repair.warranty}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Pris:</span> {
                              repair.price === 'contact' ? 'Kontakt os' : `${repair.price} kr`
                            }
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Type:</span> {repair.type}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 flex justify-between">
                      <a 
                        href="/reservedele" 
                        className="transition-colors text-sm font-medium underline"
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
