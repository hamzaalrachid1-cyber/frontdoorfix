export interface Category {
  slug: string;
  title: string;
  subtitle: string;
  href: string;
  enabled?: boolean;
}

export interface Brand {
  slug: string;
  title: string;
  subtitle: string;
  badge: 'Apple' | 'Android' | 'Konsoller' | 'Computer';
  icon?: string;
  categories: Category[];
}

export const BRANDS: Brand[] = [
  {
    slug: 'apple',
    title: 'Apple',
    subtitle: 'Alle Apple-reparationer • iPhone, iPad, MacBook',
    badge: 'Apple',
    icon: 'apple',
    categories: [
      {
        slug: 'iphone',
        title: 'iPhone',
        subtitle: 'Alle modeller • skærm, batteri, kamera, porte',
        href: '/reparationer/apple/iphone',
        enabled: true
      },
      {
        slug: 'ipad',
        title: 'iPad',
        subtitle: 'Skærm, batteri, porte • Flere generationer',
        href: '/reparationer/apple/ipad',
        enabled: true
      },
      {
        slug: 'macbook',
        title: 'MacBook',
        subtitle: 'Skærm, tastatur, batteri, USB-C m.m.',
        href: '/reparationer/apple/macbook',
        enabled: true
      }
    ]
  },
  {
    slug: 'samsung',
    title: 'Samsung',
    subtitle: 'Galaxy-serien • Android',
    badge: 'Android',
    icon: 'samsung',
    categories: [
      {
        slug: 'galaxy-s',
        title: 'Galaxy S',
        subtitle: 'S-serien • skærm, batteri, kamera',
        href: '/reparationer/samsung/s',
        enabled: true
      },
      {
        slug: 'galaxy-a',
        title: 'Galaxy A',
        subtitle: 'A-serien • skærm og batteri',
        href: '/reparationer/samsung/a',
        enabled: true
      },
      {
        slug: 'galaxy-z',
        title: 'Galaxy Z',
        subtitle: 'Fold/Flip • skærm og hinge',
        href: '/reparationer/samsung/galaxy-z',
        enabled: true
      },
      {
        slug: 'xcover',
        title: 'XCover',
        subtitle: 'Robuste modeller • skærm, porte',
        href: '/reparationer/samsung/xcover',
        enabled: true
      },
      {
        slug: 'galaxy-j',
        title: 'Galaxy J',
        subtitle: 'Ældre modeller • basale reparationer',
        href: '/reparationer/samsung/galaxy-j',
        enabled: true
      }
    ]
  },
  {
    slug: 'huawei',
    title: 'Huawei',
    subtitle: 'P & Mate-serier • Android',
    badge: 'Android',
    icon: 'huawei',
    categories: [
      {
        slug: 'p-serien',
        title: 'P-serien',
        subtitle: 'P-serien • skærm, batteri, kamera',
        href: '/reparationer/huawei/p-serien',
        enabled: true
      },
      {
        slug: 'mate-serien',
        title: 'Mate-serien',
        subtitle: 'Mate-serien • skærm, batteri, kamera',
        href: '/reparationer/huawei/mate-serien',
        enabled: true
      }
    ]
  },
  {
    slug: 'motorola',
    title: 'Motorola',
    subtitle: 'G & Edge • Android',
    badge: 'Android',
    icon: 'motorola',
    categories: [
      {
        slug: 'edge',
        title: 'Edge',
        subtitle: 'Edge-serien • skærm, batteri, kamera',
        href: '/reparationer/motorola/edge',
        enabled: true
      },
      {
        slug: 'g',
        title: 'G',
        subtitle: 'G-serien • skærm og batteri',
        href: '/reparationer/motorola/g',
        enabled: true
      }
    ]
  },
  {
    slug: 'oneplus',
    title: 'OnePlus',
    subtitle: 'Nord & Pro • Android',
    badge: 'Android',
    icon: 'oneplus',
    categories: [
      {
        slug: 'nord',
        title: 'Nord',
        subtitle: 'Nord-serien • skærm, batteri, kamera',
        href: '/reparationer/oneplus/nord',
        enabled: true
      },
      {
        slug: 'oneplus-pro',
        title: 'OnePlus (Pro/T)',
        subtitle: 'Pro/T-serien • skærm, batteri, kamera',
        href: '/reparationer/oneplus/oneplus-pro',
        enabled: true
      }
    ]
  },
  {
    slug: 'pixel',
    title: 'Google Pixel',
    subtitle: 'Pixel-serien • Android',
    badge: 'Android',
    icon: 'pixel',
    categories: [
      {
        slug: 'pixel',
        title: 'Pixel',
        subtitle: 'Pixel-serien • skærm, batteri, kamera',
        href: '/reparationer/pixel/pixel',
        enabled: true
      }
    ]
  },
  {
    slug: 'playstation',
    title: 'PlayStation',
    subtitle: 'PS4 & PS5 • Konsoller',
    badge: 'Konsoller',
    icon: 'playstation',
    categories: [
      {
        slug: 'ps4',
        title: 'PS4',
        subtitle: 'PS4/PS4 Pro • rens, blæsere, HDMI-port',
        href: '/reparationer/playstation/ps4',
        enabled: true
      },
      {
        slug: 'ps5',
        title: 'PS5',
        subtitle: 'PS5 • rens, blæsere, HDMI-port',
        href: '/reparationer/playstation/ps5',
        enabled: true
      },
      {
        slug: 'controller',
        title: 'Controller',
        subtitle: 'Controller • sticks/knapper, fejlsøgning',
        href: '/reparationer/playstation/controller',
        enabled: true
      }
    ]
  },
  {
    slug: 'computer',
    title: 'Computer',
    subtitle: 'Mac & PC • Computer',
    badge: 'Computer',
    icon: 'computer',
    categories: [
      {
        slug: 'macbook',
        title: 'MacBook',
        subtitle: 'MacBook • skærm, tastatur, batteri',
        href: '/reparationer/computer/macbook',
        enabled: true
      },
      {
        slug: 'imac',
        title: 'iMac',
        subtitle: 'iMac • skærm, tastatur, fejlsøgning',
        href: '/reparationer/computer/imac',
        enabled: true
      },
      {
        slug: 'windows-baerbar',
        title: 'Windows bærbar',
        subtitle: 'Windows bærbar • skærm, tastatur, batteri, ladeport',
        href: '/reparationer/computer/windows-baerbar',
        enabled: true
      },
      {
        slug: 'stationaer-pc',
        title: 'Stationær PC',
        subtitle: 'Stationær PC • fejlsøgning, PSU, lager, software',
        href: '/reparationer/computer/stationaer-pc',
        enabled: true
      }
    ]
  }
];