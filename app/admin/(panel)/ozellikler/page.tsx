import { prisma } from "@/lib/prisma"
import OzelliklerClient from "./_client"

export default async function OzelliklerPage() {
  const daireler = await prisma.apartment.findMany({
    include: { features: { orderBy: { id: "asc" } } },
    orderBy: { id: "asc" },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Özellik Yönetimi</h1>
      <p className="text-sm text-gray-500 mb-8">Dairelerin özelliklerini ekleyin veya silin.</p>
      <OzelliklerClient daireler={daireler.map(d => ({
        id: d.id,
        name: d.name,
        features: d.features.map(f => ({ id: f.id, name: f.name })),
      }))} />
    </div>
  )
}
