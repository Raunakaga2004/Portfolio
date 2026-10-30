import ClientWrapper from './ClientWrapper'
import { getContent } from '@/lib/getContent'

export default async function ServerComponent(){
  const content = await getContent();
  return <ClientWrapper content={content}/>
}
