export function LogoAnimation({className}: {className?: string}) {
  return (
    <video
      src="/weavr-logo-animation.mp4"
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      aria-label="Weavr"
      role="img"
    />
  )
}
