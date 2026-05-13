"use client"

import { useState } from "react"

type OccupancyRange = {
  startDate: string
  endDate: string
}

function isOccupied(date: Date, ranges: OccupancyRange[]) {
  const d = date.getTime()
  return ranges.some((r) => {
    const start = new Date(r.startDate).getTime()
    const end = new Date(r.endDate).getTime()
    return d >= start && d <= end
  })
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

const MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
]
const DAYS = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"]

export default function AvailabilityCalendar({ occupancies }: { occupancies: OccupancyRange[] }) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  function prev() {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  function next() {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-800">📅&nbsp; Rezervasyon Takvimi</h3>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-100 inline-block" /> Dolu
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-gray-50 border border-gray-200 inline-block" /> Boş
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">◀</button>
        <span className="font-semibold text-gray-800">{MONTHS[month]} {year}</span>
        <button onClick={next} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">▶</button>
      </div>

      <div className="grid grid-cols-7 text-center">
        {DAYS.map((d) => (
          <div key={d} className="text-xs font-semibold text-gray-400 pb-2">{d}</div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />
          const date = new Date(year, month, day)
          const occupied = isOccupied(date, occupancies)
          const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
          return (
            <div
              key={day}
              className={`text-xs py-1.5 my-0.5 rounded-lg font-medium mx-0.5
                ${occupied ? "bg-red-100 text-red-600" : ""}
                ${isPast && !occupied ? "text-gray-300" : ""}
                ${!occupied && !isPast ? "text-gray-700" : ""}
              `}
            >
              {day}
            </div>
          )
        })}
      </div>

    </div>
  )
}
