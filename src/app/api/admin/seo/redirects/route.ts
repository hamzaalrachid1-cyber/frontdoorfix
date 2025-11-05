import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const REDIRECTS_FILE = path.join(process.cwd(), 'src', 'data', 'redirects.json');

// Helper to read redirects
async function getRedirects() {
  if (!fs.existsSync(REDIRECTS_FILE)) {
    await fs.promises.writeFile(REDIRECTS_FILE, JSON.stringify([], null, 2), 'utf8');
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

export async function GET() {
  try {
    const redirects = await getRedirects();
    return NextResponse.json(redirects);
  } catch (error) {
    console.error('Error fetching redirects:', error);
    return NextResponse.json({ error: 'Failed to fetch redirects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newRedirect = await request.json();
    
    // Validate redirect data
    if (!newRedirect.from || !newRedirect.to || !newRedirect.status) {
      return NextResponse.json({ error: 'Missing required redirect fields' }, { status: 400 });
    }

    // Check for duplicate from URLs
    const redirects = await getRedirects();
    if (redirects.some((r: any) => r.from === newRedirect.from)) {
      return NextResponse.json({ error: 'Redirect from this URL already exists' }, { status: 400 });
    }

    const redirect = {
      id: `redirect_${Date.now()}`,
      from: newRedirect.from,
      to: newRedirect.to,
      status: parseInt(newRedirect.status),
      createdAt: new Date().toISOString()
    };

    redirects.push(redirect);
    await setRedirects(redirects);

    return NextResponse.json({ success: true, redirect });
  } catch (error) {
    console.error('Error creating redirect:', error);
    return NextResponse.json({ error: 'Failed to create redirect' }, { status: 500 });
  }
}

