export interface RepairOffer {
  name: string;
  description: string;
  price: number | string;
  warranty: string;
}

export interface ProductSchemaData {
  modelName: string;
  description: string;
  offers: RepairOffer[];
}

export function generateProductSchema(data: ProductSchemaData) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${data.modelName} reparation`,
    "description": data.description,
    "brand": {
      "@type": "Brand",
      "name": "Apple"
    },
    "category": "Mobile reparation",
    "offers": data.offers.map(offer => ({
      "@type": "Offer",
      "name": offer.name,
      "description": offer.description,
      "price": typeof offer.price === 'number' ? offer.price.toString() : '0',
      "priceCurrency": "DKK",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split('T')[0],
      "seller": {
        "@type": "Organization",
        "name": "Frontdoorfix"
      },
      "warranty": {
        "@type": "WarrantyPromise",
        "duration": offer.warranty
      }
    }))
  };
}
