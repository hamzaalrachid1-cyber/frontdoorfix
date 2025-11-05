export const BRANDS = ['Apple', 'Samsung', 'Huawei', 'OnePlus', 'Google'] as const;

export type RepairId =
  | 'screen_original' | 'screen_compatible'
  | 'battery_original' | 'battery_compatible'
  | 'chargeport' | 'mic' | 'earpiece' | 'loudspeaker'
  | 'rear_camera' | 'camera_glass'
  | 'home_button' | 'software' | 'diagnostics' | 'water_damage' | 'back_glass';

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

// All iPhone models for the booking modal
const APPLE_MODELS: Model[] = [
  {
    brand: 'Apple',
    name: 'iPhone 6',
    slug: 'iphone-6',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 799, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 599, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 399, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 299, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'home_button', label: 'Hjem-knap', price: 299, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 199, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 6 Plus',
    slug: 'iphone-6-plus',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 899, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 699, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 449, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 349, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'home_button', label: 'Hjem-knap', price: 299, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 199, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 6s',
    slug: 'iphone-6s',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 849, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 649, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 399, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 299, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'home_button', label: 'Hjem-knap', price: 299, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 199, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 6s Plus',
    slug: 'iphone-6s-plus',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 949, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 749, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 449, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 349, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'home_button', label: 'Hjem-knap', price: 299, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 199, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 7',
    slug: 'iphone-7',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 899, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 699, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 399, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 299, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 449, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'home_button', label: 'Hjem-knap', price: 349, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 249, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 7 Plus',
    slug: 'iphone-7-plus',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 999, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 799, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 449, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 349, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 499, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'home_button', label: 'Hjem-knap', price: 349, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 249, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 8',
    slug: 'iphone-8',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 999, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 799, time: '~30 min', warranty: '24 mdr' },
      { id: 'back_glass', label: 'Bagcover (kun glas)', price: 1199, time: '~25–35 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 399, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 299, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'home_button', label: 'Hjem-knap', price: 349, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 449, time: '~20–30 min', warranty: '12 mdr' },
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 8 Plus',
    slug: 'iphone-8-plus',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 1199, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 899, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 449, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 349, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1299, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 499, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'home_button', label: 'Hjem-knap', price: 349, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 249, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone X',
    slug: 'iphone-x',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 1599, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1199, time: '~30 min', warranty: '24 mdr' },
      { id: 'back_glass', label: 'Bagcover (kun glas)', price: 1399, time: '~25–35 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 499, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 399, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 799, time: '~20–30 min', warranty: '12 mdr' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone XR',
    slug: 'iphone-xr',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 1399, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1099, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 499, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 399, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1399, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 799, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 299, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone XS',
    slug: 'iphone-xs',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 1599, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1199, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 499, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 399, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1399, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 799, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 299, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone XS Max',
    slug: 'iphone-xs-max',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 1799, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1399, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 549, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 449, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1499, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 849, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 299, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 11',
    slug: 'iphone-11',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 1499, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1099, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 499, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 399, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1399, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 799, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 299, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 11 Pro',
    slug: 'iphone-11-pro',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 1699, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1299, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 499, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 399, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1499, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 899, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 299, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 11 Pro Max',
    slug: 'iphone-11-pro-max',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 1899, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1499, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 549, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 449, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1599, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 949, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 249, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 299, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 12 Mini',
    slug: 'iphone-12-mini',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 1599, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1199, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 549, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 449, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1399, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 349, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 349, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 799, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 349, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 12',
    slug: 'iphone-12',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 1799, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1299, time: '~30 min', warranty: '24 mdr' },
      { id: 'back_glass', label: 'Bagcover (kun glas)', price: 1599, time: '~25–35 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 599, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 499, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 349, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera system', price: 899, time: '~20–30 min', warranty: '12 mdr' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 12 Pro',
    slug: 'iphone-12-pro',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 1999, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1499, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 599, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 499, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1699, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 349, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 349, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 999, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 349, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 12 Pro Max',
    slug: 'iphone-12-pro-max',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 2199, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1699, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 649, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 549, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1899, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 1099, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 349, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 349, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 399, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 13 Mini',
    slug: 'iphone-13-mini',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 1799, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1399, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 599, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 499, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1599, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 899, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 349, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 349, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 399, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 13',
    slug: 'iphone-13',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 1999, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1499, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 649, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 549, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1699, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 999, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 349, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 349, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 399, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 13 Pro',
    slug: 'iphone-13-pro',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 2299, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1799, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 649, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 549, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1799, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 1199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 349, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 349, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 399, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 13 Pro Max',
    slug: 'iphone-13-pro-max',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 2499, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1999, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 699, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 599, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1999, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 449, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 449, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 1299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 449, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 14',
    slug: 'iphone-14',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 2199, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1699, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 699, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 599, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1799, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 449, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 449, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 1099, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 449, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 14 Plus',
    slug: 'iphone-14-plus',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 2399, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1899, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 749, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 649, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1899, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 449, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 449, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 1099, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 449, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 14 Pro',
    slug: 'iphone-14-pro',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 2599, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 2099, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 749, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 649, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1999, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 499, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 499, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 1299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 449, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 449, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 499, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 14 Pro Max',
    slug: 'iphone-14-pro-max',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 2799, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 2299, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 799, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 699, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 2099, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 499, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 499, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 1399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 449, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 449, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 499, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 15',
    slug: 'iphone-15',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 2399, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 1899, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 749, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 649, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 1999, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport (USB-C)', price: 499, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 499, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 1199, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 449, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 449, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 499, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 15 Plus',
    slug: 'iphone-15-plus',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 2599, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 2099, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 799, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 699, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 2199, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport (USB-C)', price: 549, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 549, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 1299, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 499, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 499, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 549, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 15 Pro',
    slug: 'iphone-15-pro',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 2799, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 2299, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 799, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 699, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (kun glas)', price: 2399, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport (USB-C)', price: 599, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 599, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 1499, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 549, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 549, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 599, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 2999, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 2499, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 849, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 749, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (kun glas)', price: 2599, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport (USB-C)', price: 599, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 599, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 1599, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 549, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 549, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 599, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 16',
    slug: 'iphone-16',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 2599, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 2099, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 799, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 699, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 2299, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport (USB-C)', price: 549, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 549, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 1399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 499, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 499, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 549, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 16 Plus',
    slug: 'iphone-16-plus',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 2799, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 2299, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 849, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 749, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (glas)', price: 2499, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport (USB-C)', price: 599, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 599, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 1499, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 549, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 549, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 599, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 16 Pro',
    slug: 'iphone-16-pro',
    repairs: [
      { id: 'screen_original', label: 'Skærmreparation – Original', price: 2799, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmreparation – Kompatibel', price: 2199, time: '~30 min', warranty: '24 mdr' },
      { id: 'back_glass', label: 'Bagcover reparation', price: 1899, time: '~25–35 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 899, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 699, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport (USB-C)', price: 599, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera system', price: 1299, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 399, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 199, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 149, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 399, time: '~30–60 min', warranty: 'Ingen' }
    ]},
  {
    brand: 'Apple',
    name: 'iPhone 16 Pro Max',
    slug: 'iphone-16-pro-max',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 3299, time: '~30 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 2799, time: '~30 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 899, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 799, time: '~15–20 min', warranty: '12 mdr' },
      { id: 'back_glass', label: 'Bagcover (kun glas)', price: 2899, time: '~45–60 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport (USB-C)', price: 649, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'mic', label: 'Mikrofon', price: 649, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 1799, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'earpiece', label: 'Ørehøjttaler', price: 599, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'loudspeaker', label: 'Højttaler (bund)', price: 599, time: '~20–30 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 649, time: '~30–60 min', warranty: 'Ingen' }
    ]}
];

export const MODELS: Model[] = [
  ...APPLE_MODELS,
  {
    brand: 'Samsung',
    name: 'Galaxy S21',
    slug: 'galaxy-s21',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 1299, time: '~45 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 999, time: '~45 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 499, time: '~30 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 399, time: '~30 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 299, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 599, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
      { id: 'water_damage', label: 'Væskeskade-rens', price: 199, time: '~30–60 min', warranty: 'Ingen' },
    ],
  },
  {
    brand: 'Google',
    name: 'Pixel 7',
    slug: 'pixel-7',
    repairs: [
      { id: 'screen_original', label: 'Skærmskift – Original', price: 1199, time: '~45 min', warranty: '24 mdr' },
      { id: 'screen_compatible', label: 'Skærmskift – Kompatibel', price: 899, time: '~45 min', warranty: '24 mdr' },
      { id: 'battery_original', label: 'Batteriskift – Original', price: 449, time: '~30 min', warranty: '12 mdr' },
      { id: 'battery_compatible', label: 'Batteriskift – Kompatibel', price: 349, time: '~30 min', warranty: '12 mdr' },
      { id: 'chargeport', label: 'Ladeport', price: 299, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'rear_camera', label: 'Bag-kamera', price: 599, time: '~30–45 min', warranty: '12 mdr' },
      { id: 'software', label: 'Software', price: 99, time: '~15–45 min', warranty: 'Ingen' },
      { id: 'diagnostics', label: 'Fejlsøgning/diagnose', price: 99, time: '~15–30 min', warranty: 'Ingen' },
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
