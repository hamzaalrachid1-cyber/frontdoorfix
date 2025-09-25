"use client";

import { useState } from "react";

export default function PartsQualitySection() {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const toggleTooltip = (id: string) => {
    setShowTooltip(showTooltip === id ? null : id);
  };

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Vores reservedele – kvalitet uden kompromis
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Vi reparerer med originale dele, når det giver bedst mening – og tilbyder et prisvenligt alternativ i A-kvalitet. Alle dele testes og leveres med garanti.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Original (Pulled) */}
          <div className="bg-gradient-to-br from-pink-50 to-yellow-50 p-6 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Original (kalibreret/pulled)</h3>
            </div>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              Ægte Apple-dele fra donor-enheder ("pulled"), testet og kalibreret til din telefon. På nyere iPhones kan{" "}
              <button 
                className="text-pink-600 underline hover:text-pink-700 transition-colors relative"
                onClick={() => toggleTooltip('pulled-tooltip')}
                onFocus={() => setShowTooltip('pulled-tooltip')}
                onBlur={() => setShowTooltip(null)}
              >
                "Ukendt del/Brugt del"
              </button>
              {" "}vises i indstillinger – det er forventet og påvirker ikke funktion.
              {showTooltip === 'pulled-tooltip' && (
                <div className="absolute z-30 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm mt-2 left-0">
                  <p className="text-sm text-gray-700">
                    På nyere iPhones kan der vises en informationsbesked i Indstillinger efter udskiftning. Det påvirker ikke funktion, og vi giver normal garanti.
                  </p>
                </div>
              )}
            </p>
            <div className="space-y-2 mb-4">
              <div className="text-sm">
                <span className="font-medium text-green-700">✓ Fordele:</span>
                <span className="text-gray-600"> bedste farver/lysstyrke, korrekt touch, oleofobisk coating, stabil batteriydelse, mest bæredygtigt.</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-orange-700">⚠ Ulemper:</span>
                <span className="text-gray-600"> begrænset tilgængelighed; enkelte modeller viser informationsbesked.</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 border">📱 iPhone</span>
              <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 border">🔋 Batteri</span>
              <span className="bg-green-100 px-3 py-1 rounded-full text-xs font-medium text-green-700 border border-green-200">♻️ Mest bæredygtigt</span>
            </div>
          </div>

          {/* Original (New) */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Original (ny servicedele)</h3>
            </div>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              Nye, originale servicepacks fra godkendte leverandører (Samsung, Huawei, OnePlus m.fl.). Hvor relevant medfølger klæber/forsegling.
            </p>
            <div className="space-y-2 mb-4">
              <div className="text-sm">
                <span className="font-medium text-green-700">✓ Fordele:</span>
                <span className="text-gray-600"> 1:1 pasform og performance, længst levetid, fabriksfinish.</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 border">Samsung</span>
              <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 border">Huawei</span>
              <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 border">OnePlus</span>
            </div>
          </div>

          {/* Compatible */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🔋</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Kompatibel</h3>
            </div>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              Budgetvenligt alternativ i A-kvalitet – godt til ældre modeller og dagligt brug.
            </p>
            <div className="space-y-2 mb-4">
              <div className="text-sm">
                <span className="font-medium text-orange-700">Bemærk:</span>
                <span className="text-gray-600"> bruger typisk 10–15% mere strøm end original, lidt lavere lysstyrke/farvepræcision, touch kan føles en anelse anderledes, og nyere iPhones kan vise{" "}
                <button 
                  className="text-pink-600 underline hover:text-pink-700 transition-colors relative"
                  onClick={() => toggleTooltip('compatible-tooltip')}
                  onFocus={() => setShowTooltip('compatible-tooltip')}
                  onBlur={() => setShowTooltip(null)}
                >
                  "Ukendt del"
                </button>
                .</span>
                {showTooltip === 'compatible-tooltip' && (
                  <div className="absolute z-30 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm mt-2 left-0">
                    <p className="text-sm text-gray-700">
                      På nyere iPhones kan der vises en informationsbesked i Indstillinger efter udskiftning. Det påvirker ikke funktion, og vi giver normal garanti.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-700 font-medium mb-4">
              Vi hjælper dig med at vælge det, der passer bedst til dit behov og budget.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 border">A-kvalitet</span>
              <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 border">Budgetvenlig</span>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-50 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">
            Sammenligning af kvalitetstyper
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Egenskab</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Original</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Original (ny)</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Kompatibel (A)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-700">Farver/lysstyrke</td>
                  <td className="py-3 px-4 text-center">⭐⭐⭐⭐⭐</td>
                  <td className="py-3 px-4 text-center">⭐⭐⭐⭐⭐</td>
                  <td className="py-3 px-4 text-center">⭐⭐⭐⭐</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-700">Strømforbrug</td>
                  <td className="py-3 px-4 text-center">⭐⭐⭐⭐⭐ (lavt)</td>
                  <td className="py-3 px-4 text-center">⭐⭐⭐⭐⭐ (lavt)</td>
                  <td className="py-3 px-4 text-center">⭐⭐⭐ (10–15%↑)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-700">Touch-respons</td>
                  <td className="py-3 px-4 text-center">⭐⭐⭐⭐⭐</td>
                  <td className="py-3 px-4 text-center">⭐⭐⭐⭐⭐</td>
                  <td className="py-3 px-4 text-center">⭐⭐⭐⭐</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-700">Pris</td>
                  <td className="py-3 px-4 text-center">⭐⭐⭐</td>
                  <td className="py-3 px-4 text-center">⭐⭐</td>
                  <td className="py-3 px-4 text-center">⭐⭐⭐⭐⭐</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-700">"Ukendt del" besked</td>
                  <td className="py-3 px-4 text-center text-gray-600">Nogle modeller</td>
                  <td className="py-3 px-4 text-center text-gray-600">Nogle modeller</td>
                  <td className="py-3 px-4 text-center text-gray-600">Nogle modeller</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
