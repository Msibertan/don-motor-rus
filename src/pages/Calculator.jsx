import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

const RATE = 100 // ₽ за € — условный курс

const ages = [
  { label: 'до 3 лет', key: 'new', duty: 0.48, util: 3400 },
  { label: '3–5 лет', key: 'mid', duty: 0.42, util: 5200 },
  { label: '5–7 лет', key: 'old', duty: 0.36, util: 9800 },
]
const fuels = [
  { label: 'Бензин', key: 'petrol', k: 1 },
  { label: 'Дизель', key: 'diesel', k: 1.05 },
  { label: 'Гибрид', key: 'hybrid', k: 0.92 },
]

const rub = (n) => Math.round(n).toLocaleString('ru-RU') + ' ₽'

export default function Calculator() {
  const [priceEur, setPriceEur] = useState(35000)
  const [cc, setCc] = useState(2000)
  const [ageIdx, setAgeIdx] = useState(1)
  const [fuelIdx, setFuelIdx] = useState(0)

  const calc = useMemo(() => {
    const age = ages[ageIdx]
    const fuel = fuels[fuelIdx]
    const carRub = priceEur * RATE
    const duty = (carRub * age.duty + cc * 18) * fuel.k
    const util = age.util
    const clearance = 90000
    const delivery = 185000
    const commission = Math.max(carRub * 0.08, 120000)
    const total = carRub + duty + util + clearance + delivery + commission
    return { carRub, duty, util, clearance, delivery, commission, total }
  }, [priceEur, cc, ageIdx, fuelIdx])

  return (
    <>
      <section className="page-head">
        <div className="page-head__bg">
          <img src="/images/head-calc.jpg" alt="" />
        </div>
        <div className="container page-head__inner">
          <span className="eyebrow">Калькулятор стоимости</span>
          <h1>Считаем под ключ</h1>
          <p className="lead" style={{ marginTop: 22 }}>
            Предварительная оценка стоимости автомобиля в России — с доставкой,
            растаможкой и услугой компании. Двигайте ползунки.
          </p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="calc">
            <Reveal className="calc__form">
              <div className="calc__row">
                <div className="label">
                  <span>Стоимость авто в Европе</span>
                  <b>{priceEur.toLocaleString('ru-RU')} €</b>
                </div>
                <input type="range" min="5000" max="120000" step="500" value={priceEur} onChange={(e) => setPriceEur(Number(e.target.value))} />
                <span className="note">≈ {rub(priceEur * RATE)} по курсу {RATE} ₽/€</span>
              </div>

              <div className="calc__row">
                <div className="label">
                  <span>Объём двигателя</span>
                  <b>{cc.toLocaleString('ru-RU')} см³</b>
                </div>
                <input type="range" min="1000" max="4000" step="100" value={cc} onChange={(e) => setCc(Number(e.target.value))} />
              </div>

              <div className="calc__row">
                <div className="label">
                  <span>Возраст автомобиля</span>
                </div>
                <div className="seg">
                  {ages.map((a, i) => (
                    <button key={a.key} className={i === ageIdx ? 'active' : ''} onClick={() => setAgeIdx(i)}>
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc__row">
                <div className="label">
                  <span>Тип двигателя</span>
                </div>
                <div className="seg">
                  {fuels.map((f, i) => (
                    <button key={f.key} className={i === fuelIdx ? 'active' : ''} onClick={() => setFuelIdx(i)}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="calc__result" delay={100}>
              <span className="eyebrow">Итого под ключ в России</span>
              <div className="calc__total">{rub(calc.total)}</div>
              <p className="note">Готовый автомобиль на учёте, с документами.</p>

              <div className="calc__breakdown">
                <div className="calc__line"><span>Стоимость авто</span><b>{rub(calc.carRub)}</b></div>
                <div className="calc__line"><span>Таможенная пошлина</span><b>{rub(calc.duty)}</b></div>
                <div className="calc__line"><span>Утилизационный сбор</span><b>{rub(calc.util)}</b></div>
                <div className="calc__line"><span>Оформление (СБКТС, ЭПТС)</span><b>{rub(calc.clearance)}</b></div>
                <div className="calc__line"><span>Логистика Европа → РФ</span><b>{rub(calc.delivery)}</b></div>
                <div className="calc__line"><span>Услуга «Дон Мотор Рус»</span><b>{rub(calc.commission)}</b></div>
                <div className="calc__line total"><span>Всего</span><b>{rub(calc.total)}</b></div>
              </div>

              <Link to="/contacts" className="btn btn--primary btn--lg" style={{ width: '100%' }}>
                Зафиксировать цену <span className="arrow">→</span>
              </Link>
              <p className="note" style={{ marginTop: 16 }}>
                * Предварительная оценка. Точную стоимость под ключ фиксируем в
                договоре после подбора конкретного автомобиля.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
