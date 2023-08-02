import './globals.css'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'], variable: "--outfit-font" })

export const metadata: Metadata = {
  title: 'Movies AI',
  description: 'Um site para encontrar seu próximo filme favorito usando IA!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${outfit.variable} font-sans`}>{children}</body>
    </html>
  )
}
