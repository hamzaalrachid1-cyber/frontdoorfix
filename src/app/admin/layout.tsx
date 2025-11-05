"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import FLogo from '@/components/FLogo';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check-auth');
        const data = await response.json();
        
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          // Redirect to login if not on login page
          if (pathname !== '/admin/login') {
            router.push('/admin/login');
          }
        }
      } catch (error) {
        setIsAuthenticated(false);
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      }
    };

    checkAuth();
  }, [router, pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show loading state while checking auth
  if (isAuthenticated === null && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // Don't show layout for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Don't render admin layout if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="flex items-center gap-2">
                <FLogo size={32} />
                <span className="font-bold text-gray-900">Admin</span>
              </Link>

              <nav className="flex gap-6">
                <Link
                  href="/admin/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/catalog/brands"
                  className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
                >
                  Katalog
                </Link>
                <Link
                  href="/admin/media"
                  className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
                >
                  Media
                </Link>
                <Link
                  href="/admin/logo"
                  className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
                >
                  Logo
                </Link>
                <Link
                  href="/admin/seo"
                  className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
                >
                  SEO
                </Link>
                <Link
                  href="/admin/settings"
                  className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
                >
                  Indstillinger
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Se website →
              </a>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Log ud
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
