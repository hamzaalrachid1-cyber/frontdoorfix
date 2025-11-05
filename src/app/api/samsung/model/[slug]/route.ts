import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs', 'samsung');

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const filePath = path.join(MODELS_DIR, `${slug}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const modelData = JSON.parse(fileContents);

    return NextResponse.json(modelData);
  } catch (error) {
    console.error(`Error reading model data for ${params.slug}:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
