import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/providers/theme-provider"
import { TracingBeam } from "@/components/ui/tracing-beam"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Lucelli - Digitala Tjänster",
  description: "Webutveckling, Grafisk Design, AI, SEO och mer",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv" suppressHydrationWarning className="hide-scrollbar">
      <body className={`${inter.className} relative`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="main-container">
            <TracingBeam />
            <div className="content-wrapper">
              <Navbar />
              {children}
              <Footer />
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'