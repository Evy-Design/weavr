export function BulletChevron({className = 'h-3 w-3 text-accent'}: {className?: string}) {
  return (
    <svg viewBox="0 0 14 15" fill="none" className={className} aria-hidden>
      <path
        d="M0 3.78v1.37c0 .14.1.26.23.28l9.8 1.79c.31.06.31.5 0 .56l-9.8 1.79a.29.29 0 0 0-.23.28v1.37c0 .18.16.31.34.28l12.73-2.32c.13-.02.23-.14.23-.28V6.1c0-.14-.1-.26-.23-.28L.34 3.5A.29.29 0 0 0 0 3.78Z"
        fill="currentColor"
      />
    </svg>
  )
}
