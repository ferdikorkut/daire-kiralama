export default function Footer() {
  return (
    <footer id="iletisim" className="bg-slate-950 border-t border-amber-400/20 mt-auto scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-6">
          <div>
            <h3 className="text-lg font-bold text-amber-400 tracking-widest uppercase mb-1">KiralikDaire</h3>
            <p className="text-slate-400 text-sm">Turistik konumda konforlu kiralık daireler</p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-slate-300 font-medium">Rezervasyon için bizi arayın:</p>
            <a href="tel:+905320000000" className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors">
              <span>📞</span> 0532 000 00 00
            </a>
            <a href="tel:+905420000000" className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors">
              <span>📞</span> 0542 000 00 00
            </a>
            <a
              href="https://wa.me/905320000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-full mt-1 w-fit transition-colors"
            >
              <span>💬</span> WhatsApp ile Yaz
            </a>
          </div>
        </div>
        <p className="text-slate-600 text-xs mt-8 text-center">
          © {new Date().getFullYear()} KiralikDaire. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  )
}
