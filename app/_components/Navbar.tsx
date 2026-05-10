"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-blue-700 tracking-tight">
          KiralikDaire
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-700 transition-colors">Ana Sayfa</Link>
          <Link href="/#daireler" className="hover:text-blue-700 transition-colors">Daireler</Link>
          <Link href="/#iletisim" className="hover:text-blue-700 transition-colors border border-blue-700 text-blue-700 px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors">
            İletişim
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-3 flex flex-col gap-3 text-sm font-medium text-gray-700">
          <Link href="/" onClick={() => setOpen(false)}>Ana Sayfa</Link>
          <Link href="/#daireler" onClick={() => setOpen(false)}>Daireler</Link>
          <Link href="/#iletisim" onClick={() => setOpen(false)} className="text-blue-700">İletişim</Link>
        </div>
      )}
    </nav>
  )
}
