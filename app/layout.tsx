import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kiralık Daireler",
  description: "Turistik konumda günlük, haftalık ve aylık kiralık daireler",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="h-full">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
