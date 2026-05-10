import { prisma } from "@/lib/prisma"
import TakvimClient from "./_client"

export default async function TakvimPage() {
  const daireler = await prisma.apartment.findMany({
    include: { occupancies: { orderBy: { startDate: "asc" } } },
    orderBy: { id: "asc" },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Takvim Yönetimi</h1>
      <p className="text-sm text-gray-500 mb-8">Dairelerin dolu olduğu tarihleri işaretleyin.</p>
      <TakvimClient daireler={daireler.map(d => ({
        id: d.id,
        name: d.name,
        occupancies: d.occupancies.map(o => ({
          id: o.id,
          startDate: o.startDate.toISOString(),
          endDate: o.endDate.toISOString(),
          note: o.note,
        })),
      }))} />
    </div>
  )
}
