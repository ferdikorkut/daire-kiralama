import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import AvailabilityCalendar from "@/app/_components/AvailabilityCalendar"
import PhotoGallery from "@/app/_components/PhotoGallery"

export default async function DaireDetayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const daire = await prisma.apartment.findUnique({
    where: { id: Number(id) },
    include: { features: true, prices: true, occupancies: true, photos: true },
  })

  if (!daire) notFound()

  const sonrakiDaire = await prisma.apartment.findFirst({
    where: { id: { gt: daire.id } },
    orderBy: { id: "asc" },
    select: { id: true, name: true },
  }) ?? await prisma.apartment.findFirst({
    orderBy: { id: "asc" },
    select: { id: true, name: true },
  })

  const occupancies = daire.occupancies.map((o) => ({
    startDate: o.startDate.toISOString(),
    endDate: o.endDate.toISOString(),
  }))

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10 w-full">
        {/* Navigasyon */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-amber-400 text-xl hover:text-amber-300 transition-colors">
            ← Tüm Daireler
          </Link>
          {sonrakiDaire && sonrakiDaire.id !== daire.id && (
            <Link href={`/daire/${sonrakiDaire.id}`} className="text-amber-400 text-xl hover:text-amber-300 transition-colors">
              {sonrakiDaire.name} →
            </Link>
          )}
        </div>

        {/* Fotoğraf Galerisi */}
        {daire.photos.length > 0 ? (
          <PhotoGallery photos={daire.photos} name={daire.name} />
        ) : (
          <div className="bg-slate-800 rounded-2xl h-72 md:h-96 flex items-center justify-center text-slate-500 mb-4">
            Fotoğraf henüz eklenmemiş
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">

          {/* Üst sol: Bilgiler */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white">{daire.name}</h1>
              <span className="text-sm text-slate-400">2 Oda · 4 Kişi</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{daire.description}</p>
            {daire.features.length > 0 && (
              <div>
                <h2 className="text-base font-bold text-white mb-3">Özellikler</h2>
                <div className="grid grid-cols-2 gap-2">
                  {daire.features.map((f) => (
                    <div key={f.id} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="text-amber-400">✓</span> {f.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Üst sağ: Fiyatlar */}
          {daire.prices && (
            <div className="bg-slate-900 rounded-2xl border border-amber-400/20 p-5 h-fit">
              <h2 className="text-base font-bold text-amber-400 mb-4">💰 Fiyatlar</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Günlük</span>
                  <span className="font-semibold text-white">{daire.prices.perDay.toLocaleString("tr-TR")}₺</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-3">
                  <span className="text-slate-400">Haftalık</span>
                  <span className="font-semibold text-white">{daire.prices.perWeek.toLocaleString("tr-TR")}₺</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-3">
                  <span className="text-slate-400">Aylık</span>
                  <span className="font-semibold text-white">{daire.prices.perMonth.toLocaleString("tr-TR")}₺</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3 border-t border-slate-800 pt-3">
                * Fiyatlar aylara göre değişiklik gösterebilir. Güncel fiyat için bizi arayın.
              </p>
            </div>
          )}

          {/* Alt sol: Takvim */}
          <div className="lg:col-span-2">
            <AvailabilityCalendar occupancies={occupancies} />
          </div>

          {/* Alt sağ: Rezervasyon */}
          <div className="bg-slate-900 rounded-2xl border border-amber-400/20 p-5 h-fit">
            <h2 className="text-base font-bold text-amber-400 mb-3">📞 Rezervasyon</h2>
            <p className="text-slate-400 text-sm mb-4">
              Beğendiğiniz tarihleri not edin ve bizi arayın.
            </p>
            <a href="tel:+905320000000" className="block text-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-2.5 rounded-xl text-sm mb-2 transition-colors">
              0532 000 00 00
            </a>
            <a href="tel:+905420000000" className="block text-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-2.5 rounded-xl text-sm mb-3 transition-colors">
              0542 000 00 00
            </a>
            <a
              href="https://wa.me/905320000000"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-green-700 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
            >
              💬 WhatsApp ile Yaz
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
