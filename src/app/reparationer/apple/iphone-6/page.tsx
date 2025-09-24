import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "iPhone 6 Reparation - Frontdoorfix",
  description: "Vi tilbyder reparation af iPhone 6 – skærm, batteri, kamera, ladeport og mere med 24 måneders garanti. Hurtig service direkte på din adresse i København.",
  keywords: "iPhone 6 reparation, skærmreparation iPhone 6, batteriskift iPhone 6, kamera reparation, ladeport reparation, København",
};

export default function iPhone6Repair() {
  const repairs = [
    {
      service: "Skærmreparation",
      price: "599 kr",
      time: "15-25 min",
      description: "Udskiftning af ødelagt skærm med original Apple dele",
      popular: true
    },
    {
      service: "Bagcover reparation", 
      price: "399 kr",
      time: "15-20 min",
      description: "Udskiftning af ødelagt bagcover",
      popular: false
    },
    {
      service: "Batteriskift",
      price: "299 kr", 
      time: "15-20 min",
      description: "Udskiftning af batteri med original Apple batteri",
      popular: true
    },
    {
      service: "Ladeport reparation",
      price: "399 kr",
      time: "20-30 min", 
      description: "Reparation af opladningsproblemer",
      popular: false
    },
    {
      service: "Kamera reparation",
      price: "499 kr",
      time: "20-30 min",
      description: "Reparation af kamera med original dele",
      popular: false
    },
    {
      service: "Vandskade reparation",
      price: "Fra 499 kr",
      time: "30-60 min",
      description: "Diagnose og reparation af vandskade",
      popular: false
    }
  ];

  const advantages = [
    "24 måneders garanti på skærmreparationer",
    "Originale Apple dele",
    "Erfarne teknikere med Apple-certifikering", 
    "Reparation på stedet",
    "Gratis diagnose",
    "Sikker håndtering af din data"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-yellow-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Link href="/reparationer/apple" className="text-pink-600 hover:text-pink-700 mb-4 inline-flex items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Tilbage til iPhone-modeller
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                  iPhone 6
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Reparer din iPhone 6 hurtigt og sikkert med originale reservedele og garanti.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Vi tilbyder reparation af iPhone 6</strong> – skærm, batteri, kamera, ladeport og mere med 24 måneders garanti. 
                  Hurtig service direkte på din adresse i København.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                  A8 chip
                </span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  4.7" Retina display
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  2014 model
                </span>
              </div>
            </div>
            <div className="text-center">
              {/* iPhone 6 Image */}
              <div className="w-80 h-80 mx-auto flex items-center justify-center">
                <img 
                  src="/images/iphones/iphone-6.webp" 
                  alt="iPhone 6"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Reparationer og priser
          </h2>
          
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Reparation</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Pris</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Tid</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Beskrivelse</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Bestil</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {repairs.map((repair, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-800">{repair.service}</span>
                          {repair.popular && (
                            <span className="ml-2 bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs font-medium">
                              Populær
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-semibold text-gray-800">{repair.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{repair.time}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{repair.description}</span>
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
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Hvorfor vælge Frontdoorfix?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">{advantage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-yellow-500">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Klar til at reparere din iPhone 6?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Book en tid nu og få din iPhone repareret på under 30 minutter
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              📅 Bestil tid til iPhone 6 reparation
            </button>
            <a 
              href="tel:+4593545457"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-colors"
            >
              📞 Ring +45 93 54 54 57
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
