import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SERIES_DIR = path.join(process.cwd(), 'src', 'data', 'series');

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    if (!data.brandId || !data.slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const filePath = path.join(SERIES_DIR, data.brandId, `${data.slug}.json`);
    
    const seriesData = {
      id: data.id || id,
      brandId: data.brandId,
      name: data.name,
      slug: data.slug,
      descriptionShort: data.descriptionShort || '',
      icon: data.icon || '',
      image: data.image || '',
      isActive: data.isActive !== false,
      sortOrder: data.sortOrder || 999
    };

    await fs.promises.writeFile(filePath, JSON.stringify(seriesData, null, 2), 'utf8');

    return NextResponse.json({ success: true, series: seriesData });
  } catch (error) {
    console.error('Error updating series:', error);
    return NextResponse.json({ error: 'Failed to update series' }, { status: 500 });
  }
}


