import { describe, it, expect } from 'vitest';
import { generateBreadcrumbSchema, generateModelBreadcrumbs } from '../breadcrumb';
import { generateProductSchema } from '../product';
import { generateFAQSchema, DEFAULT_FAQS } from '../faq';
import { generateOrganizationSchema } from '../org';

describe('Schema.org helpers', () => {
  describe('Breadcrumb Schema', () => {
    it('should generate valid breadcrumb schema', () => {
      const items = [
        { name: 'Home', url: 'https://example.com' },
        { name: 'Products', url: 'https://example.com/products' }
      ];
      
      const schema = generateBreadcrumbSchema(items);
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(2);
      expect(schema.itemListElement[0].position).toBe(1);
      expect(schema.itemListElement[0].name).toBe('Home');
    });

    it('should generate model breadcrumbs', () => {
      const schema = generateModelBreadcrumbs('iPhone 15 Pro', 'iphone-15-pro');
      
      expect(schema.itemListElement).toHaveLength(4);
      expect(schema.itemListElement[3].name).toBe('iPhone 15 Pro');
      expect(schema.itemListElement[3].item).toBe('https://frontdoorfix.dk/reparationer/apple/iphone-15-pro');
    });
  });

  describe('Product Schema', () => {
    it('should generate valid product schema', () => {
      const data = {
        modelName: 'iPhone 15 Pro',
        description: 'iPhone 15 Pro reparation',
        offers: [
          {
            name: 'Skærm reparation',
            description: 'Udskiftning af skærm',
            price: 899,
            warranty: '24 mdr.'
          }
        ]
      };
      
      const schema = generateProductSchema(data);
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Product');
      expect(schema.name).toBe('iPhone 15 Pro reparation');
      expect(schema.brand.name).toBe('Apple');
      expect(schema.offers).toHaveLength(1);
      expect(schema.offers[0].price).toBe('899');
    });
  });

  describe('FAQ Schema', () => {
    it('should generate valid FAQ schema', () => {
      const faqs = [
        {
          question: 'Hvor lang tid tager en reparation?',
          answer: 'De fleste reparationer tager 20-30 minutter.'
        }
      ];
      
      const schema = generateFAQSchema(faqs);
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('FAQPage');
      expect(schema.mainEntity).toHaveLength(1);
      expect(schema.mainEntity[0].name).toBe('Hvor lang tid tager en reparation?');
    });

    it('should have default FAQs', () => {
      expect(DEFAULT_FAQS).toHaveLength(8);
      expect(DEFAULT_FAQS[0].question).toContain('Hvor lang tid');
    });
  });

  describe('Organization Schema', () => {
    it('should generate valid organization schema', () => {
      const schema = generateOrganizationSchema();
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('LocalBusiness');
      expect(schema.name).toBe('Frontdoorfix');
      expect(schema.telephone).toBe('+45 93 54 54 57');
      expect(schema.address.addressLocality).toBe('København');
    });
  });

  describe('JSON Serialization', () => {
    it('should serialize all schemas to valid JSON', () => {
      const breadcrumb = generateModelBreadcrumbs('iPhone 15 Pro', 'iphone-15-pro');
      const product = generateProductSchema({
        modelName: 'iPhone 15 Pro',
        description: 'Test',
        offers: []
      });
      const faq = generateFAQSchema(DEFAULT_FAQS);
      const org = generateOrganizationSchema();
      
      expect(() => JSON.stringify(breadcrumb)).not.toThrow();
      expect(() => JSON.stringify(product)).not.toThrow();
      expect(() => JSON.stringify(faq)).not.toThrow();
      expect(() => JSON.stringify(org)).not.toThrow();
    });
  });
});
