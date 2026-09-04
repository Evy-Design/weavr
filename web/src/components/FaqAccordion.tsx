'use client'

import {useState} from 'react'
import {PortableText} from 'next-sanity'
import type {ComponentProps} from 'react'
import {ChevronIcon} from './ChevronIcon'

type PortableTextValue = ComponentProps<typeof PortableText>['value']

export function FaqAccordion({
  faqs,
}: {
  faqs: {_id: string; question: string; answer: PortableTextValue}[]
}) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {faqs.map((faq) => {
        const isOpen = openId === faq._id
        return (
          <div key={faq._id} className="rounded-[20px] border border-white bg-[#f0ede1] p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq._id)}
              className="flex w-full items-center justify-between gap-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-lg leading-none text-[#343434] sm:text-[24px]">
                {faq.question}
              </span>
              <ChevronIcon
                className={`h-4 w-4 shrink-0 text-[#343434] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{gridTemplateRows: isOpen ? '1fr' : '0fr'}}
            >
              <div className="overflow-hidden">
                <div className="pt-4 text-sm leading-[1.4] text-[#5d5d5d] sm:text-base">
                  <PortableText value={faq.answer} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
