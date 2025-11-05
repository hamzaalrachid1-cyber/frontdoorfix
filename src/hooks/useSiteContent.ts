import { useState, useEffect } from 'react';

interface SiteContent {
  hero: {
    headline: string;
    description: string;
    ctaButton: string;
    ctaLink: string;
  };
  howItWorks: {
    title: string;
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  brands: {
    title: string;
    description: string;
    brandList: string[];
  };
  services: {
    title: string;
    description: string;
    items: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  faq: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  company: {
    name: string;
    tagline: string;
    description: string;
  };
}

const defaultSiteContent: SiteContent = {
  hero: {
    headline: "Vi fikser din mobil – dér hvor du er",
    description: "Nem og tryg reparation uden at forlade hjemmet eller kontoret. Hurtigt, professionelt og med garanti.",
    ctaButton: "Bestil tid nu",
    ctaLink: "/booking"
  },
  howItWorks: {
    title: "Sådan fungerer det – nem reparation i 3 trin",
    steps: [
      {
        number: "1",
        title: "Book en tid",
        description: "Vælg din reparation online eller ring direkte til os. Hurtigt og enkelt."
      },
      {
        number: "2", 
        title: "Vi kommer til dig",
        description: "Vores tekniker kører hjem til dig eller til dit kontor med alt udstyr."
      },
      {
        number: "3",
        title: "Reparation på stedet", 
        description: "Din mobil repareres på under 30 minutter – sikkert og med garanti."
      }
    ]
  },
  brands: {
    title: "Vi reparerer alle mærker",
    description: "Vi reparerer alle populære mærker – altid med garanti",
    brandList: ["Huawei", "OnePlus", "Motorola", "Samsung", "iPhone", "Google", "Sony", "Nokia"]
  },
  services: {
    title: "Hvad vi kan hjælpe dig med",
    description: "Vi tilbyder omfattende reparationer på alle enheder",
    items: [
      {
        icon: "📱",
        title: "Skærmskift",
        description: "Hurtigt skærmskift på alle telefoner og tablets med originale dele"
      },
      {
        icon: "🔋",
        title: "Batteriskift", 
        description: "Nyt batteri der holder længere og lader hurtigere"
      },
      {
        icon: "📷",
        title: "Kamera reparation",
        description: "Reparation af kamera og optik på alle enheder"
      },
      {
        icon: "💧",
        title: "Vandskade",
        description: "Professionel reparation af vandskadede enheder"
      }
    ]
  },
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        question: "Hvor lang tid tager en reparation?",
        answer: "De fleste reparationer tager mellem 20-60 minutter afhængigt af skaden."
      },
      {
        question: "Hvilke dele bruger I?",
        answer: "Vi bruger kun originale dele fra producenten for at sikre bedste kvalitet."
      },
      {
        question: "Hvor længe er garantien?",
        answer: "Vi giver 24 måneders garanti på skærme og 12 måneder på andre dele."
      }
    ]
  },
  contact: {
    phone: "+45 93 54 54 57",
    email: "info@frontdoorfix.dk", 
    address: "København, Danmark",
    hours: "Alle dage: 8:00 - 22:00"
  },
  company: {
    name: "Frontdoorfix",
    tagline: "Udkørende værksted",
    description: "Hurtig og pålidelig mobil- og elektronikreparation direkte på din adresse i København. 24 måneders garanti på skærme."
  }
};

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/admin/site-content');
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        } else {
          console.warn('Failed to fetch site content, using defaults');
          setContent(defaultSiteContent);
        }
      } catch (err) {
        console.error('Error fetching site content:', err);
        setError('Failed to load site content');
        setContent(defaultSiteContent);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
}

