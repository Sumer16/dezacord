import "./globals.css"
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dezacord | A Discord Clone',
  description: 'This is a Dezacord application, a clone of the discord website developed using NextJS 13.4',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
