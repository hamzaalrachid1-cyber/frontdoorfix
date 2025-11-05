import { useState, useEffect } from 'react';

interface SiteSettings {
  ipadPageTitle: string;
  iphonePageTitle: string;
  ipadHeroTitle: string;
  iphoneHeroTitle: string;
  ipadPageDescription: string;
  iphonePageDescription: string;
  companyName: string;
  companyPhone: string;
  companyEmail: string;
}

const defaultSettings: SiteSettings = {
  ipadPageTitle: "iPad Reparationer",
  iphonePageTitle: "iPhone Reparationer", 
  ipadHeroTitle: "iPad Reparationer",
  iphoneHeroTitle: "iPhone Reparationer",
  ipadPageDescription: "Vi reparerer alle iPad-modeller med originale dele og 24 måneders garanti. Hurtig service direkte på din adresse.",
  iphonePageDescription: "Vi reparerer alle iPhone-modeller med originale dele og 24 måneders garanti. Hurtig service direkte på din adresse.",
  companyName: "Frontdoorfix",
  companyPhone: "+45 93 54 54 57",
  companyEmail: "info@frontdoorfix.dk"
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/admin/settings');
        if (response.ok) {
          const data = await response.json();
          setSettings({ ...defaultSettings, ...data });
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
}

