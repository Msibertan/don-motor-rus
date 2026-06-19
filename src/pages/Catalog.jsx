import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Car from '../components/Car.jsx'
import { useCars } from '../lib/useCars.js'

const priceRanges = [
  { label: 'Любая цена', min: 0, max: Infinity },
  { label: 'до 2 млн ₽', min: 0, max: 2000000 },
  { label: '2 – 3,5 млн ₽', min: 2000000, max: 3500000 },
  { label: 'от 3,5 млн ₽', min: 3500000, max: Infinity },
]

const sortOptions = [
  { label: 'Сначала дешевле', value: 'price-asc' },
  { label: 'Сначала дороже', value: 'price-desc' },
  { label: 'Новее', value: 'year-desc' },
  { label: 'Меньше пробег', value: 'mileage-asc' },
]

export default function Catalog() {
  const { cars, loading, error } = useCars()
  const [brand, setBrand] = useState('Все марки')
  const [priceIdx, setPriceIdx] = useState(0)
  const [sort, setSort] = useState('price-asc')

  const brands = useMemo(
    () => ['Все марки', ...Array.from(new Set(cars.map((c) => c.brand))).sort()],
    [cars]
  )

  const list = useMemo(() => {
    const range = priceRanges[priceIdx]
    const res = cars.filter(
      (c) =>
        (brand === 'Все марки' || c.brand === brand) &&
        (c.priceRub ?? 0) >= range.min &&
        (c.priceRub ?? 0) <= range.max
    )
    const by = {
      'price-asc': (a, b) => (a.priceRub ?? 0) - (b.priceRub ?? 0),
      'price-desc': (a, b) => (b.priceRub ?? 0) - (a.priceRub ?? 0),
      'year-desc': (a, b) => (b.year ?? 0) - (a.year ?? 0),
      'mileage-asc': (a, b) => (a.mileage ?? 0) - (b.mileage ?? 0),
    }
    return [...res].sort(by[sort])
  }, [cars, brand, priceIdx, sort])

  return (
    <>
      <section className="page-head">
        <div className="page-head__bg">
          <img src="/images/head-catalog.jpg" alt="" />
        </div>
        <div className="container page-head__inner">
          <span className="eyebrow">Каталог · Европа → Россия</span>
          <h1>Автомобили в наличии</h1>
          <p className="lead" style={{ marginTop: 22 }}>
            Подборка с расчётом стоимости под ключ. Нет нужного — пригоним под
            заказ за 25–45 дней.
          </p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <Reveal>
            <div className="filters">
              <div className="field">
                <label>Марка</label>
                <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Бюджет</label>
                <select value={priceIdx} onChange={(e) => setPriceIdx(Number(e.target.value))}>
                  {priceRanges.map((p, i) => (
                    <option key={p.label} value={i}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Сортировка</label>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {sortOptions.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filters__count">
                {loading ? 'Загрузка…' : <>Найдено: <b>{list.length}</b></>}
              </div>
            </div>
          </Reveal>

          {loading ? (
            <div className="empty">Загружаем автомобили из базы…</div>
          ) : list.length ? (
            <div className="gallery">
              {list.map((c, i) => (
                <Reveal key={c.id} delay={(i % 3) * 60}>
                  <Car car={c} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h3 className="h-section" style={{ fontSize: '1.9rem' }}>
                Ничего не нашлось
              </h3>
              <p style={{ marginTop: 12 }}>
                {error
                  ? 'Не удалось загрузить каталог. Попробуйте обновить страницу.'
                  : 'Сбросьте фильтры или закажите подбор под ваш запрос.'}
              </p>
              <Link to="/contacts" className="btn btn--primary" style={{ marginTop: 24 }}>
                Заказать подбор
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
