import { useMemo, useState } from 'react'
import { sendLead } from '../lib/telegram.js'
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

  // Лид-логика
  const [touched, setTouched] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const touch = () => setTouched(true)
  const locked = touched && !unlocked

  const calc = useMemo(() => {
    const age = ages[ageIdx]
    const fuel = fuels[fuelIdx]
    const carRub = priceEur * RATE
    const duty = (carRub * age.duty + cc * 18) * fuel.k
    const clearance = 90000 + age.util
    const delivery = 185000
    const commission = Math.max(carRub * 0.08, 120000)
    const total = carRub + duty + clearance + delivery + commission
    return { carRub, duty, clearance, delivery, commission, total }
  }, [priceEur, cc, ageIdx, fuelIdx])

  const submitLead = (e) => {
    e.preventDefault()
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Укажите корректный телефон')
      return
    }
    setError('')
    sendLead('Расчёт стоимости (калькулятор)', {
      Имя: name || '—',
      Телефон: phone,
      'Стоимость авто, €': priceEur.toLocaleString('ru-RU'),
      'Итог под ключ, ₽': Math.round(calc.total).toLocaleString('ru-RU'),
    })
    setUnlocked(true)
  }

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
                <input type="range" min="5000" max="120000" step="500" value={priceEur} onChange={(e) => { setPriceEur(Number(e.target.value)); touch() }} />
                <span className="note">≈ {rub(priceEur * RATE)} по курсу {RATE} ₽/€</span>
              </div>

              <div className="calc__row">
                <div className="label">
                  <span>Объём двигателя</span>
                  <b>{cc.toLocaleString('ru-RU')} см³</b>
                </div>
                <input type="range" min="1000" max="4000" step="100" value={cc} onChange={(e) => { setCc(Number(e.target.value)); touch() }} />
              </div>

              <div className="calc__row">
                <div className="label">
                  <span>Возраст автомобиля</span>
                </div>
                <div className="seg">
                  {ages.map((a, i) => (
                    <button key={a.key} className={i === ageIdx ? 'active' : ''} onClick={() => { setAgeIdx(i); touch() }}>
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
                    <button key={f.key} className={i === fuelIdx ? 'active' : ''} onClick={() => { setFuelIdx(i); touch() }}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className={`calc__result ${locked ? 'locked' : ''}`} delay={100}>
              <div className="calc__inner">
                {unlocked && (
                  <div className="calc__done">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Заявка принята — перезвоним и пришлём точный расчёт
                  </div>
                )}
                <span className="eyebrow">Итого под ключ в России</span>
                <div className="calc__total">{rub(calc.total)}</div>
                <p className="note">Готовый автомобиль на учёте, с документами.</p>

                <div className="calc__breakdown">
                  <div className="calc__line"><span>Стоимость авто</span><b>{rub(calc.carRub)}</b></div>
                  <div className="calc__line"><span>Таможенная пошлина</span><b>{rub(calc.duty)}</b></div>
                  <div className="calc__line"><span>Таможенная очистка</span><b>{rub(calc.clearance)}</b></div>
                  <div className="calc__line"><span>Логистика Германия → РФ</span><b>{rub(calc.delivery)}</b></div>
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
              </div>

              {locked && (
                <div className="calc__lock">
                  {!showForm ? (
                    <>
                      <span className="lock-ico">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                          <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                      </span>
                      <h3>Точная цена под ключ</h3>
                      <p>
                        Оставьте номер — пришлём детальный расчёт под вашу машину
                        и подберём вариант в бюджет.
                      </p>
                      <button className="btn btn--primary btn--lg" onClick={() => setShowForm(true)}>
                        Просчитать цену бесплатно <span className="arrow">→</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <h3>Куда прислать расчёт?</h3>
                      <form onSubmit={submitLead} noValidate>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ваше имя"
                        />
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+7 ___ ___-__-__"
                          inputMode="tel"
                        />
                        {error && <span className="err">{error}</span>}
                        <button type="submit" className="btn btn--primary btn--lg">
                          Получить расчёт
                        </button>
                        <span className="fine">
                          Перезвоним в течение 30 минут. Без спама.
                        </span>
                      </form>
                    </>
                  )}
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
