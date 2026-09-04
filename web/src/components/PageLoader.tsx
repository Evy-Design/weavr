'use client'

import {useEffect, useRef} from 'react'
import gsap from 'gsap'
import {CustomEase} from 'gsap/CustomEase'
import {SplitText} from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase, SplitText)
  CustomEase.create('weavrLoader', '0.65, 0.01, 0.05, 0.99')
}

export function PageLoader() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    if (sessionStorage.getItem('weavr-loader-shown')) {
      wrap.style.display = 'none'
      return
    }
    sessionStorage.setItem('weavr-loader-shown', '1')

    const container = wrap.querySelector<HTMLDivElement>('[data-load-container]')
    const bg = wrap.querySelector<HTMLDivElement>('[data-load-bg]')
    const progressBar = wrap.querySelector<HTMLDivElement>('[data-load-progress]')
    const video = wrap.querySelector<HTMLVideoElement>('[data-load-logo]')
    const textElements = Array.from(wrap.querySelectorAll<HTMLElement>('[data-load-text]'))
    const resetTargets = Array.from(
      wrap.querySelectorAll<HTMLElement>('[data-load-reset]:not([data-load-text])'),
    )
    if (!container || !bg || !progressBar) return

    video?.play().catch(() => {})
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      defaults: {ease: 'weavrLoader', duration: 3},
      onComplete: () => {
        document.body.style.overflow = ''
      },
    })
      .set(wrap, {display: 'block'})
      .to(progressBar, {scaleX: 1})
      .to(container, {autoAlpha: 0, duration: 0.5})
      .to(progressBar, {scaleX: 0, transformOrigin: 'right center', duration: 0.5}, '<')
      .add('hideContent', '<')
      .to(bg, {yPercent: -101, duration: 1}, 'hideContent')
      .set(wrap, {display: 'none'})

    if (resetTargets.length) {
      tl.set(resetTargets, {autoAlpha: 1}, 0)
    }

    if (textElements.length >= 2) {
      const firstWord = SplitText.create(textElements[0], {type: 'lines,chars', mask: 'lines'})
      const secondWord = SplitText.create(textElements[1], {type: 'lines,chars', mask: 'lines'})

      gsap.set([firstWord.chars, secondWord.chars], {autoAlpha: 0, yPercent: 125})
      gsap.set(textElements, {autoAlpha: 1})

      tl.to(
        firstWord.chars,
        {autoAlpha: 1, yPercent: 0, duration: 0.6, stagger: {each: 0.02}},
        0,
      )
      tl.to(
        firstWord.chars,
        {autoAlpha: 0, yPercent: -125, duration: 0.4, stagger: {each: 0.02}},
        '>+=0.4',
      )
      tl.to(
        secondWord.chars,
        {autoAlpha: 1, yPercent: 0, duration: 0.6, stagger: {each: 0.02}},
        '<',
      )
      tl.to(
        secondWord.chars,
        {autoAlpha: 0, yPercent: -125, duration: 0.4, stagger: {each: 0.02}},
        'hideContent-=0.5',
      )
    }

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[100] h-dvh w-full text-[#f0ede1]"
      aria-hidden
    >
      <div data-load-bg className="absolute inset-0 h-full w-full bg-[#0a0a0a]">
        <div
          data-load-progress
          className="absolute inset-x-0 bottom-0 z-10 h-2 origin-left scale-x-0 bg-[#f0ede1]"
        />
      </div>
      <div
        data-load-container
        className="relative z-[2] flex h-full w-full flex-col items-center justify-center"
      >
        <div className="relative flex h-32 w-48 items-center justify-center">
          <video
            data-load-logo
            src="/loader-brand-mark.mp4"
            className="absolute w-full"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <div className="absolute bottom-14 flex flex-col items-center justify-center">
          <span
            data-load-text
            data-load-reset
            className="absolute text-xs tracking-wide whitespace-nowrap uppercase opacity-0"
          >
            Hold tight
          </span>
          <span
            data-load-text
            data-load-reset
            className="absolute text-xs tracking-wide whitespace-nowrap uppercase opacity-0"
          >
            Hi there!
          </span>
        </div>
      </div>
    </div>
  )
}
