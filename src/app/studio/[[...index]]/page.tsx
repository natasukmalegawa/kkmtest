'use client'

import {NextStudio} from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  // Menghilangkan opsi styling yang mungkin bertabrakan
  return (
    <div className="h-screen w-full">
      <NextStudio config={config} />
    </div>
  )
}
