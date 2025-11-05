import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

const SERIES_DIR = path.join(process.cwd(), 'src', 'data', 'series');
const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs');

interface Series {
  id: string;
  brandId: string;
  name: string;
  slug: string;
  descriptionShort: string;
  icon: string;
  sortOrder: number;
}

interface Model {
  id: string;
  brand: string;
  series: string;
  model: string;
  slug: string;
  year: number;
  order: number;
  isVisible: boolean;
  comingSoon: boolean;
  image?: string;
  hero: {
    title: string;
    tags: string[];
  };
  repairs: Array<{
    id: string;
    type: string;
    quality: string;
    price: number;
    duration: string;
    warranty: string;
    description: string;
    isVisible: boolean;
  }>;
}

// Helper to get series data
async function getSeriesData(brandId: string, seriesSlug: string): Promise<Series | null> {
  try {
    const seriesPath = path.join(SERIES_DIR, brandId, `${seriesSlug}.json`);
    
    if (!fs.existsSync(seriesPath)) {
      return null;
    }
    
    const seriesData = JSON.parse(fs.readFileSync(seriesPath, 'utf8'));
    
    if (seriesData.isActive === false) {
      return null;
    }
    
    return {
      id: seriesData.id,
      brandId: seriesData.brandId,
      name: seriesData.name,
      slug: seriesData.slug,
      descriptionShort: seriesData.descriptionShort,
      icon: seriesData.icon,
      sortOrder: seriesData.sortOrder
    };
  } catch (error) {
    console.error('Error reading series data:', error);
    return null;
  }
}

// Helper to get models for series
async function getModelsForSeries(brandId: string, seriesSlug: string): Promise<Model[]> {
  const models: Model[] = [];
  
  try {
    const brandDir = path.join(MODELS_DIR, brandId);
    
    if (!fs.existsSync(brandDir)) {
      return models;
    }
    
    const files = fs.readdirSync(brandDir).filter(file => file.endsWith('.json'));
    
    for (const file of files) {
      try {
        const filePath = path.join(brandDir, file);
        const modelData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Only include models from this series that are visible
        if (modelData.series === seriesSlug && modelData.isVisible !== false) {
          models.push({
            id: modelData.slug || file.replace('.json', ''),
            brand: modelData.brand,
            series: modelData.series,
            model: modelData.model,
            slug: modelData.slug,
            year: modelData.year,
            order: modelData.order,
            isVisible: modelData.isVisible !== false,
            comingSoon: modelData.comingSoon || false,
            image: modelData.image,
            hero: modelData.hero || { title: modelData.model, tags: [] },
            repairs: modelData.repairs || []
          });
        }
      } catch (error) {
        console.error(`Error reading model file ${file}:`, error);
      }
    }
    
    // Sort by order, then by year (descending)
    models.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return b.year - a.year;
    });
    
  } catch (error) {
    console.error('Error reading models:', error);
  }
  
  return models;
}

// Generate static params for all active series
export async function generateStaticParams() {
  const params: { brand: string; series: string }[] = [];
  
  try {
    if (!fs.existsSync(SERIES_DIR)) {
      return params;
    }
    
    const brands = fs.readdirSync(SERIES_DIR);
    
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

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ brand: string; series: string }> }): Promise<Metadata> {
  const { brand, series } = await params;
  const seriesData = await getSeriesData(brand, series);
  
  if (!series) {
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
  
  const brandName = brandNames[params.brand] || params.brand;
  
  return {
    title: `${series.name} Reparationer | ${brandName} - FrontDoorFix`,
    description: series.descriptionShort || `${series.name} serie reparationer hos FrontDoorFix. Vi kommer til dig med professionel service.`,
    keywords: `${series.name}, ${brandName}, reparationer, skærm, batteri, opladning`,
    openGraph: {
      title: `${series.name} Reparationer | ${brandName}`,
      description: series.descriptionShort || `${series.name} serie reparationer hos FrontDoorFix.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${series.name} Reparationer | ${brandName}`,
      description: series.descriptionShort || `${series.name} serie reparationer hos FrontDoorFix.`,
    }
  };
}

export default async function SeriesPage({ params }: { params: Promise<{ brand: string; series: string }> }) {
  const { brand, series } = await params;
  const seriesData = await getSeriesData(brand, series);
  
  if (!series) {
    notFound();
  }
  
  const models = await getModelsForSeries(params.brand, params.series);
  
  const brandNames: Record<string, string> = {
    'apple': 'Apple',
    'samsung': 'Samsung',
    'huawei': 'Huawei',
    'motorola': 'Motorola',
    'oneplus': 'OnePlus'
  };
  
  const brandName = brandNames[params.brand] || params.brand;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-50 to-yellow-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {series.name} Reparationer
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {series.descriptionShort || `Professionel reparation af ${series.name} enheder. Vi kommer til dig med hurtig og pålidelig service.`}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                {brandName}
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {series.name}
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
            Vælg din {series.name} model
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
              {models.map((model) => (
                <div key={model.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        {model.image ? (
                          <img 
                            src={model.image} 
                            alt={model.model}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-gray-400 text-2xl">📱</div>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {model.model}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">
                        {model.year}
                      </span>
                      {model.comingSoon && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                          Kommer snart
                        </span>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <a
                        href={`/reparationer/${params.brand}/${params.series}/${model.slug}`}
                        className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-2 rounded-lg hover:from-pink-600 hover:to-yellow-600 transition-all duration-300 inline-block"
                      >
                        Se priser & reparationer
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Kan ikke finde din model?
          </h3>
          <p className="text-gray-600 mb-6">
            Kontakt os, så finder vi en løsning til din {brandName} {series.name} enhed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+4512345678"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Ring til os
            </a>
            <a
              href="/kontakt"
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Send besked
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

