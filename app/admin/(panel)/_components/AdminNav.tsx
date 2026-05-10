"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const links = [
  { href: "/admin/takvim", label: "📅 Takvim" },
  { href: "/admin/fiyatlar", label: "💰 Fiyatlar" },
  { href: "/admin/ozellikler", label: "✏️ Özellikler" },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <aside className="w-48 bg-white border-r border-gray-100 flex flex-col min-h-screen shrink-0">
      <div className="p-5 border-b border-gray-100">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Yönetim</p>
      </div>
      <nav className="flex-1 p-3 flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${pathname === link.href
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50"
              }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left font-medium"
        >
          Çıkış Yap
        </button>
      </div>
    </aside>
  )
}
