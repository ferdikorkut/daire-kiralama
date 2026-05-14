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
        <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-28 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/5 via-transparent to-transparent" />
          <div className="relative">
            <p className="text-amber-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4">Seçkin Konaklama</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Turistik Konumda<br />
              <span className="text-amber-400">Kiralık Daireler</span>
            </h1>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Günlük, haftalık ve aylık kiralama seçenekleriyle konforlu konaklama deneyimi.
            </p>
            <a
              href="#daireler"
              className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-10 py-3.5 rounded-full transition-colors tracking-wide"
            >
              Daireleri Keşfet ↓
            </a>
          </div>
        </section>

        {/* Daire Listesi */}
        <section id="daireler" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-24">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-2">Koleksiyonumuz</p>
            <h2 className="text-3xl font-bold text-white">Dairelerimiz</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {daireler.map((daire) => (
              <div key={daire.id} className="bg-slate-900 rounded-2xl border border-amber-400/10 overflow-hidden hover:border-amber-400/40 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-400/5 group">
                <Link href={`/daire/${daire.id}`}>
                  {daire.photos.length > 0 ? (
                    <img
                      src={[...daire.photos].sort((a, b) => a.order - b.order)[0].url}
                      alt={daire.name}
                      className="w-full h-52 object-cover cursor-pointer group-hover:brightness-110 transition-all"
                    />
                  ) : (
                    <div className="bg-slate-800 h-52 flex items-center justify-center text-slate-500 text-sm cursor-pointer">
                      Fotoğraf henüz eklenmemiş
                    </div>
                  )}
                </Link>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{daire.name}</h3>
                    <span className="text-xs bg-amber-400/10 text-amber-400 px-2 py-1 rounded-full font-medium border border-amber-400/20">
                      2 Oda · 4 Kişi
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{daire.description}</p>

                  {daire.prices && (
                    <p className="text-amber-400 font-semibold text-sm">
                      Gecelik {daire.prices.perDay.toLocaleString("tr-TR")}₺&apos;den başlayan fiyatlar
                    </p>
                  )}
                </div>

                <Link
                  href={`/daire/${daire.id}`}
                  className="block w-full text-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 transition-colors text-sm tracking-wide"
                >
                  Detayları Gör →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* İletişim Çağrı */}
        <section className="bg-slate-900 border-y border-amber-400/10 py-14 mt-12 px-4 text-center">
          <p className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Rezervasyon</p>
          <h2 className="text-2xl font-bold text-white mb-2">Rezervasyon yapmak ister misiniz?</h2>
          <p className="text-slate-400 text-sm mb-8">Bizi arayın, uygun tarihleri birlikte belirleyelim.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="tel:+905320000000" className="flex items-center gap-2 bg-slate-800 border border-amber-400/20 hover:border-amber-400/50 px-6 py-3 rounded-full text-slate-200 hover:text-amber-400 transition-colors font-medium text-sm">
              📞 0532 000 00 00
            </a>
            <a href="tel:+905420000000" className="flex items-center gap-2 bg-slate-800 border border-amber-400/20 hover:border-amber-400/50 px-6 py-3 rounded-full text-slate-200 hover:text-amber-400 transition-colors font-medium text-sm">
              📞 0542 000 00 00
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
