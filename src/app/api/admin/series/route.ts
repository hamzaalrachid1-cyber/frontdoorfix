import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SERIES_DIR = path.join(process.cwd(), 'src', 'data', 'series');

async function getAllSeries() {
  const series: any[] = [];

  if (!fs.existsSync(SERIES_DIR)) {
    return series;
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

          series.push({
            id: seriesData.id || file.replace('.json', ''),
            brandId: seriesData.brandId,
            name: seriesData.name,
            slug: seriesData.slug,
            descriptionShort: seriesData.descriptionShort || '',
            icon: seriesData.icon || '',
            image: seriesData.image || '',
            isActive: seriesData.isActive !== false,
            sortOrder: seriesData.sortOrder || 999
          });
        } catch (error) {
          console.error(`Error reading series file ${brand}/${file}:`, error);
        }
      }
    }
  }
  return series;
}

async function saveSeriesData(brandId: string, slug: string, data: any) {
  const brandDir = path.join(SERIES_DIR, brandId);
  if (!fs.existsSync(brandDir)) {
    fs.mkdirSync(brandDir, { recursive: true });
  }

  const filePath = path.join(brandDir, `${slug}.json`);
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get('brandId');

    let series = await getAllSeries();

    if (brandId) {
      series = series.filter(s => s.brandId === brandId);
    }

    return NextResponse.json(series);
  } catch (error) {
    console.error('Error fetching series:', error);
    return NextResponse.json({ error: 'Failed to fetch series' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.brandId || !data.name || !data.slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const seriesData = {
      id: `${data.brandId}-${data.slug}`,
      brandId: data.brandId,
      name: data.name,
      slug: data.slug,
      descriptionShort: data.descriptionShort || '',
      icon: data.icon || '',
      image: data.image || '',
      isActive: data.isActive !== false,
      sortOrder: data.sortOrder || 999
    };

    await saveSeriesData(data.brandId, data.slug, seriesData);

    return NextResponse.json({ success: true, series: seriesData });
  } catch (error) {
    console.error('Error creating series:', error);
    return NextResponse.json({ error: 'Failed to create series' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get('brandId');
    const slug = searchParams.get('slug');

    if (!brandId || !slug) {
      return NextResponse.json({ error: 'Missing brandId or slug' }, { status: 400 });
    }

    const filePath = path.join(SERIES_DIR, brandId, `${slug}.json`);
    
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Serie not found' }, { status: 404 });
  } catch (error) {
    console.error('Error deleting series:', error);
    return NextResponse.json({ error: 'Failed to delete series' }, { status: 500 });
  }
}
