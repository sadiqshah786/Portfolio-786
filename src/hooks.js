import { useEffect, useRef, useState } from 'react'

// Reveal an element when it scrolls into view.
export function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.unobserve(el)
        }
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, shown]
}

// Count up to a number once it enters the viewport.
export function useCountUp(target, plus = false) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.unobserve(el)
        let cur = 0
        const step = Math.max(1, Math.ceil(target / 45))
        const t = setInterval(() => {
          cur += step
          if (cur >= target) {
            cur = target
            clearInterval(t)
          }
          setValue(cur)
        }, 22)
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target])
  return [ref, `${value}${plus ? '+' : ''}`]
}
