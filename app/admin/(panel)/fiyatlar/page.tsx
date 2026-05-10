import { prisma } from "@/lib/prisma"
import FiyatlarClient from "./_client"

export default async function FiyatlarPage() {
  const daireler = await prisma.apartment.findMany({
    include: { prices: true },
    orderBy: { id: "asc" },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Fiyat Yönetimi</h1>
      <p className="text-sm text-gray-500 mb-8">Her daire için günlük, haftalık ve aylık fiyatları güncelleyin.</p>
      <FiyatlarClient daireler={daireler.map(d => ({
        id: d.id,
        name: d.name,
        prices: d.prices ? {
          perDay: d.prices.perDay,
          perWeek: d.prices.perWeek,
          perMonth: d.prices.perMonth,
        } : { perDay: 0, perWeek: 0, perMonth: 0 },
      }))} />
    </div>
  )
}
