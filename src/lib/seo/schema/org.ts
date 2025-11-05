export function generateOrganizationSchema() {
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
}
