'use client'

import {useState} from 'react'
import Image from 'next/image'
import {ChevronIcon} from './ChevronIcon'
import {RevealGroup, RevealItem} from './Reveal'

const CASE_LOGOS: Record<string, string> = {
  Philips: '/logo-philips.png',
  'Neff (Siemens/BSH)': '/logo-neff.png',
  'Gaggenau (Siemens/BSH)': '/logo-gaggenau.png',
  'BSH Inspiratiehuis': '/logo-bsh.png',
  NOSUCH: '/logo-nosuch.png',
}

type CaseStudy = {
  _key: string
  title?: string | null
  uitdaging?: string | null
  oplossing?: string | null
}

export function CaseStudyAccordion({caseStudies}: {caseStudies: CaseStudy[]}) {
  const [openKey, setOpenKey] = useState<string | null>(null)

  return (
    <RevealGroup className="divide-y divide-[#343434] border-t border-[#343434]">
      {caseStudies.map((c) => {
        const isOpen = openKey === c._key
        return (
          <RevealItem key={c._key} className="py-6">
            <button
              type="button"
              onClick={() => setOpenKey(isOpen ? null : c._key)}
              className="flex w-full items-start justify-between gap-6 text-left"
              aria-expanded={isOpen}
            >
              {c.title && CASE_LOGOS[c.title] && (
                <Image
                  src={CASE_LOGOS[c.title]}
                  alt={c.title}
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
              )}
              <ChevronIcon
                className={`h-4 w-4 shrink-0 text-[#343434] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{gridTemplateRows: isOpen ? '1fr' : '0fr'}}
            >
              <div className="overflow-hidden">
                <div className="space-y-4 pt-4">
                  {c.uitdaging && (
                    <div className="space-y-2">
                      <p className="text-base leading-[1.21] text-[#343434] sm:text-[20px]">
                        Uitdaging:
                      </p>
                      <p className="text-sm leading-[1.2] text-[#5d5d5d] sm:text-[18px]">
                        {c.uitdaging}
                      </p>
                    </div>
                  )}
                  {c.oplossing && (
                    <div className="space-y-2">
                      <p className="text-base leading-[1.21] text-[#343434] sm:text-[20px]">
                        Oplossing:
                      </p>
                      <p className="text-sm leading-[1.2] text-[#5d5d5d] sm:text-[18px]">
                        {c.oplossing}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </RevealItem>
        )
      })}
    </RevealGroup>
  )
}
