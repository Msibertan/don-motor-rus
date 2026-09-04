import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__col">
            <Link to="/" className="brand">
              <Logo />
              <span>ДОН МОТОР РУС</span>
            </Link>
            <p style={{ maxWidth: '34ch' }}>
              Пригон премиальных автомобилей из Европы в Россию под ключ — от
              подбора до номеров.
            </p>
          </div>

          <div className="footer__col">
            <h5>Навигация</h5>
            <Link to="/catalog">Каталог</Link>
            <Link to="/process">Процесс</Link>
            <Link to="/calculator">Калькулятор</Link>
            <Link to="/reviews">Отзывы</Link>
            <Link to="/contacts">Контакты</Link>
          </div>

          <div className="footer__col">
            <h5>Направление</h5>
            <p>Германия → Россия</p>
          </div>

          <div className="footer__col">
            <h5>Контакты</h5>
            <a href="tel:+73422640087">+7 (342) 264-00-87</a>
            <a href="mailto:info@motordon.ru">info@motordon.ru</a>
            <p>ул. Дзержинского 40, Гродно, Гродненская область, 230023, Беларусь</p>
            <div className="socials" style={{ marginTop: 14 }}>
              <a href="https://telegram.me/donmotorrussupport" target="_blank" rel="noreferrer">
                Telegram
              </a>
              <a href="https://max.ru/u/f9LHodD0cOLDzLNMiVkrjCNfaWJWu-gsGPCqI57Sp63KPJJz_lELKgbLcWY" target="_blank" rel="noreferrer">
                Макс
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} Дон Мотор Рус. Все права защищены.
          </span>
          <span>Europe · Россия</span>
        </div>
      </div>
    </footer>
  )
}
