import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create default brand settings if none exist
  const existingSettings = await prisma.brandSettings.findFirst()
  
  if (!existingSettings) {
    await prisma.brandSettings.create({
      data: {
        name: 'FrontDoorFix',
        tagline: 'Tekniker til døren',
        phone: '+45 93 54 54 57',
        email: 'info@frontdoorfix.dk',
        hours: 'Alle dage: 8:00 - 22:00',
        ctaPrimary: 'Bestil nu',
        ctaSecondary: 'Læs mere',
        status: 'Published'
      }
    })
    
    console.log('✅ Default brand settings created')
  } else {
    console.log('ℹ️ Brand settings already exist')
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
