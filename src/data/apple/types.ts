export type RepairId =
  | 'screen_original'
  | 'screen_compat'
  | 'battery_original'
  | 'battery_compat'
  | 'charging_port'
  | 'microphone'
  | 'front_camera'
  | 'rear_camera'
  | 'home_button'
  | 'earpiece'
  | 'loudspeaker'
  | 'software'
  | 'diagnostics'
  | 'water_damage'
  | 'data_recovery'
  | 'back_glass';

export interface ModelSpec {
  brand: 'Apple';
  id: string;          // fx "iphone-6", "iphone-8", "iphone-11"
  name: string;        // "iPhone 6"
  year?: number;
  hasBackGlass: boolean;       // true fra iPhone 8 og opefter
  supportsHomeButton: boolean; // false fra iPhone X og opefter
  defaults?: {
    duration?: string;         // fx "~20–30 min"
    warrantyScreen?: string;   // fx "24 mdr"
    warrantyBattery?: string;  // fx "12 mdr"
  };
  prices: Partial<Record<RepairId, number | 'contact'>>; // 'contact' = vis "Kontakt os"
}
