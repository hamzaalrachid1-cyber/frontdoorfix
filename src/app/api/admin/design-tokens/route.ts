import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DESIGN_TOKENS_FILE = path.join(process.cwd(), 'src', 'data', 'design-tokens.json');

const defaultTokens = {
  colors: {
    primary: '#ec4899', // pink-500
    secondary: '#f59e0b', // amber-500
    gradientStart: '#ec4899', // pink-500
    gradientEnd: '#f59e0b', // amber-500
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  },
  typography: {
    fontScale: 1.0,
    headingScale: 1.2
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  radius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  }
};

// Helper to read design tokens
async function getDesignTokens() {
  if (!fs.existsSync(DESIGN_TOKENS_FILE)) {
    // Create file with default tokens if it doesn't exist
    await fs.promises.writeFile(DESIGN_TOKENS_FILE, JSON.stringify(defaultTokens, null, 2), 'utf8');
    return defaultTokens;
  }
  
  const fileContents = await fs.promises.readFile(DESIGN_TOKENS_FILE, 'utf8');
  try {
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error parsing design tokens:', error);
    return defaultTokens;
  }
}

// Helper to write design tokens
async function setDesignTokens(data: any) {
  await fs.promises.writeFile(DESIGN_TOKENS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET() {
  try {
    const tokens = await getDesignTokens();
    return NextResponse.json(tokens);
  } catch (error) {
    console.error('Error fetching design tokens:', error);
    return NextResponse.json({ error: 'Failed to fetch design tokens' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const tokens = await request.json();
    
    // Validate tokens structure
    if (!tokens.colors || !tokens.typography || !tokens.spacing || !tokens.radius || !tokens.shadows) {
      return NextResponse.json({ error: 'Invalid tokens structure' }, { status: 400 });
    }

    await setDesignTokens(tokens);
    
    // TODO: In a real application, you would also update the CSS variables
    // or trigger a rebuild of the design system
    
    return NextResponse.json({ success: true, tokens });
  } catch (error) {
    console.error('Error saving design tokens:', error);
    return NextResponse.json({ error: 'Failed to save design tokens' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const tokens = await request.json();
    await setDesignTokens(tokens);
    return NextResponse.json({ success: true, tokens });
  } catch (error) {
    console.error('Error updating design tokens:', error);
    return NextResponse.json({ error: 'Failed to update design tokens' }, { status: 500 });
  }
}