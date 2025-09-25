"use client";

export default function iPhone6Page() {
  const repairs = [
    {
      id: "skærm-original",
      name: "Skærmskift, Original Kvalitet",
      price: "699",
      time: "15-25 min",
      warranty: "24 mdr",
      description: "Udskiftning af ødelagt skærm med original Apple-kvalitet"
    },
    {
      id: "skærm-kompatibel",
      name: "Skærmskift, Kompatibel (Uoriginal)",
      price: "499",
      time: "15-25 min",
      warranty: "24 mdr",
      description: "Udskiftning af ødelagt skærm med kompatibel kvalitet"
    },
    {
      id: "batteri-original",
      name: "Batteriskift, Original Kvalitet",
      price: "399",
      time: "15-20 min",
      warranty: "12 mdr",
      description: "Udskiftning af batteri med original Apple-kvalitet"
    },
    {
      id: "batteri-kompatibel",
      name: "Batteriskift, Kompatibel (Uoriginal)",
      price: "299",
      time: "15-20 min",
      warranty: "12 mdr",
      description: "Udskiftning af batteri med kompatibel kvalitet"
    },
    {
      id: "bagglas",
      name: "Bagglas reparation",
      price: "199",
      time: "20-30 min",
      warranty: "12 mdr",
      description: "Reparation af ødelagt bagglas"
    },
    {
      id: "ladeport",
      name: "Ladeport reparation",
      price: "299",
      time: "20-30 min",
      warranty: "12 mdr",
      description: "Reparation af ladeport"
    },
    {
      id: "hjem-knap",
      name: "Hjem-knap reparation",
      price: "199",
      time: "15-25 min",
      warranty: "12 mdr",
      description: "Reparation af hjem-knap"
    },
    {
      id: "kamera",
      name: "Kamera reparation",
      price: "399",
      time: "20-30 min",
      warranty: "12 mdr",
      description: "Reparation af kamera"
    },
    {
      id: "mikrofon",
      name: "Mikrofon & højttaler reparation",
      price: "199",
      time: "15-25 min",
      warranty: "12 mdr",
      description: "Reparation af mikrofon og højttaler"
    },
    {
      id: "væskeskade",
      name: "Vand- og fugtskader",
      price: "299",
      time: "30-45 min",
      warranty: "Ingen",
      description: "Rensning og diagnosticering af væskeskader"
    },
    {
      id: "dataredning",
      name: "Dataredning",
      price: "499",
      time: "45-60 min",
      warranty: "Ingen",
      description: "Redning af data fra ødelagt telefon"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-yellow-500 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              iPhone 6 Reparation
            </h1>
            <p className="text-xl mb-8">
              Vi reparerer din iPhone 6 med originale dele og 24 måneders garanti
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/bestil?model=iphone-6"
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Bestil tid
              </a>
              <a
                href="tel:+4593545457"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-100 hover:text-pink-600 transition-colors"
              >
                Ring +45 93 54 54 57
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Repairs Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Reparationer for iPhone 6
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repairs.map((repair) => (
              <div key={repair.id} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {repair.name}
                </h3>
                <p className="text-gray-600 mb-4">{repair.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-pink-600">
                    {repair.price} kr
                  </span>
                  <span className="text-sm text-gray-500">{repair.time}</span>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  Garanti: {repair.warranty}
                </div>
                <a
                  href={`/bestil?model=iphone-6&repair=${repair.id}`}
                  className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-3 rounded-lg font-semibold text-center block hover:opacity-90 transition-opacity"
                >
                  Bestil denne reparation
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-yellow-500">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Klar til at reparere din iPhone 6?
          </h2>
          <p className="text-xl mb-8">
            Book en tid nu og få din iPhone repareret på under 30 minutter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/bestil?model=iphone-6"
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Bestil tid
            </a>
            <a
              href="tel:+4593545457"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-100 hover:text-pink-600 transition-colors"
            >
              Ring +45 93 54 54 57
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
