import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const NAVIGATION_FILE = path.join(process.cwd(), 'src', 'data', 'navigation.json');

const defaultNavigation = {
  mainMenu: [
    {
      id: 'reparationer',
      label: 'Reparation & Priser',
      href: '/reparationer',
      isExternal: false,
      order: 1,
      isVisible: true,
      children: [
        { id: 'iphone', label: 'iPhone', href: '/reparationer/apple/iphone', isExternal: false, order: 1, isVisible: true },
        { id: 'ipad', label: 'iPad', href: '/reparationer/apple/ipad', isExternal: false, order: 2, isVisible: true },
        { id: 'samsung', label: 'Samsung', href: '/reparationer/samsung', isExternal: false, order: 3, isVisible: true },
        { id: 'huawei', label: 'Huawei', href: '/reparationer/huawei', isExternal: false, order: 4, isVisible: true },
        { id: 'motorola', label: 'Motorola', href: '/reparationer/motorola', isExternal: false, order: 5, isVisible: true },
        { id: 'oneplus', label: 'OnePlus', href: '/reparationer/oneplus', isExternal: false, order: 6, isVisible: true },
        { id: 'google', label: 'Google Pixel', href: '/reparationer/google', isExternal: false, order: 7, isVisible: true }
      ]
    },
    { id: 'erhverv', label: 'Erhvervsaftaler', href: '/erhverv', isExternal: false, order: 2, isVisible: true },
    { id: 'kontakt', label: 'Kontakt os', href: '/kontakt', isExternal: false, order: 3, isVisible: true }
  ],
  footerMenu: [
    { id: 'alle-reparationer', label: 'Alle reparationer', href: '/reparationer', isExternal: false, order: 1, isVisible: true },
    { id: 'erhverv-footer', label: 'Erhvervsaftaler', href: '/erhverv', isExternal: false, order: 2, isVisible: true },
    { id: 'kontakt-footer', label: 'Kontakt os', href: '/kontakt', isExternal: false, order: 3, isVisible: true },
    { id: 'privatlivspolitik', label: 'Privatlivspolitik', href: '/privatlivspolitik', isExternal: false, order: 4, isVisible: true },
    { id: 'handelsbetingelser', label: 'Handelsbetingelser', href: '/handelsbetingelser', isExternal: false, order: 5, isVisible: true }
  ],
  mobileMenu: []
};

// Helper to read navigation
async function getNavigation() {
  if (!fs.existsSync(NAVIGATION_FILE)) {
    await fs.promises.writeFile(NAVIGATION_FILE, JSON.stringify(defaultNavigation, null, 2), 'utf8');
    return defaultNavigation;
  }
  
  const fileContents = await fs.promises.readFile(NAVIGATION_FILE, 'utf8');
  try {
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error parsing navigation:', error);
    return defaultNavigation;
  }
}

// Helper to write navigation
async function setNavigation(data: any) {
  await fs.promises.writeFile(NAVIGATION_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET() {
  try {
    const navigation = await getNavigation();
    return NextResponse.json(navigation);
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return NextResponse.json({ error: 'Failed to fetch navigation' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const navigation = await request.json();
    await setNavigation(navigation);
    return NextResponse.json({ success: true, navigation });
  } catch (error) {
    console.error('Error updating navigation:', error);
    return NextResponse.json({ error: 'Failed to update navigation' }, { status: 500 });
  }
}

