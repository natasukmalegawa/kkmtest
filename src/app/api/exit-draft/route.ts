import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  // Tunggu promise selesai dengan await karena draftMode() mengembalikan Promise<DraftMode>
  const draft = await draftMode()
  
  // Kemudian panggil method disable pada objek DraftMode yang sudah di-resolve
  draft.disable()
  
  redirect('/')
}
