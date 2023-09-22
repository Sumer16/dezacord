import "./globals.css"
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"

import { ClerkProvider } from "@clerk/nextjs"

import { ThemeProvider } from "@/components/providers/theme-provider"
import { cn } from "@/lib/utils"

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="dezacord-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
