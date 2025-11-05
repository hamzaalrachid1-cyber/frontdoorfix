"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link 
              href="/admin"
              className={`text-sm font-medium transition-colors ${
                isActive('/admin') 
                  ? 'text-pink-600 border-b-2 border-pink-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📋 Admin Dashboard
            </Link>
            <Link 
              href="/admin/models"
              className={`text-sm font-medium transition-colors ${
                isActive('/admin/models') 
                  ? 'text-pink-600 border-b-2 border-pink-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📱 Alle Modeller
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              🌐 Se hjemmesiden
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">
              Admin Panel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
