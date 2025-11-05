import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const REDIRECTS_FILE = path.join(process.cwd(), 'src', 'data', 'redirects.json');

// Helper to read redirects
async function getRedirects() {
  if (!fs.existsSync(REDIRECTS_FILE)) {
    return [];
  }
  
  const fileContents = await fs.promises.readFile(REDIRECTS_FILE, 'utf8');
  try {
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error parsing redirects:', error);
    return [];
  }
}

// Helper to write redirects
async function setRedirects(data: any[]) {
  await fs.promises.writeFile(REDIRECTS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const redirectId = params.id;
    
    const redirects = await getRedirects();
    const initialLength = redirects.length;
    
    const filteredRedirects = redirects.filter((redirect: any) => redirect.id !== redirectId);
    
    if (filteredRedirects.length === initialLength) {
      return NextResponse.json({ error: 'Redirect not found' }, { status: 404 });
    }

    await setRedirects(filteredRedirects);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting redirect:', error);
    return NextResponse.json({ error: 'Failed to delete redirect' }, { status: 500 });
  }
}

