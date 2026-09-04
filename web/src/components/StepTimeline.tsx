'use client'

import {useEffect, useRef} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {CtaLink} from './CtaLink'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type StepCta = Parameters<typeof CtaLink>[0]['link']

type StepOption = {
  _key: string
  title?: string | null
  body?: string | null
  cta?: StepCta
}

type Step = {
  _key: string
  title?: string | null
  body?: string | null
  options?: StepOption[] | null
  cta?: StepCta
}

export function StepTimeline({steps}: {steps: Step[]}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const markerRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const wrap = wrapRef.current
    const line = lineRef.current
    const fill = fillRef.current
    if (!wrap || !line || !fill) return

    const items = itemRefs.current.filter((el): el is HTMLDivElement => Boolean(el))
    const anchors = markerRefs.current.filter((el): el is HTMLDivElement => Boolean(el))
    if (!items.length || anchors.length !== items.length) return

    const activationPercent = 50
    const lastIndex = items.length - 1

    let anchorFractions: number[] = [0]

    function measureLine() {
      if (items.length < 2) {
        line!.style.height = '0px'
        anchorFractions = [0]
        return
      }
      const wrapBox = wrap!.getBoundingClientRect()
      const centersY = anchors.map((anchor) => {
        const box = anchor.getBoundingClientRect()
        return box.top + box.height / 2 - wrapBox.top
      })
      const firstBox = anchors[0].getBoundingClientRect()
      const centerX = firstBox.left + firstBox.width / 2 - wrapBox.left

      const firstCenter = centersY[0]
      const span = centersY[lastIndex] - firstCenter
      line!.style.top = `${firstCenter}px`
      line!.style.left = `${centerX}px`
      line!.style.height = `${span}px`
      anchorFractions = centersY.map((c) => (span > 0 ? (c - firstCenter) / span : 0))
    }

    let currentIndex = -2
    function setCurrentIndex(index: number) {
      if (index === currentIndex) return
      currentIndex = index
      items.forEach((item, i) => {
        const status = index >= 0 && i <= index ? 'active' : 'inactive'
        if (item.getAttribute('data-status') !== status) item.setAttribute('data-status', status)
        item.toggleAttribute('data-current', i === index)
        const state = i === index ? 'current' : index >= 0 && i < index ? 'active' : 'inactive'
        if (item.getAttribute('data-state') !== state) item.setAttribute('data-state', state)
      })
    }

    function indexForProgress(reached: boolean, progress: number) {
      if (!reached) return -1
      let index = 0
      for (let i = 0; i < anchorFractions.length; i++) {
        if (progress + 0.0001 >= anchorFractions[i]) index = i
      }
      return index
    }

    function updateFromScroll(self: ScrollTrigger) {
      const reached = self.isActive || self.progress >= 1
      setCurrentIndex(indexForProgress(reached, self.progress))
    }

    setCurrentIndex(-1)
    gsap.set(fill, {transformOrigin: 'top', scaleY: 0})
    measureLine()
    ScrollTrigger.addEventListener('refreshInit', measureLine)

    let tween: gsap.core.Tween | null = null
    if (items.length > 1) {
      tween = gsap.fromTo(
        fill,
        {scaleY: 0},
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: line,
            start: `top ${activationPercent}%`,
            end: `bottom ${activationPercent}%`,
            scrub: true,
            onUpdate: updateFromScroll,
            onToggle: updateFromScroll,
            onRefresh: updateFromScroll,
          },
        },
      )
    } else {
      setCurrentIndex(0)
    }

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready?.then(refresh)
    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener('load', refresh)
      ScrollTrigger.removeEventListener('refreshInit', measureLine)
      tween?.scrollTrigger?.kill()
      tween?.kill()
    }
  }, [steps])

  return (
    <div ref={wrapRef} className="relative">
      <div ref={lineRef} className="pointer-events-none absolute w-px bg-[#343434]/15">
        <div ref={fillRef} className="absolute inset-0 w-full bg-accent" />
      </div>

      <div className="flex flex-col gap-16 sm:gap-20">
        {steps.map((step, i) => (
          <div
            key={step._key}
            ref={(el) => {
              itemRefs.current[i] = el
            }}
            className="group/step relative flex gap-6 sm:block"
          >
            <div className="flex w-8 shrink-0 flex-col items-center sm:absolute sm:top-0 sm:right-full sm:mr-6 sm:w-[123px] sm:flex-row sm:items-start sm:justify-between sm:pt-[6px]">
              <span className="hidden text-base text-[#343434] sm:block">Stap {i + 1}</span>
              <div
                ref={(el) => {
                  markerRefs.current[i] = el
                }}
                className="relative z-10 h-5 w-5 shrink-0 rounded-full border border-[#343434]/25 bg-[#f0ede1] transition-colors duration-300 group-data-[status=active]/step:border-accent group-data-[status=active]/step:bg-accent group-data-[current]/step:ring-4 group-data-[current]/step:ring-accent/15"
              />
            </div>

            <div className="flex-1 space-y-6 pb-4 opacity-40 transition-opacity duration-300 group-data-[state=active]/step:opacity-70 group-data-[state=current]/step:opacity-100">
              <div className="space-y-2">
                <h3 className="text-[22px] leading-none font-normal text-[#343434] sm:text-[30px]">
                  {step.title}
                </h3>
                {step.body && (
                  <p className="text-base leading-[1.21] text-[#5d5d5d] sm:text-[20px]">
                    {step.body}
                  </p>
                )}
              </div>

              {step.options && step.options.length > 0 && (
                <div className="space-y-6">
                  {step.options.map((opt) => (
                    <div key={opt._key} className="space-y-2">
                      <h4 className="text-lg font-normal text-[#343434] sm:text-[24px]">
                        {opt.title}
                      </h4>
                      {opt.body && (
                        <p className="text-sm leading-[1.2] text-[#5d5d5d] sm:text-[20px]">
                          {opt.body}
                        </p>
                      )}
                      {opt.cta && <CtaLink link={opt.cta} variant="text" />}
                    </div>
                  ))}
                </div>
              )}

              {step.cta && <CtaLink link={step.cta} variant="text" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
