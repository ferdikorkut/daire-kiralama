"use client"

import { useState } from "react"

type Photo = { id: number; url: string; order: number }

export default function PhotoGallery({ photos, name }: { photos: Photo[]; name: string }) {
  const sorted = [...photos].sort((a, b) => a.order - b.order)
  const [main, setMain] = useState(sorted[0])

  return (
    <div className="space-y-2 mb-4">
      <div className="rounded-2xl overflow-hidden h-72 md:h-96 bg-slate-800">
        <img src={main.url} alt={name} className="w-full h-full object-cover" />
      </div>
      {sorted.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {sorted.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setMain(photo)}
              className={`rounded-xl overflow-hidden aspect-video bg-slate-800 ring-2 transition-all cursor-pointer ${
                photo.id === main.id ? "ring-amber-400" : "ring-transparent hover:ring-slate-600"
              }`}
            >
              <img src={photo.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
