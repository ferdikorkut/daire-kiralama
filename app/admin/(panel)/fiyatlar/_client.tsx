"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

type DaireFiyat = {
  id: number
  name: string
  prices: { perDay: number; perWeek: number; perMonth: number }
}

export default function FiyatlarClient({ daireler }: { daireler: DaireFiyat[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [values, setValues] = useState(() =>
    Object.fromEntries(daireler.map(d => [d.id, { ...d.prices }]))
  )
  const [saved, setSaved] = useState<number | null>(null)

  function handleChange(id: number, field: string, val: string) {
    setValues(prev => ({ ...prev, [id]: { ...prev[id], [field]: val } }))
  }

  async function handleSave(id: number) {
    const v = values[id]
    const res = await fetch("/api/admin/prices", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apartmentId: id, ...v }),
    })
    if (res.ok) {
      setSaved(id)
      setTimeout(() => setSaved(null), 2000)
      startTransition(() => router.refresh())
    }
  }

  return (
    <div className="space-y-4">
      {daireler.map((daire) => (
        <div key={daire.id} className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">{daire.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {[
              { field: "perDay", label: "Günlük (₺)" },
              { field: "perWeek", label: "Haftalık (₺)" },
              { field: "perMonth", label: "Aylık (₺)" },
            ].map(({ field, label }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type="number"
                  min={0}
                  value={values[daire.id]?.[field as keyof typeof values[number]] ?? ""}
                  onChange={(e) => handleChange(daire.id, field, e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => handleSave(daire.id)}
            disabled={isPending}
            className="bg-blue-700 hover:bg-blue-600 disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            {saved === daire.id ? "✓ Kaydedildi" : "Kaydet"}
          </button>
        </div>
      ))}
    </div>
  )
}
