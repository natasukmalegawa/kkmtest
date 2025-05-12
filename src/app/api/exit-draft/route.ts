import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  // Tunggu promise dari draftMode() selesai
  const draft = draftMode()
  
  // Kemudian panggil method disable pada objek yang dikembalikan
  draft.disable()
  
  redirect('/')
}
