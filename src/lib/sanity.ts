import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2023-08-05'

if (!projectId) {
  console.warn('Sanity project ID is missing. Check your environment variables.')
}

// Opsi tambahan untuk meningkatkan performa dan menghindari error
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  stega: {
    enabled: false, // Disable stega for better performance
  },
})

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_TOKEN,
  stega: {
    enabled: false,
  },
})

export const getClient = (preview = false) => (preview ? previewClient : client)


// Helper function untuk client dengan spesifik tag
export function getTaggedClient(tag?: string) {
  return {
    fetch: <T>(query: string, params = {}) => {
      return unstable_cache(
        async () => client.fetch<T>(query, params),
        [`sanity-query-${tag || 'global'}`],
        {
          tags: [tag || 'global'],
          revalidate: 60 // 1 menit default revalidasi
        }
      )()
    }
  }
}
