import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'AI店长 - 智能选品助手',
  description: '五步闭环，智能选品，提升分销效率',
  robots: 'noindex, nofollow', // demo环境不需要SEO
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} antialiased`}>
        <div className="min-h-screen bg-background">
        {children}
        </div>
      </body>
    </html>
  )
}
