#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log('🌱 Seeding initial data...');

// Create default data files if they don't exist
const dataFiles = [
  {
    file: 'brands.json',
    content: [
      {
        "name": "Apple",
        "slug": "apple",
        "subtitle": "iPhone, iPad, MacBook",
        "icon": "🍎",
        "link": "/reparationer/apple",
        "order": 1,
        "isVisible": true
      },
      {
        "name": "Samsung",
        "slug": "samsung",
        "subtitle": "Galaxy S, A, Z, XCover",
        "icon": "📱",
        "link": "/reparationer/samsung",
        "order": 2,
        "isVisible": true
      },
      {
        "name": "Huawei",
        "slug": "huawei",
        "subtitle": "P, Mate, Nova",
        "icon": "📲",
        "link": "/reparationer/huawei",
        "order": 3,
        "isVisible": true
      },
      {
        "name": "Motorola",
        "slug": "motorola",
        "subtitle": "Edge, Moto G, Razr",
        "icon": "🦋",
        "link": "/reparationer/motorola",
        "order": 4,
        "isVisible": true
      },
      {
        "name": "OnePlus",
        "slug": "oneplus",
        "subtitle": "Nord, Pro, Ace",
        "icon": "1️⃣",
        "link": "/reparationer/oneplus",
        "order": 5,
        "isVisible": true
      },
      {
        "name": "Google Pixel",
        "slug": "pixel",
        "subtitle": "Pixel, Pixel Pro",
        "icon": "🔍",
        "link": "/reparationer/pixel",
        "order": 6,
        "isVisible": true
      },
      {
        "name": "PlayStation",
        "slug": "playstation",
        "subtitle": "PS5, PS4, Controllers",
        "icon": "🎮",
        "link": "/reparationer/playstation",
        "order": 7,
        "isVisible": true
      },
      {
        "name": "Computer",
        "slug": "computer",
        "subtitle": "PC, MacBook, Surface",
        "icon": "💻",
        "link": "/reparationer/computer",
        "order": 8,
        "isVisible": true
      }
    ]
  },
  {
    file: 'series.json',
    content: [
      {
        "name": "iPhone",
        "slug": "iphone",
        "brand": "apple",
        "description": "Apple iPhone reparationer",
        "link": "/reparationer/apple/iphone",
        "order": 1,
        "isVisible": true
      },
      {
        "name": "iPad",
        "slug": "ipad",
        "brand": "apple",
        "description": "Apple iPad reparationer",
        "link": "/reparationer/apple/ipad",
        "order": 2,
        "isVisible": true
      },
      {
        "name": "MacBook",
        "slug": "macbook",
        "brand": "apple",
        "description": "Apple MacBook reparationer",
        "link": "/reparationer/apple/macbook",
        "order": 3,
        "isVisible": true
      },
      {
        "name": "Galaxy S",
        "slug": "s",
        "brand": "samsung",
        "description": "Samsung Galaxy S reparationer",
        "link": "/reparationer/samsung/s",
        "order": 4,
        "isVisible": true
      },
      {
        "name": "Galaxy A",
        "slug": "a",
        "brand": "samsung",
        "description": "Samsung Galaxy A reparationer",
        "link": "/reparationer/samsung/a",
        "order": 5,
        "isVisible": true
      },
      {
        "name": "Galaxy Z",
        "slug": "z",
        "brand": "samsung",
        "description": "Samsung Galaxy Z reparationer",
        "link": "/reparationer/samsung/z",
        "order": 6,
        "isVisible": true
      },
      {
        "name": "XCover",
        "slug": "xcover",
        "brand": "samsung",
        "description": "Samsung XCover reparationer",
        "link": "/reparationer/samsung/xcover",
        "order": 7,
        "isVisible": true
      }
    ]
  },
  {
    file: 'design-tokens.json',
    content: {
      colors: {
        primary: '#ec4899',
        secondary: '#f59e0b',
        gradientStart: '#ec4899',
        gradientEnd: '#f59e0b',
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        }
      },
      typography: {
        fontScale: 1.0,
        headingScale: 1.2
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        xxl: '3rem'
      },
      radius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px'
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }
    }
  },
  {
    file: 'seo-settings.json',
    content: {
      siteName: 'FrontDoorFix',
      defaultTitle: 'Reparationer af telefoner og tablets - FrontDoorFix',
      defaultDescription: 'Professionel reparation af iPhone, iPad, Samsung Galaxy og andre enheder. Vi kommer til dig - hurtig service med garanti.',
      defaultKeywords: ['reparation', 'iPhone', 'iPad', 'Samsung', 'skærmreparation', 'batteri', 'service'],
      ogImage: '/images/og-default.jpg',
      twitterCard: 'summary_large_image',
      twitterSite: '@frontdoorfix',
      robotsIndex: true,
      robotsFollow: true,
      canonicalDomain: 'https://frontdoorfix.dk',
      sitemapEnabled: true,
      structuredDataEnabled: true,
      breadcrumbsEnabled: true,
      googleAnalytics: '',
      googleTagManager: '',
      facebookPixel: ''
    }
  },
  {
    file: 'company-settings.json',
    content: {
      companyName: 'FrontDoorFix',
      companyEmail: 'info@frontdoorfix.dk',
      companyPhone: '+45 12 34 56 78',
      whatsappNumber: '+45 12 34 56 78',
      address: 'Hovedgade 123',
      city: 'København',
      postalCode: '2100',
      country: 'Danmark',
      vatNumber: 'DK12345678',
      registrationNumber: '12345678',
      openingHours: {
        monday: { open: '08:00', close: '18:00', closed: false },
        tuesday: { open: '08:00', close: '18:00', closed: false },
        wednesday: { open: '08:00', close: '18:00', closed: false },
        thursday: { open: '08:00', close: '18:00', closed: false },
        friday: { open: '08:00', close: '18:00', closed: false },
        saturday: { open: '09:00', close: '15:00', closed: false },
        sunday: { open: '10:00', close: '14:00', closed: false }
      },
      serviceAreas: ['København', 'Frederiksberg', 'Gentofte', 'Lyngby', 'Rødovre'],
      trustpilotReviewUrl: 'https://dk.trustpilot.com/review/frontdoorfix.dk',
      googleMapsUrl: 'https://maps.google.com/?q=Hovedgade+123+København',
      featureFlags: {
        enableBooking: true,
        enableReviews: true,
        enableBlog: false,
        enableMultiLanguage: false,
        enableDarkMode: false,
        enableMaintenanceMode: false
      }
    }
  },
  {
    file: 'users.json',
    content: [
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
    ]
  },
  {
    file: 'redirects.json',
    content: []
  },
  {
    file: 'media-library.json',
    content: []
  },
  {
    file: 'activity-log.json',
    content: []
  }
];

// Create each data file
dataFiles.forEach(({ file, content }) => {
  const filePath = path.join(dataDir, file);
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
    console.log(`✅ Created ${file}`);
  } else {
    console.log(`⏭️  ${file} already exists, skipping`);
  }
});

console.log('🎉 Data seeding completed!');
console.log('\n📋 Created files:');
dataFiles.forEach(({ file }) => {
  console.log(`   - ${file}`);
});

console.log('\n🚀 You can now start the admin panel at /admin/dashboard');

