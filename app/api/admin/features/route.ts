import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })

  const { apartmentId, name } = await req.json()
  if (!apartmentId || !name?.trim()) {
    return NextResponse.json({ error: "Eksik alan" }, { status: 400 })
  }

  const feature = await prisma.feature.create({
    data: { apartmentId: Number(apartmentId), name: name.trim() },
  })
  return NextResponse.json(feature)
}

export async function DELETE(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })

  const { id } = await req.json()
  await prisma.feature.delete({ where: { id: Number(id) } })
  return NextResponse.json({ ok: true })
}
