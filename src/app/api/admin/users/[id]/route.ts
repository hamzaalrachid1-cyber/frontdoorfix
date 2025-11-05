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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = id;
    const updatedUser = await request.json();
    
    const users = await getUsers();
    const userIndex = users.findIndex((user: any) => user.id === userId);
    
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update user data (excluding password)
    const { password, ...updateData } = updatedUser;
    users[userIndex] = { ...users[userIndex], ...updateData };
    
    await setUsers(users);
    
    // Return user without password
    const { password: _, ...userResponse } = users[userIndex];
    return NextResponse.json({ success: true, user: userResponse });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = id;
    
    const users = await getUsers();
    const userIndex = users.findIndex((user: any) => user.id === userId);
    
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userToDelete = users[userIndex];
    
    // Prevent deletion of the last owner
    if (userToDelete.role === 'owner') {
      const ownerCount = users.filter((user: any) => user.role === 'owner').length;
      if (ownerCount <= 1) {
        return NextResponse.json({ error: 'Cannot delete the last owner' }, { status: 400 });
      }
    }

    // Remove user
    users.splice(userIndex, 1);
    await setUsers(users);

    return NextResponse.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

