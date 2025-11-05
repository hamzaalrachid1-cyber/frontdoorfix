interface SchemaOrgProps {
  type: 'LocalBusiness' | 'Product' | 'FAQPage' | 'BreadcrumbList';
  data: Record<string, unknown> & { model?: string; repairs?: Array<{ title: string; price: number | string; [key: string]: unknown }> };
}

export default function SchemaOrg({ type, data }: SchemaOrgProps) {
  const getSchema = () => {
    switch (type) {
      case 'LocalBusiness':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Frontdoorfix",
          "description": "Mobile reparation i København og omegn. Vi kommer til dig og reparerer iPhone, Samsung og andre smartphones på 20-30 minutter.",
          "url": "https://frontdoorfix.dk",
          "telephone": "+45 93 54 54 57",
          "email": "info@frontdoorfix.dk",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "København",
            "addressCountry": "DK"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "55.6761",
            "longitude": "12.5683"
          },
          "areaServed": [
            "København",
            "Frederiksberg", 
            "Hellerup",
            "Lyngby",
            "Gentofte",
            "Valby",
            "Amager"
          ],
          "serviceType": "Mobile reparation",
          "priceRange": "$$",
          "openingHours": "Mo-Fr 08:00-18:00,Sa 09:00-16:00",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "150"
          }
        };

      case 'Product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": `${data.model} reparation`,
          "description": `${data.model} reparation og service i København og omegn. Vi kommer til dig og reparerer på 20-30 minutter.`,
          "brand": {
            "@type": "Brand",
            "name": "Apple"
          },
          "category": "Mobile reparation",
          "offers": data.repairs?.map((repair: { title: string; price: number | string; [key: string]: unknown }) => ({
            "@type": "Offer",
            "name": repair.title,
            "description": repair.description,
            "price": repair.price === 'contact' ? '0' : repair.price === null ? '0' : repair.price.toString(),
            "priceCurrency": "DKK",
            "availability": "https://schema.org/InStock",
            "validFrom": "2024-01-01",
            "seller": {
              "@type": "Organization",
              "name": "Frontdoorfix"
            },
            "warranty": {
              "@type": "WarrantyPromise",
              "duration": repair.warranty
            }
          }))
        };

      case 'FAQPage':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Hvor lang tid tager en reparation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "De fleste reparationer tager 20–30 minutter på din adresse. Softwareopgaver tager typisk 15–45 minutter, og væske-/vandskader 30–60 minutter."
              }
            },
            {
              "@type": "Question", 
              "name": "Mister jeg data under reparationen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nej. Vi sletter ikke dine data, og vi behøver ikke at se dit indhold. Lav gerne en backup for en sikkerheds skyld."
              }
            },
            {
              "@type": "Question",
              "name": "Hvilken garanti får jeg?",
              "acceptedAnswer": {
                "@type": "Answer", 
                "text": "Skærm: 24 mdr. • Batteri & øvrige dele: 12 mdr. (Væske-/vandskader er undtaget garanti.)"
              }
            },
            {
              "@type": "Question",
              "name": "Dækker I mit område?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, vi kører i København og omegn. Er du i tvivl, så kontakt os – vi finder en løsning."
              }
            },
            {
              "@type": "Question",
              "name": "Hvilke reservedele bruger I?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "iPhone: Original (kalibreret/pulled) eller Kompatibel (A-kvalitet). Android (Samsung, Huawei, OnePlus m.fl.): Originale servicepacks (nye)."
              }
            }
          ]
        };

      case 'BreadcrumbList':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": (data as Array<{ name: string; url: string; [key: string]: unknown }>).map((item: { name: string; url: string; [key: string]: unknown }, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        };

      default:
        return null;
    }
  };

  const schema = getSchema();
  
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2)
      }}
    />
  );
}
