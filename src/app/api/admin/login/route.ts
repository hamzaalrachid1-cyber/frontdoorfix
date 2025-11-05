import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Admin kode - du kan ændre denne til hvad du vil
const ADMIN_CODE = process.env.ADMIN_CODE || 'FrontDoorFix2024';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'Kode er påkrævet' },
        { status: 400 }
      );
    }

    if (code === ADMIN_CODE) {
      // Sæt en cookie der varer i 7 dage
      const cookieStore = await cookies();
      cookieStore.set('admin-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 dage
        path: '/',
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: 'Forkert kode' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Der opstod en fejl' },
      { status: 500 }
    );
  }
}

