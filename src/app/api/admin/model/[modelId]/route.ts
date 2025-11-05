import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ modelId: string }> }
) {
  try {
    const { modelId } = await params;
    
    // Try both directories
    const applePath = path.join(process.cwd(), 'src', 'data', 'repairs', 'apple', `${modelId}.json`);
    const samsungPath = path.join(process.cwd(), 'src', 'data', 'repairs', 'samsung', `${modelId}.json`);
    
    let filePath = null;
    if (fs.existsSync(applePath)) {
      filePath = applePath;
    } else if (fs.existsSync(samsungPath)) {
      filePath = samsungPath;
    }
    
    if (!filePath) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const modelData = JSON.parse(fileContents);
    
    return NextResponse.json(modelData);
  } catch (error) {
    console.error('Error reading model data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ modelId: string }> }
) {
  try {
    const { modelId } = await params;
    const modelData = await request.json();
    
    // Try both directories to find the file
    const applePath = path.join(process.cwd(), 'src', 'data', 'repairs', 'apple', `${modelId}.json`);
    const samsungPath = path.join(process.cwd(), 'src', 'data', 'repairs', 'samsung', `${modelId}.json`);
    
    let filePath = null;
    if (fs.existsSync(applePath)) {
      filePath = applePath;
    } else if (fs.existsSync(samsungPath)) {
      filePath = samsungPath;
    }
    
    if (!filePath) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }
    
    // Write the updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(modelData, null, 2), 'utf8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating model data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
