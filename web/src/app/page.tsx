import Image from 'next/image'
import {client} from '@/sanity/client'
import {HOME_PAGE_QUERY} from '@/sanity/queries'
import {Reveal, RevealCta} from '@/components/Reveal'
import {CtaLink} from '@/components/CtaLink'
import {ArrowIcon} from '@/components/ArrowIcon'
import {TestimonialsCarousel} from '@/components/TestimonialsCarousel'

export const revalidate = 60

const AVATARS: Record<string, string> = {
  'Dr Peter Pot': '/avatar-peter-pot.png',
  'Jelmer Huisman': '/avatar-jelmer-huisman.png',
  'Karine de Bruijn': '/avatar-karine-de-bruijn.png',
}

export default async function HomePage() {
  const page = await client.fetch(HOME_PAGE_QUERY, {}, {next: {revalidate}})
  if (!page) return null
  const testimonials = page.testimonials ?? []

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative flex min-h-[700px] flex-col justify-between overflow-hidden rounded-bl-[20px] rounded-br-[20px] py-16 sm:min-h-[800px] sm:py-32">
          <Image
            src="/hero-header.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="relative mx-auto w-full max-w-[1920px] px-4 sm:px-8">
            <Reveal className="max-w-[558px]">
              <h1 className="text-[40px] leading-none font-normal text-[#f0ede1] [text-shadow:0_0_12px_black] sm:text-[62px]">
                {page.heroHeading}
              </h1>
            </Reveal>
          </div>
          <div className="relative mx-auto w-full max-w-[1920px] px-4 sm:px-8">
            <Reveal delay={0.1} className="mb-16 flex justify-end sm:mb-0">
              <p className="max-w-[412px] text-right text-base leading-[1.21] text-[#f0ede1] [text-shadow:0_0_12px_black] sm:text-[20px]">
                {page.heroIntro}
              </p>
            </Reveal>
          </div>
        </div>

        {page.growthTeaserHeading && (
          <div className="relative px-4 sm:px-8">
            <RevealCta
              scale
              className="mx-auto -mt-16 max-w-[1920px] rounded-[20px] bg-[#f0ede1] p-4 sm:-mt-24 sm:p-8"
            >
              <h2 className="max-w-[708px] text-[32px] leading-none font-normal text-[#343434] sm:text-[48px]">
                {page.growthTeaserHeading}
              </h2>
              <div className="mt-4 flex flex-col items-end gap-4">
                <ArrowIcon className="h-10 w-10 text-[#343434] sm:h-[52px] sm:w-[52px]" />
                {page.growthTeaserCta && <CtaLink link={page.growthTeaserCta} />}
                {page.heroCta && <CtaLink link={page.heroCta} />}
              </div>
            </RevealCta>
          </div>
        )}
      </section>

      {/* W - tekst */}
      <section className="flex justify-center pr-4 sm:pr-16">
        <div className="flex w-full max-w-[1920px] items-start gap-8">
          <div className="relative hidden flex-1 self-stretch py-16 sm:py-24 md:block">
            <div className="sticky top-8 mx-auto aspect-[586/713] w-full max-w-[708px]">
              <Image src="/squiggle-vector-colored.svg" alt="" fill className="object-contain" />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-16 py-16 pl-4 sm:gap-32 sm:py-24 sm:pl-8 md:pl-0">
            <Reveal className="max-w-[708px] space-y-4">
              <h2 className="text-[32px] leading-none font-normal text-[#343434] sm:text-[48px]">
                {page.approachTeaserHeading}
              </h2>
              <p className="text-base leading-[1.2] font-[350] text-[#5d5d5d] sm:text-[20px]">
                {page.approachTeaserBody}
              </p>
              <CtaLink link={{label: 'Onze aanpak', url: '/onze-aanpak'}} variant="text" />
            </Reveal>
            <Reveal delay={0.1} className="max-w-[708px] space-y-4">
              <h2 className="text-[32px] leading-none font-normal text-[#343434] sm:text-[48px]">
                {page.expertsTeaserHeading}
              </h2>
              <p className="text-base leading-[1.2] font-[350] text-[#5d5d5d] sm:text-[20px]">
                {page.expertsTeaserBody}
              </p>
              <CtaLink link={{label: 'Over ons', url: '/over-ons'}} variant="text" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section
          className="flex flex-col items-center gap-12 overflow-hidden px-4 py-16 sm:px-16 sm:py-24"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgb(80,66,53) 0%, rgb(155,105,55) 26%, rgb(247,132,44) 68%, rgb(185,185,145) 93%)',
          }}
        >
          <div className="w-full max-w-[1920px]">
            <Reveal>
              <h2 className="text-[32px] leading-none font-normal text-white sm:text-[48px]">
                {page.testimonialsHeading}
              </h2>
            </Reveal>
          </div>
          <div className="w-full max-w-[1920px]">
            <TestimonialsCarousel testimonials={testimonials} avatars={AVATARS} />
          </div>
        </section>
      )}

      {/* Strategie CTA */}
      {page.ctaBannerHeading && (
        <section className="relative flex h-[400px] items-end justify-center overflow-hidden p-4 sm:h-[560px] sm:p-8">
          <Image src="/strategie-cta-bg.png" alt="" fill sizes="100vw" className="object-cover" />
          <RevealCta
            duration={1.6}
            y={140}
            className="relative flex w-full max-w-[1920px] flex-col items-start justify-between gap-6 rounded-[20px] bg-[#f0ede1] p-6 sm:flex-row sm:items-end sm:p-8"
          >
            <h2 className="max-w-[708px] text-[28px] leading-none font-normal text-[#343434] sm:text-[48px]">
              {page.ctaBannerHeading}
            </h2>
            {page.ctaBannerCta && <CtaLink link={page.ctaBannerCta} variant="outline-muted" />}
          </RevealCta>
        </section>
      )}
    </>
  )
}
