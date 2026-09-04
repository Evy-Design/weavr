import {notFound} from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {client} from '@/sanity/client'
import {DEEP_DIVE_PAGE_QUERY} from '@/sanity/queries'
import {Reveal, RevealGroup, RevealItem} from '@/components/Reveal'
import {SmallArrowIcon} from '@/components/SmallArrowIcon'
import {CtaLink} from '@/components/CtaLink'

export const revalidate = 60

export default async function DeepDivePage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const page = await client.fetch(DEEP_DIVE_PAGE_QUERY, {slug}, {next: {revalidate}})
  if (!page) return notFound()

  const paragraphs: string[] = page.paragraphs ?? []
  const midListBullets: string[] = page.midListBullets ?? []
  const paragraphs2: string[] = page.paragraphs2 ?? []
  const bullets: string[] = page.bullets ?? []

  return (
    <>
      <div className="rounded-b-[40px] bg-[#f0ede1] px-4 pt-24 pb-12 sm:px-16 sm:pt-32 sm:pb-16">
        <Reveal className="mx-auto max-w-[1920px]">
          <div className="flex flex-col items-start gap-12 rounded-[20px] border border-[#343434] p-4 sm:p-8">
            <Link
              href={page.backHref || '/onze-aanpak'}
              aria-label="Terug"
              className="inline-flex items-center justify-center rounded-full border border-[#343434] px-3 py-2 text-[#343434] transition-colors hover:border-accent hover:text-accent"
            >
              <SmallArrowIcon className="h-3 w-3 rotate-180" />
            </Link>
            <h1 className="w-full text-[32px] leading-none font-normal text-[#343434] sm:text-[62px]">
              {page.stepTitle}
            </h1>
          </div>
        </Reveal>
      </div>

      <div className="px-4 py-16 sm:px-16 sm:py-24">
        <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-8 sm:grid-cols-[412px_1fr] sm:items-start sm:gap-12">
          <Reveal className="flex flex-col items-start gap-8 sm:sticky sm:top-[70px]">
            {(page.tag || page.duration) && (
              <div className="flex flex-wrap items-center gap-3">
                {page.tag && (
                  <span className="rounded-[20px] border border-[#343434] px-3 py-[6px] text-[16px] leading-[1.1] text-[#343434]">
                    {page.tag}
                  </span>
                )}
                {page.duration && (
                  <span className="rounded-[20px] bg-accent px-3 py-[6px] text-[16px] leading-[1.1] text-[#f0ede1]">
                    Gemiddelde tijdsduur: <span className="font-medium">{page.duration}</span>
                  </span>
                )}
              </div>
            )}
            <h2 className="text-[32px] leading-none font-normal text-[#343434] sm:text-[48px]">
              {page.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="space-y-8 sm:ml-auto sm:max-w-[708px]">
            {paragraphs.length > 0 && (
              <div className="space-y-8">
                <div className="h-8 w-px bg-[#5d5d5d]" />
                <div className="space-y-4 text-base leading-[1.21] text-[#5d5d5d] sm:text-[20px]">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            )}

            {(page.midListIntro || midListBullets.length > 0) && (
              <div className="space-y-4">
                {page.midListIntro && (
                  <p className="text-base leading-[1.21] text-[#5d5d5d] sm:text-[20px]">
                    {page.midListIntro}
                  </p>
                )}
                {midListBullets.length > 0 && (
                  <ul className="space-y-3">
                    {midListBullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <Image
                          src="/bullet-arrow.svg"
                          alt=""
                          width={13}
                          height={15}
                          className="mt-1.5 shrink-0"
                        />
                        <span className="text-base leading-[1.21] text-[#5d5d5d] sm:text-[20px]">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {paragraphs2.length > 0 && (
              <div className="space-y-4 text-base leading-[1.21] text-[#5d5d5d] sm:text-[20px]">
                {paragraphs2.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {(page.bulletsIntro || bullets.length > 0) && (
              <div className="space-y-6 rounded-[20px] border border-[#343434] p-6 sm:p-8">
                {page.bulletsIntro && (
                  <>
                    <p className="text-base leading-[1.21] text-[#343434] sm:text-[20px]">
                      {page.bulletsIntro}
                    </p>
                    <div className="h-px w-full bg-[#343434]/20" />
                  </>
                )}
                {bullets.length > 0 && (
                  <RevealGroup className="space-y-4">
                    {bullets.map((b, i) => (
                      <RevealItem key={i} className="flex items-start gap-4">
                        <span className="mt-1.5 h-4 w-4 shrink-0 rounded-full bg-[#b9b991]" />
                        <span className="text-base leading-[1.21] text-[#343434] sm:text-[20px]">
                          {b}
                        </span>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                )}
              </div>
            )}

            {(page.extraNote || page.extraCta) && (
              <div className="flex flex-wrap items-end gap-6">
                {page.extraNote && (
                  <p className="text-base leading-[1.2] text-[#5d5d5d] sm:text-[20px]">
                    {page.extraNote}
                  </p>
                )}
                {page.extraCta && <CtaLink link={page.extraCta} variant="text" />}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </>
  )
}
