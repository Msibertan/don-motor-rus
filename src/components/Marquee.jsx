export default function Marquee({ items }) {
  const loop = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((it, i) => (
          <span className="marquee__item" key={i}>
            {it}
          </span>
        ))}
      </div>
    </div>
  )
}
