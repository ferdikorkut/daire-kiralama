import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })

  const { apartmentId, startDate, endDate, note } = await req.json()

  if (!apartmentId || !startDate || !endDate) {
    return NextResponse.json({ error: "Eksik alan" }, { status: 400 })
  }

  const occupancy = await prisma.occupancy.create({
    data: {
      apartmentId: Number(apartmentId),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      note: note || null,
    },
  })

  return NextResponse.json(occupancy)
}

export async function DELETE(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })

  const { id } = await req.json()
  await prisma.occupancy.delete({ where: { id: Number(id) } })
  return NextResponse.json({ ok: true })
}
