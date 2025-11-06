"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
        aria-label="Menu"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl">
            <div className="p-6">
              {/* Close Button */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg font-medium transition-colors"
                >
                  🏠 Forside
                </Link>

                <div className="border-t border-gray-200 my-2"></div>

                <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                  Reparationer
                </div>

                <Link
                  href="/reparationer/apple/iphone"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
                >
                  📱 iPhone
                </Link>

                <Link
                  href="/reparationer/apple/ipad"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
                >
                  📱 iPad
                </Link>

                <Link
                  href="/reparationer/apple/macbook"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
                >
                  💻 MacBook
                </Link>

                <Link
                  href="/reparationer/samsung"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
                >
                  📱 Samsung
                </Link>

                <Link
                  href="/reparationer"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-pink-600 hover:bg-pink-50 rounded-lg font-semibold transition-colors"
                >
                  Alle reparationer →
                </Link>

                <div className="border-t border-gray-200 my-2"></div>

                <Link
                  href="/erhverv"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg font-medium transition-colors"
                >
                  🏢 Erhvervsaftaler
                </Link>

                <Link
                  href="/kontakt"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg font-medium transition-colors"
                >
                  📞 Kontakt os
                </Link>
              </nav>

              {/* Contact Info in Menu */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <a 
                    href="tel:+4593545457"
                    className="flex items-center gap-3 text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm font-medium">+45 93 54 54 57</span>
                  </a>

                  <a 
                    href="mailto:info@frontdoorfix.dk"
                    className="flex items-center gap-3 text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">info@frontdoorfix.dk</span>
                  </a>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Åbent alle dage: 8:00-22:00
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

