# ⚡ Hurtig Start - Vercel Deployment

## 🎯 5 Simple Steps

### 1. Push til GitHub
```bash
cd /Users/hamza/frontdoorfix
git add .
git commit -m "Ready for Vercel"
git push origin main
```

### 2. Opret Vercel Account
- Gå til [vercel.com](https://vercel.com)
- Klik "Sign Up" → "Continue with GitHub"

### 3. Deploy Projekt
- Klik "Add New Project"
- Vælg dit repository
- Klik "Deploy"

### 4. Opret Database (Gratis)
**Vercel Postgres:**
- I Vercel dashboard → Storage → Create Database
- Vælg "Postgres" → Gratis tier
- Kopiér connection string

**Eller Supabase:**
- Gå til [supabase.com](https://supabase.com)
- Opret gratis projekt
- Kopiér connection string

### 5. Tilføj Environment Variables
I Vercel → Settings → Environment Variables:

```
DATABASE_URL=postgresql://... (din connection string)
ADMIN_CODE=FrontDoorFix2024
NODE_ENV=production
```

### 6. Migrer Database
I Vercel dashboard → Deployments → klik på seneste deployment → Logs
Eller kør lokalt:
```bash
npx prisma migrate deploy
npx prisma generate
```

### 7. Tilslut Domæne
- Vercel → Settings → Domains
- Tilføj: `frontdoorfix.dk`
- Opdater DNS hos Simply.com

## ✅ Done!

Din hjemmeside er nu live på Vercel! 🎉

## 📝 Lokal Development

For at bruge SQLite lokalt:
1. Kopiér `schema.sqlite.prisma` til `schema.prisma`
2. Sæt `DATABASE_URL="file:./dev.db"` i `.env`
3. Kør `npx prisma migrate dev`

## 🆘 Hjælp Nødvendig?

Sig til hvis du har brug for hjælp med:
- Database setup
- File storage
- DNS konfiguration
- Troubleshooting

