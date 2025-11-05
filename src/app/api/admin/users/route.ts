import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const USERS_FILE = path.join(process.cwd(), 'src', 'data', 'users.json');

const defaultUsers = [
  {
    id: 'admin_1',
    name: 'Administrator',
    email: 'admin@frontdoorfix.dk',
    role: 'owner',
    isActive: true,
    createdAt: new Date().toISOString(),
    permissions: [
      'content:read',
      'content:write',
      'content:delete',
      'media:read',
      'media:write',
      'media:delete',
      'settings:read',
      'settings:write',
      'users:read',
      'users:write',
      'users:delete',
      'seo:read',
      'seo:write',
      'analytics:read'
    ]
  }
];

// Helper to read users
async function getUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    await fs.promises.writeFile(USERS_FILE, JSON.stringify(defaultUsers, null, 2), 'utf8');
    return defaultUsers;
  }
  
  const fileContents = await fs.promises.readFile(USERS_FILE, 'utf8');
  try {
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error parsing users:', error);
    return defaultUsers;
  }
}

// Helper to write users
async function setUsers(data: any[]) {
  await fs.promises.writeFile(USERS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET() {
  try {
    const users = await getUsers();
    // Remove password hashes from response
    const sanitizedUsers = users.map(({ password, ...user }) => user);
    return NextResponse.json(sanitizedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    
    // Validate required fields
    if (!userData.name || !userData.email || !userData.password || !userData.role) {
      return NextResponse.json({ error: 'Missing required user fields' }, { status: 400 });
    }

    const users = await getUsers();
    
    // Check if user already exists
    if (users.some((user: any) => user.email === userData.email)) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = {
      id: uuidv4(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      isActive: true,
      createdAt: new Date().toISOString(),
      permissions: userData.permissions || [],
      password: hashedPassword
    };

    users.push(newUser);
    await setUsers(users);

    // Return user without password
    const { password, ...userResponse } = newUser;
    return NextResponse.json({ success: true, user: userResponse });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

