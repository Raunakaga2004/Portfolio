export const revalidate = 60 // content is edited outside Next too (mcp/server.ts), so don't rely only on revalidatePath

import ClientWrapper from './ClientWrapper'
import { getContent } from '@/lib/getContent'

export default async function ServerComponent(){
  const content = await getContent();
  return <ClientWrapper content={content}/>
}
