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
}

// Dalam src/types/index.ts
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
  copyright?: string
}
