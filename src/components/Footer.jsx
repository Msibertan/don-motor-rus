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
            <h5>Направления</h5>
            <p>Германия</p>
            <p>Польша</p>
            <p>Литва · Латвия</p>
            <p>Нидерланды</p>
          </div>

          <div className="footer__col">
            <h5>Контакты</h5>
            <a href="tel:+73422640087">+7 (342) 264-00-87</a>
            <a href="mailto:info@motordon.ru">info@motordon.ru</a>
            <p>ул. Дзержинского 40, Гродно, Гродненская область, 230023, Беларусь</p>
            <div className="socials" style={{ marginTop: 14 }}>
              <a href="#" rel="noreferrer">
                Telegram
              </a>
              <a href="#" rel="noreferrer">
                WhatsApp
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
