import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ACTIVITY_FILE = path.join(process.cwd(), 'src', 'data', 'activity-log.json');

// Helper to read activity log
async function getActivityLog() {
  if (!fs.existsSync(ACTIVITY_FILE)) {
    await fs.promises.writeFile(ACTIVITY_FILE, JSON.stringify([], null, 2), 'utf8');
    return [];
  }
  
  const fileContents = await fs.promises.readFile(ACTIVITY_FILE, 'utf8');
  try {
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error parsing activity log:', error);
    return [];
  }
}

// Helper to write activity log
async function setActivityLog(data: any[]) {
  await fs.promises.writeFile(ACTIVITY_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET() {
  try {
    const activities = await getActivityLog();
    // Return only the last 100 activities
    const recentActivities = activities.slice(-100).reverse();
    return NextResponse.json(recentActivities);
  } catch (error) {
    console.error('Error fetching activity log:', error);
    return NextResponse.json({ error: 'Failed to fetch activity log' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const activityData = await request.json();
    
    // Validate required fields
    if (!activityData.userId || !activityData.action || !activityData.target) {
      return NextResponse.json({ error: 'Missing required activity fields' }, { status: 400 });
    }

    const activities = await getActivityLog();
    
    const newActivity = {
      id: `activity_${Date.now()}`,
      userId: activityData.userId,
      userName: activityData.userName || 'Unknown User',
      action: activityData.action,
      target: activityData.target,
      details: activityData.details || '',
      timestamp: new Date().toISOString(),
      ipAddress: activityData.ipAddress || '127.0.0.1'
    };

    activities.push(newActivity);
    
    // Keep only the last 1000 activities to prevent file from growing too large
    if (activities.length > 1000) {
      activities.splice(0, activities.length - 1000);
    }
    
    await setActivityLog(activities);
    return NextResponse.json({ success: true, activity: newActivity });
  } catch (error) {
    console.error('Error creating activity log entry:', error);
    return NextResponse.json({ error: 'Failed to create activity log entry' }, { status: 500 });
  }
}

