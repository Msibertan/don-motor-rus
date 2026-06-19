import { Link } from 'react-router-dom'

const fmt = (n) => (n == null ? '—' : Number(n).toLocaleString('ru-RU'))

export default function Car({ car }) {
  const src =
    car.image || (car.img ? `/images/${car.img}.jpg` : '/images/garage.jpg')

  return (
    <Link to="/contacts" className="car">
      <div className="car__media">
        {car.badge ? <span className="pill pill--accent car__badge">{car.badge}</span> : null}
        <img
          src={src}
          alt={car.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/images/garage.jpg'
          }}
        />
        <span className="car__price">{fmt(car.priceRub)} ₽</span>
      </div>
      <div className="car__body">
        <div>
          <div className="car__name">{car.name}</div>
          <div className="car__sub">
            {car.country}
            {car.priceEur ? ` · ≈ ${fmt(car.priceEur)} €` : ''}
          </div>
        </div>
        <div className="car__specs">
          {car.year ? (
            <span>
              <b>{car.year}</b> год
            </span>
          ) : null}
          {car.mileage != null ? (
            <span>
              <b>{fmt(car.mileage)}</b> км
            </span>
          ) : null}
          {car.engine ? (
            <span>
              <b>{car.engine}</b>
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
