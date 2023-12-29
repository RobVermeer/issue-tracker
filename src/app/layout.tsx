import type { Metadata } from "next"
import { Ubuntu } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/Header"
import { Toaster } from "@/components/ui/toaster"

const ubuntu = Ubuntu({ weight: ["400"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Issue tracker",
  description: "Server side issue tracking.",
  manifest: "/manifest.json",
}

interface Props {
  children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
