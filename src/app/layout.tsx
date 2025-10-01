import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { generateMetadata as generateSEOMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateSEOMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <Suspense fallback={<div>Loading...</div>}>
              <Navigation />
              <main>{children}</main>
              <Toaster />
            </Suspense>
          </div>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
