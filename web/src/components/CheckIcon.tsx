export function CheckIcon({className = 'h-3 w-3'}: {className?: string}) {
  return (
    <svg viewBox="0 0 16 12" fill="none" className={className} aria-hidden>
      <path
        d="M1 6.2 5.6 11 15 1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
