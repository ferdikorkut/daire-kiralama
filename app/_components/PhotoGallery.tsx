"use client"

import { useState, useRef } from "react"

type Photo = { id: number; url: string; order: number }

export default function PhotoGallery({ photos, name }: { photos: Photo[]; name: string }) {
  const sorted = [...photos].sort((a, b) => a.order - b.order)
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  function prev() {
    setIndex((i) => (i === 0 ? sorted.length - 1 : i - 1))
  }

  function next() {
    setIndex((i) => (i === sorted.length - 1 ? 0 : i + 1))
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 40) next()
    else if (diff < -40) prev()
    touchStartX.current = null
  }

  if (sorted.length === 0) return null

  return (
    <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 bg-slate-800 mb-4 select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Resim */}
      <img
        src={sorted[index].url}
        alt={name}
        className="w-full h-full object-cover transition-opacity duration-300"
      />

      {/* Sol ok */}
      {sorted.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors text-5xl font-thin leading-none"
        >
          ‹
        </button>
      )}

      {/* Sağ ok */}
      {sorted.length > 1 && (
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors text-5xl font-thin leading-none"
        >
          ›
        </button>
      )}

      {/* Nokta göstergeler */}
      {sorted.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {sorted.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === index ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
