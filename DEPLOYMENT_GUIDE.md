# Deployment Guide - FrontDoorFix

## ⚠️ VIGTIGT: Next.js Hosting

Dit Next.js projekt har **specifikke krav** der skal være opfyldt:

### Nødvendige krav:
1. **Node.js runtime** - Next.js kræver Node.js server
2. **Database** - Du bruger SQLite nu, men skal have en persistent database i production
3. **File storage** - 55MB+ uploads skal være persistent
4. **Build process** - Next.js skal bygges før deployment

## Simply.com Hosting

### ⚠️ Problem:
Simply.com er typisk **PHP/webhosting** og understøtter **måske ikke Node.js/Next.js**.

### Før du vælger pakke:
1. **Kontakt Simply.com support** og spørg:
   - Understøtter I Node.js?
   - Kan jeg deploye Next.js applikationer?
   - Er der SSH access til at installere Node.js?

### Hvis Simply.com IKKE understøtter Node.js:

**Anbefaling: Vælg en Next.js-optimeret platform i stedet:**

#### 🥇 **Vercel** (BEDSTE valg - GRATIS starter)
- **Gratis tier:** Perfekt til start
- **Next.js optimeret:** Bygget af Next.js team
- **Automatisk deployment:** Fra GitHub
- **Features:** 
  - Gratis SSL
  - Edge functions
  - Automatisk scaling
  - Database add-ons (PostgreSQL)
- **Kost:** Gratis op til 100GB bandwidth

#### 🥈 **Netlify**
- **Gratis tier:** God til Next.js
- **Features:** 
  - Git integration
  - Form handling
  - Serverless functions
- **Kost:** Gratis starter tier

#### 🥉 **Railway** eller **Render**
- **Betalt:** Fra ~$5/måned
- **Features:**
  - Full Node.js support
  - Database hosting
  - File storage

## Hvis du VÆLGER Simply.com:

### Database Migration:
Du skal **migrere fra SQLite til MySQL**:

1. **Opdater Prisma schema:**
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

2. **Update .env:**
```
DATABASE_URL="mysql://user:password@host:port/dbname"
```

### Pakke Anbefaling:

**Minimum: Standard Suite (112,50 kr/md)**
- 20GB plads (du har 55MB nu, men skal have plads til vækst)
- 5 MySQL databases (du har brug for 1)
- 1GB RAM (minimum for Next.js)
- 2 CPU cores (bedre performance)

**Anbefalet: Pro Suite (199,95 kr/md)**
- 100GB plads (fremtidssikret)
- 10 MySQL databases
- 1.5GB RAM (bedre for Next.js)
- 3 CPU cores (bedste performance)
- Phone support (vigtigt hvis noget går galt)

### Basic Suite (64,95 kr/md) - IKKE anbefalet ❌
- 512MB RAM er **for lidt** til Next.js
- 10GB kan blive for lidt med billeder
- 1 CPU core = langsom performance

## Deployment Steps (hvis Simply.com understøtter Node.js):

1. **Migrer database til MySQL**
2. **Build projektet:**
   ```bash
   npm run build
   ```
3. **Upload filer til server:**
   - `.next` folder
   - `public` folder
   - `node_modules` (eller install på server)
   - `package.json`
4. **Start server:**
   ```bash
   npm start
   ```
5. **Konfigurer PM2 eller lignende** for at holde serveren kørende

## Min Anbefaling:

### 🎯 **For dig: Vercel (GRATIS)**

**Hvorfor:**
- ✅ **Gratis** - perfekt til at starte
- ✅ **Next.js native** - alt virker out-of-the-box
- ✅ **Automatisk deployment** - push til GitHub = live
- ✅ **Ingen server config** - alt er automatisk
- ✅ **Gratis SSL** - HTTPS inkluderet
- ✅ **Bedre performance** - Edge network

**Hvad du skal gøre:**
1. Upload kode til GitHub
2. Tilslut Vercel til GitHub repo
3. Deploy automatisk
4. Tilslut dit domæne (frontdoorfix.dk)

**Database:** 
- Brug Vercel Postgres (gratis tier) eller
- Supabase (gratis tier) eller
- Keep SQLite hvis du migrerer til serverless functions

**File Storage:**
- Vercel Blob Storage eller
- Cloudinary (gratis tier) eller
- AWS S3 (meget billig)

### 📊 **Sammenligning:**

| Feature | Simply.com | Vercel |
|---------|------------|--------|
| **Kost (start)** | 112,50 kr/md | Gratis |
| **Next.js Support** | Måske ❓ | Ja ✅ |
| **Setup** | Kompleks | Simpelt |
| **Performance** | Almindelig | Optimal |
| **SSL** | Inkluderet | Inkluderet |
| **Scaling** | Manuel | Automatisk |

## Næste Skridt:

1. **Kontakt Simply.com** - spørg om Node.js support
2. **Hvis nej:** Brug Vercel (gratis og bedre)
3. **Hvis ja:** Vælg mindst Standard Suite
4. **Migrer database** til MySQL først
5. **Test lokalt** med MySQL før deployment

## Hjælp med Migration:

Jeg kan hjælpe dig med at:
- Migrere database til MySQL/PostgreSQL
- Opdatere Prisma schema
- Konfigurere Vercel deployment
- Sætte op file storage (Cloudinary/S3)

Sig til hvis du vil have hjælp med noget af dette! 🚀

