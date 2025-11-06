import Link from "next/link";
import Image from "next/image";

// ModelCard component with fallback and stable layout
function ModelCard({ model }: { model: { id: string; name: string; image: string; year: string } }) {
  const FALLBACK_IMAGE = "/images/macbooks/placeholder.svg";
  const isNew = model.year === "2024" || model.year === "2023";
  const imageUrl = model.image && model.image !== '' ? model.image : FALLBACK_IMAGE;
  
  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-pink-300 transition-all duration-300 relative min-h-[380px] flex flex-col">
      {/* Badges */}
      {isNew && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Ny
          </span>
        </div>
      )}
      
      {/* MacBook Air Image */}
      <div className="phone-card relative" style={{ minHeight: '200px' }}>
        <Image
          src={imageUrl}
          alt={`${model.name} – reparation og service`}
          width={200}
          height={200}
          loading="lazy"
          decoding="async"
          className="phone-card__img"
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Content */}
      <div className="p-6 text-center flex flex-col flex-1">
        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-pink-600 transition-colors min-h-[56px] flex items-center justify-center">
          {model.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 font-medium">
          {model.year && model.year !== '2025' ? model.year : ''}
        </p>
        
        <Link 
          href={`/reparationer/apple/${model.id}`}
          className="btn-gradient px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 mt-auto"
        >
          <span>👉</span>
          Se priser & reparationer
        </Link>
      </div>
    </div>
  );
}

// Fetch MacBook Air models from filesystem
async function getIPadModels() {
  try {
    const fs = require('fs');
    const path = require('path');
    const modelsDir = path.join(process.cwd(), 'src', 'data', 'repairs', 'apple');
    
    if (!fs.existsSync(modelsDir)) {
      return [];
    }
    
    const files = fs.readdirSync(modelsDir).filter((f: string) => f.endsWith('.json'));
    const models = files.map((file: string) => {
      try {
        const filePath = path.join(modelsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
      } catch {
        return null;
      }
    }).filter((m: { series?: string; isVisible?: boolean } | null): m is { series: string; isVisible?: boolean; [key: string]: unknown } => 
      m !== null && m.series === 'macbook' && m.isVisible !== false
    );
    
    // Sort by sortOrder DESC
    return models.sort((a: { sortOrder?: number; [key: string]: unknown }, b: { sortOrder?: number; [key: string]: unknown }) => (b.sortOrder || 0) - (a.sortOrder || 0));
  } catch (error) {
    console.error('Error fetching MacBook Air models:', error);
    return [];
  }
}

export default async function IPadPage() {
  const allModels = await getIPadModels();
  
  // Group models by family
  const proModels = allModels.filter((m: any) => m.family === 'macbookair');
  const airModels = allModels.filter((m: any) => m.family === 'macbookair');
  const miniModels = allModels.filter((m: any) => m.family === 'macbookmini');
  const standardModels = allModels.filter((m: any) => m.family === 'macbook');
  
  // Combine all for the main grid (can be filtered later)
  const macbookModels = allModels.map((m: any) => ({
    id: m.slug,
    name: m.model,
    image: m.image || '/images/placeholder-macbook.jpg',
    year: m.year?.toString() || '2023',
    family: m.family
  }));

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <nav className="bg-gray-100 py-3 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-pink-600">Forside</Link>
            <span>→</span>
            <Link href="/reparationer" className="hover:text-pink-600">Reparationer</Link>
            <span>→</span>
            <span className="text-gray-800 font-medium">MacBook Air</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-yellow-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                MacBook Air Reparationer
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vi reparerer alle MacBook Air-modeller med originale dele og 24 måneders garanti. 
              Hurtig service direkte på din adresse.
            </p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-8 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 mb-6">
              Vi reparerer alle MacBook Air-modeller med originale eller kvalitetsgodkendte dele og op til 24 måneders garanti. 
              Vi kommer direkte til din adresse—hurtigt, sikkert og professionelt.
            </p>
          </div>
        </div>
      </section>

      {/* MacBook Air Pro 12,9" Section */}
      {proModels.filter((m: any) => m.model?.includes('12')).length > 0 && (
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">
              MacBook Air Pro 12,9″
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {proModels
                .filter((m: any) => m.model?.includes('12'))
                .map((model: any) => (
                  <ModelCard key={model.slug} model={{
                    id: model.slug,
                    name: model.model,
                    image: model.image,
                    year: model.year?.toString()
                  }} />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* MacBook Air Pro 11" Section */}
      {proModels.filter((m: any) => m.model?.includes('11')).length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">
              MacBook Air Pro 11″
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {proModels
                .filter((m: any) => m.model?.includes('11'))
                .map((model: any) => (
                  <ModelCard key={model.slug} model={{
                    id: model.slug,
                    name: model.model,
                    image: model.image,
                    year: model.year?.toString()
                  }} />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* MacBook Air Air Section */}
      {airModels.length > 0 && (
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">
              MacBook Air Air
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {airModels.map((model: any) => (
                <ModelCard key={model.slug} model={{
                  id: model.slug,
                  name: model.model,
                  image: model.image,
                  year: model.year?.toString()
                }} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MacBook Air mini Section */}
      {miniModels.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">
              MacBook Air mini
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {miniModels.map((model: any) => (
                <ModelCard key={model.slug} model={{
                  id: model.slug,
                  name: model.model,
                  image: model.image,
                  year: model.year?.toString()
                }} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Standard MacBook Air Section */}
      {standardModels.length > 0 && (
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">
              MacBook Air
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {standardModels.map((model: any) => (
                <ModelCard key={model.slug} model={{
                  id: model.slug,
                  name: model.model,
                  image: model.image,
                  year: model.year?.toString()
                }} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Hvorfor vælge os
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Reparation på din adresse</h3>
              <p className="text-gray-600 text-sm">Ingen ventetid - vi kommer til dig</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">24 mdr. garanti</h3>
              <p className="text-gray-600 text-sm">Skærme / 12 mdr. på batterier</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Originale dele</h3>
              <p className="text-gray-600 text-sm">Kvalitetsgodkendte reservedele</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">2.000+ reparationer</h3>
              <p className="text-gray-600 text-sm">5⭐ kundeanmeldelser</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Populære MacBook Air reparationer
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Skærmreparation</h3>
              <p className="text-gray-600">Udskiftning af ødelagte skærme på alle MacBook Air-modeller med 24 måneders garanti.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl text-center shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                  <path d="M15.67 4H14V2c0-.55-.45-1-1-1s-1 .45-1 1v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Batteriskift</h3>
              <p className="text-gray-600">Få nyt liv i din MacBook Air med et friskt batteri og 12 måneders garanti.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl text-center shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-purple-600">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">USB-C reparation</h3>
              <p className="text-gray-600">Reparation af opladningsproblemer på alle MacBook Air-modeller.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Ofte stillede spørgsmål
          </h2>
            <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Hvor lang tid tager en MacBook Air-reparation?
              </h3>
              <p className="text-gray-600">
                De fleste reparationer er færdige på 20–30 min. på stedet. Skærmreparationer tager typisk 20-30 minutter, mens batteriskift tager 15-20 minutter.
              </p>
                </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Mister jeg data ved reparationen?
              </h3>
              <p className="text-gray-600">
                Nej, ved standardreparationer bevarer vi alt. Vi anbefaler dog backup før reparationen, da det er den sikreste måde at beskytte dine data på.
                  </p>
                </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Hvilke dele bruger I?
              </h3>
              <p className="text-gray-600">
                Originale eller kvalitetsgodkendte A-kvalitetsdele med garanti. Vi bruger kun dele af højeste kvalitet, der lever op til Apple's standarder.
              </p>
              </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Giver I garanti på reparationer?
              </h3>
              <p className="text-gray-600">
                24 mdr. garanti på skærme, 12 mdr. på batterier og øvrige reservedele. Alle vores reparationer kommer med fuld garanti.
              </p>
                </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Hvor dækker I?
              </h3>
              <p className="text-gray-600">
                Vi kommer til din adresse i hele København og omegn. Skriv eller ring, hvis du er i tvivl om vi dækker dit område.
                  </p>
                </div>
              </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Hvad siger vores kunder
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Fantastisk service! Min MacBook Air Pro blev repareret på under 30 minutter direkte på min arbejdsplads. Kan varmt anbefales!"
              </p>
              <p className="text-sm text-gray-500">- Sarah M.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Professionel og hurtig service. Min skærm blev udskiftet med original kvalitet og jeg fik 24 måneders garanti. Perfekt!"
              </p>
              <p className="text-sm text-gray-500">- Michael K.</p>
                </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Bedste tablet reparation i København! De kom til mig og reparerede min MacBook Air på stedet. Meget tilfreds med resultatet."
              </p>
              <p className="text-sm text-gray-500">- Anna L.</p>
                </div>
                </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-800">5.0 på Google & Trustpilot</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-yellow-500">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Har du ikke fundet din model?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Ring til os på +45 93 54 54 57 eller send en besked
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+4593545457"
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              📞 Ring nu
            </a>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-colors">
              Send besked
            </button>
          </div>
        </div>
      </section>

      {/* MacBook Air Repairs SEO Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">MacBook Air Reparation i København</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Vi specialiserer os i MacBook Air reparationer med originale dele og 24 måneders garanti. 
              Vi kommer direkte til din adresse i København og omegn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}