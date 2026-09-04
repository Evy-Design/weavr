import Link from 'next/link'
import Image from 'next/image'
import {client} from '@/sanity/client'
import {WERK_PAGE_QUERY, WERK_ITEMS_QUERY} from '@/sanity/queries'
import {urlFor} from '@/sanity/image'
import {Reveal} from '@/components/Reveal'
import {SmallArrowIcon} from '@/components/SmallArrowIcon'
import {WerkGallerySlider} from '@/components/WerkGallerySlider'

export const revalidate = 60

const PLACEHOLDER_IMAGES = [
  {url: '/werk-placeholder-logo.png', alt: '', fit: 'contain' as const, bg: '#b9b991'},
  {url: '/werk-placeholder-swirl.png', alt: ''},
  {url: '/werk-placeholder-logo.png', alt: '', fit: 'contain' as const, bg: '#f0ede1'},
  {url: '/werk-placeholder-swirl.png', alt: ''},
  {url: '/werk-placeholder-logo.png', alt: '', fit: 'contain' as const, bg: '#343434'},
]

export default async function WerkPage() {
  const [page, items] = await Promise.all([
    client.fetch(WERK_PAGE_QUERY, {}, {next: {revalidate}}),
    client.fetch(WERK_ITEMS_QUERY, {}, {next: {revalidate}}),
  ])

  return (
    <>
      <div className="relative overflow-hidden pt-[80px] sm:pt-[200px]">
        <Image src="/werk-header-bg.png" alt="" fill className="object-cover" />
        <Reveal className="relative flex flex-col gap-12 rounded-t-[40px] bg-white px-4 py-20 sm:gap-16 sm:px-16 sm:py-28">
          <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-8 sm:grid-cols-[380px_1fr] sm:gap-12">
            <h1 className="text-[32px] leading-none font-normal text-[#343434] sm:text-[62px]">
              {page?.heading ?? 'Werk'}
            </h1>
            <div className="space-y-2 text-base leading-[1.21] text-[#5d5d5d] sm:ml-auto sm:max-w-[708px] sm:text-[20px]">
              {page?.intro && <p>{page.intro}</p>}
              {page?.founderTeaser && <p>{page.founderTeaser}</p>}
            </div>
          </div>
          <div className="mx-auto h-px w-full max-w-[1920px] bg-[#343434]" />
        </Reveal>
      </div>

      {items && items.length > 0 ? (
        <div className="mx-auto flex max-w-[1920px] flex-col gap-12 px-2 py-12 sm:gap-16 sm:px-4 sm:py-16">
          {items.map((item, i) => {
            const images = [item.coverImage, ...(item.gallery ?? [])]
              .filter((img): img is NonNullable<typeof img> => Boolean(img))
              .map((img) => ({url: urlFor(img).width(900).height(980).url(), alt: ''}))
            const sliderImages = images.length > 0 ? images : PLACEHOLDER_IMAGES

            return (
              <Reveal key={item._id} delay={0.03 * i} className="space-y-5" fade={false}>
                <WerkGallerySlider images={sliderImages} />
                <Link href={`/werk/${item.slug?.current}`} className="group block">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-[42%_1fr] sm:gap-x-2.5">
                    <div className="flex gap-4">
                      <span className="text-lg leading-none text-[#5d5d5d] sm:text-[20px]">
                        Project
                      </span>
                      <div className="space-y-1">
                        <p className="text-lg leading-none text-[#343434] sm:text-[20px]">
                          {item.title}
                        </p>
                        {item.clientName && (
                          <p className="text-lg leading-none text-[#5d5d5d] sm:text-[20px]">
                            {item.clientName}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4 sm:pl-5">
                      {item.summary && (
                        <p className="text-base leading-[1.2] text-[#343434] sm:text-[20px]">
                          {item.summary}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-[3px] text-[16px] text-[#343434] group-hover:text-accent">
                        {item.ctaLabel || 'Meer zien'}
                        <SmallArrowIcon className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      ) : (
        <p className="py-20 text-center text-muted">Binnenkort meer werk hier te zien.</p>
      )}
    </>
  )
}
