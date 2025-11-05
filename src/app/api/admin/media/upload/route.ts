import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const MEDIA_FILE = path.join(process.cwd(), 'src', 'data', 'media-library.json');
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Helper to read media files
async function getMediaFiles() {
  if (!fs.existsSync(MEDIA_FILE)) {
    await fs.promises.writeFile(MEDIA_FILE, JSON.stringify([], null, 2), 'utf8');
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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const mediaFiles = await getMediaFiles();
    const uploadedFiles = [];

    for (const file of files) {
      // Validate file size and type
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        return NextResponse.json({ error: `File ${file.name} is too large. Maximum size is 10MB.` }, { status: 400 });
      }

      // Generate unique filename
      const fileExtension = path.extname(file.name);
      const fileName = `${uuidv4()}${fileExtension}`;
      const filePath = path.join(UPLOAD_DIR, fileName);

      // Save file to disk
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await fs.promises.writeFile(filePath, buffer);

      // Determine file type
      let fileType = 'document';
      if (file.type.startsWith('image/')) {
        fileType = 'image';
      } else if (file.type.startsWith('video/')) {
        fileType = 'video';
      }

      // Create media file record
      const mediaFile: any = {
        id: uuidv4(),
        name: file.name,
        url: `/uploads/${fileName}`,
        type: fileType,
        size: file.size,
        alt: '',
        title: '',
        description: '',
        tags: [],
        uploadedAt: new Date().toISOString(),
        usedIn: []
      };

      // Add image dimensions if it's an image
      if (fileType === 'image') {
        try {
          // In a real application, you would use a library like sharp to get image dimensions
          // For now, we'll set placeholder values
          mediaFile.width = 800;
          mediaFile.height = 600;
        } catch (error) {
          console.error('Error getting image dimensions:', error);
        }
      }

      mediaFiles.push(mediaFile);
      uploadedFiles.push(mediaFile);
    }

    await setMediaFiles(mediaFiles);

    return NextResponse.json({ 
      success: true, 
      files: uploadedFiles,
      message: `${uploadedFiles.length} file(s) uploaded successfully`
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 });
  }
}

