export function ArrowIcon({className = 'h-3 w-3'}: {className?: string}) {
  return (
    <svg viewBox="0 0 53 53" fill="none" className={className} aria-hidden>
      <path
        d="M0.5 1H52V52.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M0.8 52.4L51.7 1.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}
