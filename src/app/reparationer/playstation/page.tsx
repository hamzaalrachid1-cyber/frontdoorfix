import Link from 'next/link';
import { BRANDS } from '@/data/brands';

export const metadata = {
  title: 'PlayStation reparation – vælg produkt | FrontDoorFix',
  description: 'PlayStation reparation og service. PS4, PS5 & Controller • Konsoller. Hurtig service, gennemsigtige priser og garanti.',
  keywords: 'PlayStation, reparation, PS4, PS5, Controller, konsol, København',
};

export default function PlayStationBrandPage() {
  const brand = BRANDS.find((b) => b.slug === 'playstation');
  
  if (!brand) {
    return <div>Brand not found</div>;
  }

  const enabledCategories = brand.categories.filter(cat => cat.enabled !== false);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-3">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Forside
            </Link>
            <span className="mx-2">›</span>
            <Link href="/reparationer" className="hover:text-gray-900 transition-colors">
              Reparation & priser
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium">PlayStation</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-pink-50 via-yellow-50 to-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full mb-4">
              <span className="text-2xl">🎮</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              PlayStation reparation – vælg produkt
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              {brand.subtitle}
            </p>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Vi kommer til dig</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enabledCategories.map((category) => (
              <Link
                key={category.slug}
                href={category.href}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-pink-300 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🎮</span>
                  </div>
                  <div className="px-2 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">
                    {brand.badge}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category.subtitle}
                </p>
                <div className="flex items-center text-pink-600 text-sm font-medium">
                  Se modeller og priser
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Hvorfor vælge FrontDoorFix til PlayStation reparation?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Vi har specialiseret os i PlayStation reparationer og kender alle modeller i detaljer
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hurtig service</h3>
              <p className="text-gray-600 text-sm">Reparation på 20-30 minutter direkte på din adresse</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Kvalitetsdele</h3>
              <p className="text-gray-600 text-sm">Original og kompatible dele med 24/12 måneders garanti</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🏠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Vi kommer til dig</h3>
              <p className="text-gray-600 text-sm">København, Frederiksberg og omegn - vi kører ud til dig</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

