import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/lib/auth"
import Navigation from "@/components/navigation"

export const metadata: Metadata = {
  title: "Knight-Omega - AI API Gateway",
  description: "Modern AI API Gateway for seamless access to leading AI models including OpenAI, Claude, and more",
  keywords: ["AI", "API", "Gateway", "OpenAI", "Claude", "Machine Learning", "Knight-Omega"],
  authors: [{ name: "Knight-Omega Team" }],
  creator: "Knight-Omega",
  publisher: "Knight-Omega",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Knight-Omega - AI API Gateway",
    description: "Modern AI API Gateway for seamless access to leading AI models",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knight-Omega - AI API Gateway",
    description: "Modern AI API Gateway for seamless access to leading AI models",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="dark antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navigation />
            <main>
              {children}
            </main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
