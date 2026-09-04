import Image from 'next/image'
import {client} from '@/sanity/client'
import {APPROACH_PAGE_QUERY} from '@/sanity/queries'
import {Reveal, RevealCta, RevealDown} from '@/components/Reveal'
import {CtaLink} from '@/components/CtaLink'
import {StepTimeline} from '@/components/StepTimeline'

export const revalidate = 60

const TOOLKIT_ICONS = [
  '/icon-strategisch.svg',
  '/icon-innovatie.svg',
  '/icon-marketing.svg',
  '/icon-organisatie.svg',
  '/icon-interim.svg',
  '/icon-structureel.svg',
]

export default async function ApproachPage() {
  const page = await client.fetch(APPROACH_PAGE_QUERY, {}, {next: {revalidate}})
  if (!page) return null
  const steps = page.steps ?? []
  const toolkitCategories = page.toolkitCategories ?? []

  return (
    <>
      {/* Intro + 4 stappen: one continuous cream block */}
      <div className="relative">
        <div className="relative -mb-10 overflow-hidden pb-[200px]">
          <Image src="/aanpak-header-bg.png" alt="" fill className="object-cover" />
          <RevealDown className="relative rounded-b-[40px] bg-[#f0ede1] px-4 pt-24 pb-12 sm:px-16 sm:pt-32 sm:pb-16">
            <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-8 sm:grid-cols-[380px_1fr] sm:gap-12">
              <h1 className="text-[32px] leading-none font-normal text-[#343434] sm:text-[62px]">
                {page.heading}
              </h1>
              <p className="text-base leading-[1.21] text-[#5d5d5d] sm:ml-auto sm:max-w-[708px] sm:text-[20px]">
                {page.intro}
              </p>
            </div>
          </RevealDown>
        </div>

        <div className="relative rounded-[40px] bg-[#f0ede1] px-4 pb-16 sm:px-16">
          <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-8 sm:grid-cols-[380px_1fr] sm:items-start sm:gap-12">
            <div className="pt-8 sm:sticky sm:top-[46px] sm:pt-24">
              <Reveal>
                <h2 className="text-[28px] leading-none font-normal text-[#343434] sm:text-[48px]">
                  {page.stepsHeading}
                </h2>
                <p className="mt-4 text-base leading-[1.21] text-[#5d5d5d] sm:text-[20px]">
                  {page.stepsIntro}
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col pt-8 sm:ml-auto sm:max-w-[708px] sm:pt-24">
              <StepTimeline steps={steps} />
            </div>
          </div>
        </div>
      </div>

      {/* Toolkit */}
      <section className="px-4 py-16 sm:px-16 sm:py-24">
        <div className="mx-auto max-w-[1920px]">
          <Reveal className="max-w-[558px] space-y-4">
            <h2 className="text-[36px] leading-none font-normal text-[#343434] sm:text-[62px]">
              {page.toolkitHeading}
            </h2>
            <p className="text-base leading-[1.21] text-[#5d5d5d] sm:text-[20px]">
              {page.toolkitIntro}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {toolkitCategories.map((cat, i) => (
              <Reveal
                key={cat._key}
                delay={0.1 * (i % 2)}
                className="flex flex-col gap-8 rounded-[20px] border border-[#343434] p-8"
              >
                <div className="flex h-[100px] items-center sm:h-[163px]">
                  <Image
                    src={TOOLKIT_ICONS[i % TOOLKIT_ICONS.length]}
                    alt=""
                    width={240}
                    height={163}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-[22px] leading-none font-normal text-[#343434] sm:text-[30px]">
                    {cat.title}
                  </h3>
                  {cat.description && (
                    <p className="text-base leading-[1.21] text-[#111111] sm:text-[20px]">
                      {cat.description}
                    </p>
                  )}
                  {cat.services && cat.services.length > 0 && (
                    <ul className="list-disc space-y-1 pl-6 text-base text-[#111111] sm:text-[20px]">
                      {cat.services.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      {page.closingHeading && (
        <section className="relative flex min-h-[400px] items-end justify-center overflow-hidden p-4 sm:p-8">
          <Image src="/strategie-cta-bg.png" alt="" fill sizes="100vw" className="object-cover" />
          <RevealCta
            duration={1.4}
            className="relative flex w-full max-w-[1920px] flex-col items-start justify-between gap-6 rounded-[20px] bg-[#f0ede1] p-6 sm:flex-row sm:items-end sm:p-8"
          >
            <div className="max-w-[558px] space-y-4">
              <p className="text-[32px] leading-none font-normal text-[#343434] sm:text-[48px]">
                Vertel me meer
              </p>
              <p className="text-lg leading-none font-normal text-[#343434] sm:text-[30px]">
                {page.closingHeading}
              </p>
            </div>
            {page.closingCta && <CtaLink link={page.closingCta} />}
          </RevealCta>
        </section>
      )}
    </>
  )
}
