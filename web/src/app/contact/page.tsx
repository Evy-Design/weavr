import Image from 'next/image'
import {client} from '@/sanity/client'
import {CONTACT_PAGE_QUERY, SITE_SETTINGS_QUERY} from '@/sanity/queries'
import {Reveal} from '@/components/Reveal'
import {ContactForm} from '@/components/ContactForm'
import {FaqAccordion} from '@/components/FaqAccordion'
import {CtaLink} from '@/components/CtaLink'

export const revalidate = 60

export default async function ContactPage() {
  const [page, settings] = await Promise.all([
    client.fetch(CONTACT_PAGE_QUERY, {}, {next: {revalidate}}),
    client.fetch(SITE_SETTINGS_QUERY, {}, {next: {revalidate}}),
  ])
  if (!page) return null
  const faqs = (page.faqs ?? []).map((f) => ({
    _id: f._id,
    question: f.question ?? '',
    answer: f.answer ?? [],
  }))

  return (
    <>
      <div className="relative overflow-hidden pt-[80px] sm:pt-[200px]">
        <Image src="/contact-header-bg.png" alt="" fill className="object-cover" />
        <Reveal className="relative flex flex-col gap-12 rounded-t-[40px] bg-white px-4 py-20 sm:gap-16 sm:px-16 sm:py-28">
          <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-8 sm:grid-cols-[380px_1fr] sm:gap-12">
            <h1 className="text-[32px] leading-none font-normal text-[#343434] sm:text-[62px]">
              {page.heading}
            </h1>
            <p className="text-base leading-[1.21] text-[#5d5d5d] sm:ml-auto sm:max-w-[708px] sm:text-[20px]">
              {page.intro}
            </p>
          </div>
          <div className="mx-auto h-px w-full max-w-[1920px] bg-[#343434]" />
        </Reveal>
      </div>

      <section className="space-y-8 px-4 py-16 sm:px-16 sm:py-24">
        <div className="mx-auto max-w-[1920px] space-y-8">
          <Reveal className="grid grid-cols-1 gap-8 sm:grid-cols-[380px_1fr] sm:gap-12">
            <h2 className="text-[28px] leading-none font-normal text-[#343434] sm:text-[48px]">
              {page.sessionHeading}
            </h2>
            <div className="max-w-[708px] space-y-6 sm:ml-auto">
              <p className="text-base leading-[1.2] text-[#5d5d5d] sm:text-[20px]">
                {page.sessionBody}
              </p>
              <div className="space-y-2">
                <p className="text-xl leading-none text-[#343434] sm:text-[24px]">
                  Bel of bericht Martijn
                </p>
                {settings?.phone && (
                  <p className="text-base whitespace-nowrap text-[#343434] sm:text-[20px]">
                    {settings.phone}
                  </p>
                )}
                {settings?.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="block text-base text-[#343434] underline sm:text-[20px]"
                  >
                    {settings.email}
                  </a>
                )}
              </div>
              {settings?.linkedinUrl && (
                <CtaLink link={{label: 'LinkedIn', url: settings.linkedinUrl}} variant="text" />
              )}
            </div>
          </Reveal>

          <Reveal className="rounded-[20px] border border-[#343434] p-6 sm:p-8">
            <h2 className="mb-8 text-xl leading-none font-normal text-[#343434] sm:text-[30px]">
              Contactformulier
            </h2>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="border-t border-[#343434] px-4 py-16 sm:px-16 sm:py-24">
          <div className="mx-auto max-w-[1920px]">
            <Reveal className="grid grid-cols-1 gap-8 sm:grid-cols-[380px_1fr] sm:gap-12">
              <h2 className="text-[32px] leading-none font-normal text-[#343434] sm:text-[48px]">
                {page.faqHeading}
              </h2>
              <div className="max-w-[708px] space-y-4 sm:ml-auto">
                {page.faqIntro && (
                  <p className="text-base leading-[1.2] text-[#5d5d5d] sm:text-[20px]">
                    {page.faqIntro}
                  </p>
                )}
                <CtaLink link={{label: 'Contact', url: '/contact'}} variant="text" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="mt-12">
              <FaqAccordion faqs={faqs} />
            </Reveal>
          </div>
        </section>
      )}
    </>
  )
}
