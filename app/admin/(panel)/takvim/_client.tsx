"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

type Occupancy = { id: number; startDate: string; endDate: string; note: string | null }
type Daire = { id: number; name: string; occupancies: Occupancy[] }

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR")
}

function toInputDate(date: Date) {
  return date.toISOString().split("T")[0]
}

export default function TakvimClient({ daireler }: { daireler: Daire[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [selectedId, setSelectedId] = useState(daireler[0]?.id ?? 0)
  const [startDate, setStartDate] = useState(toInputDate(new Date()))
  const [endDate, setEndDate] = useState(toInputDate(new Date()))
  const [note, setNote] = useState("")
  const [error, setError] = useState("")

  const selected = daireler.find(d => d.id === selectedId)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (new Date(startDate) > new Date(endDate)) {
      setError("Başlangıç tarihi bitiş tarihinden büyük olamaz.")
      return
    }
    const res = await fetch("/api/admin/occupancy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apartmentId: selectedId, startDate, endDate, note }),
    })
    if (!res.ok) { setError("Hata oluştu."); return }
    setNote("")
    startTransition(() => router.refresh())
  }

  async function handleDelete(id: number) {
    await fetch("/api/admin/occupancy", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    startTransition(() => router.refresh())
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-bold text-gray-800">Dolu Tarih Ekle</h2>

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

        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlangıç</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bitiş</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Not (isteğe bağlı)</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Örn: Ahmet Bey"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-red-500 hover:bg-red-400 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
          >
            {isPending ? "Kaydediliyor..." : "Dolu Olarak İşaretle"}
          </button>
        </form>
      </div>

      {/* Mevcut rezervasyonlar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-800 mb-4">
          {selected?.name} — Dolu Tarihler
        </h2>
        {selected?.occupancies.length === 0 ? (
          <p className="text-sm text-gray-400">Henüz dolu tarih yok.</p>
        ) : (
          <div className="space-y-2">
            {selected?.occupancies.map((o) => (
              <div key={o.id} className="flex items-center justify-between bg-red-50 rounded-xl px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {formatDate(o.startDate)} – {formatDate(o.endDate)}
                  </p>
                  {o.note && <p className="text-xs text-gray-500 mt-0.5">{o.note}</p>}
                </div>
                <button
                  onClick={() => handleDelete(o.id)}
                  disabled={isPending}
                  className="text-red-500 hover:text-red-700 text-xs font-medium ml-4 disabled:opacity-40"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
