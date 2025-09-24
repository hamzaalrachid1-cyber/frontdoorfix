import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontdoorfix | Mobil, tablet & computer reparation i København",
  description:
    "Frontdoorfix reparerer iPhone, Samsung, Google, OnePlus, Huawei og Motorola. Skærm, batteri, ladeport m.m. Garanti: 24 mdr. på skærm, 12 mdr. på batteri.",
  metadataBase: new URL("https://frontdoorfix.local"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Frontdoorfix | Mobilreparation i København",
    description:
      "Skærmskift, batteriskift, ladeport og flere reparationer. 24 mdr. skærmgaranti.",
    locale: "da_DK",
    siteName: "Frontdoorfix",
    type: "website",
    url: "https://frontdoorfix.local/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bar-gradient" />
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="mx-auto max-w-6xl px-6 py-2 flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <a href="tel:+4593545457" className="hover:text-gray-800 flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                +45 93 54 54 57
              </a>
              <a href="mailto:info@frontdoorfix.dk" className="hover:text-gray-800 flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                info@frontdoorfix.dk
              </a>
            </div>
            <div className="text-xs text-gray-500">
              Åbent: Alle dage 8:00-22:00
            </div>
          </div>
        </div>
        <header className="bg-gradient-to-r from-pink-50 via-yellow-50 to-white border-b border-gray-200">
          <div className="mx-auto max-w-6xl p-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="4" width="32" height="56" rx="6" fill="white"/>
                  <path d="M12 18l8 6-6 6 10 8-6 6" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <circle cx="24" cy="54" r="2" fill="#3b82f6"/>
                </svg>
              </div>
              <span className="text-xl font-bold">
                <span className="text-pink-500">Front</span><span className="text-gray-800">doorfix</span>
              </span>
            </Link>
            <nav className="flex items-center gap-8 text-sm text-gray-700">
              <div className="relative group">
                <button className="flex items-center gap-1 hover:text-gray-900">
                  Reparation & Priser
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="transition-transform group-hover:rotate-180">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a href="/reparationer/apple" className="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-pink-500 hover:text-white transition-colors">iPhone</a>
                    <a href="/reparationer/apple" className="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-pink-500 hover:text-white transition-colors">iPad</a>
                    <a href="/reparationer/samsung" className="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-pink-500 hover:text-white transition-colors">Samsung</a>
                    <a href="/reparationer/huawei" className="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-pink-500 hover:text-white transition-colors">Huawei</a>
                    <a href="/reparationer/motorola" className="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-pink-500 hover:text-white transition-colors">Motorola</a>
                    <a href="/reparationer/oneplus" className="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-pink-500 hover:text-white transition-colors">OnePlus</a>
                    <a href="/reparationer/google" className="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-pink-500 hover:text-white transition-colors">Google Pixel</a>
                  </div>
                </div>
              </div>
              <a href="/erhverv" className="hover:text-gray-900">Erhvervsaftaler</a>
              <a href="/kontakt" className="hover:text-gray-900">Kontakt os</a>
              <button className="btn-gradient px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity">
                Bestil tid
              </button>
            </nav>
          </div>
        </header>
        <main className="page-tint min-h-[60vh]">
          {children}
        </main>
        <footer className="border-t tint-gradient">
          <div className="mx-auto max-w-6xl p-6 text-sm flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Frontdoorfix</div>
            <div>Copenhagen, Denmark • CVR: (indsæt senere)</div>
          </div>
        </footer>
        <div className="bar-gradient" />
      </body>
    </html>
  );
}
