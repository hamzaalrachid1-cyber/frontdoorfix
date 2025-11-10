import Link from 'next/link';
import { BRANDS } from '@/data/brands';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

// Function to fetch series for a brand from filesystem
async function getSeriesForBrand(brandSlug: string) {
  try {
    const seriesDir = path.join(process.cwd(), 'src', 'data', 'series', brandSlug);
    
    if (!fs.existsSync(seriesDir)) {
      return [];
    }

    const files = fs.readdirSync(seriesDir).filter(file => file.endsWith('.json'));
    const seriesData = [];

    for (const file of files) {
      try {
        const filePath = path.join(seriesDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        if (data.isActive !== false) {
          // Get model count from filesystem instead of API
          let modelCount = 0;
          try {
            const modelsDir = path.join(process.cwd(), 'src', 'data', 'repairs', brandSlug);
            if (fs.existsSync(modelsDir)) {
              const modelFiles = fs.readdirSync(modelsDir).filter(f => f.endsWith('.json'));
              const models = modelFiles.map(file => {
                try {
                  const modelPath = path.join(modelsDir, file);
                  return JSON.parse(fs.readFileSync(modelPath, 'utf8'));
                } catch {
                  return null;
                }
              }).filter((m: { series?: string; isVisible?: boolean } | null): m is { series: string; isVisible: boolean; [key: string]: unknown } => m !== null && m.series === data.slug && m.isVisible !== false);
              modelCount = models.length;
            }
          } catch (error) {
            console.error(`Error counting models for ${data.slug}:`, error);
          }
          
          seriesData.push({
            ...data,
            modelCount
          });
        }
      } catch (error) {
        console.error(`Error reading series file ${file}:`, error);
      }
    }
    
    return seriesData
      .filter((s: any) => s.modelCount > 0)
      .sort((a: any, b: any) => a.sortOrder - b.sortOrder);
  } catch (error) {
    console.error(`Error fetching series for ${brandSlug}:`, error);
    return [];
  }
}


export async function generateStaticParams() {
  return BRANDS.map((brand) => ({
    brand: brand.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const brandData = BRANDS.find((b) => b.slug === brand);

  if (!brandData) {
    return {
      title: 'Brand ikke fundet | FrontDoorFix',
      description: 'Den ønskede brand blev ikke fundet.',
    };
  }

  return {
    title: `${brandData.title} reparation – vælg kategori | FrontDoorFix`,
    description: `${brandData.title} reparation og service. ${brandData.subtitle}. Hurtig service, gennemsigtige priser og garanti.`,
    keywords: `${brandData.title}, reparation, ${brandData.categories.map(cat => cat.title).join(', ')}, mobilreparation, København`,
    alternates: {
      canonical: `https://frontdoorfix.dk/reparationer/${brandData.slug}`,
    },
    openGraph: {
      title: `${brandData.title} reparation – vælg kategori | FrontDoorFix`,
      description: `${brandData.title} reparation og service. ${brandData.subtitle}. Hurtig service, gennemsigtige priser og garanti.`,
      url: `https://frontdoorfix.dk/reparationer/${brandData.slug}`,
      siteName: 'Frontdoorfix',
      locale: 'da_DK',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${brandData.title} reparation – vælg kategori | FrontDoorFix`,
      description: `${brandData.title} reparation og service. ${brandData.subtitle}. Hurtig service, gennemsigtige priser og garanti.`,
    },
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const brandData = BRANDS.find((b) => b.slug === brand);

  if (!brandData) {
    notFound();
  }

  // Get dynamic series for this brand
  const series = await getSeriesForBrand(brand);
  
  // Debug log
  console.log('Series data for', brand, ':', series.map(s => ({ name: s.name, image: s.image })));

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
            <span className="text-gray-900 font-medium">{brandData.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-pink-50 via-yellow-50 to-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                brandData.badge === 'Apple'
                  ? 'bg-gray-100 text-gray-800'
                  : brandData.badge === 'Android'
                  ? 'bg-green-100 text-green-800'
                  : brandData.badge === 'Konsoller'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {brandData.badge}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {brandData.title} reparation – vælg kategori
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              {brandData.subtitle}
            </p>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Vi kommer til dig</span>
            </div>
          </div>
        </div>
      </section>

      {/* Series Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.map((serie) => (
              <Link
                key={serie.slug}
                href={`/reparationer/${brand}/${serie.slug}`}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-pink-300 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                aria-label={`Se ${serie.name} modeller og priser`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-center w-40 h-40 mx-auto mb-6 bg-gray-50 rounded-lg overflow-hidden">
                    {serie.image ? (
                      <img 
                        src={serie.image} 
                        alt={serie.name} 
                        className="w-full h-full object-contain p-2" 
                        key={serie.image}
                      />
                    ) : (
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                      </svg>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                    {serie.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {serie.descriptionShort || `${serie.name} serie reparationer`}
                  </p>
                  <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center group-hover:opacity-90 transition-opacity">
                    Se modeller
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Block */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {brandData.title} reparation på din adresse
            </h2>
            {brandData.slug === 'samsung' ? (
              <>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Vi reparerer Samsung Galaxy – telefoner og tablets – dér hvor du er i København, Frederiksberg, Amager og Nordsjælland. De fleste reparationer klares på 20–30 min. pr. del. Du får 24 mdr. garanti på skærme og 12 mdr. på batterier og øvrige dele.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Vi bruger kvalitetsgodkendte reservedele og tester/kalibrerer før og efter. På modeller med ultralyds-fingeraftryk i skærmen (fx nyere Galaxy S/Note/Ultra) sikrer vi korrekt følsomhed efter udskiftning, så sensoren fungerer som den skal.
                </p>
              </>
            ) : (
              <p className="text-gray-600 leading-relaxed mb-8">
                Vi reparerer {brandData.slug} på stedet i København, omegn og Nordsjælland – typisk på 20–30 minutter pr. del. Du får 24 mdr. garanti på skærme og 12 mdr. på batterier og øvrige dele. Vi bruger kvalitetsgodkendte reservedele og kalibrerer/tester før og efter, så din enhed er klar med det samme.
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Gennemsigtige priser – ingen overraskelser
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Alle priser er inkl. moms, del, arbejde, test og garanti. Er du i tvivl om fejlen? Vælg diagnose først – vi tester og giver et klart svar og en fast pris, før vi går i gang. Bestiller du flere reparationer på samme enhed, giver vi pakkerabat.
            </p>
          </div>

          {brandData.slug === 'samsung' && (
            <>
              {/* Kvalitet & sikkerhed */}
              <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Kvalitet & sikkerhed
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Vi arbejder ESD-sikkert og gennemfører funktions- og kvalitetstest. Dine data bliver på enheden. Bemærk at IP-tæthed (IP67/IP68) ikke kan garanteres efter åbning – det gælder alle værksteder.
                </p>
              </div>

              {/* Dækker vi dit område? */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Dækker vi dit område?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Ja – København, Frederiksberg, Amager og Nordsjælland (hele Hovedstaden og omegn). Ring, hvis du er i tvivl – vi svarer typisk inden for 5 min.
                </p>
              </div>

              {/* CTA Note */}
              <div className="mt-8 bg-pink-50 border-l-4 border-pink-500 p-6 rounded-lg">
                <p className="text-center text-gray-800 font-medium">
                  Har du spørgsmål? Ring <a href="tel:+4593545457" className="text-pink-600 hover:text-pink-700 font-semibold">+45 93 54 54 57</a> – vi svarer typisk inden for 5 min.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${brandData.title} reparation – vælg kategori`,
            "description": `${brandData.title} reparation og service. ${brandData.subtitle}. Hurtig service, gennemsigtige priser og garanti.`,
            "url": `https://frontdoorfix.dk/reparationer/${brandData.slug}`,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": series.map((serie, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": serie.name,
                  "url": `https://frontdoorfix.dk/reparationer/${brand}/${serie.slug}`,
                  "description": serie.descriptionShort || `${serie.name} serie reparationer`,
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
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": brandData.title,
                  "item": `https://frontdoorfix.dk/reparationer/${brandData.slug}`,
                },
              ],
            },
          }),
        }}
      />
    </div>
  );
}