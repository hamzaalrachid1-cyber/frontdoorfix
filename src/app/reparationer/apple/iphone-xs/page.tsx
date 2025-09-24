import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "iPhone XS Reparation - Frontdoorfix",
  description: "Vi tilbyder reparation af iPhone XS – skærm, batteri, kamera, ladeport og mere med 24 måneders garanti. Hurtig service direkte på din adresse i København.",
  keywords: "iPhone XS reparation, skærmreparation iPhone XS, batteriskift iPhone XS, kamera reparation, ladeport reparation, København",
};

export default function iPhoneXSRepair() {
  const repairs = [
    {
      service: "Skærmreparation",
      price: "1.599 kr",
      time: "20-30 min",
      description: "Udskiftning af knust eller defekt skærm med original kvalitet.",
      popular: true,
    },
    {
      service: "Batteriskift",
      price: "1.099 kr",
      time: "15-20 min",
      description: "Nyt batteri for længere levetid og bedre ydeevne.",
      popular: true,
    },
    {
      service: "Kamera reparation",
      price: "1.199 kr",
      time: "30-45 min",
      description: "Fiks sløret eller ikke-fungerende kamera.",
      popular: false,
    },
    {
      service: "Ladeport reparation",
      price: "999 kr",
      time: "25-35 min",
      description: "Reparation af defekt ladeport, så din iPhone kan oplade igen.",
      popular: false,
    },
    {
      service: "Bagcover udskiftning",
      price: "1.299 kr",
      time: "40-60 min",
      description: "Udskiftning af knust bagcover for et nyt look.",
      popular: false,
    },
    {
      service: "Vandskade diagnose",
      price: "899 kr",
      time: "60-90 min",
      description: "Grundig diagnose og rens af vandskadet iPhone.",
      popular: false,
    },
  ];

  const advantages = [
    "24 måneders garanti på skærme",
    "Originale reservedele",
    "Reparation på din adresse",
    "Erfarne teknikere",
    "Hurtig service (ofte under 30 min)",
    "Sikker datahåndtering",
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-6">
        <div className="mx-auto max-w-6xl">
          <Link href="/reparationer/apple" className="text-gray-600 hover:text-pink-600">
            ← Tilbage til iPhone modeller
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-yellow-50">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                iPhone XS
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Professionel reparation af din iPhone XS med originale Apple dele og 24 måneders garanti.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Vi tilbyder reparation af iPhone XS</strong> – skærm, batteri, kamera, ladeport og mere med 24 måneders garanti. 
                Hurtig service direkte på din adresse i København.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                A12 chip
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Face ID
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                2018 model
              </span>
            </div>
          </div>
          <div className="text-center">
            {/* iPhone XS Image */}
            <div className="w-80 h-80 mx-auto flex items-center justify-center">
              <div className="card__media w-full h-full flex items-center justify-center">
                <img 
                  src="/images/iphones/iphone-xs.png" 
                  alt="iPhone XS"
                  width="400"
                  height="400"
                  loading="lazy"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Priser for iPhone XS reparationer</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-lg">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">Service</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">Pris</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">Tid</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">Beskrivelse</th>
                </tr>
              </thead>
              <tbody>
                {repairs.map((repair, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-800 flex items-center gap-2">
                      {repair.popular && (
                        <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Populær</span>
                      )}
                      {repair.service}
                    </td>
                    <td className="py-4 px-6 text-gray-800 font-semibold">{repair.price}</td>
                    <td className="py-4 px-6 text-gray-600">{repair.time}</td>
                    <td className="py-4 px-6 text-gray-600 text-sm">{repair.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Hvorfor vælge Frontdoorfix til din iPhone XS reparation?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <p className="text-lg text-gray-700">{advantage}</p>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="text-center mt-12">
            <button className="btn-gradient px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              Bestil reparation nu
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-2">
                <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
