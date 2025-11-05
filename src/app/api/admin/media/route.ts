import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MEDIA_DIR = path.join(process.cwd(), 'public', 'uploads');
const MEDIA_INDEX = path.join(process.cwd(), 'src', 'data', 'media-index.json');

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  alt: string;
  type: 'image' | 'svg';
  size: number;
  width?: number;
  height?: number;
  uploadedAt: string;
  usedBy: string[];
}

async function getMediaIndex(): Promise<MediaItem[]> {
  try {
    if (fs.existsSync(MEDIA_INDEX)) {
      const data = await fs.promises.readFile(MEDIA_INDEX, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading media index:', error);
  }
  return [];
}

async function saveMediaIndex(items: MediaItem[]) {
  const dir = path.dirname(MEDIA_INDEX);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await fs.promises.writeFile(MEDIA_INDEX, JSON.stringify(items, null, 2), 'utf8');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    
    let items = await getMediaIndex();

    if (search) {
      const searchLower = search.toLowerCase();
      items = items.filter(item => 
        item.filename.toLowerCase().includes(searchLower) ||
        item.alt.toLowerCase().includes(searchLower)
      );
    }

    // Sort by uploadedAt desc
    items.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const alt = formData.get('alt') as string || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(MEDIA_DIR)) {
      fs.mkdirSync(MEDIA_DIR, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const ext = path.extname(file.name);
    const basename = path.basename(file.name, ext).replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    const filename = `${basename}-${timestamp}${ext}`;

    // Save file
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(MEDIA_DIR, filename);
    await fs.promises.writeFile(filePath, buffer);

    // Create media item
    const mediaItem: MediaItem = {
      id: `media-${timestamp}`,
      filename,
      url: `/uploads/${filename}`,
      alt,
      type: ext.toLowerCase() === '.svg' ? 'svg' : 'image',
      size: buffer.length,
      uploadedAt: new Date().toISOString(),
      usedBy: []
    };

    // Update index
    const items = await getMediaIndex();
    items.push(mediaItem);
    await saveMediaIndex(items);

    return NextResponse.json({ success: true, media: mediaItem });
  } catch (error) {
    console.error('Error uploading media:', error);
    return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const items = await getMediaIndex();
    const item = items.find(i => i.id === id);

    if (!item) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    // Delete file
    const filePath = path.join(MEDIA_DIR, item.filename);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }

    // Update index
    const updatedItems = items.filter(i => i.id !== id);
    await saveMediaIndex(updatedItems);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const items = await getMediaIndex();
    const index = items.findIndex(i => i.id === data.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    items[index] = {
      ...items[index],
      alt: data.alt || items[index].alt,
      usedBy: data.usedBy || items[index].usedBy
    };

    await saveMediaIndex(items);

    return NextResponse.json({ success: true, media: items[index] });
  } catch (error) {
    console.error('Error updating media:', error);
    return NextResponse.json({ error: 'Failed to update media' }, { status: 500 });
  }
}
