import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BRANDS_FILE = path.join(process.cwd(), 'src', 'data', 'brands.json');

export async function GET() {
  try {
    if (!fs.existsSync(BRANDS_FILE)) {
      // Return default brands if file doesn't exist
      const defaultBrands = [
        { id: 'apple', name: 'Apple', slug: 'apple', icon: '🍎', order: 1 },
        { id: 'samsung', name: 'Samsung', slug: 'samsung', icon: '📱', order: 2 },
        { id: 'huawei', name: 'Huawei', slug: 'huawei', icon: '🌸', order: 3 },
        { id: 'motorola', name: 'Motorola', slug: 'motorola', icon: 'M', order: 4 },
        { id: 'oneplus', name: 'OnePlus', slug: 'oneplus', icon: '1+', order: 5 },
        { id: 'google', name: 'Google Pixel', slug: 'google', icon: 'G', order: 6 },
        { id: 'playstation', name: 'PlayStation', slug: 'playstation', icon: '🎮', order: 7 },
        { id: 'computer', name: 'Computer', slug: 'computer', icon: '💻', order: 8 }
      ];
      return NextResponse.json(defaultBrands);
    }

    const fileContents = fs.readFileSync(BRANDS_FILE, 'utf8');
    const brands = JSON.parse(fileContents);
    
    // Disable caching to ensure live updates
    return NextResponse.json(brands, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error reading brands:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const brandData = await request.json();
    
    let brands = [];
    if (fs.existsSync(BRANDS_FILE)) {
      const fileContents = fs.readFileSync(BRANDS_FILE, 'utf8');
      brands = JSON.parse(fileContents);
    }
    
    // Add new brand
    brands.push({
      id: brandData.id,
      name: brandData.name,
      slug: brandData.slug,
      icon: brandData.icon || '📱',
      order: brands.length + 1,
      ...brandData
    });
    
    fs.writeFileSync(BRANDS_FILE, JSON.stringify(brands, null, 2));
    
    // Revalidate Next.js cache
    try {
      const { revalidatePath } = await import('next/cache');
      revalidatePath('/reparationer');
      revalidatePath('/api/series');
    } catch (error) {
      console.error('Cache revalidation error:', error);
    }
    
    return NextResponse.json({ success: true, brand: brands[brands.length - 1] });
  } catch (error) {
    console.error('Error creating brand:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const brandData = await request.json();
    
    if (!fs.existsSync(BRANDS_FILE)) {
      return NextResponse.json({ error: 'Brands file not found' }, { status: 404 });
    }
    
    const fileContents = fs.readFileSync(BRANDS_FILE, 'utf8');
    const brands = JSON.parse(fileContents);
    
    const brandIndex = brands.findIndex((brand: any) => brand.id === brandData.id);
    if (brandIndex === -1) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }
    
    brands[brandIndex] = { ...brands[brandIndex], ...brandData };
    
    fs.writeFileSync(BRANDS_FILE, JSON.stringify(brands, null, 2));
    
    // Revalidate Next.js cache
    try {
      const { revalidatePath } = await import('next/cache');
      revalidatePath('/reparationer');
      revalidatePath(`/reparationer/${brandData.slug || brandData.id}`);
      revalidatePath('/api/series');
    } catch (error) {
      console.error('Cache revalidation error:', error);
    }
    
    return NextResponse.json({ success: true, brand: brands[brandIndex] });
  } catch (error) {
    console.error('Error updating brand:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Brand ID is required' }, { status: 400 });
    }
    
    if (!fs.existsSync(BRANDS_FILE)) {
      return NextResponse.json({ error: 'Brands file not found' }, { status: 404 });
    }
    
    const fileContents = fs.readFileSync(BRANDS_FILE, 'utf8');
    const brands = JSON.parse(fileContents);
    
    const filteredBrands = brands.filter((brand: any) => brand.id !== id);
    
    if (filteredBrands.length === brands.length) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }
    
    fs.writeFileSync(BRANDS_FILE, JSON.stringify(filteredBrands, null, 2));
    
    // Revalidate Next.js cache
    try {
      const { revalidatePath } = await import('next/cache');
      revalidatePath('/reparationer');
      revalidatePath('/api/series');
    } catch (error) {
      console.error('Cache revalidation error:', error);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting brand:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

