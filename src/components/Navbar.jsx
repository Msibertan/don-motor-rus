import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo.jsx'

const links = [
  { to: '/', label: 'Главная', end: true },
  { to: '/catalog', label: 'Каталог' },
  { to: '/process', label: 'Процесс' },
  { to: '/calculator', label: 'Калькулятор' },
  { to: '/reviews', label: 'Отзывы' },
  { to: '/contacts', label: 'Контакты' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav__inner">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <Logo />
            <span>
              ДОН МОТОР РУС
              <small>EUROPE · РФ</small>
            </span>
          </Link>

          <nav className="nav__links">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `nav__link ${isActive ? 'active' : ''}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav__cta">
            <a href="tel:+78005553535" className="nav__phone">
              8 800 555-35-35
            </a>
            <Link to="/contacts" className="btn btn--primary">
              Заявка
            </Link>
            <button
              className={`burger ${open ? 'open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-label="Меню"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {l.label}
            <span aria-hidden>↗</span>
          </NavLink>
        ))}
        <div className="mobile-menu__foot">
          <a href="tel:+78005553535" className="big accent">
            8 800 555-35-35
          </a>
          <span>Ежедневно 9:00 — 21:00 МСК</span>
        </div>
      </div>
    </>
  )
}
