import { prisma } from "@/lib/prisma"
import FotograflarClient from "./_client"

export default async function FotograflarPage() {
  const daireler = await prisma.apartment.findMany({
    include: { photos: true },
    orderBy: { id: "asc" },
  })

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Fotoğraf Yönetimi</h1>
      <FotograflarClient daireler={daireler} />
    </div>
  )
}
