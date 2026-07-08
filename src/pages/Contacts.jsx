import { useState } from 'react'
import Reveal from '../components/Reveal.jsx'

const empty = { name: '', phone: '', car: '', budget: '', comment: '' }

export default function Contacts() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const er = {}
    if (form.name.trim().length < 2) er.name = 'Укажите имя'
    if (form.phone.replace(/\D/g, '').length < 10) er.phone = 'Укажите корректный телефон'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const body = encodeURIComponent(
      `Имя: ${form.name}\nТелефон: ${form.phone}\nАвто: ${form.car || '—'}\nБюджет: ${form.budget || '—'}\nКомментарий: ${form.comment || '—'}`
    )
    window.location.href = `mailto:hello@donmotor.ru?subject=Заявка%20с%20сайта&body=${body}`
    setSent(true)
  }

  return (
    <>
      <section className="page-head">
        <div className="page-head__bg">
          <img src="/images/head-contacts.jpg" alt="" />
        </div>
        <div className="container page-head__inner">
          <span className="eyebrow">Контакты</span>
          <h1>Поехали вместе</h1>
          <p className="lead" style={{ marginTop: 22 }}>
            Оставьте заявку — перезвоним в течение 30 минут в рабочее время,
            подберём три варианта и посчитаем стоимость под ключ.
          </p>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="contact-grid">
            <Reveal>
              {sent ? (
                <div className="form__sent">
                  <div className="ico">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="h-section" style={{ fontSize: '1.9rem' }}>Заявка принята</h2>
                  <p className="lead" style={{ margin: '14px auto 24px' }}>
                    Мы открыли вашу почту с готовым письмом. Если оно не
                    отправилось — позвоните нам, всё решим за минуту.
                  </p>
                  <button className="btn btn--ghost" onClick={() => { setSent(false); setForm(empty) }}>
                    Отправить ещё одну
                  </button>
                </div>
              ) : (
                <form className="form" onSubmit={submit} noValidate>
                  <div className="form__row">
                    <div className={`field ${errors.name ? 'error' : ''}`}>
                      <label>Имя *</label>
                      <input value={form.name} onChange={set('name')} placeholder="Как к вам обращаться" />
                      {errors.name && <span className="err">{errors.name}</span>}
                    </div>
                    <div className={`field ${errors.phone ? 'error' : ''}`}>
                      <label>Телефон *</label>
                      <input value={form.phone} onChange={set('phone')} placeholder="+7 ___ ___-__-__" inputMode="tel" />
                      {errors.phone && <span className="err">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="form__row">
                    <div className="field">
                      <label>Желаемое авто</label>
                      <input value={form.car} onChange={set('car')} placeholder="BMW X5, Audi Q5…" />
                    </div>
                    <div className="field">
                      <label>Бюджет, ₽</label>
                      <input value={form.budget} onChange={set('budget')} placeholder="до 5 млн" />
                    </div>
                  </div>

                  <div className="field">
                    <label>Комментарий</label>
                    <textarea value={form.comment} onChange={set('comment')} placeholder="Город, пожелания, сроки…" />
                  </div>

                  <button type="submit" className="btn btn--primary btn--lg">
                    Отправить заявку <span className="arrow">→</span>
                  </button>
                  <p className="note">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                  </p>
                </form>
              )}
            </Reveal>

            <Reveal delay={100}>
              <div className="contact-card">
                <h4>Телефон</h4>
                <a href="tel:+73422640087" className="big accent">+7 (342) 264-00-87</a>
              </div>
              <div className="contact-card">
                <h4>Почта</h4>
                <a href="mailto:hello@donmotor.ru" className="big">hello@donmotor.ru</a>
              </div>
              <div className="contact-card">
                <h4>Офис</h4>
                <div className="big" style={{ fontSize: '1.2rem' }}>
                  ул. Дзержинского 40, Гродно,<br />Гродненская область, 230023, Беларусь
                </div>
                <p className="note" style={{ marginTop: 10 }}>Ежедневно 9:00 — 21:00 МСК</p>
              </div>
              <div className="contact-card">
                <h4>Мессенджеры</h4>
                <div className="socials">
                  <a href="#" rel="noreferrer">Telegram</a>
                  <a href="#" rel="noreferrer">WhatsApp</a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
