import { groq } from 'next-sanity';
import { client } from './sanity';
import { Article, Author } from '@/types'
import {
  AboutCard,
  Navigation,
  Program,
  TeamMember,
  Article,
  FooterColumn,
  SiteSettings,
} from '@/types';

// Update getSiteSettings function
export async function getSiteSettings() {
  return client.fetch<SiteSettings>(groq`*[_type == "siteSettings"][0]{
    title,
    description,
    aboutSmallTitle,
    aboutTitle,
    aboutSubtitle,
    programsSmallTitle,
    programsTitle,
    programsSubtitle,
    teamSmallTitle,
    teamTitle,
    teamSubtitle,
    articlesSmallTitle,
    articlesTitle,
    articlesSubtitle,
    copyright
  }`)
}

// Add new query functions
export async function getArticles(limit = 3) {
  return client.fetch<Article[]>(groq`*[_type == "article"] | order(publishedAt desc)[0...${limit}]{
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    "author": author->{
      _id,
      name,
      slug,
      image
    },
    "categories": categories[]->{
      _id,
      title
    }
  }`)
}

export async function getAuthor(id: string) {
  return client.fetch<Author>(groq`*[_type == "author" && _id == $id][0]{
    _id,
    name,
    slug,
    image,
    bio
  }`, { id })
}

// Navigation
export async function getNavigation() {
  return client.fetch<Navigation[]>(
    groq`*[_type == "navigation"] | order(order asc) {
      title,
      url
    }`
  );
}

// Hero
export async function getHero() {
  return client.fetch(
    groq`*[_type == "hero"][0]{
      title,
      subtitle,
      ctaText,
      backgroundImage,
      slides[]{
        title,
        subtitle,
        ctaText,
        backgroundImage
      }
    }`
  );
}

// About cards
export async function getAboutCards() {
  return client.fetch<AboutCard[]>(
    groq`*[_type == "aboutCard"] | order(order asc) {
      title,
      description,
      icon,
      iconBgColor
    }`
  );
}

// Programs
export async function getPrograms() {
  return client.fetch<Program[]>(
    groq`*[_type == "program"] | order(order asc) {
      _id,
      title,
      description,
      image,
      status
    }`
  );
}

// Team members
export async function getTeamMembers() {
  return client.fetch<TeamMember[]>(
    groq`*[_type == "teamMember"] | order(order asc) {
      _id,
      name,
      position,
      image,
      instagram,
      email,
      linkedin
    }`
  );
}

// Footer
export async function getFooter() {
  return client.fetch(
    groq`{
      "columns": *[_type == "footerColumn"] | order(order asc) {
        title,
        "links": links[] {
          title,
          url
        }
      },
      "copyright": *[_type == "siteSettings"][0].copyright
    }`
  );
}
