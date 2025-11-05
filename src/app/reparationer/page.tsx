import Link from 'next/link';
import { BRANDS } from '@/data/brands';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Reparation & priser – vælg mærke | FrontDoorFix',
  description: 'Vælg iPhone, Samsung, Huawei m.fl. – se priser og bestil reparation. Hurtig service, gennemsigtige priser og garanti.',
  keywords: 'reparation, iPhone, Samsung, Huawei, Motorola, OnePlus, Google Pixel, PlayStation, Computer, mobilreparation, København',
};

interface BrandData {
  name: string;
  slug: string;
  subtitle: string;
  icon: string;
  image?: string;
  link: string;
  order: number;
  isVisible: boolean;
}

async function getBrandsData(): Promise<BrandData[]> {
  try {
    const brandsFile = path.join(process.cwd(), 'src', 'data', 'brands.json');
    
    if (!fs.existsSync(brandsFile)) {
      return [];
    }

    const fileContents = fs.readFileSync(brandsFile, 'utf8');
    const brands = JSON.parse(fileContents);
    
    return brands
      .filter((b: BrandData) => b.isVisible === true)
      .sort((a: BrandData, b: BrandData) => a.order - b.order);
  } catch (error) {
    console.error('Error loading brands:', error);
    return [];
  }
}

export default async function ReparationerPage() {
  const brandsData = await getBrandsData();
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
            <span className="text-gray-900 font-medium">Reparation & priser</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-pink-50 via-yellow-50 to-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Reparation & priser – vælg mærke
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              Vælg mærket på din enhed for at se modeller, priser og bestille reparation. Vi reparerer hurtigt, sikkert og gennemsigtigt – og vi kommer gerne ud til dig.
            </p>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Vi kommer til dig</span>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brandsData.map((brandData) => {
              const brand = BRANDS.find(b => b.slug === brandData.slug);
              const badge = brand?.badge || 'Android';
              
              return (
                <Link
                  key={brandData.slug}
                  href={`/reparationer/${brandData.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-pink-300 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  aria-label={`Se ${brandData.name} reparationer og priser`}
                >
                  <div className="p-6">
                    {/* Brand Image or Icon */}
                    {brandData.image ? (
                      <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4">
                        <img 
                          src={brandData.image} 
                          alt={brandData.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    )}

                    {/* Brand Badge */}
                    <div className="inline-flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        badge === 'Apple'
                          ? 'bg-gray-100 text-gray-800'
                          : badge === 'Android'
                          ? 'bg-green-100 text-green-800'
                          : badge === 'Konsoller'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {badge}
                      </span>
                    </div>

                    {/* Brand Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                      {brandData.name}
                    </h2>

                    {/* Brand Subtitle */}
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {brandData.subtitle}
                    </p>

                    {/* CTA Button */}
                    <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center group-hover:opacity-90 transition-opacity">
                      Se kategorier
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEO Block */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Hurtig reparation på din adresse
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Vi reparerer alle mærker på stedet i København, omegn og Nordsjælland – typisk på 20–30 minutter pr. del. Du får 24 mdr. garanti på skærme og 12 mdr. på batterier og øvrige dele. Vi bruger kvalitetsgodkendte reservedele og kalibrerer/tester før og efter, så din enhed er klar med det samme.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Gennemsigtige priser – ingen overraskelser
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Alle priser vises tydeligt, inkl. test og garanti. Er du i tvivl om, hvad der er galt? Vælg diagnose – så giver vi dig et klart svar og en fast pris, før vi går i gang.
            </p>
          </div>
        </div>
      </section>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Reparation & priser – vælg mærke",
            "description": "Vælg iPhone, Samsung, Huawei m.fl. – se priser og bestil reparation. Hurtig service, gennemsigtige priser og garanti.",
            "url": "https://frontdoorfix.dk/reparationer",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": brandsData.map((brand, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": brand.name,
                  "url": `https://frontdoorfix.dk/reparationer/${brand.slug}`,
                  "description": brand.subtitle,
                },
              })),
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Forside",
                  "item": "https://frontdoorfix.dk",
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Reparation & priser",
                  "item": "https://frontdoorfix.dk/reparationer",
                },
              ],
            },
          }),
        }}
      />
    </div>
  );
}