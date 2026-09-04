'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'
import {LogoAnimation} from './LogoAnimation'

const NAV_LINKS = [
  {href: '/onze-aanpak', label: 'Onze aanpak'},
  {href: '/over-ons', label: 'Over ons'},
  {href: '/sluit-je-aan', label: 'Sluit je aan'},
  {href: '/werk', label: 'Werk'},
  {href: '/contact', label: 'Contact'},
]

function HamburgerIcon() {
  return (
    <svg viewBox="0 0 24 16" fill="none" className="h-4 w-6" aria-hidden>
      <path d="M0 1H24" stroke="#343434" strokeWidth="1.3" />
      <path d="M0 8H24" stroke="#343434" strokeWidth="1.3" />
      <path d="M0 15H24" stroke="#343434" strokeWidth="1.3" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path d="M1 1L23 23" stroke="#343434" strokeWidth="1.3" />
      <path d="M23 1L1 23" stroke="#343434" strokeWidth="1.3" />
    </svg>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-[#f8f6f0] px-4 sm:px-16">
      <div className="mx-auto flex h-[46px] max-w-[1920px] items-center justify-between">
        <Link href="/" className="flex items-center">
          <LogoAnimation className="h-[20px] w-auto" />
        </Link>

        <nav className="hidden h-full items-end gap-6 pb-[16px] sm:flex sm:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative inline-block text-[15px] leading-none whitespace-nowrap text-[#343434]"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex items-center justify-center sm:hidden"
        >
          <HamburgerIcon />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex h-dvh w-full flex-col bg-[#f8f6f0] sm:hidden">
          <div className="flex h-[46px] items-center justify-between px-4">
            <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
              <LogoAnimation className="h-[20px] w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Sluit menu"
              className="flex items-center justify-center"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-start justify-center gap-8 px-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[36px] leading-none text-[#343434] transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
