import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const SERIES_DIR = path.join(process.cwd(), 'src', 'data', 'series');

async function getSeriesData(brand: string, series: string) {
  try {
    const filePath = path.join(SERIES_DIR, brand, `${series}.json`);
    if (!fs.existsSync(filePath)) return null;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data;
  } catch (error) {
    console.error(`Error loading series ${brand}/${series}:`, error);
    return null;
  }
}

async function getModelsForSeries(brand: string, series: string) {
  try {
    const modelsDir = path.join(process.cwd(), 'src', 'data', 'repairs', brand);
    if (!fs.existsSync(modelsDir)) return [];
    
    const files = fs.readdirSync(modelsDir).filter(f => f.endsWith('.json'));
    const models = files.map(file => {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(modelsDir, file), 'utf8'));
        if (data.series === series && data.isVisible !== false) {
          return data;
        }
      } catch {
        return null;
      }
      return null;
    }).filter(m => m !== null);
    
    return models.sort((a: any, b: any) => (b.sortOrder || 0) - (a.sortOrder || 0));
  } catch (error) {
    console.error(`Error loading models for ${brand}/${series}:`, error);
    return [];
  }
}

export async function generateStaticParams() {
  const params: Array<{ brand: string; series: string }> = [];
  
  try {
    const brands = fs.readdirSync(SERIES_DIR).filter(f => {
      const stat = fs.statSync(path.join(SERIES_DIR, f));
      return stat.isDirectory();
    });
    
    for (const brand of brands) {
      const brandPath = path.join(SERIES_DIR, brand);
      if (fs.statSync(brandPath).isDirectory()) {
        const files = fs.readdirSync(brandPath).filter(file => file.endsWith('.json'));
        
        for (const file of files) {
          try {
            const filePath = path.join(brandPath, file);
            const seriesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            
            if (seriesData.isActive !== false) {
              params.push({
                brand: brand,
                series: seriesData.slug
              });
            }
          } catch (error) {
            console.error(`Error reading series file ${brand}/${file}:`, error);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error generating static params:', error);
  }
  
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string; series: string }> }): Promise<Metadata> {
  const { brand, series } = await params;
  const seriesData = await getSeriesData(brand, series);
  
  if (!seriesData) {
    return {
      title: 'Serie ikke fundet - FrontDoorFix',
      description: 'Den ønskede serie kunne ikke findes.'
    };
  }
  
  const brandNames: Record<string, string> = {
    'apple': 'Apple',
    'samsung': 'Samsung',
    'huawei': 'Huawei',
    'motorola': 'Motorola',
    'oneplus': 'OnePlus'
  };
  
  const brandName = brandNames[brand] || brand;
  
  return {
    title: `${seriesData.name} Reparationer | ${brandName} - FrontDoorFix`,
    description: seriesData.descriptionShort || `${seriesData.name} serie reparationer hos FrontDoorFix. Vi kommer til dig med professionel service.`,
    keywords: `${seriesData.name}, ${brandName}, reparationer, skærm, batteri, opladning`,
    openGraph: {
      title: `${seriesData.name} Reparationer | ${brandName}`,
      description: seriesData.descriptionShort || `${seriesData.name} serie reparationer hos FrontDoorFix.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${seriesData.name} Reparationer | ${brandName}`,
      description: seriesData.descriptionShort || `${seriesData.name} serie reparationer hos FrontDoorFix.`,
    }
  };
}

export default async function SeriesPage({ params }: { params: Promise<{ brand: string; series: string }> }) {
  const { brand, series } = await params;
  const seriesData = await getSeriesData(brand, series);
  
  if (!seriesData) {
    notFound();
  }
  
  const models = await getModelsForSeries(brand, series);
  
  const brandNames: Record<string, string> = {
    'apple': 'Apple',
    'samsung': 'Samsung',
    'huawei': 'Huawei',
    'motorola': 'Motorola',
    'oneplus': 'OnePlus'
  };
  
  const brandName = brandNames[brand] || brand;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-50 to-yellow-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {seriesData.name} Reparationer
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {seriesData.descriptionShort || `Professionel reparation af ${seriesData.name} enheder. Vi kommer til dig med hurtig og pålidelig service.`}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                {brandName}
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {seriesData.name}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {models.length} modeller
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Models Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Vælg din {seriesData.name} model
          </h2>
          
          {models.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                Ingen modeller tilgængelige for denne serie endnu.
              </div>
              <div className="text-gray-400 text-sm mt-2">
                Kommer snart...
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {models.map((model: any) => (
                <div key={model.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        {model.image ? (
                          <img 
                            src={`${model.image}?t=${Date.now()}`}
                            alt={model.model}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <div className="text-gray-400 text-2xl">📱</div>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                      {model.model}
                    </h3>
                    
                    {model.year && (
                      <p className="text-sm text-gray-500 text-center mb-4">
                        {model.year}
                      </p>
                    )}
                    
                    <Link
                      href={`/reparationer/${brand}/${model.slug}`}
                      className="block w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-center py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      Se priser & reparationer
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
