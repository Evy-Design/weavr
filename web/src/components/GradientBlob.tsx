export function GradientBlob({className = ''}: {className?: string}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        background:
          'conic-gradient(from 120deg at 40% 40%, #d97b3f, #e8dfc8, #8a9270, #d97b3f, #efe6d2, #d97b3f)',
        filter: 'blur(60px) saturate(1.1)',
        opacity: 0.9,
      }}
    />
  )
}
