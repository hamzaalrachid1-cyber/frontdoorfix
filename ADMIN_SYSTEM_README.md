# 🌐 Omfattende Admin System

## Oversigt

Dette system giver dig **fuld kontrol** over alt indhold på hjemmesiden. Du kan nu redigere:

- ✅ **Hero sektion** (overskrift, beskrivelse, CTA knapper)
- ✅ **Sådan virker det** (trin-for-trin proces)
- ✅ **Mærker** (liste over reparationer)
- ✅ **Services** (hvad I tilbyder)
- ✅ **FAQ** (ofte stillede spørgsmål)
- ✅ **Kontakt information** (telefon, email, adresse, åbningstider)
- ✅ **Virksomhed information** (navn, tagline, beskrivelse)

## 🚀 Sådan Bruger Du Det

### 1. Gå til Admin Panel
```
http://localhost:3000/admin
```

### 2. Klik på "🌐 Rediger Alt Indhold"
Dette tager dig til det omfattende admin system hvor du kan redigere alt.

### 3. Vælg en Sektion
- **Hero Sektion**: Rediger overskrift og beskrivelse på forsiden
- **Sådan Virker Det**: Tilføj/fjern trin i processen
- **Mærker**: Rediger hvilke mærker I reparerer
- **Services**: Tilføj/fjern services I tilbyder
- **FAQ**: Tilføj/fjern spørgsmål og svar
- **Kontakt**: Opdater telefon, email, adresse, åbningstider
- **Virksomhed**: Rediger firmanavn og beskrivelse

### 4. Gør Ændringer
- Rediger tekster direkte i input felterne
- Tilføj nye elementer med "➕ Tilføj" knapper
- Fjern elementer med "🗑️" knapper
- Alle ændringer gemmes automatisk

### 5. Gem Ændringer
Klik på "💾 Gem Ændringer" knappen øverst til højre.

## 📁 Filer og Struktur

```
src/
├── app/
│   ├── admin/
│   │   ├── comprehensive/          # Omfattende admin panel
│   │   │   └── page.tsx           # Hovedside for redigering
│   │   ├── demo/                  # Demo side der viser dynamisk indhold
│   │   │   └── page.tsx
│   │   └── page.tsx               # Hovedadmin med link til omfattende system
│   └── api/
│       └── admin/
│           └── site-content/      # API til at hente/gemme indhold
│               └── route.ts
├── hooks/
│   └── useSiteContent.ts         # Hook til at bruge indhold på sider
└── data/
    └── siteContent.json          # JSON fil med alt indhold
```

## 🔧 Tekniske Detaljer

### API Endpoints
- `GET /api/admin/site-content` - Hent alt indhold
- `PUT /api/admin/site-content` - Gem ændringer

### Data Struktur
Alle indhold gemmes i `src/data/siteContent.json` med følgende struktur:

```json
{
  "hero": {
    "headline": "Overskrift på forsiden",
    "description": "Beskrivelse",
    "ctaButton": "Knap tekst",
    "ctaLink": "/link"
  },
  "howItWorks": {
    "title": "Sektion titel",
    "steps": [
      {
        "number": "1",
        "title": "Trin titel",
        "description": "Trin beskrivelse"
      }
    ]
  },
  "services": {
    "title": "Services titel",
    "description": "Beskrivelse",
    "items": [
      {
        "icon": "📱",
        "title": "Service navn",
        "description": "Service beskrivelse"
      }
    ]
  },
  "faq": {
    "title": "FAQ titel",
    "items": [
      {
        "question": "Spørgsmål",
        "answer": "Svar"
      }
    ]
  },
  "contact": {
    "phone": "+45 93 54 54 57",
    "email": "info@frontdoorfix.dk",
    "address": "København, Danmark",
    "hours": "Alle dage: 8:00 - 22:00"
  },
  "company": {
    "name": "Frontdoorfix",
    "tagline": "Udkørende værksted",
    "description": "Beskrivelse af virksomheden"
  },
  "brands": {
    "title": "Mærker titel",
    "description": "Beskrivelse",
    "brandList": ["Huawei", "OnePlus", "Motorola", "Samsung"]
  }
}
```

## 🎯 Sådan Integrerer Du Det på Sider

### 1. Importer Hook
```tsx
import { useSiteContent } from '@/hooks/useSiteContent';
```

### 2. Brug Hook i Komponent
```tsx
export default function MyPage() {
  const { content, loading, error } = useSiteContent();

  if (loading) return <div>Indlæser...</div>;
  if (error) return <div>Fejl: {error}</div>;

  return (
    <div>
      <h1>{content.hero.headline}</h1>
      <p>{content.hero.description}</p>
      <button>{content.hero.ctaButton}</button>
    </div>
  );
}
```

## 🚨 Vigtige Noter

1. **Backup**: Gør backup af `siteContent.json` før store ændringer
2. **Test**: Brug demo siden (`/admin/demo`) til at teste ændringer
3. **Sikkerhed**: Kun admin brugere kan redigere indhold
4. **Performance**: Indhold caches automatisk for bedre performance

## 🔄 Fremtidige Udvidelser

Systemet kan nemt udvides til at inkludere:
- 🖼️ **Billede upload** for hero sektion
- 🎨 **Farve temaer** og styling
- 📱 **SEO metadata** redigering
- 🌍 **Multi-sprog** support
- 📊 **Analytics** integration
- 🎯 **A/B testing** af indhold

## 🆘 Fejlfinding

### Problem: Ændringer gemmes ikke
**Løsning**: Tjek om du har klikket "💾 Gem Ændringer" knappen

### Problem: Sider viser ikke nye ændringer
**Løsning**: Refresh siden eller tjek om API endpoint virker

### Problem: Admin panel viser ikke
**Løsning**: Tjek om server kører og du er logget ind som admin

## 📞 Support

Hvis du har problemer med systemet, tjek:
1. Browser console for fejl
2. Server logs for API fejl
3. `siteContent.json` filen for korrekt format

---

**🎉 Nu kan du redigere ALT indhold på hjemmesiden direkte fra admin panelet!**

