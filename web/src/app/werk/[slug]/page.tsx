import {notFound} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {client} from '@/sanity/client'
import {WERK_ITEM_QUERY} from '@/sanity/queries'
import {urlFor} from '@/sanity/image'
import {Reveal} from '@/components/Reveal'

export const revalidate = 60

export default async function WerkDetailPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const item = await client.fetch(WERK_ITEM_QUERY, {slug}, {next: {revalidate}})

  if (!item) return notFound()
  const results = item.results ?? []
  const gallery = item.gallery ?? []

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Reveal>
        <Link href="/werk" className="text-sm text-muted hover:text-accent">
          ← Terug naar Werk
        </Link>
        <p className="mt-6 text-xs tracking-widest text-accent uppercase">Project</p>
        <h1 className="mt-2 text-4xl font-medium sm:text-5xl">{item.title}</h1>
        {item.clientName && <p className="mt-2 text-muted">{item.clientName}</p>}
      </Reveal>

      {item.coverImage && (
        <Reveal delay={0.1}>
          <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl">
            <Image
              src={urlFor(item.coverImage).width(1200).height(675).url()}
              alt={item.title ?? ''}
              fill
              className="object-cover"
            />
          </div>
        </Reveal>
      )}

      <div className="mt-10 space-y-8">
        {item.summary && (
          <Reveal>
            <p className="text-lg text-foreground/90">{item.summary}</p>
          </Reveal>
        )}
        {item.uitdaging && (
          <Reveal>
            <p className="text-xs tracking-widest text-accent uppercase">Uitdaging</p>
            <p className="mt-2 text-muted">{item.uitdaging}</p>
          </Reveal>
        )}
        {item.oplossing && (
          <Reveal>
            <p className="text-xs tracking-widest text-accent uppercase">Oplossing</p>
            <p className="mt-2 text-muted">{item.oplossing}</p>
          </Reveal>
        )}
        {results.length > 0 && (
          <Reveal>
            <p className="text-xs tracking-widest text-accent uppercase">Resultaten</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              {results.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>

      {gallery.length > 0 && (
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {gallery.map((img, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                <Image
                  src={urlFor(img).width(700).height(525).url()}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </article>
  )
}
