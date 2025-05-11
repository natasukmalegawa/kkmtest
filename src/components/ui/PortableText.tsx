'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PortableText as SanityPortableText } from '@portabletext/react'
import type { PortableTextMarkComponentProps } from '@portabletext/react'
import { urlForImage } from '@/lib/sanity-image'

export function PortableText({ value }: { value: any }) {
  const components = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return null
        }
        
        return (
          <div className="relative w-full h-80 my-8 rounded-xl overflow-hidden">
            <Image
              src={urlForImage(value).width(1200).url()}
              alt={value.alt || ' '}
              fill
              className="object-cover"
            />
            {value.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                {value.caption}
              </div>
            )}
          </div>
        )
      },
    },
    marks: {
      link: ({ children, value = {} }: PortableTextMarkComponentProps<any>) => {
        const href = value?.href || '';
        const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <Link href={href} rel={rel} className="text-apple-blue hover:underline">
            {children}
          </Link>
        )
      },
    },
  }
  
  return <SanityPortableText value={value} components={components} />
}
