import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

const steps = [
  {
    img: 'proc-select',
    title: 'Заявка и подбор',
    text: 'Обсуждаем бюджет, марку и задачи. Подбираем варианты у владельцев и дилеров в Европе. Присылаем подборку с реальными ценами и фотографиями.',
    tags: ['Бюджет', 'Подбор', '1–3 дня'],
  },
  {
    img: 'proc-check',
    title: 'Проверка автомобиля',
    text: 'Удалённая и выездная диагностика, проверка VIN по базам, история обслуживания, юридическая чистота и реальный пробег. Отчёт — до того, как вы платите.',
    tags: ['Диагностика', 'VIN-история', 'Юр. чистота'],
  },
  {
    img: 'proc-contract',
    title: 'Договор и выкуп',
    text: 'Подписываем договор, фиксируя итоговую стоимость под ключ, и сразу запускаем процесс таможенной очистки. Выкупаем автомобиль напрямую у владельца и оформляем экспортные документы.',
    tags: ['Договор', 'Выкуп у владельца', 'Таможенная очистка'],
  },
  {
    img: 'proc-ship',
    title: 'Логистика до России',
    text: 'Транспортировка по Европе, прохождение границы и доставка в Россию по отлаженным маршрутам. Вы видите статус и геопозицию на каждом этапе.',
    tags: ['Европа', 'Граница', 'Трекинг'],
  },
  {
    img: 'proc-customs',
    title: 'Таможенная очистка',
    text: 'Официальная таможенная очистка автомобиля, расчёт и оплата пошлин, а также утилизационного сбора. Все процедуры проводятся легально, с выдачей полного пакета документов.',
    tags: ['Очистка', 'Пошлины', 'Утильсбор'],
  },
  {
    img: 'proc-handover',
    title: 'Учёт и выдача',
    text: 'Постановка на учёт в ГИБДД, получение номеров и передача готового автомобиля вам. Можно встретить лично или организовать доставку по России.',
    tags: ['ГИБДД', 'Номера', 'Готово'],
  },
]

export default function Process() {
  return (
    <>
      <section className="page-head">
        <div className="page-head__bg">
          <img src="/images/head-process.jpg" alt="" />
        </div>
        <div className="container page-head__inner">
          <span className="eyebrow">Процесс под ключ</span>
          <h1>Как это работает</h1>
          <p className="lead" style={{ marginTop: 22 }}>
            Шесть прозрачных шагов от заявки до номеров. Вы участвуете в
            решениях, рутину берём на себя.
          </p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          {steps.map((s, i) => (
            <Reveal key={s.title} className="proc">
              <div className="proc__media">
                <img src={`/images/${s.img}.jpg`} alt={s.title} loading="lazy" />
              </div>
              <div>
                <div className="proc__num">ШАГ {String(i + 1).padStart(2, '0')}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="proc__tags">
                  {s.tags.map((t) => (
                    <span className="pill" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <Reveal>
            <div className="cta">
              <div className="cta__bg">
                <img src="/images/cta.jpg" alt="" />
              </div>
              <div className="cta__inner">
                <h2>Посчитаем вашу машину?</h2>
                <p>Прикинем стоимость под ключ за пару минут в калькуляторе.</p>
                <Link to="/calculator" className="btn btn--primary btn--lg">
                  Открыть калькулятор <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
