import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "iPhone 6 Reparation - Priser & Tider | Frontdoorfix",
  description: "Vi reparerer iPhone 6 med originale dele. Skærm, batteri, kamera, knapper og mere. 24 mdr garanti på skærme, 12 mdr på øvrige dele. Vi kommer til dig i København.",
  keywords: "iPhone 6 reparation, skærmreparation iPhone 6, batteriskift iPhone 6, kamera iPhone 6, knapper iPhone 6, København",
  openGraph: {
    title: "iPhone 6 Reparation - Priser & Tider | Frontdoorfix",
    description: "Vi reparerer iPhone 6 med originale dele. Skærm, batteri, kamera, knapper og mere. 24 mdr garanti på skærme, 12 mdr på øvrige dele.",
    type: "website",
    locale: "da_DK",
  },
};

export default function IPhone6Repairs() {
  const repairs = [
    {
      id: "skærm-original",
      name: "Skærmskift, Original Kvalitet",
      description: "Udskiftning af ødelagt skærm med original Apple kvalitet",
      time: "15-25 min",
      warranty: "24 mdr",
      price: "799",
      originalPrice: "799",
      compatiblePrice: "799",
      includes: "Originalt Apple glas + LCD",
      quality: "original"
    },
    {
      id: "skærm-kompatibel",
      name: "Skærmskift, Kompatibel (Uoriginal)",
      description: "Udskiftning af ødelagt skærm med kompatibel kvalitet",
      time: "15-25 min",
      warranty: "24 mdr",
      price: "599",
      originalPrice: "599",
      compatiblePrice: "599",
      includes: "Kompatibel glas + LCD",
      quality: "compatible"
    },
    {
      id: "batteri-original",
      name: "Batteriskift, Original Kvalitet",
      description: "Udskiftning af slidt batteri med original Apple kvalitet",
      time: "15-20 min",
      warranty: "12 mdr",
      price: "399",
      originalPrice: "399",
      compatiblePrice: "399",
      includes: "Originalt Apple batteri",
      quality: "original"
    },
    {
      id: "batteri-kompatibel",
      name: "Batteriskift, Kompatibel (Uoriginal)",
      description: "Udskiftning af slidt batteri med kompatibel kvalitet",
      time: "15-20 min",
      warranty: "12 mdr",
      price: "299",
      originalPrice: "299",
      compatiblePrice: "299",
      includes: "Kompatibel batteri",
      quality: "compatible"
    },
    {
      id: "bagglas",
      name: "Bagglas reparation",
      description: "Udskiftning af ødelagt bagglas",
      time: "20-30 min",
      warranty: "12 mdr",
      price: "199",
      originalPrice: "199",
      compatiblePrice: "199",
      includes: "Bagglas + montering",
      quality: "original"
    },
    {
      id: "ladeport",
      name: "Ladestik / Opladningsport",
      description: "Reparation af ladeport",
      time: "20-30 min",
      warranty: "12 mdr",
      price: "299",
      originalPrice: "299",
      compatiblePrice: "199",
      includes: "Ladeport + rengøring",
      quality: "original"
    },
    {
      id: "mikrofon",
      name: "Mikrofon",
      description: "Udskiftning af mikrofon",
      time: "20-30 min",
      warranty: "12 mdr",
      price: "199",
      originalPrice: "199",
      compatiblePrice: "149",
      includes: "Mikrofon + test",
      quality: "original"
    },
    {
      id: "ørehøjtaler",
      name: "Ørehøjtaler (øverst)",
      description: "Udskiftning af ørehøjtaler",
      time: "20-30 min",
      warranty: "12 mdr",
      price: "199",
      originalPrice: "199",
      compatiblePrice: "149",
      includes: "Ørehøjtaler + test",
      quality: "original"
    },
    {
      id: "højtaler",
      name: "Højtaler (bund)",
      description: "Udskiftning af højtaler",
      time: "20-30 min",
      warranty: "12 mdr",
      price: "199",
      originalPrice: "199",
      compatiblePrice: "149",
      includes: "Højtaler + test",
      quality: "original"
    },
    {
      id: "forkamera",
      name: "For-kamera",
      description: "Udskiftning af forkamera",
      time: "20-30 min",
      warranty: "12 mdr",
      price: "299",
      originalPrice: "299",
      compatiblePrice: "199",
      includes: "Kamera + test",
      quality: "original"
    },
    {
      id: "bagkamera",
      name: "Bag-kamera",
      description: "Udskiftning af bagkamera",
      time: "20-30 min",
      warranty: "12 mdr",
      price: "399",
      originalPrice: "399",
      compatiblePrice: "299",
      includes: "Kamera + test",
      quality: "original"
    },
    {
      id: "kameraglas",
      name: "Kamera-glas",
      description: "Udskiftning af kamera-glas (hvis kun glas er revnet)",
      time: "20-30 min",
      warranty: "12 mdr",
      price: "149",
      originalPrice: "149",
      compatiblePrice: "99",
      includes: "Kamera-glas + test",
      quality: "original"
    },
    {
      id: "powerknap",
      name: "Tænd/sluk-knap (power)",
      description: "Udskiftning af power-knap",
      time: "30-45 min",
      warranty: "12 mdr",
      price: "299",
      originalPrice: "299",
      compatiblePrice: "199",
      includes: "Power-knap + test",
      quality: "original"
    },
    {
      id: "lydløsknap",
      name: "Lydløs-knap",
      description: "Udskiftning af lydløs-knap",
      time: "30-45 min",
      warranty: "12 mdr",
      price: "199",
      originalPrice: "199",
      compatiblePrice: "149",
      includes: "Lydløs-knap + test",
      quality: "original"
    },
    {
      id: "volumeknapper",
      name: "Volume-knapper",
      description: "Udskiftning af volume-knapper",
      time: "30-45 min",
      warranty: "12 mdr",
      price: "199",
      originalPrice: "199",
      compatiblePrice: "149",
      includes: "Volume-knapper + test",
      quality: "original"
    },
    {
      id: "hjemknap",
      name: "Hjem-knap",
      description: "Udskiftning af hjem-knap",
      time: "30-45 min",
      warranty: "12 mdr",
      price: "299",
      originalPrice: "299",
      compatiblePrice: "199",
      includes: "Hjem-knap + test",
      quality: "original",
      warning: "Touch ID kan ikke genskabes på iPhone 6"
    },
    {
      id: "software",
      name: "Software",
      description: "Backup, gendannelse, opdatering",
      time: "15-45 min",
      warranty: "Ingen",
      price: "99",
      originalPrice: "99",
      compatiblePrice: "99",
      includes: "Backup + opdatering",
      quality: "service"
    },
    {
      id: "væskeskade",
      name: "Væskeskade-rens",
      description: "Rensning af væskeskade",
      time: "30-60 min",
      warranty: "Ingen garanti på væskeskader",
      price: "199",
      originalPrice: "199",
      compatiblePrice: "199",
      includes: "Rensning + diagnose",
      quality: "service",
      warning: "Ingen garanti på væskeskader"
    },
    {
      id: "dataredning",
      name: "Dataredning",
      description: "Gendannelse af data (hvis I tilbyder)",
      time: "Variabel",
      warranty: "Ingen",
      price: "Pris efter fund",
      originalPrice: "Pris efter fund",
      compatiblePrice: "Pris efter fund",
      includes: "Data-gendannelse",
      quality: "service"
    }
  ];

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
                  4.7" Retina
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

      {/* Repairs Table */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Reparationer & Priser
          </h2>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Reparation</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Tid</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Garanti</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Pris fra</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Bestil</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {repairs.map((repair) => (
                    <tr key={repair.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className="font-semibold text-gray-800">{repair.name}</h3>
                            <p className="text-sm text-gray-600">{repair.description}</p>
                            {repair.includes && (
                              <p className="text-xs text-gray-500 mt-1">Inkluderer: {repair.includes}</p>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            {repair.warning && (
                              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                ⚠️ {repair.warning}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{repair.time}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{repair.warranty}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">{repair.price} kr</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="btn-gradient px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                          Bestil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Priser inkl. moms. 24 mdr på skærm / 12 mdr på batteri & øvrige.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
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
                <p className="text-gray-600">Opgraderet model med A9 chip og Touch ID</p>
              </div>
            </Link>
            <Link href="/reparationer/apple/iphone-6-plus" className="group">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-600 transition-colors">
                  iPhone 6 Plus
                </h3>
                <p className="text-gray-600">Større model med 5.5" skærm</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ofte stillede spørgsmål om iPhone 6
            </h2>
            <p className="text-gray-600 mb-6">
              Sidst opdateret: 25.09.2024
            </p>
          </div>

          {/* Table of Contents */}
            <div className="faq-item bg-gray-50 rounded-lg" data-category="data" id="faq-data">
              <button className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-inset" aria-expanded="false" aria-controls="faq-answer-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Mister jeg data ved iPhone 6 reparation?
                </h3>
                <svg className="w-5 h-5 text-gray-500 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="px-6 pb-4 hidden" id="faq-answer-2">
                <div className="text-gray-600 space-y-3">
                  <p><strong>Nej ved standardreparationer.</strong> Vi bevarer alt data ved skærm-, batteri- og ladeport-reparationer.</p>
                  <p>Vi anbefaler dog altid backup for en sikkerheds skyld før reparationen.</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">💾 Data bevares</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">🛡 Sikkerhed først</span>
                  </div>
                  <div className="mt-4">
                    <a href="#batteri" className="btn-gradient px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                      🔋 Book batteriskift
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="faq-item bg-gray-50 rounded-lg" data-category="touchid" id="faq-touchid">
              <button className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-inset" aria-expanded="false" aria-controls="faq-answer-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Kan Touch ID genskabes på iPhone 6 efter hjem-knap skift?
                </h3>
                <svg className="w-5 h-5 text-gray-500 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="px-6 pb-4 hidden" id="faq-answer-3">
                <div className="text-gray-600 space-y-3">
                  <p><strong>Nej, teknisk begrænsning fra Apple.</strong> Touch ID kan ikke genskabes på iPhone 6 ved udskiftning af hjem-knappen.</p>
                  <p>Touch ID bevares kun ved original knap. Ved skift mister du Touch ID-funktionaliteten.</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full">⚠️ Touch ID tabes</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">🍎 Apple-begrænsning</span>
                  </div>
                  <div className="mt-4">
                    <a href="#hjem-knap" className="btn-gradient px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                      🔘 Book hjem-knap reparation
                    </a>
                  </div>
                </div>
              </div>

      {/* FAQ Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{
              "@type": "Question",
              "name": "Hvor lang tid tager en iPhone 6 reparation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Skærmreparation tager typisk 15–25 min, batteriskift 15–20 min. Vi reparerer på din adresse."
              }
            },{
              "@type": "Question",
              "name": "Mister jeg data ved iPhone 6 reparation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nej ved standardreparationer. Vi anbefaler dog backup for en sikkerheds skyld."
              }
            },{
              "@type": "Question",
              "name": "Kan Touch ID genskabes på iPhone 6 efter hjem-knap skift?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nej, Touch ID kan ikke genskabes på iPhone 6 ved udskiftning af hjem-knappen (Apple-begrænsning)."
              }
            },{
              "@type": "Question",
              "name": "Giver I garanti på iPhone 6 reparationer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, fuld garanti på alle reparationer: 24 måneder på skærme, 12 måneder på batterier og øvrige dele."
              }
            },{
              "@type": "Question",
              "name": "Hvilke dele bruger I til iPhone 6?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Originale eller A-kvalitetsdele der lever op til Apple's standarder med fuld garanti og kompatibilitet."
              }
            },{
              "@type": "Question",
              "name": "Giver I garanti på væskeskader på iPhone 6?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Vi renser og diagnosticerer væskeskader, men der gives ingen garanti på væskeskader da de kan være uforudsigelige."
              }
            }]
          })
        }}
      />
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
    </div>
  );
}      {/* FAQ JavaScript */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener("DOMContentLoaded", function() {
              // FAQ Accordion functionality
              const faqButtons = document.querySelectorAll(".faq-item button");
              faqButtons.forEach(button => {
                button.addEventListener("click", function() {
                  const answer = document.getElementById(this.getAttribute("aria-controls"));
                  const isExpanded = this.getAttribute("aria-expanded") === "true";
                  
                  // Close all other answers
                  faqButtons.forEach(otherButton => {
                    if (otherButton !== this) {
                      otherButton.setAttribute("aria-expanded", "false");
                      otherButton.querySelector("svg").style.transform = "rotate(0deg)";
                      const otherAnswer = document.getElementById(otherButton.getAttribute("aria-controls"));
                      otherAnswer.classList.add("hidden");
                    }
                  });
                  
                  // Toggle current answer
                  if (isExpanded) {
                    this.setAttribute("aria-expanded", "false");
                    this.querySelector("svg").style.transform = "rotate(0deg)";
                    answer.classList.add("hidden");
                  } else {
                    this.setAttribute("aria-expanded", "true");
                    this.querySelector("svg").style.transform = "rotate(180deg)";
                    answer.classList.remove("hidden");
                  }
                });
              });
              
              // FAQ Search functionality
              const searchInput = document.getElementById("faq-search");
              const faqItems = document.querySelectorAll(".faq-item");
              
              if (searchInput) {
                searchInput.addEventListener("input", function() {
                  const searchTerm = this.value.toLowerCase();
                  
                  faqItems.forEach(item => {
                    const question = item.querySelector("h3").textContent.toLowerCase();
                    const answer = item.querySelector(".text-gray-600").textContent.toLowerCase();
                    
                    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                      item.style.display = "block";
                    } else {
                      item.style.display = "none";
                    }
                  });
                });
              }
            });
          `
        }}
      />