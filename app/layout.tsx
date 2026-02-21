import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"

// P3: Inter — the 2026 standard for clean, legible developer portfolio typography
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata = {
  title: "Mpairwe Lauben | DevOps & Software Engineer",
  description:
    "Portfolio of Mpairwe Lauben — DevOps Engineer, AI/ML Engineer, and Full Stack Developer based in Kampala, Uganda. Specialising in cloud infrastructure, machine learning, mobile, and web development.",
  keywords: [
    "Mpairwe Lauben",
    "DevOps Engineer Uganda",
    "Software Engineer Kampala",
    "AI ML Engineer",
    "Full Stack Developer",
    "Open Source and Enterprise FrameWork Developer",
    "Flutter Developer",
    "React Native Developer",
    "Spring Boot",
    "Kubernetes",
    "Terraform",
  ],
  authors: [{ name: "Mpairwe Lauben", url: "https://mpairweportfolio.vercel.app" }],
  openGraph: {
    title: "Mpairwe Lauben | DevOps & Software Engineer",
    description: "DevOps,Enterprise, AI/ML, Full Stack & Mobile Engineer based in Kampala, Uganda.",
    url: "https://mpairweportfolio.vercel.app",
    siteName: "Mpairwe Lauben Portfolio",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      {/* P3: antialiased + font-sans picks up var(--font-inter) via tailwind.config */}
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors position="top-right" closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
