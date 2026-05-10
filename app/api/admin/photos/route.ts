import { NextRequest, NextResponse } from "next/server"
import { unlink } from "fs/promises"
import path from "path"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"

export async function DELETE(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })

  const { id } = await req.json()
  const photo = await prisma.photo.findUnique({ where: { id: Number(id) } })
  if (!photo) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 })

  const filepath = path.join(process.cwd(), "public", photo.url)
  await unlink(filepath).catch(() => {})

  await prisma.photo.delete({ where: { id: Number(id) } })
  return NextResponse.json({ ok: true })
}
