import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import AdminNav from "./_components/AdminNav"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = await getSession()

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminNav />
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  )
}
