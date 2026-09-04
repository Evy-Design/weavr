import {PortableText} from 'next-sanity'
import {client} from '@/sanity/client'
import {LEGAL_PAGE_QUERY} from '@/sanity/queries'
import {Reveal} from '@/components/Reveal'

export const revalidate = 60

export default async function LegalPage() {
  const page = await client.fetch(
    LEGAL_PAGE_QUERY,
    {slug: 'algemene-voorwaarden'},
    {next: {revalidate}},
  )
  if (!page) return null

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <Reveal>
        <h1 className="text-4xl font-medium sm:text-5xl">{page.title}</h1>
        {page.body && (
          <div className="prose prose-neutral mt-10 max-w-none">
            <PortableText value={page.body} />
          </div>
        )}
      </Reveal>
    </article>
  )
}
