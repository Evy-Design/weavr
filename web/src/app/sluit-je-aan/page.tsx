import Image from 'next/image'
import {client} from '@/sanity/client'
import {JOIN_PAGE_QUERY} from '@/sanity/queries'
import {Reveal, RevealCta, RevealDown, RevealGroup, RevealItem} from '@/components/Reveal'
import {CtaLink} from '@/components/CtaLink'
import {ArrowIcon} from '@/components/ArrowIcon'

export const revalidate = 60

export default async function JoinPage() {
  const page = await client.fetch(JOIN_PAGE_QUERY, {}, {next: {revalidate}})
  if (!page) return null
  const requirements = page.requirements ?? []

  return (
    <>
      <div className="relative">
        <div className="relative -mb-24 overflow-hidden pb-[300px] sm:pb-[412px]">
          <Image src="/sluitjeaan-header-bg.png" alt="" fill className="object-cover" />
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

        <div className="relative px-4 sm:px-16">
          <RevealCta className="mx-auto max-w-[1920px] rounded-[32px] bg-[#f0ede1] p-6 sm:p-8">
            <h2 className="max-w-[708px] text-[28px] leading-none font-normal text-[#343434] sm:text-[48px]">
              {page.roleTitle}
            </h2>
            <div className="mt-6 flex flex-col items-end gap-6">
              <ArrowIcon className="hidden h-16 w-16 text-[#343434] sm:block" />
              {page.roleCta && <CtaLink link={page.roleCta} icon="envelope" />}
            </div>
          </RevealCta>
        </div>
      </div>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-[380px_1fr] sm:items-start sm:gap-12">
            <div className="sm:sticky sm:top-24">
              <Reveal>
                <h2 className="text-[28px] leading-none font-normal text-[#343434] sm:text-[48px]">
                  {page.lookingForHeading}
                </h2>
              </Reveal>
            </div>
            <div className="space-y-8 sm:ml-auto sm:max-w-[708px]">
              <Reveal className="space-y-8">
                <div className="h-8 w-px bg-[#5d5d5d]" />
                <p className="text-base leading-[1.2] text-[#5d5d5d] sm:text-[20px]">
                  {page.lookingForIntro}
                </p>
              </Reveal>
              {requirements.length > 0 && (
                <RevealGroup className="space-y-4">
                  {requirements.map((r) => (
                    <RevealItem key={r} className="flex items-start gap-4">
                      <Image
                        src="/bullet-arrow.svg"
                        alt=""
                        width={13}
                        height={15}
                        className="mt-1.5 shrink-0"
                      />
                      <span className="text-base leading-[1.2] text-[#5d5d5d] sm:text-[20px]">
                        {r}
                      </span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              )}

              {page.whyHeading && (
                <Reveal delay={0.1} className="space-y-4">
                  <h3 className="text-xl font-normal text-[#343434]">{page.whyHeading}</h3>
                  <p className="text-base leading-[1.2] text-[#5d5d5d] sm:text-[20px]">
                    {page.whyBody}
                  </p>
                  {page.whyCta && <CtaLink link={page.whyCta} icon="envelope" />}
                </Reveal>
              )}
            </div>
          </div>
        </div>

        <div className="relative mt-16 aspect-[1920/412] w-full overflow-hidden px-4 sm:px-16">
          <div className="relative mx-auto h-full max-w-[1920px] overflow-hidden rounded-[20px]">
            <Image src="/sluitjeaan-bottom-photo.png" alt="" fill className="object-cover" />
          </div>
        </div>
      </section>
    </>
  )
}
