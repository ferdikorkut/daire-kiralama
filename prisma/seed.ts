import "dotenv/config"
import { PrismaClient } from "../app/generated/prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"

async function main() {
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  const prisma = new PrismaClient({ adapter })

  const daireler = [
    {
      name: "Daire 1",
      description: "Deniz manzaralı, merkezi konumda şık ve konforlu 2 odalı daire.",
      features: ["Klima", "Wi-Fi", "Çamaşır Makinesi", "Mutfak", "Balkon", "Otopark"],
      prices: { perDay: 1500, perWeek: 9000, perMonth: 30000 },
    },
    {
      name: "Daire 2",
      description: "Şehir merkezine yürüme mesafesinde, ferah ve aydınlık 2 odalı daire.",
      features: ["Klima", "Wi-Fi", "Bulaşık Makinesi", "Mutfak", "Balkon"],
      prices: { perDay: 1200, perWeek: 7200, perMonth: 25000 },
    },
    {
      name: "Daire 3",
      description: "Havuz manzaralı, sakin ve huzurlu ortamda 2 odalı daire.",
      features: ["Klima", "Wi-Fi", "Çamaşır Makinesi", "Mutfak", "Teras", "Otopark"],
      prices: { perDay: 1800, perWeek: 10800, perMonth: 35000 },
    },
    {
      name: "Daire 4",
      description: "Tarihi şehir merkezinde, yürüme mesafesinde restoranlar ve kafeler.",
      features: ["Klima", "Wi-Fi", "Mutfak", "Balkon"],
      prices: { perDay: 1000, perWeek: 6000, perMonth: 22000 },
    },
  ]

  for (const daire of daireler) {
    await prisma.apartment.create({
      data: {
        name: daire.name,
        description: daire.description,
        features: {
          create: daire.features.map((name) => ({ name })),
        },
        prices: {
          create: daire.prices,
        },
      },
    })
  }

  console.log("4 daire başarıyla oluşturuldu.")
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
