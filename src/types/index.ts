// Navigation
export type Navigation = {
  title: string
  url: string
}

// About Card
export type AboutCard = {
  title: string
  description: string
  icon?: {
    asset: {
      _ref: string
    }
  }
  iconBgColor?: string
  order?: number
}

// Program
export type Program = {
  _id: string
  title: string
  description: string
  image?: {
    asset: {
      _ref: string
    }
  }
  status?: string
}

// Team Member
export type TeamMember = {
  _id: string
  name: string
  position: string
  image?: {
    asset: {
      _ref: string
    }
  }
  instagram?: string
  email?: string
  linkedin?: string
}

// Footer
export type FooterLink = {
  title: string
  url: string
}

export type FooterColumn = {
  title: string
  links: FooterLink[]
}

// Site Settings - Gabungkan semua properti dalam satu definisi
export type SiteSettings = {
  title?: string
  description?: string
  aboutSmallTitle?: string
  aboutTitle?: string
  aboutSubtitle?: string
  programsSmallTitle?: string
  programsTitle?: string
  programsSubtitle?: string
  teamSmallTitle?: string
  teamTitle?: string
  teamSubtitle?: string
  articlesSmallTitle?: string
  articlesTitle?: string
  articlesSubtitle?: string
  copyright?: string
  upcomingProgramsSmallTitle?: string
  upcomingProgramsTitle?: string
  upcomingProgramsSubtitle?: string
  contactSmallTitle?: string
  contactTitle?: string
  contactSubtitle?: string
}

// Add new types
export type Author = {
  _id: string
  name: string
  slug: {
    current: string
  }
  image?: {
    asset: {
      _ref: string
    }
  }
  bio?: string
}

export type Article = {
  _id: string
  title: string
  slug: {
    current: string
  }
  author: Author
  mainImage?: {
    asset: {
      _ref: string
    }
  }
  categories?: Array<{
    _id: string
    title: string
  }>
  publishedAt: string
  excerpt?: string
  body?: any[]
}

// Gallery 
export type Gallery = {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage: {
    asset: {
      _ref: string
    }
  }
  date: string
  location?: string
  description?: string
  order?: number
}

export type UpcomingProgram = {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  mainImage: {
    asset: {
      _ref: string
    }
  }
  status: 'coming-soon' | 'registration-open' | 'registration-closed' | 'in-progress' | 'completed'
  registrationDate?: string
  programDate: string
  location?: string
  price?: number
  fullDescription?: any[]
  features?: string[]
  order?: number
  registrationLink?: string
}
// Contact Card
export type ContactCard = {
  _id: string
  title: string
  subtitle: string
  icon?: {
    asset: {
      _ref: string
    }
  }
  memojiImage: {
    asset: {
      _ref: string
    }
  }
  personalName: string
  contactInfo: string
  buttonText: string
  buttonLink?: string
  backgroundColor: string
  cardBackgroundColor: string
  textColor: string
  order: number
}
// Location Card
export type LocationCard = {
  _id: string
  title: string
  address: string
  city: string
  mapImage: {
    asset: {
      _ref: string
    }
  }
  backgroundColor: string
  shareButtonText: string
  saveButtonText: string
  callButtonText: string
  mapUrl: string
  phoneNumber?: string
}
