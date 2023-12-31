// Global CSS
import "./globals.css"

// NextJS packages
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"

// Providers
import { ClerkProvider } from "@clerk/nextjs" // Clerk
import { ThemeProvider } from "@/components/providers/theme-provider" // Theme
import { ModalProvider } from "@/components/providers/modal-provider" // Modal
import { SocketProvider } from "@/components/providers/socket-provider" // Socket
import { QueryProvider } from "@/components/providers/query-provider" // Query

// Lib files
import { cn } from "@/lib/utils"

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dezacord | A Discord Clone',
  description: 'Dezacord application is a clone of the discord website developed using NextJS 13.4, Tailwind, SocketIO & MySQl',
  manifest: '/manifest.json',
  icons: { apple: '/icon.png' },
  themeColor: '#6366f1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <link rel="icon" href="/discord.svg" sizes="any" />
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="dezacord-theme"
          >
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>
                {children}
              </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
