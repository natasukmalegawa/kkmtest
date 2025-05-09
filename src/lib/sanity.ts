import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2023-08-05'

if (!projectId) {
  console.warn('Sanity project ID is missing. Check your environment variables.')
}

export const client = createClient({
  projectId: projectId || 'placeholder-project-id',
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
})

export const previewClient = createClient({
  projectId: projectId || 'placeholder-project-id',
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_TOKEN,
})

export const getClient = (preview = false) => (preview ? previewClient : client)
