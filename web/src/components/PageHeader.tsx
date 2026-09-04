import type {ReactNode} from 'react'
import {Reveal} from './Reveal'

export function PageHeader({
  title,
  intro,
  children,
}: {
  title?: string | null
  intro?: string | null
  children?: ReactNode
}) {
  return (
    <div className="mx-4 mt-6 rounded-3xl bg-[#f0ede1] px-6 py-10 sm:mx-10 sm:px-12 sm:py-14">
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
        <h1 className="max-w-md text-4xl leading-tight font-medium text-[#343434] sm:text-5xl">
          {title}
        </h1>
        <div className="max-w-md md:pt-2">
          {intro && <p className="text-[#5d5d5d]">{intro}</p>}
          {children}
        </div>
      </Reveal>
    </div>
  )
}
