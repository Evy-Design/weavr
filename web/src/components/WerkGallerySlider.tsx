'use client'

import {useEffect, useRef} from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import {Draggable} from 'gsap/Draggable'
import {InertiaPlugin} from 'gsap/InertiaPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable, InertiaPlugin)
}

const MIN_SCALE = 0.92
const MAX_ROTATION = -4

type GalleryImage = {
  url: string
  alt?: string
  fit?: 'cover' | 'contain'
  bg?: string
}

export function WerkGallerySlider({images}: {images: GalleryImage[]}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const wrap = wrapRef.current
    const slider = listRef.current
    const slides = itemRefs.current.filter((el): el is HTMLDivElement => Boolean(el))
    if (!wrap || !slider || !slides.length || slides.length < 2) return

    wrap.style.touchAction = 'none'
    wrap.style.userSelect = 'none'

    let spacing = 0
    let maxDrag = 0
    let dragX = 0

    function clamp(value: number) {
      if (maxDrag <= 0) return 0
      return Math.min(Math.max(value, 0), maxDrag)
    }

    function update() {
      gsap.set(slider, {x: -dragX})
      slides.forEach((slide, i) => {
        const threshold = i * spacing
        const local = Math.max(0, dragX - threshold)
        const t = spacing > 0 ? Math.min(local / spacing, 1) : 0
        gsap.set(slide, {
          x: local,
          scale: 1 - (1 - MIN_SCALE) * t,
          rotation: MAX_ROTATION * t,
          transformOrigin: '75% center',
        })
      })
    }

    function recalc() {
      const style = getComputedStyle(slides[0])
      const gapRight = parseFloat(style.marginRight) || 0
      const slideW = slides[0].offsetWidth
      spacing = slideW + gapRight
      maxDrag = spacing * (slides.length - 1)
      dragX = clamp(dragX)
      update()
      draggable?.applyBounds({minX: -maxDrag, maxX: 0})
    }

    const draggable = Draggable.create(slider, {
      type: 'x',
      bounds: {minX: -maxDrag, maxX: 0},
      inertia: true,
      maxDuration: 1,
      snap: (raw: number) => {
        const d = clamp(-raw)
        const idx = spacing > 0 ? Math.round(d / spacing) : 0
        return -idx * spacing
      },
      onDrag() {
        dragX = clamp(-this.x)
        update()
      },
      onThrowUpdate() {
        dragX = clamp(-this.x)
        update()
      },
    })[0]

    const ro = new ResizeObserver(() => recalc())
    ro.observe(wrap)
    recalc()

    return () => {
      ro.disconnect()
      draggable?.kill()
    }
  }, [images])

  return (
    <div ref={wrapRef} className="relative h-[220px] w-full overflow-hidden sm:h-[380px]">
      <div ref={listRef} className="relative flex h-full flex-row items-center">
        {images.map((img, i) => (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el
            }}
            className="relative mr-2.5 flex h-full w-[85%] shrink-0 items-center justify-center overflow-hidden rounded-[20px] sm:w-[42%]"
            style={img.bg ? {backgroundColor: img.bg} : undefined}
          >
            {img.fit === 'contain' ? (
              <Image
                src={img.url}
                alt={img.alt ?? ''}
                width={200}
                height={62}
                draggable={false}
                className="pointer-events-none w-1/2"
              />
            ) : (
              <Image
                src={img.url}
                alt={img.alt ?? ''}
                fill
                draggable={false}
                className="pointer-events-none object-cover"
              />
            )}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />
    </div>
  )
}
