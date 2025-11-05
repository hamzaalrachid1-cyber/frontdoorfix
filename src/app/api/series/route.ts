import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SERIES_DIR = path.join(process.cwd(), 'src', 'data', 'series');

// Helper to read all active series
async function getAllActiveSeries() {
  const series: any[] = [];
  
  if (!fs.existsSync(SERIES_DIR)) {
    return series;
  }

  // Read brand directories
  const brands = fs.readdirSync(SERIES_DIR);
  
  for (const brand of brands) {
    const brandPath = path.join(SERIES_DIR, brand);
    if (fs.statSync(brandPath).isDirectory()) {
      const files = fs.readdirSync(brandPath).filter(file => file.endsWith('.json'));
      
      for (const file of files) {
        try {
          const filePath = path.join(brandPath, file);
          const seriesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          
          // Only include active series
          if (seriesData.isActive !== false) {
            series.push({
              id: seriesData.id || file.replace('.json', ''),
              brandId: seriesData.brandId,
              name: seriesData.name,
              slug: seriesData.slug,
              descriptionShort: seriesData.descriptionShort || '',
              icon: seriesData.icon || '',
              sortOrder: seriesData.sortOrder || 999
            });
          }
        } catch (error) {
          console.error(`Error reading series file ${brand}/${file}:`, error);
        }
      }
    }
  }
  
  return series;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get('brandId');
    
    let series = await getAllActiveSeries();
    
    // Filter by brand if specified
    if (brandId) {
      series = series.filter(s => s.brandId === brandId);
    }
    
    // Sort by sortOrder, then by name
    series.sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      return a.name.localeCompare(b.name);
    });
    
    // Disable caching to ensure live updates
    return NextResponse.json(series, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching active series:', error);
    return NextResponse.json({ error: 'Failed to fetch series' }, { status: 500 });
  }
}

