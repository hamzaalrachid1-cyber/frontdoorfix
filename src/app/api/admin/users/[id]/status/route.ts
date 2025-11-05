import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'src', 'data', 'users.json');

// Helper to read users
async function getUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  
  const fileContents = await fs.promises.readFile(USERS_FILE, 'utf8');
  try {
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error parsing users:', error);
    return [];
  }
}

// Helper to write users
async function setUsers(data: any[]) {
  await fs.promises.writeFile(USERS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const { isActive } = await request.json();
    
    const users = await getUsers();
    const userIndex = users.findIndex((user: any) => user.id === userId);
    
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update user status
    users[userIndex].isActive = isActive;
    
    await setUsers(users);
    
    // Return user without password
    const { password, ...userResponse } = users[userIndex];
    return NextResponse.json({ success: true, user: userResponse });
  } catch (error) {
    console.error('Error updating user status:', error);
    return NextResponse.json({ error: 'Failed to update user status' }, { status: 500 });
  }
}

