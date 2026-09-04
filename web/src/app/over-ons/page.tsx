import Image from 'next/image'
import {client} from '@/sanity/client'
import {ABOUT_PAGE_QUERY} from '@/sanity/queries'
import {Reveal, RevealDown, RevealGroup, RevealItem} from '@/components/Reveal'
import {CaseStudyAccordion} from '@/components/CaseStudyAccordion'

export const revalidate = 60

const BRAND_LOGOS: Record<string, string> = {
  Bosch: '/logo-bosch.png',
  'B/S/H/': '/logo-bsh.png',
  Gaggenau: '/logo-gaggenau.png',
  IHM: '/logo-ihm.png',
  Knauf: '/logo-knauf.png',
  Neff: '/logo-neff.png',
  Nosuch: '/logo-nosuch.png',
  Philips: '/logo-philips.png',
  Siemens: '/logo-siemens.png',
  Hypotheekshop: '/logo-square-hypotheekshop.png',
  'Zorg en Zekerheid': '/logo-zorg-en-zekerheid-1.png',
}

export default async function AboutPage() {
  const page = await client.fetch(ABOUT_PAGE_QUERY, {}, {next: {revalidate}})
  if (!page) return null
  const beliefs = page.beliefs ?? []
  const brands = page.brands ?? []
  const caseStudies = page.caseStudies ?? []

  return (
    <>
      {/* Intro + Onze ambitie: one continuous cream block */}
      <div className="relative">
        <div className="relative -mb-10 overflow-hidden pb-[200px]">
          <Image src="/overons-header-bg.png" alt="" fill className="object-cover" />
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

        <div className="relative rounded-[40px] bg-white px-4 pb-16 sm:px-16">
          <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-6 pt-8 sm:grid-cols-[380px_1fr] sm:gap-12 sm:pt-24">
            <Reveal>
              <h2 className="text-[28px] leading-none font-normal text-[#343434] sm:text-[48px]">
                {page.ambitieHeading}
              </h2>
            </Reveal>
            <div className="space-y-6 sm:ml-auto sm:max-w-[708px]">
              <Reveal className="space-y-6">
                <div className="h-8 w-px bg-[#5d5d5d]" />
                <p className="text-base leading-[1.2] text-[#5d5d5d] sm:text-[20px]">
                  {page.ambitieBody}
                </p>
              </Reveal>
              {beliefs.length > 0 && (
                <>
                  <Reveal delay={0.1}>
                    <p className="text-base leading-[1.2] text-[#5d5d5d] sm:text-[20px]">
                      Hierbij gaan we uit van onze ervaring dat:
                    </p>
                  </Reveal>
                  <RevealGroup className="space-y-4">
                    {beliefs.map((b) => (
                      <RevealItem key={b} className="flex items-start gap-4">
                        <Image
                          src="/bullet-arrow.svg"
                          alt=""
                          width={13}
                          height={15}
                          className="mt-1.5 shrink-0"
                        />
                        <span className="text-base leading-[1.2] text-[#5d5d5d] sm:text-[20px]">
                          {b}
                        </span>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Weavr word origin */}
      <section className="px-4 py-16 sm:px-16 sm:py-24">
        <div className="mx-auto max-w-[1920px]">
          <div className="h-px w-full bg-[#343434]" />
          <Reveal className="mt-16 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-8">
            <div className="max-w-[708px] space-y-8 sm:flex-1">
              <h2 className="text-[28px] leading-none font-normal text-[#343434] sm:text-[48px]">
                {page.weavrWordHeading}
              </h2>
              <p className="text-base leading-[1.2] text-[#5d5d5d] sm:text-[20px]">
                {page.weavrWordBody}
              </p>
            </div>
            <div className="aspect-video w-full max-w-[708px] rounded-[20px] bg-[#e8e3d5] sm:ml-auto" />
          </Reveal>
        </div>
      </section>

      {/* Oorsprong + brands + cases */}
      <section className="px-4 pb-16 sm:px-16 sm:pb-24">
        <div className="mx-auto max-w-[1920px] space-y-24 sm:space-y-40">
          <Reveal className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-8">
            <div className="max-w-[708px] space-y-8 sm:flex-1">
              <h2 className="text-[28px] leading-none font-normal text-[#343434] sm:text-[48px]">
                {page.oorsprongHeading}
              </h2>
              <p className="text-base leading-[1.2] text-[#5d5d5d] sm:text-[20px]">
                {page.oorsprongBody}
              </p>
            </div>
            <div className="relative aspect-[708/631] w-full max-w-[708px] overflow-hidden rounded-[20px] sm:ml-auto">
              <Image
                src="/oorsprong-martijn.jpg"
                alt="Martijn van Leeuwen, founder van Weavr"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>

          {brands.length > 0 && (
            <Reveal className="grid grid-cols-1 items-start gap-8 sm:grid-cols-[380px_1fr] sm:gap-12">
              <p className="text-lg leading-none text-[#343434] sm:text-[24px]">
                Martijn heeft onder andere gewerkt voor de volgende merken, direct of indirect:
              </p>
              <RevealGroup className="grid grid-cols-2 items-center gap-8 sm:ml-auto sm:max-w-[708px] sm:grid-cols-3">
                {brands.map((b) => (
                  <RevealItem key={b} className="flex items-center justify-center">
                    {BRAND_LOGOS[b] ? (
                      <Image
                        src={BRAND_LOGOS[b]}
                        alt={b}
                        width={165}
                        height={40}
                        className="h-8 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-sm text-foreground/70">{b}</span>
                    )}
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>
          )}

          {caseStudies.length > 0 && (
            <Reveal className="grid grid-cols-1 items-start gap-8 sm:grid-cols-[380px_1fr] sm:gap-12">
              <p className="text-lg leading-none text-[#343434] sm:text-[24px]">
                Voorbeelden van eerdere groeiresultaten waar Martijn een leidende rol in had:
              </p>
              <div className="sm:ml-auto sm:max-w-[708px]">
                <CaseStudyAccordion caseStudies={caseStudies} />
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
