import { NextRequest, NextResponse } from "next/server"
import { setSession } from "@/lib/session"

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Şifre hatalı" }, { status: 401 })
  }

  await setSession()
  return NextResponse.json({ ok: true })
}
