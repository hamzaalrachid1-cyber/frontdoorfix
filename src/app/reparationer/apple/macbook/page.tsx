"use client";

import Link from "next/link";
import IphoneRepairsSeoSection from "@/components/IphoneRepairsSeoSection";
import { useState, useEffect } from "react";

interface MacBookModel {
  id: string;
  model: string;
  slug: string;
  image: string;
  year: number;
  family?: string;
  isVisible: boolean;
}

export default function MacBookPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [models, setModels] = useState<MacBookModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/models?brand=apple&series=macbook', {
        cache: 'no-store'
      });
      if (response.ok) {
        const data = await response.json();
        setModels(data.filter((m: any) => m.isVisible !== false));
      }
    } catch (error) {
      console.error('Error fetching models:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredModels = models.filter(model =>
    model.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-pink-50 via-yellow-50 to-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            MacBook reparation
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            MacBook reparation – skærm, tastatur, batteri & USB-C
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Vi tilbyder reparation af alle MacBook-modeller med hurtig udførsel og garanti. Se pris på skærmskift, tastaturskift, batteriskift og USB-C reparationer ved at vælge din model herunder.
          </p>
        </div>
      </section>

      {/* Search & Models */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Søg efter en model:
          </h2>
          <div className="max-w-xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Søg model... fx &apos;Pro&apos;, &apos;Air&apos;, &apos;M1&apos;, &apos;2024&apos;"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredModels.map((model) => (
                <div
                  key={model.id}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-pink-300 transition-all duration-300 relative"
                >
                  <div className="phone-card">
                    <img
                      alt={`${model.model} – MacBook reparation`}
                      loading="lazy"
                      width={200}
                      height={200}
                      decoding="async"
                      className="phone-card__img"
                      src={model.image || '/images/placeholder.png'}
                    />
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                      {model.model}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 font-medium">
                      {model.year}
                    </p>

                    <Link
                      href={`/reparationer/apple/${model.slug}`}
                      className="btn-gradient px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 mt-2"
                    >
                      <span>👉</span>
                      Se priser & reparationer
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Populære reparationer */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Populære MacBook reparationer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Skærmreparation</h3>
              <p className="text-gray-600">Udskiftning af ødelagte skærme på alle MacBook-modeller med 24 måneders garanti.</p>
            </div>
            <div className="bg-white p-8 rounded-xl text-center shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                  <path d="M15.67 4H14V2c0-.55-.45-1-1-1s-1 .45-1 1v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Batteriskift</h3>
              <p className="text-gray-600">Få nyt liv i din MacBook med et friskt batteri og 12 måneders garanti.</p>
            </div>
            <div className="bg-white p-8 rounded-xl text-center shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-purple-600">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Tastatur reparation</h3>
              <p className="text-gray-600">Reparation af tastatur og touchpad på alle MacBook-modeller.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hvorfor vælge os */}
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

      {/* Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Hvad siger vores kunder
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Fantastisk service! Min MacBook blev repareret på under 30 minutter direkte på min arbejdsplads. Kan varmt anbefales!"
              </p>
              <p className="text-sm text-gray-500">- Sarah M.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Professionel og hurtig service. Min skærm blev udskiftet med original kvalitet og jeg fik 24 måneders garanti. Perfekt!"
              </p>
              <p className="text-sm text-gray-500">- Michael K.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Bedste MacBook reparation i København! De kom til mig og reparerede min MacBook på stedet. Meget tilfreds med resultatet."
              </p>
              <p className="text-sm text-gray-500">- Anna L.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-800">5.0 på Google & Trustpilot</span>
            </div>
          </div>
        </div>
      </section>

      <IphoneRepairsSeoSection 
        cities={['København', 'Nordsjælland']}
        coverageNote="og omegn"
        hasOnsite={true}
        phone="+45 93 54 54 57"
        deviceType="MacBook"
      />

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Ofte stillede spørgsmål
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Hvor lang tid tager en MacBook reparation?
              </h3>
              <p className="text-gray-600">
                Typisk 20–30 min pr. del – afhænger af model og opgave.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Beholder jeg data?
              </h3>
              <p className="text-gray-600">
                Ja, hvor muligt. Vi beder om tilladelse før nulstilling eller indgreb, der kan påvirke indhold.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Hvilke dele bruger I?
              </h3>
              <p className="text-gray-600">
                Originale eller kvalitetsgodkendte A-kvalitetsdele med garanti. Vi bruger kun dele af højeste kvalitet.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Hvilke garantier giver I?
              </h3>
              <p className="text-gray-600">
                24 mdr. på skærme, 12 mdr. på batterier og øvrige dele.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Kommer I ud til mig?
              </h3>
              <p className="text-gray-600">
                Ja, København, omegn og Nordsjælland.
              </p>
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
    </div>
  );
}
