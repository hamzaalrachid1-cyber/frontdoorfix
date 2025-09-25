export default function UsageByPlatform() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Hvad bruger vi på hvilke reparationer?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* iPhone */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
              <span className="text-3xl">📱</span> iPhone
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-gray-700 font-medium">Skærm:</span>
                <span className="text-gray-600 text-right text-sm max-w-xs">Original (kalibreret/pulled) eller Kompatibel (A-kvalitet)</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-700 font-medium">Batteri:</span>
                <span className="text-gray-600 text-right text-sm max-w-xs">Original (kalibreret/pulled) eller Kompatibel (A-kvalitet)</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-700 font-medium">Ladeport:</span>
                <span className="text-gray-600 text-right text-sm max-w-xs">Som udgangspunkt original/OEM (ny)</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-700 font-medium">Kamera (for/bag):</span>
                <span className="text-gray-600 text-right text-sm max-w-xs">Som udgangspunkt original/OEM (ny)</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-700 font-medium">Bagcover (kun glas):</span>
                <span className="text-gray-600 text-right text-sm max-w-xs">Eftermarkedsglas i høj kvalitet / evt. komplet bagcover</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-700 font-medium">Øvrige moduler:</span>
                <span className="text-gray-600 text-right text-sm max-w-xs">Original/OEM, hvor tilgængeligt</span>
              </div>
            </div>
          </div>

          {/* Android */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
              <span className="text-3xl">🤖</span> Android
              <span className="text-sm text-gray-500">(Samsung, Huawei, OnePlus m.fl.)</span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-gray-700 font-medium">Skærme & batterier:</span>
                <span className="text-gray-600 text-right text-sm max-w-xs">Originale servicepacks (nye)</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-700 font-medium">Kameraer & porte:</span>
                <span className="text-gray-600 text-right text-sm max-w-xs">Originale/OEM dele, hvor muligt</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-700 font-medium">Øvrige moduler:</span>
                <span className="text-gray-600 text-right text-sm max-w-xs">Original/OEM dele, hvor muligt</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="bg-blue-100 px-3 py-1 rounded-full text-xs font-medium text-blue-700 border border-blue-200">Samsung</span>
              <span className="bg-blue-100 px-3 py-1 rounded-full text-xs font-medium text-blue-700 border border-blue-200">Huawei</span>
              <span className="bg-blue-100 px-3 py-1 rounded-full text-xs font-medium text-blue-700 border border-blue-200">OnePlus</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
