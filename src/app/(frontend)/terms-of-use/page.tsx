import { getTermsOfUsePage } from '@/lib/apiServices'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getTermsOfUsePage()

  return {
    title: page?.title || 'Terms of Use',
  }
}

export default async function TermsOfUsePage() {
  const page = await getTermsOfUsePage()

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex md:gap-8 gap-4 flex-wrap md:justify-between">
      <article className="border border-gray-300 rounded-lg p-8 mx-auto">
        <h1 className="text-2xl font-bold md:text-4xl mb-4">{page.title}</h1>
        <div className="prose prose-slate mx-auto">
          <RichText data={page.content} />
        </div>
      </article>
    </div>
  )
}
