"use client";

export default function PartsFAQ() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Ofte stillede spørgsmål om reservedele
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <details className="bg-gray-50 rounded-2xl p-6 shadow-sm">
            <summary className="font-semibold text-gray-800 cursor-pointer hover:text-pink-600 transition-colors text-lg">
              Hvorfor står der "Ukendt del/Brugt del"?
            </summary>
            <div className="mt-4 text-gray-600 leading-relaxed">
              iPhones knytter reservedele til enhedens serienumre. Når vi monterer en original kalibreret/pulled eller kompatibel del, kan nyere modeller vise en informationsbesked i Indstillinger. Det påvirker ikke funktion – og vi giver normal garanti.
            </div>
          </details>

          <details className="bg-gray-50 rounded-2xl p-6 shadow-sm">
            <summary className="font-semibold text-gray-800 cursor-pointer hover:text-pink-600 transition-colors text-lg">
              Bevarer I funktioner som True Tone/lysstyrke-styring?
            </summary>
            <div className="mt-4 text-gray-600 leading-relaxed">
              Hvor modellen understøtter det, kalibrerer vi så farve/lysstyrke fungerer korrekt. True Tone afhænger af model/EEPROM-data – vi overfører hvor muligt.
            </div>
          </details>

          <details className="bg-gray-50 rounded-2xl p-6 shadow-sm">
            <summary className="font-semibold text-gray-800 cursor-pointer hover:text-pink-600 transition-colors text-lg">
              Original vs. kompatibel – hvad er forskellen?
            </summary>
            <div className="mt-4 text-gray-600 leading-relaxed">
              Original giver typisk bedst farvegengivelse, lysstyrke og batteriydelse. Kompatibel A-kvalitet er stærk til ældre enheder, men bruger ofte 10–15% mere strøm og har let lavere lysstyrke/farvepræcision.
            </div>
          </details>

          <details className="bg-gray-50 rounded-2xl p-6 shadow-sm">
            <summary className="font-semibold text-gray-800 cursor-pointer hover:text-pink-600 transition-colors text-lg">
              Holder min vandtæthed?
            </summary>
            <div className="mt-4 text-gray-600 leading-relaxed">
              Vi monterer nye tætningsklæbere. Fabriks-vandtæthed kan ikke garanteres efter service.
            </div>
          </details>

          <details className="bg-gray-50 rounded-2xl p-6 shadow-sm">
            <summary className="font-semibold text-gray-800 cursor-pointer hover:text-pink-600 transition-colors text-lg">
              Garanti på delene?
            </summary>
            <div className="mt-4 text-gray-600 leading-relaxed">
              Skærme op til 24 mdr. – batterier 12 mdr. Skader fra væske/stød efter service er ikke omfattet.
            </div>
          </details>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Har du spørgsmål om kvalitet eller garanti? Vi rådgiver gerne!
          </p>
          <div className="flex justify-center">
            <button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
              Ring +45 93 54 54 57
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
