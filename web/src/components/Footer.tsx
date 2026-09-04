import Link from 'next/link'
import Image from 'next/image'

const PAGES = [
  {href: '/onze-aanpak', label: 'Onze aanpak'},
  {href: '/over-ons', label: 'Over ons'},
  {href: '/sluit-je-aan', label: 'Sluit je aan'},
  {href: '/werk', label: 'Werk'},
  {href: '/contact', label: 'Contact'},
  {href: '/algemene-voorwaarden', label: 'Algemene Voorwaarden'},
]

export function Footer({
  phone,
  email,
  linkedinUrl,
}: {
  phone?: string | null
  email?: string | null
  linkedinUrl?: string | null
}) {
  return (
    <footer className="border-t border-[#343434] bg-[#343434] px-4 pt-12 pb-16 sm:px-16">
      <div className="mx-auto flex max-w-[1920px] flex-wrap items-end justify-between gap-10">
        <div className="w-full max-w-[412px] sm:w-auto">
          <Image src="/logo.svg" alt="Weavr" width={407} height={92} className="h-[60px] w-auto sm:h-[92px]" />
        </div>
        <div className="flex w-full max-w-[412px] gap-14 sm:w-auto">
          <div className="flex flex-col items-start gap-6 text-left">
            <p className="w-full text-xl leading-none text-[#f0ede1]">PAGES</p>
            <ul className="space-y-2">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="group relative inline-block text-[16px] leading-[1.1] text-[#f0ede1]"
                  >
                    {p.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="w-full space-y-2 text-[#f0ede1]">
              <p className="text-xl leading-none">CONTACT</p>
              <div className="space-y-2">
                {phone && <p className="text-[16px] leading-[1.1] whitespace-nowrap">{phone}</p>}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="group relative inline-block text-[16px] leading-[1.1]"
                  >
                    {email}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </a>
                )}
              </div>
            </div>
          </div>
          {linkedinUrl && (
            <div className="flex flex-1 flex-col items-start gap-6 text-left">
              <p className="text-xl leading-none text-[#f0ede1]">SOCIAL</p>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-block text-[16px] leading-[1.1] text-[#f0ede1]"
              >
                LinkedIn
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
