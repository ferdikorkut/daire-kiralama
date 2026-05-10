import { NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get("file") as File | null
  const apartmentId = Number(formData.get("apartmentId"))

  if (!file || !apartmentId) {
    return NextResponse.json({ error: "Eksik alan" }, { status: 400 })
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg"
  const filename = `${Date.now()}-${apartmentId}.${ext}`
  const filepath = path.join(process.cwd(), "public", "uploads", filename)

  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(filepath, buffer)

  const maxOrderPhoto = await prisma.photo.findFirst({
    where: { apartmentId },
    orderBy: { order: "desc" },
    select: { order: true },
  })

  const photo = await prisma.photo.create({
    data: {
      url: `/uploads/${filename}`,
      apartmentId,
      order: (maxOrderPhoto?.order ?? -1) + 1,
    },
  })

  return NextResponse.json(photo)
}
