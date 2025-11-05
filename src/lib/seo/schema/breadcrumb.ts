export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateModelBreadcrumbs(modelName: string, modelSlug: string) {
  return generateBreadcrumbSchema([
    { name: "Forside", url: "https://frontdoorfix.dk" },
    { name: "Reparation & priser", url: "https://frontdoorfix.dk/reparationer" },
    { name: "Apple", url: "https://frontdoorfix.dk/reparationer/apple" },
    { name: modelName, url: `https://frontdoorfix.dk/reparationer/apple/${modelSlug}` }
  ]);
}
