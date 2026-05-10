import { cookies } from "next/headers"

const SESSION_COOKIE = "admin_session"

export async function getSession() {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value === "authenticated"
}

export async function setSession() {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 gün
    path: "/",
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
