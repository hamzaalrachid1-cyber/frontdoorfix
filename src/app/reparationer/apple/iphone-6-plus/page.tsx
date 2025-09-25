import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "iPhone 6 Plus Reparation - Priser & Tider | Frontdoorfix",
  description: "Vi reparerer iPhone 6 Plus med originale dele. Skærm, batteri, kamera, knapper og mere. 24 mdr garanti på skærme, 12 mdr på øvrige dele. Vi kommer til dig i København.",
  keywords: "iPhone 6 Plus reparation, skærmreparation iPhone 6 Plus, batteriskift iPhone 6 Plus, kamera iPhone 6 Plus, knapper iPhone 6 Plus, København",
  openGraph: {
    title: "iPhone 6 Plus Reparation - Priser & Tider | Frontdoorfix",
    description: "Vi reparerer iPhone 6 Plus med originale dele. Skærm, batteri, kamera, knapper og mere. 24 mdr garanti på skærme, 12 mdr på øvrige dele.",
    type: "website",
    locale: "da_DK",
  },
};

export default function IPhone6PlusRepairs() {
  const repairs = [
    {
      id: "skærm-original",
      name: "Skærmskift, Original Kvalitet",
      description: "Udskiftning af ødelagt skærm med original Apple kvalitet",
      time: "15-25 min",
      warranty: "24 mdr",
      price: "899",
      originalPrice: "899",
      compatiblePrice: "899",
      includes: "Originalt Apple glas + LCD",
      quality: "original"
    },
    {
      id: "skærm-kompatibel",
      name: "Skærmskift, Kompatibel (Uoriginal)",
      description: "Udskiftning af ødelagt skærm med kompatibel kvalitet",
      time: "15-25 min",
      warranty: "24 mdr",
      price: "699",
      originalPrice: "699",
      compatiblePrice: "699",
      includes: "Kompatibel glas + LCD",
      quality: "compatible"
    },
    {
      id: "batteri-original",
      name: "Batteriskift, Original Kvalitet",
      description: "Udskiftning af slidt batteri med original Apple kvalitet",
      time: "15-20 min",
      warranty: "12 mdr",
      price: "449",
      originalPrice: "449",
      compatiblePrice: "449",
      includes: "Originalt Apple batteri",
      quality: "original"
    },
    {
      id: "batteri-kompatibel",
      name: "Batteriskift, Kompatibel (Uoriginal)",
      description: "Udskiftning af slidt batteri med kompatibel kvalitet",
      time: "15-20 min",
      warranty: "12 mdr",
      price: "349",
      originalPrice: "349",
      compatiblePrice: "349",
      includes: "Kompatibel batteri",
      quality: "compatible"
    },
    {
      id: "ladeport",
      name: "Ladestik / Opladningsport",
      description: "Reparation af ladeport",
      time: "20-30 min",
      warranty: "12 mdr",
      price: "349",
      originalPrice: "349",
      compatiblePrice: "249",
      includes: "Ladeport + rengøring",
      quality: "original"
    },
    {
      id: "mikrofon",
      name: "Mikrofon",
      description: "Udskiftning af mikrofon",
      time: "20-30 min",
      warranty: "12 mdr",
      price: "249",
      originalPrice: "249",
      compatiblePrice: "199",
      includes: "Mikrofon + test",
      quality: "original"
    },
    {
      id: "ørehøjtaler",
      name: "Ørehøjtaler (øverst)",
      description: "Udskiftning af ørehøjtaler",
      time: "20-30 min",
      warranty: "12 mdr",
      price: "249",
      originalPrice: "249",
      compatiblePrice: "199",
      includes: "Ørehøjtaler + test",
      quality: "original"
    },
    {
      id: "højtaler",
      name: "Højtaler (bund)",
      description: "Udskiftning af højtaler",
      time: "20-30 min",
      warranty: "12 mdr",
      price: "249",
      originalPrice: "249",
      compatiblePrice: "199",
      includes: "Højtaler + test",
      quality: "original"
    },
    {
      id: "forkamera",
      name: "For-kamera",
      description: "Udskiftning af forkamera",
      time: "20-30 min",
      warranty: "12 mdr",
      price: "349",
      originalPrice: "349",
      compatiblePrice: "249",
      includes: "Kamera + test",
      quality: "original"
    },
    {
      id: "bagkamera",
      name: "Bag-kamera",
      description: "Udskiftning af bagkamera",
      time: "20-30 min",
      warranty: "12 mdr",
      price: "449",
      originalPrice: "449",
      compatiblePrice: "349",
      includes: "Kamera + test",
      quality: "original"
    },
    {
      id: "kameraglas",
      name: "Kamera-glas",
      description: "Udskiftning af kamera-glas (hvis kun glas er revnet)",
      time: "20-30 min",
      warranty: "12 mdr",
      price: "199",
      originalPrice: "199",
      compatiblePrice: "149",
      includes: "Kamera-glas + test",
      quality: "original"
    },
    {
      id: "powerknap",
      name: "Tænd/sluk-knap (power)",
      description: "Udskiftning af power-knap",
      time: "30-45 min",
      warranty: "12 mdr",
      price: "349",
      originalPrice: "349",
      compatiblePrice: "249",
      includes: "Power-knap + test",
      quality: "original"
    },
    {
      id: "lydløsknap",
      name: "Lydløs-knap",
      description: "Udskiftning af lydløs-knap",
      time: "30-45 min",
      warranty: "12 mdr",
      price: "249",
      originalPrice: "249",
      compatiblePrice: "199",
      includes: "Lydløs-knap + test",
      quality: "original"
    },
    {
      id: "volumeknapper",
      name: "Volume-knapper",
      description: "Udskiftning af volume-knapper",
      time: "30-45 min",
      warranty: "12 mdr",
      price: "249",
      originalPrice: "249",
      compatiblePrice: "199",
      includes: "Volume-knapper + test",
      quality: "original"
    },
    {
      id: "hjemknap",
      name: "Hjem-knap",
      description: "Udskiftning af hjem-knap",
      time: "30-45 min",
      warranty: "12 mdr",
      price: "349",
      originalPrice: "349",
      compatiblePrice: "249",
      includes: "Hjem-knap + test",
      quality: "original",
      warning: "Touch ID kan ikke genskabes på iPhone 6 Plus"
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
      price: "249",
      originalPrice: "249",
      compatiblePrice: "249",
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
            <span className="text-gray-800 font-medium">iPhone 6 Plus</span>
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
                  iPhone 6 Plus Reparation
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Større model med A8 chip og 5.5" skærm – reparation på stedet på 20–30 min.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  A8 chip
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  5.5" Retina
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
                src="/images/iphones/iphone-6-plus.png"
                alt="iPhone 6 Plus – front, bagside og sideprofil"
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
                          {repair.originalPrice !== repair.compatiblePrice && (
                            <div className="flex gap-1">
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Original</span>
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Kompatibel</span>
                            </div>
                          )}
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

      {/* Related Models */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Se også
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/reparationer/apple/iphone-6" className="group">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-600 transition-colors">
                  iPhone 6
                </h3>
                <p className="text-gray-600">Standard model med 4.7" skærm</p>
              </div>
            </Link>
            <Link href="/reparationer/apple/iphone-6s-plus" className="group">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-600 transition-colors">
                  iPhone 6s Plus
                </h3>
                <p className="text-gray-600">Opgraderet Plus model med A9 chip</p>
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
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Hvor lang tid tager en iPhone 6 Plus reparation?
              </h3>
              <p className="text-gray-600">
                De fleste reparationer er færdige på 20–30 minutter på stedet. Skærmreparationer tager typisk 15-25 minutter, mens batteriskift tager 15-20 minutter.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Mister jeg data ved reparationen?
              </h3>
              <p className="text-gray-600">
                Nej, ved standardreparationer bevarer vi dine data. Vi anbefaler dog backup før reparation for en sikkerheds skyld.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Kan Touch ID genskabes på iPhone 6 Plus?
              </h3>
              <p className="text-gray-600">
                Nej, Touch ID kan ikke genskabes ved skift af hjem-knap på iPhone 6 Plus. Dette er en teknisk begrænsning.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Giver I garanti på væskeskader?
              </h3>
              <p className="text-gray-600">
                Vi renser og diagnosticerer væskeskader, men giver ingen garanti på væskeskader da de kan være uforudsigelige.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Hvilke dele bruger I?
              </h3>
              <p className="text-gray-600">
                Originale eller kvalitetsgodkendte A-kvalitetsdele med garanti. Vi bruger kun dele af højeste kvalitet, der lever op til Apple's standarder.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "iPhone 6 Plus Reparation",
            "description": "Vi reparerer iPhone 6 Plus med originale dele. Skærm, batteri, kamera, knapper og mere. 24 mdr garanti på skærme, 12 mdr på øvrige dele.",
            "brand": {
              "@type": "Brand",
              "name": "Apple"
            },
            "model": "iPhone 6 Plus",
            "offers": {
              "@type": "Offer",
              "price": "799",
              "priceCurrency": "DKK",
              "availability": "https://schema.org/InStock",
              "description": "Skærmreparation fra 799 kr"
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
    </div>
  );
}