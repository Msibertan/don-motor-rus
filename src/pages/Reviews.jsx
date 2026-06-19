import { useMemo } from 'react'
import Reveal from '../components/Reveal.jsx'
import VideoCard from '../components/VideoCard.jsx'
import { useReviews } from '../lib/useReviews.js'

const stars = (n) => '★'.repeat(Math.max(0, Math.min(5, n || 5)))

export default function Reviews() {
  const { photos, videos, loading } = useReviews()

  const avg = useMemo(() => {
    const r = photos.filter((p) => p.rating).map((p) => p.rating)
    return r.length ? (r.reduce((a, b) => a + b, 0) / r.length).toFixed(1) : '5.0'
  }, [photos])

  return (
    <>
      <section className="page-head">
        <div className="page-head__bg">
          <img src="/images/head-contacts.jpg" alt="" />
        </div>
        <div className="container page-head__inner">
          <span className="eyebrow">Отзывы клиентов</span>
          <h1>Нам доверяют</h1>
          <p className="lead" style={{ marginTop: 22 }}>
            Реальные истории тех, кто пригнал автомобиль из Европы вместе с нами.
            Текстовые отзывы с площадок и видео от клиентов.
          </p>
          {!loading && (
            <div className="hero__metrics" style={{ marginTop: 40 }}>
              <div className="hero__metric">
                <b>{avg}</b>
                <span>средняя оценка</span>
              </div>
              <div className="hero__metric">
                <b>{photos.length}</b>
                <span>текстовых отзывов</span>
              </div>
              <div className="hero__metric">
                <b>{videos.length}</b>
                <span>видеоотзывов</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ТЕКСТОВЫЕ ОТЗЫВЫ */}
      <section className="section--tight">
        <div className="container">
          {loading ? (
            <div className="empty">Загружаем отзывы…</div>
          ) : (
            <div className="reviews">
              {photos.map((r, i) => (
                <Reveal key={r.id} delay={(i % 3) * 60}>
                  <div className="review">
                    <div className="review__head">
                      <div className="review__stars">{stars(r.rating)}</div>
                      {r.platform ? (
                        <span className="review__platform">{r.platform}</span>
                      ) : null}
                    </div>
                    <p className="review__text">{r.text}</p>
                    {r.car_image_url ? (
                      <div className="review__img">
                        <img src={r.car_image_url} alt="" loading="lazy" />
                      </div>
                    ) : null}
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
          )}
        </div>
      </section>

      {/* ВИДЕООТЗЫВЫ */}
      {videos.length > 0 && (
        <section className="section--tight section--soft">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Видеоотзывы</span>
              <h2 className="h-section">Истории клиентов</h2>
            </div>
            <div className="videos">
              {videos.map((v, i) => (
                <Reveal key={v.id} delay={(i % 3) * 60}>
                  <VideoCard video={v} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
