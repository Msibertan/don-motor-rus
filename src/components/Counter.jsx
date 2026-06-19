import { useEffect, useRef, useState } from 'react'

export default function Counter({ value, suffix = '', label }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = performance.now()
          const dur = 1500
          const tick = (now) => {
            const t = Math.min((now - start) / dur, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setN(Math.round(eased * value))
            if (t < 1) raf = requestAnimationFrame(tick)
          }
          raf = requestAnimationFrame(tick)
          io.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return (
    <div className="hero__metric" ref={ref}>
      <b>
        {n.toLocaleString('ru-RU')}
        {suffix}
      </b>
      <span>{label}</span>
    </div>
  )
}
