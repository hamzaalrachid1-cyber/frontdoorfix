# SEO-Lint System

Dette system sikrer at alle iPhone/brand-modelsider har unik, indeksérbar kvalitet, valid strukturdata, korrekte canonicals/sitemaps og stærk intern linking.

## 🚀 Kommandoer

### Lokal udvikling
```bash
# Kør alle SEO-checks
npm run seo:all

# Individuelle checks
npm run seo:lint        # Duplikat og tyndt indhold
npm run seo:sitemap     # Canonical/sitemap konsistens
npm run seo:crawl       # Orphan links
npm test               # Strukturdata tests
```

### CI/CD
GitHub Actions kører automatisk på PR:
- Build og test
- SEO lint checks
- Lighthouse CI (Core Web Vitals)
- Strukturdata validering

## 📁 Filstruktur

```
/lib/seo/
  schema/
    breadcrumb.ts      # BreadcrumbList schema
    product.ts         # Product schema med offers
    faq.ts            # FAQPage schema
    org.ts            # LocalBusiness schema
    __tests__/        # Vitest tests
  contentQuality.ts   # Indholds-kvalitet assessment
  similarity.ts       # Duplikat-detection
  links.ts           # Orphan link checker
  contentHooks.ts    # React hooks og templates

/components/Seo/
  Breadcrumb.tsx      # Breadcrumb komponent
  JsonLd.tsx         # Generisk JSON-LD
  WordCountBadge.tsx # Dev-mode word count

/scripts/
  seo-lint.mjs       # Hoved-SEO checker
  seo-sitemap-check.mjs # Canonical/sitemap validator
  crawl.mjs          # Site crawler
```

## 🔍 SEO Checks

### 1. Indholds-kvalitet
- **Minimum 250 ord** per modelside
- **Call-to-action** påkrævet (bestil, ring, kontakt)
- **Kontaktinformation** (+45, mail, @)
- **Tekniske termer** (reparation, garanti, batteri, skærm)

### 2. Duplikat-detection
- **Jaccard + Cosine similarity** algoritmer
- **70% threshold** for flagging
- **Normaliseret tekst** (fjerner tal, HTML, punctuation)
- **Whitelist** for fælles sektioner

### 3. Canonical/Sitemap konsistens
- Alle sitemap URLs matcher canonical URLs
- Ingen døde links eller redirects
- Korrekt lastmod opdatering

### 4. Orphan links
- Alle sider har minimum 2 indgående interne links
- Crawler følger alle interne links fra start-sider
- Rapporterer forældreløse sider

## 🛠️ Hvordan man bruger systemet

### Når en side flagges som "tynd"
1. **Tjek word count**: Dev-mode viser live badge
2. **Tilføj indhold**: Brug `generateModelContentTemplate()`
3. **Tilføj interne links**: Brug `addInternalLinks()`
4. **Kør seo:lint igen**

### Når duplikat-detection fejler
1. **Identificer par**: Script viser hvilke sider der ligner
2. **Omskriv sektioner**: Fokusér på unikke detaljer per model
3. **Brug whitelist**: Fælles sektioner (garanti, kontakt) kan være ens
4. **Test igen**: Kør seo:lint for at verificere

### Når canonical/sitemap fejler
1. **Tjek metadata**: Sørg for korrekt canonical URL
2. **Opdater sitemap**: `src/app/sitemap.ts` skal matche
3. **Test lokalt**: Kør seo:sitemap før commit

## 📝 Indholds-templates

### Automatisk generering
```typescript
import { generateModelContentTemplate, addInternalLinks } from '@/lib/seo/contentHooks';

const content = generateModelContentTemplate(
  'iPhone 15 Pro',
  '2023',
  'A17 Pro',
  'OLED LTPO',
  true // supportsBackGlass
);

const enhancedContent = addInternalLinks(content, 'iPhone 15 Pro', 'iphone-15-pro');
```

### Manuel redigering
Rediger den unikke "Om {model} reparation" sektion i:
- `src/content/models.ts` - SEO indhold
- `src/components/ModelSeoCopy.tsx` - Rendering

## 🧪 Tests

### Strukturdata tests
```bash
npm test
```
Validerer at alle schema helpers:
- Genererer gyldig JSON-LD
- Matcher forventede nøgler
- Kan serialiseres uden fejl

### Lighthouse CI
```bash
npm run build
npm start &
npm run seo:all
```
Tjekker Core Web Vitals:
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms

## 🚨 Fejlfinding

### "Could not fetch content"
- Sørg for at `npm start` kører på port 3000
- Tjek at alle routes er tilgængelige
- Verificer at build er successful

### "High similarity detected"
- Omskriv fælles sektioner med model-specifikke detaljer
- Tilføj unikke tekniske specifikationer
- Brug forskellige eksempler og cases

### "Orphan pages found"
- Tilføj interne links fra brand-hub sider
- Link til relaterede modeller
- Sikr breadcrumb navigation

## 📊 Acceptkriterier

✅ Ingen seo:lint-fejl (duplikat >0.70, orphan pages, thin pages)  
✅ Alle strukturdata-helpers inkluderet og stringify-tests passerer  
✅ Canonical == sitemap loc for alle modelsider  
✅ Mindst 2 interne links fra hver modelside til booking/relaterede sider  
✅ Lighthouse CI grønt (LCP/CLS/INP indenfor budget)  

## 🔧 Konfiguration

### Lighthouse CI budget
Rediger `lighthouse-ci.json` for at justere:
- Performance thresholds
- Accessibility requirements
- SEO scores

### Duplikat threshold
Rediger `src/lib/seo/similarity.ts`:
```typescript
if (avgSimilarity > 0.70) { // Ændr denne værdi
```

### Content quality requirements
Rediger `src/lib/seo/contentQuality.ts`:
```typescript
const isThin = wordCount < 250 || !hasCTA; // Ændr krav
```
