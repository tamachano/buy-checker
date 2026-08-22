import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'それ、買うbuy？',
  description: '買う前に、ちょっとだけ考えましょう',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}