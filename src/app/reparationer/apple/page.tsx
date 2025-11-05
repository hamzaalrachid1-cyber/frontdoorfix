import Link from 'next/link';
import { BRANDS } from '@/data/brands';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Apple reparation – vælg kategori | FrontDoorFix',
  description: 'Apple reparation og service. Alle Apple-reparationer • iPhone, iPad, MacBook. Hurtig service, gennemsigtige priser og garanti.',
  keywords: 'Apple, reparation, iPhone, iPad, MacBook, mobilreparation, København',
};

interface Serie {
  id: string;
  brandId: string;
  name: string;
  slug: string;
  descriptionShort: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
}

async function getAppleSeries(): Promise<Serie[]> {
  try {
    const seriesDir = path.join(process.cwd(), 'src', 'data', 'series', 'apple');
    
    if (!fs.existsSync(seriesDir)) {
      return [];
    }

    const files = fs.readdirSync(seriesDir).filter(file => file.endsWith('.json'));
    const series: Serie[] = [];

    for (const file of files) {
      const filePath = path.join(seriesDir, file);
      const seriesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      if (seriesData.isActive !== false) {
        series.push(seriesData);
      }
    }

    return series.sort((a, b) => a.sortOrder - b.sortOrder);
  } catch (error) {
    console.error('Error loading Apple series:', error);
    return [];
  }
}

export default async function AppleBrandPage() {
  const brand = BRANDS.find((b) => b.slug === 'apple');
  const appleSeries = await getAppleSeries();
  
  if (!brand) {
    return <div>Brand not found</div>;
  }

  // Merge series data with categories
  const enabledCategories = brand.categories
    .filter(cat => cat.enabled !== false)
    .map(cat => {
      const serie = appleSeries.find(s => s.slug === cat.slug);
      return {
        ...cat,
        image: serie?.image,
        description: serie?.descriptionShort || cat.subtitle
      };
    });

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
            <span className="text-gray-900 font-medium">{brand.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-pink-50 via-yellow-50 to-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-8">
            {/* Brand Badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                {brand.badge}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {brand.title} reparation – vælg kategori
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              {brand.description}
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
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-pink-300 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                aria-label={`Se ${category.title} modeller og priser`}
              >
                <div className="p-6">
                  {/* Category Image or Icon */}
                  {category.image ? (
                    <div className="flex items-center justify-center w-40 h-40 mx-auto mb-6">
                      <img 
                        src={category.image} 
                        alt={category.title}
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

                  {/* Category Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                    {category.title}
                  </h2>

                  {/* Category Description */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  {/* CTA Button */}
                  <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center group-hover:opacity-90 transition-opacity">
                    Se modeller
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Apple reparation på din adresse
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Vi reparerer iPhone, iPad og MacBook dér hvor du er – i København, Frederiksberg, Amager og Nordsjælland. De fleste opgaver klares på 20–30 min. pr. del (MacBook kan tage lidt længere). Du får 24 mdr. garanti på skærme og 12 mdr. på batterier og øvrige dele.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Vi bruger kvalitetsgodkendte reservedele og kalibrerer/tester før og efter, så funktioner som True Tone/Face ID/Touch ID bevares, hvor det er muligt. Du kan bruge din enhed igen med det samme.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Gennemsigtige priser – ingen overraskelser
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Alle priser er inkl. moms, del, arbejde, test og garanti. Er du i tvivl om fejlen? Vælg diagnose først – vi tester og giver et fast svar og en fast pris, før vi går i gang. Bestiller du flere reparationer på samme enhed, giver vi en pakkerabat.
            </p>
          </div>

          {/* Kvalitet & sikkerhed */}
          <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Kvalitet & sikkerhed
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Vi arbejder ESD-sikkert, udskifter tætningsklæber hvor relevant og gennemfører funktions- og kvalitetstest. Dine data bliver på enheden – vi beder altid om tilladelse før indgreb, der kan påvirke indholdet. Fabrikstæthed (IP) kan ikke garanteres efter åbning – sådan er det hos alle værksteder.
            </p>
          </div>

          {/* Dækker vi dit område? */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Dækker vi dit område?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Vi kører i København, Frederiksberg, Amager og Nordsjælland – og dækker i praksis hele Hovedstadsområdet og omegn. Er du i tvivl, så ring – vi svarer typisk inden for 5 min.
            </p>
          </div>

          {/* CTA Note */}
          <div className="mt-8 bg-pink-50 border-l-4 border-pink-500 p-6 rounded-lg">
            <p className="text-center text-gray-800 font-medium">
              Har du spørgsmål? Ring <a href="tel:+4593545457" className="text-pink-600 hover:text-pink-700 font-semibold">+45 93 54 54 57</a> – vi svarer typisk inden for 5 min.
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
            "name": `${brand.title} reparation – vælg kategori`,
            "description": `${brand.title} reparation og service. ${brand.description}. Hurtig service, gennemsigtige priser og garanti.`,
            "url": `https://frontdoorfix.dk/reparationer/${brand.slug}`,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": enabledCategories.map((category, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": category.title,
                  "url": `https://frontdoorfix.dk${category.href}`,
                  "description": category.description
                }
              }))
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Forside",
                  "item": "https://frontdoorfix.dk"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Reparation & priser",
                  "item": "https://frontdoorfix.dk/reparationer"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": brand.title,
                  "item": `https://frontdoorfix.dk/reparationer/${brand.slug}`
                }
              ]
            }
          })
        }}
      />
    </div>
  );
}