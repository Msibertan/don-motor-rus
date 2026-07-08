import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Marquee from '../components/Marquee.jsx'
import Car from '../components/Car.jsx'
import Counter from '../components/Counter.jsx'
import Bento from '../components/Bento.jsx'
import Faq from '../components/Faq.jsx'
import { useCars } from '../lib/useCars.js'
import { useReviews } from '../lib/useReviews.js'

const guarantees = [
  ['01', 'Проверка до оплаты', 'Диагностика, VIN-история и юридическая чистота — прежде чем вы переведёте деньги.'],
  ['02', 'Фиксированная цена', 'Стоимость под ключ закреплена в договоре. Без доплат на финише.'],
  ['03', 'Полностью официально', 'ЭПТС, СБКТС, таможня и учёт в ГИБДД. Документы на руки.'],
  ['04', 'Срок около 10 дней', 'Отлаженная логистика через Польшу, Литву и Латвию.'],
]

const faq = [
  { q: 'Сколько занимает пригон?', a: 'В среднем 10 дней от заключения договора до выдачи. Срок зависит от страны, очередей на границе и загрузки таможни. На каждом этапе вы видите статус.' },
  { q: 'Что входит в стоимость под ключ?', a: 'Стоимость автомобиля в Европе, доставка, таможенные платежи и утилизационный сбор, оформление ЭПТС и СБКТС, постановка на учёт и услуга компании. Всё фиксируется в договоре заранее.' },
  { q: 'Можно заказать автомобиль, которого нет в каталоге?', a: 'Да. Опишите марку, бюджет и пожелания — мы найдём варианты на аукционах и площадках Европы и пришлём подборку с реальными ценами и фотографиями.' },
  { q: 'Какие гарантии вы даёте?', a: 'Фиксированная цена в договоре, проверка автомобиля до оплаты и полный пакет официальных документов на руки.' },
  { q: 'Из каких стран вы возите автомобили?', a: 'Германия, Польша, Литва, Латвия и Нидерланды. Под конкретный запрос прорабатываем и другие направления Евросоюза.' },
]

export default function Home() {
  const { cars: featured } = useCars({ limit: 6 })
  const { photos: reviews } = useReviews({ photoLimit: 3 })
  const railRef = useRef(null)

  // После подгрузки авто из базы возвращаем ленту в начало
  // (иначе из-за scroll-snap она «уезжает» к концу).
  useEffect(() => {
    if (railRef.current) railRef.current.scrollLeft = 0
  }, [featured])

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__bg">
          <img src="/images/hero.jpg" alt="Премиальный автомобиль из Европы" />
        </div>
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <Reveal>
            <span className="eyebrow hero__eyebrow">Пригон под ключ · Европа → Россия</span>
            <h1 className="h-hero">
              Автомобиль вашей мечты — из Европы
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead hero__lead">
              Подбираем, проверяем, доставляем и растамаживаем. Вы выбираете
              автомобиль — всё остальное берём на себя.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="hero__cta">
              <Link to="/catalog" className="btn btn--primary btn--lg">
                Смотреть каталог <span className="arrow">→</span>
              </Link>
              <Link to="/calculator" className="btn btn--ghost btn--lg">
                Рассчитать стоимость
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee
        items={['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Volkswagen', 'Škoda', 'Land Rover']}
      />

      {/* МАНИФЕСТ + МЕТРИКИ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="manifesto-grid">
              <p className="manifesto">
                Мы убрали из пригона главное — <span className="accent">риск</span>.
                Каждый этап под контролем и закреплён в договоре.
              </p>
              <div className="manifesto-aside">
                <p>
                  Работаем с декабря 2024 года: возим премиальные автомобили из
                  Европы. Подбор на аукционах, проверка до оплаты, прозрачная
                  логистика и официальная растаможка.
                </p>
                <p>
                  Вы участвуете в решениях — рутину, документы и риски закрываем
                  мы.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="hero__metrics" style={{ marginTop: 'clamp(48px,7vw,90px)' }}>
            <Counter value={1200} suffix="+" label="автомобилей пригнано" />
            <Counter value={10} suffix=" дней" label="средний срок доставки" />
            <Counter value={6} suffix=" стран" label="Европы в работе" />
            <div className="hero__metric">
              <b>2024</b>
              <span>работаем с декабря</span>
            </div>
          </div>
        </div>
      </section>

      {/* БЕНТО — что входит в услугу */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Услуга под ключ</span>
            <h2 className="h-section">Всё под контролем</h2>
            <p>
              Каждый этап пригона — отдельная зона ответственности компании.
              Прозрачно и закреплено в договоре.
            </p>
          </div>
          <Reveal>
            <Bento />
          </Reveal>
        </div>
      </section>

      {/* ГОРИЗОНТАЛЬНАЯ КАРУСЕЛЬ АВТО */}
      <section className="section section--soft">
        <div className="container">
          <div className="rail-head">
            <div>
              <span className="eyebrow">В наличии и под заказ</span>
              <h2 className="h-section" style={{ marginTop: 20 }}>
                Свежие поступления
              </h2>
            </div>
            <span className="rail-hint">Листайте в сторону →</span>
          </div>
        </div>

        <div className="container">
          <div className="rail" ref={railRef}>
            {featured.map((c) => (
              <Car car={c} key={c.id} />
            ))}
            <Link to="/catalog" className="car" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: 260 }}>
              <div style={{ padding: 30 }}>
                <div className="h-section" style={{ fontSize: '1.8rem', marginBottom: 12 }}>
                  Весь каталог
                </div>
                <span className="tlink">
                  Смотреть все <span className="arrow">→</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* СПЛИТ — ГАРАНТИИ С ФОТО */}
      <section className="section">
        <div className="container">
          <div className="split">
            <Reveal className="split__media">
              <img src="/images/garage.jpg" alt="Премиальный автопарк" />
            </Reveal>
            <Reveal delay={100}>
              <span className="eyebrow">Почему нам доверяют</span>
              <h2 className="h-section" style={{ marginTop: 20 }}>
                Спокойно за результат
              </h2>
              <div className="split__list">
                {guarantees.map(([n, t, d]) => (
                  <div className="split__item" key={n}>
                    <span className="n">{n}</span>
                    <div>
                      <b>{t}</b>
                      <p>{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Отзывы клиентов</span>
            <h2 className="h-section">Нам доверяют</h2>
          </div>
          <div className="reviews">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 80}>
                <div className="review">
                  <div className="review__head">
                    <div className="review__stars">{'★'.repeat(r.rating || 5)}</div>
                    {r.platform ? (
                      <span className="review__platform">{r.platform}</span>
                    ) : null}
                  </div>
                  {r.car_image_url ? (
                    <div className="review__img">
                      <img src={r.car_image_url} alt="" loading="lazy" />
                    </div>
                  ) : null}
                  <p className="review__text">{r.text}</p>
                  <div className="review__author">
                    <div className="review__avatar">{(r.name || '—')[0]}</div>
                    <div className="review__meta">
                      <b>{r.name || 'Клиент'}</b>
                      <small>Проверенный отзыв</small>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div style={{ marginTop: 40 }}>
              <Link to="/reviews" className="btn btn--ghost btn--lg">
                Все отзывы <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Вопросы и ответы</span>
            <h2 className="h-section">Коротко о главном</h2>
          </div>
          <Reveal>
            <Faq items={faq} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section--tight">
        <div className="container">
          <Reveal>
            <div className="cta">
              <div className="cta__bg">
                <img src="/images/cta.jpg" alt="" />
              </div>
              <div className="cta__inner">
                <h2>Готовы поехать?</h2>
                <p>
                  Оставьте заявку — подберём три варианта под ваш бюджет в течение
                  дня и посчитаем итоговую стоимость под ключ.
                </p>
                <Link to="/contacts" className="btn btn--primary btn--lg">
                  Оставить заявку <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
