import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'samsung', 'a-series.json');

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return NextResponse.json({ error: 'Samsung A-series data not found' }, { status: 404 });
    }
    const fileContents = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    const models = JSON.parse(fileContents);
    return NextResponse.json(models);
  } catch (error) {
    console.error('Error fetching Samsung A-series data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
