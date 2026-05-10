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

  const occupancies = daire.occupancies.map((o) => ({
    startDate: o.startDate.toISOString(),
    endDate: o.endDate.toISOString(),
  }))

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10 w-full">
        {/* Geri */}
        <Link href="/" className="text-blue-700 text-sm hover:underline mb-6 inline-block">
          ← Tüm Daireler
        </Link>

        {/* Fotoğraf Galerisi */}
        {daire.photos.length > 0 ? (
          <PhotoGallery photos={daire.photos} name={daire.name} />
        ) : (
          <div className="bg-gray-200 rounded-2xl h-72 md:h-96 flex items-center justify-center text-gray-400 mb-4">
            Fotoğraf henüz eklenmemiş
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Sol: Bilgiler */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{daire.name}</h1>
              <span className="text-sm text-gray-500">2 Oda · 4 Kişi</span>
            </div>

            <p className="text-gray-600 leading-relaxed">{daire.description}</p>

            {/* Özellikler */}
            {daire.features.length > 0 && (
              <div>
                <h2 className="text-base font-bold text-gray-800 mb-3">Özellikler</h2>
                <div className="grid grid-cols-2 gap-2">
                  {daire.features.map((f) => (
                    <div key={f.id} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-500">✓</span> {f.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Takvim */}
            <AvailabilityCalendar occupancies={occupancies} />
          </div>

          {/* Sağ: Fiyat ve İletişim */}
          <div className="space-y-5">
            {daire.prices && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h2 className="text-base font-bold text-gray-800 mb-4">💰 Fiyatlar</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Günlük</span>
                    <span className="font-semibold text-gray-800">{daire.prices.perDay.toLocaleString("tr-TR")}₺</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Haftalık</span>
                    <span className="font-semibold text-gray-800">{daire.prices.perWeek.toLocaleString("tr-TR")}₺</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Aylık</span>
                    <span className="font-semibold text-gray-800">{daire.prices.perMonth.toLocaleString("tr-TR")}₺</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3 border-t pt-3">
                  * Fiyatlar aylara göre değişiklik gösterebilir. Güncel fiyat için bizi arayın.
                </p>
              </div>
            )}

            <div className="bg-blue-700 rounded-2xl p-5 text-white">
              <h2 className="text-base font-bold mb-3">📞 Rezervasyon</h2>
              <p className="text-blue-100 text-sm mb-4">
                Beğendiğiniz tarihleri not edin ve bizi arayın.
              </p>
              <a href="tel:+905320000000" className="block text-center bg-white text-blue-700 font-semibold py-2.5 rounded-xl text-sm mb-2 hover:bg-blue-50 transition-colors">
                0532 000 00 00
              </a>
              <a href="tel:+905420000000" className="block text-center bg-white text-blue-700 font-semibold py-2.5 rounded-xl text-sm mb-3 hover:bg-blue-50 transition-colors">
                0542 000 00 00
              </a>
              <a
                href="https://wa.me/905320000000"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-green-500 hover:bg-green-400 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                💬 WhatsApp ile Yaz
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
