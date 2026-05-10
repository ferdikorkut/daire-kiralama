"use client"

import { useState, useTransition, useRef } from "react"
import { useRouter } from "next/navigation"

type Photo = { id: number; url: string; order: number }
type Daire = { id: number; name: string; photos: Photo[] }

export default function FotograflarClient({ daireler }: { daireler: Daire[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [selectedId, setSelectedId] = useState(daireler[0]?.id ?? 0)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const selected = daireler.find((d) => d.id === selectedId)
  const photos = [...(selected?.photos ?? [])].sort((a, b) => a.order - b.order)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploading(true)

    for (const file of files) {
      const form = new FormData()
      form.append("file", file)
      form.append("apartmentId", String(selectedId))
      await fetch("/api/admin/photos/upload", { method: "POST", body: form })
    }

    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
    startTransition(() => router.refresh())
  }

  async function handleDelete(id: number) {
    await fetch("/api/admin/photos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    startTransition(() => router.refresh())
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Daire</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(Number(e.target.value))}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {daireler.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800">
            Fotoğraflar
            {photos.length > 0 && (
              <span className="ml-2 text-xs font-normal text-gray-400">{photos.length} adet</span>
            )}
          </h2>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || isPending}
            className="bg-blue-700 hover:bg-blue-600 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            {uploading ? "Yükleniyor..." : "+ Fotoğraf Ekle"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
        </div>

        {photos.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">Henüz fotoğraf eklenmemiş.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative group rounded-xl overflow-hidden bg-gray-100"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={photo.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleDelete(photo.id)}
                  disabled={isPending}
                  className="absolute top-1.5 right-1.5 bg-red-500 hover:bg-red-400 text-white text-xs font-semibold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-40"
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
