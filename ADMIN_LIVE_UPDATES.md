# Admin Live Updates - Hvordan det fungerer

## ✅ Ja, ændringer i admin bliver direkte synlige på hjemmesiden!

Når du deployer hjemmesiden til et domæne og laver ændringer i admin-panelet, bliver ændringerne **automatisk synlige direkte** på hjemmesiden. Her er hvordan:

## Hvordan det virker:

### 1. **Direkte Database/File System Connection**
- Admin-panelet gemmer ændringer direkte i:
  - **Prisma Database** (SQLite) for brand settings
  - **JSON filer** (`src/data/`) for brands, series, models
  - **Filstystem** for uploadede billeder

### 2. **Ingen Cache på API Routes**
- Alle vigtige API routes har `Cache-Control: no-store` headers
- Dette betyder at hver gang hjemmesiden henter data, får den de nyeste værdier
- Ingen cache mellem admin og hjemmeside

### 3. **Next.js Cache Revalidation**
- Når du opdaterer modeller, invalidates Next.js automatisk cache for relevante sider
- Dette sikrer at siderne viser opdateret indhold

## Hvad bliver opdateret live:

✅ **Brand Settings** (logo, navn, kontaktinfo) - via Prisma database  
✅ **Brands** (mærker) - via JSON filer  
✅ **Series** (serier som iPhone, iPad) - via JSON filer  
✅ **Models** (konkrete modeller) - via JSON filer  
✅ **Repairs** (reparationer og priser) - via JSON filer  
✅ **Media** (billeder) - via filsystem  
✅ **SEO Settings** - via database/filer  

## Vigtigt at vide:

### ⚠️ Ved Deployment (Vercel, Netlify, etc.):

1. **Database skal være persistent**
   - SQLite filen (`dev.db`) skal være i et persistent filsystem
   - Eller brug en cloud database (PostgreSQL, MySQL) i stedet
   - JSON filer skal også være i et persistent filsystem

2. **File Uploads skal være persistent**
   - Uploadede billeder i `/public/uploads/` skal bevares
   - Eller brug cloud storage (AWS S3, Cloudinary, etc.)

3. **Environment Variables**
   - `DATABASE_URL` skal pege på en persistent database
   - `ADMIN_CODE` skal være sat i production environment

## Anbefalinger til Production:

### Option 1: Cloud Database (Anbefalet)
```env
# .env.production
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

### Option 2: Persistent Volume (hvis du har egen server)
- Sikre at `prisma/dev.db` og `src/data/` mappe er på et persistent volume
- Sikre at `public/uploads/` er på et persistent volume

### Option 3: Hybrid Approach
- Database: Cloud database (PostgreSQL)
- Filer: Cloud storage (S3, Cloudinary)
- JSON data: Eventuelt flytte til database også

## Test lokalt:

1. Åbn hjemmesiden i browser: `http://localhost:3001`
2. Log ind i admin: `http://localhost:3001/admin/login`
3. Lav en ændring (fx ændre et brand navn)
4. Opdater hjemmesiden - ændringen skulle være synlig med det samme!

## Ved Problemer:

Hvis ændringer ikke vises:

1. **Tjek browser cache** - Prøv hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
2. **Tjek server logs** - Se om der er fejl
3. **Tjek database/filer** - Verificer at ændringerne er gemt
4. **Tjek API responses** - Se om API'en returnerer opdateret data

## Sikkerhed:

- Admin login er beskyttet med kode
- Alle admin routes kræver authentication
- API routes er åbne (men det er normalt for Next.js)

---

**Opsummering:** Ja, ændringer i admin bliver direkte synlige på hjemmesiden. Systemet er designet til live updates uden manuel cache clearing.

