'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Language = 'id' | 'en'

type LanguageProviderProps = {
  children: React.ReactNode
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Menambahkan interface untuk translations dengan index signature
interface TranslationDictionary {
  [key: string]: string;
}

interface Translations {
  id: TranslationDictionary;
  en: TranslationDictionary;
}

const translations: Translations = {
  id: {
    // Navigasi
    'Products': 'Produk',
    'Features': 'Fitur',
    'Careers': 'Karir',
    'News': 'Berita',
    
    // Common
    'Search': 'Cari',
    'Submit': 'Kirim',
    'Read more': 'Baca selengkapnya',
    'Contact us': 'Hubungi kami',
    'Learn more': 'Pelajari lebih lanjut',
    'Get started': 'Mulai sekarang',
    'Sign up': 'Daftar',
    'Sign in': 'Masuk',
    
    // Footer
    'Privacy Policy': 'Kebijakan Privasi',
    'Terms of Service': 'Syarat dan Ketentuan',
    'All rights reserved': 'Seluruh hak cipta',
    
    // Program
    'Programs': 'Program',
    'Upcoming Programs': 'Program Mendatang',
    'Past Programs': 'Program Terdahulu',
    'Date': 'Tanggal',
    'Time': 'Waktu',
    'Location': 'Lokasi',
    'Register': 'Daftar',
    
    // Articles/Blog
    'Articles': 'Artikel',
    'Recent Posts': 'Postingan Terbaru',
    'Popular Posts': 'Postingan Populer',
    'Categories': 'Kategori',
    'Tags': 'Tag',
    'Share': 'Bagikan',
    'Author': 'Penulis',
    'Published on': 'Dipublikasikan pada',
    
    // Gallery
    'Gallery': 'Galeri',
    'View all': 'Lihat semua',
    
    // Team
    'Our Team': 'Tim Kami',
    'Team Members': 'Anggota Tim',
    'Position': 'Jabatan',
    
    // Contact
    'Contact': 'Kontak',
    'Name': 'Nama',
    'Email': 'Surel',
    'Message': 'Pesan',
    'Phone': 'Telepon',
    'Address': 'Alamat',
    'Send': 'Kirim',
      // Specific to your project
    'Departemen Karir dan Karya Mahasiswa': 'Departemen Karir dan Karya Mahasiswa',
    'BEM KM UNY': 'BEM KM UNY',
    'About Us': 'Tentang Kami',
    'Our Story': 'Cerita Kami',
    'Team': 'Tim',
    'Resources': 'Sumber Daya',
    'Blog': 'Blog',
    'Documentation': 'Dokumentasi',
    'Community': 'Komunitas',
    'Events': 'Acara',
    'Support': 'Dukungan',
    'FAQ': 'Tanya Jawab',
    'Pricing': 'Harga',
    'Designed to help you achieve more through clean design and innovative technology.': 'Dirancang untuk membantu Anda mencapai lebih banyak melalui desain yang bersih dan teknologi inovatif.',
    '© 2023 Your Brand. All rights reserved.': '© 2023 Brand Anda. Seluruh hak dilindungi undang-undang.'
  },
  en: {
    // Navigasi (sama dengan key karena ini bahasa default)
    'Products': 'Products',
    'Features': 'Features',
    'Careers': 'Careers',
    'News': 'News',
    
    // Common
    'Search': 'Search',
    'Submit': 'Submit',
    'Read more': 'Read more',
    'Contact us': 'Contact us',
    'Learn more': 'Learn more',
    'Get started': 'Get started',
    'Sign up': 'Sign up',
    'Sign in': 'Sign in',
    
    // Footer
    'Privacy Policy': 'Privacy Policy',
    'Terms of Service': 'Terms of Service',
    'All rights reserved': 'All rights reserved',
    
    // Program
    'Programs': 'Programs',
    'Upcoming Programs': 'Upcoming Programs',
    'Past Programs': 'Past Programs',
    'Date': 'Date',
    'Time': 'Time',
    'Location': 'Location',
    'Register': 'Register',
    
    // Articles/Blog
    'Articles': 'Articles',
    'Recent Posts': 'Recent Posts',
    'Popular Posts': 'Popular Posts',
    'Categories': 'Categories',
    'Tags': 'Tags',
    'Share': 'Share',
    'Author': 'Author',
    'Published on': 'Published on',
    
    // Gallery
    'Gallery': 'Gallery',
    'View all': 'View all',
    
    // Team
    'Our Team': 'Our Team',
    'Team Members': 'Team Members',
    'Position': 'Position',
    
    // Contact
    'Contact': 'Contact',
    'Name': 'Name',
    'Email': 'Email',
    'Message': 'Message',
    'Phone': 'Phone',
    'Address': 'Address',
    'Send': 'Send',
      // Specific to your project
    'Departemen Karir dan Karya Mahasiswa': 'Career and Student Work Department',
    'BEM KM UNY': 'Student Executive Board of UNY',
    'About Us': 'About Us',
    'Our Story': 'Our Story',
    'Team': 'Team',
    'Resources': 'Resources',
    'Blog': 'Blog',
    'Documentation': 'Documentation',
    'Community': 'Community',
    'Events': 'Events',
    'Support': 'Support',
    'FAQ': 'FAQ',
    'Pricing': 'Pricing',
    'Designed to help you achieve more through clean design and innovative technology.': 'Designed to help you achieve more through clean design and innovative technology.',
    '© 2023 Your Brand. All rights reserved.': '© 2023 Your Brand. All rights reserved.'
  }
}

const initialState: LanguageProviderState = {
  language: 'id',
  setLanguage: () => null,
  t: (key) => key,
}

const LanguageProviderContext = createContext<LanguageProviderState>(initialState)

export function LanguageProvider({
  children,
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('id')
  // Function untuk mendapatkan terjemahan
  const t = (key: string): string => {
    if (language === 'id' && key in translations.id) {
      return translations.id[key]
    } else if (language === 'en' && key in translations.en) {
      return translations.en[key]
    }
    // Jika tidak ada terjemahan, kembalikan key asli
    return key
  }

  useEffect(() => {
    // Ambil bahasa dari localStorage saat pertama kali load
    const storedLang = localStorage.getItem('language') as Language
    if (storedLang && (storedLang === 'id' || storedLang === 'en')) {
      setLanguageState(storedLang)
    } else {
      // Default ke Bahasa Indonesia jika belum ada setting
      setLanguageState('id')
    }
  }, [])
  const setLanguage = (newLang: Language) => {
    // Tambahkan sedikit animasi dengan menambahkan kelas ke body
    if (typeof document !== 'undefined') {
      const body = document.body
      body.classList.add('language-transition')
      
      // Tunggu sedikit sebelum mengubah bahasa
      setTimeout(() => {
        localStorage.setItem('language', newLang)
        setLanguageState(newLang)
        
        // Hapus kelas animasi
        setTimeout(() => {
          body.classList.remove('language-transition')
        }, 300)
      }, 50)
    } else {
      // Fallback jika tidak ada document
      localStorage.setItem('language', newLang)
      setLanguageState(newLang)
    }
  }

  const value = {
    language,
    setLanguage,
    t,
  }

  return (
    <LanguageProviderContext.Provider value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)
  
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  
  return context
}
