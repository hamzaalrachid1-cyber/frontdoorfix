import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MEDIA_FILE = path.join(process.cwd(), 'src', 'data', 'media-library.json');

// Helper to read media files
async function getMediaFiles() {
  if (!fs.existsSync(MEDIA_FILE)) {
    return [];
  }
  
  const fileContents = await fs.promises.readFile(MEDIA_FILE, 'utf8');
  try {
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error parsing media files:', error);
    return [];
  }
}

// Helper to write media files
async function setMediaFiles(data: any[]) {
  await fs.promises.writeFile(MEDIA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const mediaId = params.id;
    const updatedFile = await request.json();
    
    const mediaFiles = await getMediaFiles();
    const fileIndex = mediaFiles.findIndex((file: any) => file.id === mediaId);
    
    if (fileIndex === -1) {
      return NextResponse.json({ error: 'Media file not found' }, { status: 404 });
    }

    // Update the file with new data
    mediaFiles[fileIndex] = { ...mediaFiles[fileIndex], ...updatedFile };
    
    await setMediaFiles(mediaFiles);
    return NextResponse.json({ success: true, file: mediaFiles[fileIndex] });
  } catch (error) {
    console.error('Error updating media file:', error);
    return NextResponse.json({ error: 'Failed to update media file' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const mediaId = params.id;
    
    const mediaFiles = await getMediaFiles();
    const fileIndex = mediaFiles.findIndex((file: any) => file.id === mediaId);
    
    if (fileIndex === -1) {
      return NextResponse.json({ error: 'Media file not found' }, { status: 404 });
    }

    const fileToDelete = mediaFiles[fileIndex];
    
    // Delete the physical file
    const filePath = path.join(process.cwd(), 'public', fileToDelete.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove from media library
    mediaFiles.splice(fileIndex, 1);
    await setMediaFiles(mediaFiles);

    return NextResponse.json({ success: true, message: 'Media file deleted successfully' });
  } catch (error) {
    console.error('Error deleting media file:', error);
    return NextResponse.json({ error: 'Failed to delete media file' }, { status: 500 });
  }
}

