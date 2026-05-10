import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"

export async function PUT(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })

  const { apartmentId, perDay, perWeek, perMonth } = await req.json()

  const price = await prisma.price.upsert({
    where: { apartmentId: Number(apartmentId) },
    update: {
      perDay: Number(perDay),
      perWeek: Number(perWeek),
      perMonth: Number(perMonth),
    },
    create: {
      apartmentId: Number(apartmentId),
      perDay: Number(perDay),
      perWeek: Number(perWeek),
      perMonth: Number(perMonth),
    },
  })

  return NextResponse.json(price)
}
