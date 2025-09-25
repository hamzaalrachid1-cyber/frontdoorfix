"use client";

import Link from "next/link";

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
      id: "fejlsøgning",
      name: "Fejlsøgning/diagnose",
      description: "Fejlsøgning og diagnose (fratrækkes ved reparation)",
      time: "15-30 min",
      warranty: "Ingen",
      price: "99",
      originalPrice: "99",
      compatiblePrice: "99",
      includes: "Diagnose + rapport",
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
              <a
                href="https://wa.me/4593545457?text=Hej! Jeg vil gerne booke iPhone 6 reparation"
                className="bg-transparent text-white px-6 py-4 h-14 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-colors inline-flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none"
                data-analytics="cta_whatsapp_model"
                data-model="iphone-6"
                aria-label="Skriv på WhatsApp om iPhone 6 reparation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>💬</span>
                Skriv på WhatsApp
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
                <p className="text-gray-600" style={{display: "none"}}>Større model med 5.5" skærm</p>
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
    </div>
  );
}