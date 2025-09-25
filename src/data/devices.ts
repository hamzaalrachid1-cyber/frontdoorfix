export const BRANDS = ['Apple', 'Samsung', 'Huawei', 'OnePlus', 'Google'] as const;

export type RepairId =
  | 'screen_original' | 'screen_compatible'
  | 'battery_original' | 'battery_compatible'
  | 'charge_port' | 'mic' | 'ear_speaker' | 'loud_speaker'
  | 'front_camera' | 'back_camera' | 'camera_glass'
  | 'home_button' | 'software' | 'diagnostic' | 'water_damage' | 'data_recovery';

export type RepairItem = {
  id: RepairId;
  label: string;
  price: number | 'kontakt';
  time: string;      // fx "~15–20 min"
  warranty: string;  // fx "24 mdr" / "12 mdr" / "Ingen"
  tags?: string[];   // vis små chips her (men IKKE "På lager")
};

export type Model = {
  brand: typeof BRANDS[number];
  name: string;                // fx "iPhone 6"
  slug: string;                // "iphone-6"
  repairs: RepairItem[];
};

export const MODELS: Model[] = [
  {
    brand: 'Apple',
    name: 'iPhone 6',
    slug: 'iphone-6',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original (kalibreret)', price: 799, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel (A-kvalitet)', price: 599, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original (kalibreret)', price: 399, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel (A-kvalitet)', price: 299, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'charge_port', label: 'Ladeport', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'front_camera', label: 'For-kamera', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'back_camera', label: 'Bag-kamera', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'ear_speaker', label: 'Ørehøjttaler', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loud_speaker', label: 'Højttaler (bund)', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'home_button', label: 'Hjem-knap', price: 'kontakt', time: '~30–45 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostic', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 199, time: '~30–60 min', warranty: 'Ingen' },
      { id: 'data_recovery', label: 'Dataredning', price: 'kontakt', time: 'Variabel', warranty: 'Ingen' },
    ],
  },
  {
    brand: 'Apple',
    name: 'iPhone 6 Plus',
    slug: 'iphone-6-plus',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original (kalibreret)', price: 899, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel (A-kvalitet)', price: 699, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original (kalibreret)', price: 449, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel (A-kvalitet)', price: 349, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'charge_port', label: 'Ladeport', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'front_camera', label: 'For-kamera', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'back_camera', label: 'Bag-kamera', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'ear_speaker', label: 'Ørehøjttaler', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loud_speaker', label: 'Højttaler (bund)', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'home_button', label: 'Hjem-knap', price: 'kontakt', time: '~30–45 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostic', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 199, time: '~30–60 min', warranty: 'Ingen' },
      { id: 'data_recovery', label: 'Dataredning', price: 'kontakt', time: 'Variabel', warranty: 'Ingen' },
    ],
  },
  {
    brand: 'Samsung',
    name: 'Galaxy S21',
    slug: 'galaxy-s21',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original (kalibreret)', price: 1299, time: '~45 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel (A-kvalitet)', price: 999, time: '~45 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original (kalibreret)', price: 499, time: '~30 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel (A-kvalitet)', price: 399, time: '~30 min', warranty: '12 mdr' },
      { id: 'charge_port', label: 'Ladeport', price: 299, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'back_camera', label: 'Bag-kamera', price: 599, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostic', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 199, time: '~30–60 min', warranty: 'Ingen' },
    ],
  },
  {
    brand: 'Google',
    name: 'Pixel 7',
    slug: 'pixel-7',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original (kalibreret)', price: 1199, time: '~45 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel (A-kvalitet)', price: 899, time: '~45 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original (kalibreret)', price: 449, time: '~30 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel (A-kvalitet)', price: 349, time: '~30 min', warranty: '12 mdr' },
      { id: 'charge_port', label: 'Ladeport', price: 299, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'back_camera', label: 'Bag-kamera', price: 599, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostic', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
    ],
  },
];

// Helper functions
export function getModelsByBrand(brand: string): Model[] {
  return MODELS.filter(model => model.brand === brand);
}

export function getModelBySlug(slug: string): Model | undefined {
  return MODELS.find(model => model.slug === slug);
}

export function getBrandFromSlug(slug: string): string | undefined {
  const model = getModelBySlug(slug);
  return model?.brand;
}
