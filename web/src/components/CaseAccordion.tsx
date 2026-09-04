'use client'

import {useState} from 'react'

type Case = {
  _key: string
  title?: string | null
  uitdaging?: string | null
  oplossing?: string | null
}

export function CaseAccordion({cases}: {cases: Case[]}) {
  const [openKey, setOpenKey] = useState<string | null>(null)

  return (
    <div className="divide-y divide-border border-t border-b border-border">
      {cases.map((c) => {
        const isOpen = openKey === c._key
        return (
          <div key={c._key}>
            <button
              type="button"
              onClick={() => setOpenKey(isOpen ? null : c._key)}
              className="flex w-full items-center justify-between py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-2xl font-medium tracking-tight uppercase sm:text-3xl">
                {c.title}
              </span>
              <span className={`text-xl transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
            {isOpen && (
              <div className="grid gap-6 pb-8 sm:grid-cols-2">
                {c.uitdaging && (
                  <div>
                    <p className="text-xs tracking-widest text-accent uppercase">Uitdaging</p>
                    <p className="mt-2 text-muted">{c.uitdaging}</p>
                  </div>
                )}
                {c.oplossing && (
                  <div>
                    <p className="text-xs tracking-widest text-accent uppercase">Oplossing</p>
                    <p className="mt-2 text-muted">{c.oplossing}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
