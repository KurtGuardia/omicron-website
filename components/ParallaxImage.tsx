'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

export function ParallaxImage({
  src,
  className,
}: {
  src: string
  className: string
}) {
  const ref = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const image = ref.current
    const section = image?.closest('section')
    if (!image || !section) return
    const preference = matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    let frame = 0
    const paint = () => {
      frame = 0
      const bounds = section.getBoundingClientRect()
      if (preference.matches) {
        image.style.transform = 'none'
        return
      }
      if (bounds.bottom < 0 || bounds.top > innerHeight)
        return
      // The 160px overdraw on both edges safely contains the entire travel.
      const offset = Math.max(
        -144,
        Math.min(144, -bounds.top * 0.55),
      )
      image.style.transform = `translate3d(0,${offset}px,0)`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }
    paint()
    window.addEventListener('scroll', schedule, {
      passive: true,
    })
    window.addEventListener('resize', schedule)
    preference.addEventListener('change', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      preference.removeEventListener('change', schedule)
    }
  }, [])
  return (
    <span
      className={className}
      aria-hidden='true'
      style={{
        position: 'absolute',
        inset: '-160px 0',
        zIndex: -2,
        pointerEvents: 'none',
      }}
    >
      <Image
        ref={ref}
        src={src}
        alt=''
        priority
        sizes='100vw'
        fill
        style={{
          objectFit: 'cover',
          objectPosition: 'center 62%',
        }}
      />
    </span>
  )
}
