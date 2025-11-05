import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs', 'samsung');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const filePath = path.join(MODELS_DIR, `${slug}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const modelData = JSON.parse(fileContents);

    return NextResponse.json(modelData);
  } catch (error) {
    const { slug } = await params;
    console.error(`Error reading model data for ${slug}:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
