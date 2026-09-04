'use client'

import Image from 'next/image'
import {useEffect, useRef} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {SplitText} from 'gsap/SplitText'
import {SmallArrowIcon} from './SmallArrowIcon'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

type Testimonial = {
  _id: string
  quote?: string | null
  name?: string | null
  role?: string | null
  company?: string | null
}

export function TestimonialsCarousel({
  testimonials,
  avatars,
}: {
  testimonials: Testimonial[]
  avatars: Record<string, string>
}) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const list = wrap.querySelector<HTMLDivElement>('[data-testimonial-list]')
    if (!list) return

    const items = Array.from(list.querySelectorAll<HTMLDivElement>('[data-testimonial-item]'))
    if (!items.length) return

    const btnPrev = wrap.querySelector<HTMLButtonElement>('[data-prev]')
    const btnNext = wrap.querySelector<HTMLButtonElement>('[data-next]')
    const elCurrent = wrap.querySelector('[data-current]')

    const imageClipHidden = 'circle(0% at 50% 50%)'
    const imageClipVisible = 'circle(50% at 50% 50%)'

    type Slide = {
      item: HTMLDivElement
      image: HTMLElement | null
      splitTargets: HTMLElement[]
      splitInstances: SplitText[]
      getLines: () => Element[]
    }

    const slides: Slide[] = items.map((item) => ({
      item,
      image: item.querySelector<HTMLElement>('[data-testimonial-img]'),
      splitTargets: [
        item.querySelector<HTMLElement>('[data-testimonial-text]'),
        ...Array.from(item.querySelectorAll<HTMLElement>('[data-testimonial-split]')),
      ].filter((el): el is HTMLElement => Boolean(el)),
      splitInstances: [],
      getLines() {
        return this.splitInstances.flatMap((instance) => instance.lines)
      },
    }))

    let activeIndex = 0
    let isAnimating = false
    let reduceMotion = false
    let isInView = true

    const autoplayDuration = 5000
    let autoplayCall: gsap.core.Tween | null = null

    function setSlideState(slideIndex: number, isActive: boolean) {
      const {item} = slides[slideIndex]
      item.classList.toggle('is-active', isActive)
      item.setAttribute('aria-hidden', String(!isActive))
      gsap.set(item, {
        autoAlpha: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
      })
    }

    function updateCounter() {
      if (elCurrent) elCurrent.textContent = String(activeIndex + 1)
    }

    function startAutoplay() {
      if (autoplayCall) autoplayCall.kill()
      autoplayCall = gsap.delayedCall(autoplayDuration / 1000, () => {
        if (!isInView || isAnimating) {
          startAutoplay()
          return
        }
        goTo((activeIndex + 1) % slides.length)
        startAutoplay()
      })
    }

    function pauseAutoplay() {
      autoplayCall?.pause()
    }

    function resumeAutoplay() {
      if (!autoplayCall) startAutoplay()
      else autoplayCall.resume()
    }

    function resetAutoplay() {
      startAutoplay()
    }

    slides.forEach((_, i) => setSlideState(i, i === activeIndex))
    updateCounter()

    const mm = gsap.matchMedia()
    mm.add({reduce: '(prefers-reduced-motion: reduce)'}, (context) => {
      const {reduce} = context.conditions as {reduce: boolean}
      reduceMotion = reduce
    })

    slides.forEach((slide, slideIndex) => {
      slide.splitInstances = slide.splitTargets.map((el) =>
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'testimonial-line',
          autoSplit: true,
          onSplit(self) {
            if (reduceMotion) return
            const isActive = slideIndex === activeIndex
            gsap.set(self.lines, {yPercent: isActive ? 0 : 110})
            if (slide.image) {
              gsap.set(slide.image, {
                clipPath: isActive ? imageClipVisible : imageClipHidden,
              })
            }
          },
        }),
      )
    })

    function goTo(nextIndex: number) {
      if (isAnimating || nextIndex === activeIndex) return
      isAnimating = true

      const outgoingSlide = slides[activeIndex]
      const incomingSlide = slides[nextIndex]

      const tl = gsap.timeline({
        onComplete: () => {
          setSlideState(activeIndex, false)
          setSlideState(nextIndex, true)
          activeIndex = nextIndex
          updateCounter()
          isAnimating = false
        },
      })

      if (reduceMotion) {
        tl.to(outgoingSlide.item, {autoAlpha: 0, duration: 0.4, ease: 'power2'}, 0).fromTo(
          incomingSlide.item,
          {autoAlpha: 0},
          {autoAlpha: 1, duration: 0.4, ease: 'power2'},
          0,
        )
        return
      }

      const outgoingLines = outgoingSlide.getLines()
      const incomingLines = incomingSlide.getLines()

      gsap.set(incomingSlide.item, {autoAlpha: 1, pointerEvents: 'auto'})
      gsap.set(incomingLines, {yPercent: 110})

      if (outgoingSlide.image) gsap.set(outgoingSlide.image, {clipPath: imageClipVisible})

      tl.to(
        outgoingLines,
        {yPercent: -110, duration: 0.6, ease: 'power4.inOut', stagger: {amount: 0.25}},
        0,
      )

      if (outgoingSlide.image) {
        tl.to(
          outgoingSlide.image,
          {clipPath: imageClipHidden, duration: 0.6, ease: 'power4.inOut'},
          0,
        )
      }

      tl.to(
        incomingLines,
        {yPercent: 0, duration: 0.7, ease: 'power4.inOut', stagger: {amount: 0.4}},
        '>-=0.3',
      )

      if (incomingSlide.image) {
        tl.fromTo(
          incomingSlide.image,
          {clipPath: imageClipHidden},
          {clipPath: imageClipVisible, duration: 0.75, ease: 'power4.inOut'},
          '<',
        )
      }

      tl.set(outgoingSlide.item, {autoAlpha: 0}, '>')
    }

    startAutoplay()

    const onNext = () => {
      resetAutoplay()
      goTo((activeIndex + 1) % slides.length)
    }
    const onPrev = () => {
      resetAutoplay()
      goTo((activeIndex - 1 + slides.length) % slides.length)
    }
    btnNext?.addEventListener('click', onNext)
    btnPrev?.addEventListener('click', onPrev)

    function onKeyDown(e: KeyboardEvent) {
      if (!isInView) return
      const t = e.target as HTMLElement | null
      const isTypingTarget =
        t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)
      if (isTypingTarget) return

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        onNext()
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onPrev()
      }
    }
    window.addEventListener('keydown', onKeyDown)

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => {
        isInView = true
        resumeAutoplay()
      },
      onEnterBack: () => {
        isInView = true
        resumeAutoplay()
      },
      onLeave: () => {
        isInView = false
        pauseAutoplay()
      },
      onLeaveBack: () => {
        isInView = false
        pauseAutoplay()
      },
    })

    return () => {
      autoplayCall?.kill()
      trigger.kill()
      mm.revert()
      window.removeEventListener('keydown', onKeyDown)
      btnNext?.removeEventListener('click', onNext)
      btnPrev?.removeEventListener('click', onPrev)
      slides.forEach((slide) => slide.splitInstances.forEach((instance) => instance.revert()))
    }
  }, [testimonials])

  if (testimonials.length === 0) return null

  return (
    <div ref={wrapRef} className="flex w-full flex-col gap-8 md:flex-row md:items-start">
      <div className="flex items-center gap-3 md:items-start md:pt-2">
        <button
          data-prev
          aria-label="Vorige testimonial"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f0ede1]/40 text-[#f0ede1] transition-colors duration-200 hover:border-[#f0ede1]"
        >
          <SmallArrowIcon className="h-3 w-3 rotate-180" />
        </button>
        <button
          data-next
          aria-label="Volgende testimonial"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f0ede1]/40 text-[#f0ede1] transition-colors duration-200 hover:border-[#f0ede1]"
        >
          <SmallArrowIcon className="h-3 w-3" />
        </button>
      </div>

      <div className="min-w-0 flex-1 md:ml-auto md:max-w-[708px]">
        <p className="mb-8 text-lg leading-none text-[#f0ede1]/60 sm:text-[20px]">
          <span data-current className="inline-block w-[1ch] text-[#f0ede1]">
            1
          </span>{' '}
          / <span data-total>{testimonials.length}</span>
        </p>

        <div data-testimonial-list className="relative grid w-full">
          {testimonials.map((t, i) => (
            <div
              key={t._id}
              data-testimonial-item
              aria-hidden={i !== 0}
              className={`col-start-1 row-start-1 flex w-full flex-col items-start gap-8 sm:gap-12 ${
                i === 0 ? '' : 'invisible opacity-0'
              }`}
            >
              <h3
                data-testimonial-text
                className="w-full max-w-[708px] text-[28px] leading-[1.2] font-normal tracking-tight text-[#f0ede1] sm:text-[42px]"
              >
                &ldquo;{t.quote}&rdquo;
              </h3>
              <div className="flex items-center gap-4">
                <div
                  data-testimonial-img
                  className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#f0ede1]/20"
                >
                  {t.name && avatars[t.name] && (
                    <Image
                      src={avatars[t.name]}
                      alt=""
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p data-testimonial-split className="text-base leading-none text-[#f0ede1]">
                    {t.name}
                  </p>
                  <p
                    data-testimonial-split
                    className="mt-1 text-sm leading-none text-[#f0ede1]/60"
                  >
                    {[t.role, t.company].filter(Boolean).join(', ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
