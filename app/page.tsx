import Link from "next/link"
import { prisma } from "@/lib/prisma"
import Navbar from "./_components/Navbar"
import Footer from "./_components/Footer"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const daireler = await prisma.apartment.findMany({
    include: { prices: true, photos: true },
    orderBy: { id: "asc" },
  })

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-blue-700 text-white py-20 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Turistik Konumda<br />Kiralık Daireler
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Günlük, haftalık ve aylık kiralama seçenekleriyle konforlu konaklama deneyimi.
          </p>
          <a
            href="#daireler"
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
          >
            Daireleri İncele ↓
          </a>
        </section>

        {/* Daire Listesi */}
        <section id="daireler" className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Dairelerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {daireler.map((daire) => (
              <div key={daire.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                {daire.photos.length > 0 ? (
                  <img
                    src={[...daire.photos].sort((a, b) => a.order - b.order)[0].url}
                    alt={daire.name}
                    className="w-full h-52 object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 h-52 flex items-center justify-center text-gray-400 text-sm">
                    Fotoğraf henüz eklenmemiş
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{daire.name}</h3>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">
                      2 Oda · 4 Kişi
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{daire.description}</p>

                  {daire.prices && (
                    <p className="text-blue-700 font-semibold text-sm mb-4">
                      Gecelik {daire.prices.perDay.toLocaleString("tr-TR")}₺&apos;den başlayan fiyatlar
                    </p>
                  )}

                  <Link
                    href={`/daire/${daire.id}`}
                    className="block w-full text-center bg-blue-700 hover:bg-blue-600 text-white font-medium py-2.5 rounded-xl transition-colors text-sm"
                  >
                    İncele →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* İletişim Çağrı */}
        <section className="bg-blue-50 py-12 px-4 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Rezervasyon yapmak ister misiniz?</h2>
          <p className="text-gray-500 text-sm mb-6">Bizi arayın, uygun tarihleri birlikte belirleyelim.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="tel:+905320000000" className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-full text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm">
              📞 0532 000 00 00
            </a>
            <a href="tel:+905420000000" className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-full text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm">
              📞 0542 000 00 00
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
