"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-slate-950 border-b border-amber-400/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-amber-400 tracking-widest uppercase">
          KiralikDaire
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-amber-400 transition-colors">Ana Sayfa</Link>
          <Link href="/#daireler" className="hover:text-amber-400 transition-colors">Daireler</Link>
          <Link href="/#iletisim" className="hover:text-amber-400 transition-colors border border-amber-400/50 text-amber-400 px-4 py-1.5 rounded-full hover:border-amber-400 transition-colors">
            İletişim
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-300"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu - absolute, içeriği itmez */}
      {open && (
        <div className="md:hidden absolute left-0 right-0 bg-slate-900 border-t border-amber-400/20 py-4 flex flex-col items-center gap-4 text-sm font-medium text-slate-300 shadow-xl">
          <Link href="/" onClick={() => setOpen(false)} className="hover:text-amber-400 transition-colors">Ana Sayfa</Link>
          <Link href="/#daireler" onClick={() => setOpen(false)} className="hover:text-amber-400 transition-colors">Daireler</Link>
          <Link href="/#iletisim" onClick={() => setOpen(false)} className="text-amber-400">İletişim</Link>
        </div>
      )}
    </nav>
  )
}
