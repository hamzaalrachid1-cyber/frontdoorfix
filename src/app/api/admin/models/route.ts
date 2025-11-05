import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs');

// Helper to read all models
async function getAllModels() {
  const models: any[] = [];
  
  if (!fs.existsSync(MODELS_DIR)) {
    return models;
  }

  const brands = fs.readdirSync(MODELS_DIR);
  
  for (const brand of brands) {
    const brandPath = path.join(MODELS_DIR, brand);
    if (fs.statSync(brandPath).isDirectory()) {
      const modelFiles = fs.readdirSync(brandPath).filter(file => file.endsWith('.json'));
      
      for (const modelFile of modelFiles) {
        try {
          const modelPath = path.join(brandPath, modelFile);
          const modelData = JSON.parse(fs.readFileSync(modelPath, 'utf8'));
          
          models.push({
            id: modelData.slug || modelFile.replace('.json', ''),
            brand: brand,
            series: modelData.series || 's',
            family: modelData.family || '',
            model: modelData.model || modelData.slug || modelFile.replace('.json', ''),
            slug: modelData.slug || modelFile.replace('.json', ''),
            year: modelData.year || new Date().getFullYear(),
            sortOrder: modelData.sort_order || modelData.order || 0,
            isVisible: modelData.isVisible !== false,
            comingSoon: modelData.comingSoon || false,
            image: modelData.image || `/images/${brand}/${modelData.slug || modelFile.replace('.json', '')}.jpg`,
            hero: modelData.hero || { title: modelData.model || modelData.slug, tags: [] },
            repairs: modelData.repairs || []
          });
        } catch (error) {
          console.error(`Error reading model file ${brand}/${modelFile}:`, error);
        }
      }
    }
  }
  
  return models;
}

async function saveModelData(brand: string, slug: string, data: any) {
  const brandDir = path.join(MODELS_DIR, brand);
  if (!fs.existsSync(brandDir)) {
    fs.mkdirSync(brandDir, { recursive: true });
  }
  
  const modelPath = path.join(brandDir, `${slug}.json`);
  await fs.promises.writeFile(modelPath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get('brand');
    const series = searchParams.get('series');
    const search = searchParams.get('search');
    
    let models = await getAllModels();
    
    if (brand) {
      models = models.filter(m => m.brand === brand);
    }
    
    if (series) {
      models = models.filter(m => m.series === series);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      models = models.filter(m => 
        m.model.toLowerCase().includes(searchLower) ||
        m.slug.toLowerCase().includes(searchLower)
      );
    }
    
    models.sort((a, b) => {
      // Sortér efter sort_order DESC (højere tal først)
      if (a.sortOrder !== b.sortOrder) return b.sortOrder - a.sortOrder;
      // Hvis samme sort_order, nyeste år først
      if (a.year !== b.year) return b.year - a.year;
      // Hvis samme år, alfabetisk
      return a.model.localeCompare(b.model);
    });
    
    // Disable caching to ensure live updates
    return NextResponse.json(models, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.brand || !data.model || !data.slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const modelData = {
      brand: data.brand,
      series: data.series || 's',
      model: data.model,
      slug: data.slug,
      year: data.year || new Date().getFullYear(),
      sort_order: data.sortOrder || data.sort_order || 100,
      isVisible: data.isVisible !== false,
      comingSoon: data.comingSoon || false,
      image: data.image || `/images/${data.brand}/${data.slug}.jpg`,
      hero: data.hero || { title: data.model, tags: [] },
      repairs: data.repairs || []
    };

    await saveModelData(data.brand, data.slug, modelData);
    
    return NextResponse.json({ success: true, model: modelData });
  } catch (error) {
    console.error('Error creating model:', error);
    return NextResponse.json({ error: 'Failed to create model' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.brand || !data.slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const modelData = {
      brand: data.brand,
      series: data.series || 's',
      model: data.model,
      slug: data.slug,
      year: data.year,
      sort_order: data.sortOrder || data.sort_order || 100,
      isVisible: data.isVisible,
      comingSoon: data.comingSoon,
      image: data.image,
      hero: data.hero,
      repairs: data.repairs || []
    };

    await saveModelData(data.brand, data.slug, modelData);
    
    return NextResponse.json({ success: true, model: modelData });
  } catch (error) {
    console.error('Error updating model:', error);
    return NextResponse.json({ error: 'Failed to update model' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.brand || !data.slug) {
      return NextResponse.json({ error: 'Missing brand or slug' }, { status: 400 });
    }

    const modelPath = path.join(MODELS_DIR, data.brand, `${data.slug}.json`);
    
    if (!fs.existsSync(modelPath)) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }

    // Read existing model data
    const existingData = JSON.parse(fs.readFileSync(modelPath, 'utf8'));

    // Only update sortOrder if provided
    if (data.sortOrder !== undefined) {
      const sortOrder = parseInt(data.sortOrder, 10);
      
      if (isNaN(sortOrder)) {
        return NextResponse.json({ error: 'sortOrder must be a number' }, { status: 400 });
      }

      existingData.sort_order = sortOrder;
      existingData.updated_at = new Date().toISOString();

      await fs.promises.writeFile(modelPath, JSON.stringify(existingData, null, 2), 'utf8');

      // Revalidate cache for brand/series pages
      try {
        const { revalidatePath } = await import('next/cache');
        revalidatePath(`/reparationer/${data.brand}/${existingData.series || 'ipad'}`);
        revalidatePath(`/reparationer/${data.brand}`);
      } catch (revalidateError) {
        console.error('Cache revalidation error:', revalidateError);
      }

      return NextResponse.json({ 
        success: true, 
        sortOrder: sortOrder,
        message: 'Sort order updated successfully'
      });
    }

    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  } catch (error) {
    console.error('Error patching model:', error);
    return NextResponse.json({ error: 'Failed to update model' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get('brand');
    const slug = searchParams.get('slug');

    if (!brand || !slug) {
      return NextResponse.json({ error: 'Missing brand or slug' }, { status: 400 });
    }

    const modelPath = path.join(MODELS_DIR, brand, `${slug}.json`);
    
    if (fs.existsSync(modelPath)) {
      await fs.promises.unlink(modelPath);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Model not found' }, { status: 404 });
  } catch (error) {
    console.error('Error deleting model:', error);
    return NextResponse.json({ error: 'Failed to delete model' }, { status: 500 });
  }
}

