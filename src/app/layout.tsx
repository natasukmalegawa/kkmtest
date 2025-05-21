import './globals.css'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'

export const metadata: Metadata = {
  title: 'Departemen Karir dan Karya Mahasiswa',
  description: 'Website resmi Departemen Karir dan Karya Mahasiswa BEM KM UNY',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-white dark:bg-apple-darker text-apple-dark dark:text-white min-h-screen">
        <ThemeProvider>
          <LanguageProvider>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
