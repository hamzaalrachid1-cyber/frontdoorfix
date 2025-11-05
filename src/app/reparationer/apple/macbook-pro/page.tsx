import Link from "next/link";
import MacbookModelList from "@/components/MacbookModelList";
import fs from 'fs';
import path from 'path';

interface MacbookModel {
  id: string;
  model: string;
  slug: string;
  image: string;
  year: number;
  sort_order: number;
  isVisible: boolean;
}

async function getMacbookModels(): Promise<MacbookModel[]> {
  const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs', 'apple');
  const models: MacbookModel[] = [];

  try {
    const files = fs.readdirSync(MODELS_DIR).filter(f => f.endsWith('.json') && f.startsWith('macbook-'));
    
    for (const file of files) {
      const filePath = path.join(MODELS_DIR, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      if (data.isVisible !== false && data.series === 'macbook' && data.family === 'macbookpro') {
        models.push({
          id: data.slug,
          model: data.model,
          slug: data.slug,
          image: data.image || `/images/macbooks/${data.slug}.jpg`,
          year: data.year || 2020,
          sort_order: data.sort_order || 0,
          isVisible: data.isVisible !== false
        });
      }
    }

    // Sortér: Højere sort_order først
    models.sort((a, b) => {
      if (a.sort_order !== b.sort_order) return b.sort_order - a.sort_order;
      if (a.year !== b.year) return b.year - a.year;
      return a.model.localeCompare(b.model);
    });

    return models;
  } catch (error) {
    console.error('Error loading MacBook Pro models:', error);
    return [];
  }
}

export default async function MacbookProPage() {
  const macbookModels = await getMacbookModels();

  return (
    <div>
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-pink-50 via-yellow-50 to-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            MacBook Pro reparation
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            MacBook Pro reparation – skærm, batteri, tastatur & SSD
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Vi tilbyder reparation af alle MacBook Pro-modeller med professionel service og garanti.
          </p>
        </div>
      </section>

      {/* Search & Models */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Søg efter en model:
          </h2>
          <MacbookModelList models={macbookModels} />
        </div>
      </section>

      <section className="d-none">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {macbookModels.map((model) => (
                       <div 
                         key={model.id}
                         className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-pink-300 transition-all duration-300 relative"
                       >
                         <div className="phone-card">
                           <img
                    alt={`${model.model} – front, bagside og sideprofil`}
                             loading="lazy"
                    width={200}
                    height={200}
                             decoding="async"
                             className="phone-card__img"
                    src={model.image}
                           />
                         </div>
                         
                         <div className="p-6 text-center">
                           <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                    {model.model}
                           </h3>
                  <p className="text-sm text-gray-500 mb-4 font-medium">
                    {model.year}
                  </p>
                           
                           <Link 
                    href={`/reparationer/apple/${model.slug}`}
                             className="btn-gradient px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 mt-2"
                           >
                             <span>👉</span>
                    Se priser &amp; reparationer
                           </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MacBook Pro SEO Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">MacBook Pro Reparation i København</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Vi specialiserer os i MacBook Pro reparationer med originale dele og garanti. 
              Vi kommer direkte til din adresse i København og omegn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
