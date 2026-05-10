"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

type Feature = { id: number; name: string }
type Daire = { id: number; name: string; features: Feature[] }

export default function OzelliklerClient({ daireler }: { daireler: Daire[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [selectedId, setSelectedId] = useState(daireler[0]?.id ?? 0)
  const [newFeature, setNewFeature] = useState("")

  const selected = daireler.find(d => d.id === selectedId)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newFeature.trim()) return
    await fetch("/api/admin/features", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apartmentId: selectedId, name: newFeature }),
    })
    setNewFeature("")
    startTransition(() => router.refresh())
  }

  async function handleDelete(id: number) {
    await fetch("/api/admin/features", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    startTransition(() => router.refresh())
  }

  return (
    <div className="max-w-lg">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Daire</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {daireler.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Mevcut özellikler */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Mevcut Özellikler</p>
          {selected?.features.length === 0 ? (
            <p className="text-sm text-gray-400">Henüz özellik eklenmemiş.</p>
          ) : (
            <div className="space-y-2">
              {selected?.features.map((f) => (
                <div key={f.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                  <span className="text-sm text-gray-800 flex items-center gap-2">
                    <span className="text-green-500">✓</span> {f.name}
                  </span>
                  <button
                    onClick={() => handleDelete(f.id)}
                    disabled={isPending}
                    className="text-red-500 hover:text-red-700 text-xs font-medium disabled:opacity-40"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Yeni özellik */}
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Yeni özellik (örn: Klima)"
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isPending || !newFeature.trim()}
            className="bg-blue-700 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap"
          >
            + Ekle
          </button>
        </form>
      </div>
    </div>
  )
}
