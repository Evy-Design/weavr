export function DiagonalBand({className = 'h-[180px]'}: {className?: string}) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`} aria-hidden>
      <div
        className="absolute inset-[-40%]"
        style={{
          background:
            'linear-gradient(115deg, #e8dfc8 10%, #8a9270 28%, #201d18 48%, #d97b3f 66%, #efe6d2 85%)',
        }}
      />
    </div>
  )
}
