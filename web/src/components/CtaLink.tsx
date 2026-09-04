import Link from 'next/link'
import type {ReactNode} from 'react'
import {SmallArrowIcon} from './SmallArrowIcon'
import {EnvelopeIcon} from './EnvelopeIcon'

type LinkValue = {label?: string | null; url?: string | null} | null | undefined

function isExternal(url: string) {
  return url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:')
}

export function CtaLink({
  link,
  variant = 'outline',
  icon = 'arrow',
  className = '',
  children,
}: {
  link: LinkValue
  variant?: 'outline' | 'outline-inverted' | 'outline-muted' | 'solid' | 'text'
  icon?: 'arrow' | 'envelope'
  className?: string
  children?: ReactNode
}) {
  if (!link?.url) return null

  const base = 'inline-flex items-center gap-1 text-[16px] leading-[1.1] transition-colors duration-200'
  const pill = `${base} rounded-[20px] border px-3 pt-[6px] pb-[7px]`
  const styles =
    variant === 'text'
      ? `group ${base} gap-[3px] text-[#343434]`
      : variant === 'solid'
        ? `${pill} border-[#343434] bg-[#343434] text-[#f0ede1] hover:bg-accent hover:border-accent hover:text-[#343434]`
        : variant === 'outline-inverted'
          ? `${pill} border-[#f0ede1] text-[#f0ede1] hover:border-accent hover:text-accent`
          : variant === 'outline-muted'
            ? `${pill} border-[#5d5d5d] text-[#5d5d5d] hover:border-accent hover:text-accent`
            : `group ${pill} border-[#343434] text-[#343434]`

  const content = children ?? link.label

  const iconMotion =
    variant === 'text' || variant === 'outline'
      ? 'transition-transform duration-200 group-hover:translate-x-1'
      : ''

  const inner = (
    <>
      <span>{content}</span>
      {icon === 'envelope' ? (
        <EnvelopeIcon className={`h-3 w-4 shrink-0 ${iconMotion}`} />
      ) : (
        <SmallArrowIcon className={`h-3 w-3 shrink-0 ${iconMotion}`} />
      )}
    </>
  )

  if (isExternal(link.url)) {
    return (
      <a href={link.url} className={`${styles} ${className}`}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={link.url} className={`${styles} ${className}`}>
      {inner}
    </Link>
  )
}
