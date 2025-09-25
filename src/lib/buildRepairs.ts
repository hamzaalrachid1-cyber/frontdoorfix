import { ModelSpec, RepairId } from '@/data/apple/types';

export interface RepairItem {
  id: RepairId;
  title: string;
  subtitle?: string;
  price: number | 'contact';
  duration?: string;
  warranty?: string;
  category: 'Skærm' | 'Batteri' | 'Kamera' | 'Lyd/Knapper' | 'Porte' | 'Software/Andet';
  warning?: string; // fx "Touch ID kan ikke genskabes på iPhone 6"
}

export function buildRepairs(spec: ModelSpec): RepairItem[] {
  const d = spec.defaults || {};
  const price = (id: RepairId) => spec.prices[id];

  const items: (RepairItem | false)[] = [
    // Skærm
    price('screen_original') !== undefined && {
      id: 'screen_original',
      title: 'Skærmskift – Original',
      subtitle: 'Glas + LCD udskiftes. Lys, farver og touch gendannes.',
      price: price('screen_original')!,
      duration: d.duration,
      warranty: d.warrantyScreen,
      category: 'Skærm'
    },
    price('screen_compat') !== undefined && {
      id: 'screen_compat',
      title: 'Skærmskift – Kompatibel',
      subtitle: 'Glas + LCD udskiftes (kompatibel kvalitet).',
      price: price('screen_compat')!,
      duration: d.duration,
      warranty: d.warrantyScreen,
      category: 'Skærm'
    },

    // Batteri
    price('battery_original') !== undefined && {
      id: 'battery_original',
      title: 'Batteriskift – Original',
      subtitle: 'Nyt batteri med frisk kapacitet. Kalibrering + test.',
      price: price('battery_original')!,
      duration: '~15–20 min',
      warranty: d.warrantyBattery,
      category: 'Batteri'
    },
    price('battery_compat') !== undefined && {
      id: 'battery_compat',
      title: 'Batteriskift – Kompatibel',
      subtitle: 'Kompatibelt batteri. Kalibrering + test.',
      price: price('battery_compat')!,
      duration: '~15–20 min',
      warranty: d.warrantyBattery,
      category: 'Batteri'
    },

    // Bagcover (kun glas) – KUN hvis modellen har bagglas
    spec.hasBackGlass && price('back_glass') !== undefined && {
      id: 'back_glass',
      title: 'Bagcover (kun glas)',
      subtitle: 'Udskiftning af bagglas. Inkl. test.',
      price: price('back_glass')!,
      duration: d.duration,
      warranty: d.warrantyBattery,
      category: 'Kamera'
    },

    // Porte
    price('charging_port') !== undefined && {
      id: 'charging_port',
      title: 'Ladeport',
      subtitle: 'Reparation af opladningsproblemer. Inkl. rensning.',
      price: price('charging_port')!,
      duration: d.duration,
      warranty: d.warrantyBattery,
      category: 'Porte'
    },

    // Kamera
    price('front_camera') !== undefined && {
      id: 'front_camera',
      title: 'For-kamera',
      subtitle: 'Udskiftning af for-kamera. Inkl. test.',
      price: price('front_camera')!,
      duration: d.duration,
      warranty: d.warrantyBattery,
      category: 'Kamera'
    },

    price('rear_camera') !== undefined && {
      id: 'rear_camera',
      title: 'Bag-kamera',
      subtitle: 'Udskiftning af bag-kamera. Inkl. test.',
      price: price('rear_camera')!,
      duration: d.duration,
      warranty: d.warrantyBattery,
      category: 'Kamera'
    },

    // Lyd/Knapper - Hjem-knap kun hvis understøttet
    spec.supportsHomeButton && price('home_button') !== undefined && {
      id: 'home_button',
      title: 'Hjem-knap',
      subtitle: 'Udskiftning af hjem-knap + test.',
      price: price('home_button')!,
      duration: '~30–45 min',
      warranty: d.warrantyBattery,
      category: 'Lyd/Knapper',
      warning: spec.id === 'iphone-6' || spec.id === 'iphone-6-plus' 
        ? 'Touch ID kan ikke genskabes på denne model' 
        : undefined
    },

    price('microphone') !== undefined && {
      id: 'microphone',
      title: 'Mikrofon',
      subtitle: 'Udskiftning af mikrofon. Inkl. test.',
      price: price('microphone')!,
      duration: d.duration,
      warranty: d.warrantyBattery,
      category: 'Lyd/Knapper'
    },

    price('earpiece') !== undefined && {
      id: 'earpiece',
      title: 'Ørehøjttaler',
      subtitle: 'Udskiftning af ørehøjttaler. Inkl. test.',
      price: price('earpiece')!,
      duration: d.duration,
      warranty: d.warrantyBattery,
      category: 'Lyd/Knapper'
    },

    price('loudspeaker') !== undefined && {
      id: 'loudspeaker',
      title: 'Højttaler (bund)',
      subtitle: 'Udskiftning af højttaler. Inkl. test.',
      price: price('loudspeaker')!,
      duration: d.duration,
      warranty: d.warrantyBattery,
      category: 'Lyd/Knapper'
    },

    // Software / Andet
    price('software') !== undefined && {
      id: 'software',
      title: 'Software',
      subtitle: 'Backup, gendannelse, opdatering (hvis muligt).',
      price: price('software')!,
      duration: '~15–45 min',
      warranty: 'Ingen',
      category: 'Software/Andet'
    },

    price('diagnostics') !== undefined && {
      id: 'diagnostics',
      title: 'Fejlsøgning/diagnose',
      subtitle: 'Fratrækkes ved reparation.',
      price: price('diagnostics')!,
      duration: '~15–30 min',
      warranty: 'Ingen',
      category: 'Software/Andet'
    },

    price('water_damage') !== undefined && {
      id: 'water_damage',
      title: 'Væskeskade-rens',
      subtitle: 'Rensning og diagnosticering.',
      price: price('water_damage')!,
      duration: '~30–60 min',
      warranty: 'Ingen',
      category: 'Software/Andet'
    },

    price('data_recovery') !== undefined && {
      id: 'data_recovery',
      title: 'Dataredning',
      subtitle: 'Gendannelse af data (hvis muligt).',
      price: price('data_recovery')!,
      duration: 'Variabel',
      warranty: 'Ingen',
      category: 'Software/Andet'
    }
  ];

  return items.filter(Boolean) as RepairItem[];
}
