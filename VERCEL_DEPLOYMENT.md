# 🚀 Vercel Deployment Guide - FrontDoorFix

## Trin-for-trin guide til at deploye på Vercel

### ✅ Forud for deployment

1. **GitHub Repository**
   - Din kode skal være på GitHub
   - Hvis ikke, skal du oprette et repo og push koden

2. **Database Migration**
   - Du skal migrere fra SQLite til PostgreSQL (gratis på Vercel)
   - Jeg har opdateret schema til at understøtte begge

### 📋 Step-by-Step

#### Step 1: Opret Vercel Account
1. Gå til [vercel.com](https://vercel.com)
2. Klik "Sign Up"
3. Vælg "Continue with GitHub"
4. Log ind med din GitHub konto

#### Step 2: Push kode til GitHub (hvis ikke allerede)
```bash
cd /Users/hamza/frontdoorfix
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

#### Step 3: Deploy på Vercel
1. Efter login, klik "Add New Project"
2. Vælg dit GitHub repository (frontdoorfix)
3. Vercel vil automatisk opdage Next.js
4. Klik "Deploy"

#### Step 4: Konfigurer Environment Variables

I Vercel dashboard, gå til dit projekt → Settings → Environment Variables:

**Tilføj disse:**

1. **DATABASE_URL** (vigtigst!)
   - Vælg: "Add PostgreSQL" i Vercel
   - Eller brug: Supabase (gratis) eller Neon (gratis)
   - Format: `postgresql://user:password@host:port/dbname`

2. **ADMIN_CODE**
   - Værdi: `FrontDoorFix2024` (eller din egen kode)
   - Environment: Production, Preview, Development

3. **NODE_ENV**
   - Værdi: `production`
   - Environment: Production

#### Step 5: Migrer Database

Efter deployment, kør migration:

```bash
# Lokalt, opdater .env med ny DATABASE_URL
npx prisma migrate deploy
npx prisma generate
```

Eller brug Vercel CLI:
```bash
vercel env pull .env.local
npx prisma migrate deploy
```

#### Step 6: Tilslut dit domæne
1. I Vercel dashboard → Settings → Domains
2. Tilføj: `frontdoorfix.dk`
3. Følg instruktionerne for at opdatere DNS

### 🔧 Database Setup Options

#### Option 1: Vercel Postgres (Anbefalet)
1. I Vercel dashboard → Storage → Create Database
2. Vælg "Postgres"
3. Vælg gratis tier
4. Kopiér connection string til `DATABASE_URL`

#### Option 2: Supabase (Gratis)
1. Gå til [supabase.com](https://supabase.com)
2. Opret gratis projekt
3. Kopiér connection string til `DATABASE_URL`

#### Option 3: Neon (Gratis)
1. Gå til [neon.tech](https://neon.tech)
2. Opret gratis projekt
3. Kopiér connection string til `DATABASE_URL`

### 📝 File Storage Setup

Du har 55MB uploads. For production skal du bruge cloud storage:

#### Option 1: Vercel Blob Storage
1. I Vercel dashboard → Storage → Create
2. Vælg "Blob"
3. Tilføj `BLOB_READ_WRITE_TOKEN` til environment variables

#### Option 2: Cloudinary (Gratis tier)
1. Opret konto på [cloudinary.com](https://cloudinary.com)
2. Tilføj environment variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

#### Option 3: AWS S3 (Meget billig)
- Meget billig ($0.023/GB)
- Kræver AWS setup

### ⚙️ Vigtige Noter

1. **SQLite virker IKKE på Vercel**
   - Du SKAL migrere til PostgreSQL
   - Jeg har opdateret schema til at understøtte det

2. **File Uploads**
   - Lokale filer (public/uploads) virker ikke på Vercel
   - Du skal bruge cloud storage

3. **Environment Variables**
   - Sæt dem i Vercel dashboard
   - Ikke commit .env filer til GitHub

4. **Build Settings**
   - Vercel opdager automatisk Next.js
   - Build command: `npm run build`
   - Output directory: `.next`

### 🎯 Efter Deployment

1. **Test hjemmesiden**
   - Vercel giver dig en URL: `frontdoorfix.vercel.app`
   - Test alle funktioner

2. **Migrer data** (hvis du har)
   - Eksportér fra SQLite
   - Importer til PostgreSQL

3. **Tilslut domæne**
   - Opdater DNS hos Simply.com
   - Følg Vercel's instruktioner

### 🆘 Problemer?

**Build fejler?**
- Check Vercel logs
- Tjek at alle dependencies er installeret
- Tjek environment variables

**Database fejl?**
- Verificer DATABASE_URL er korrekt
- Kør `prisma migrate deploy`
- Tjek Prisma client er genereret

**File uploads virker ikke?**
- Sæt op cloud storage
- Opdater upload kode

### 📞 Hjælp

Jeg kan hjælpe med:
- ✅ Database migration
- ✅ File storage setup
- ✅ Environment variables
- ✅ DNS konfiguration
- ✅ Troubleshooting

Sig til hvis du har brug for hjælp! 🚀

