import { useState } from 'react'

export default function Faq({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="faq">
      {items.map((it, i) => (
        <div className={`faq__item ${open === i ? 'open' : ''}`} key={i}>
          <button
            className="faq__q"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            {it.q}
            <span className="sign" aria-hidden>
              +
            </span>
          </button>
          <div className="faq__a">
            <div className="faq__a-inner">{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
