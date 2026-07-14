const Check = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Shield = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Doc = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M14 3v5h5M8.5 13h7M8.5 16.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const Spark = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" fill="currentColor" />
  </svg>
)

export default function Bento() {
  return (
    <div className="bento">
      {/* 1 — Проверка */}
      <div className="bento__cell">
        <h3>Проверка до оплаты</h3>
        <p>Диагностика, история и юридическая чистота — прежде чем вы переведёте деньги.</p>
        <div className="bento__mock">
          <span className="float-badge float-badge--dark" style={{ top: 14, right: 10, transform: 'rotate(8deg)' }}>
            <Shield />
          </span>
          <div className="mock-card" style={{ marginRight: 36 }}>
            {[
              ['VIN-история', 'чисто'],
              ['Реальный пробег', '38 000 км'],
              ['Юридическая чистота', 'ок'],
              ['ДТП в базах', 'не найдено'],
            ].map(([a, b]) => (
              <div className="mock-row" key={a}>
                <span className="mock-check"><Check /></span>
                <b>{a}</b>
                <span style={{ marginLeft: 'auto' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2 — Цена */}
      <div className="bento__cell">
        <h3>Цена под ключ</h3>
        <p>Итоговая стоимость фиксируется в договоре. Без доплат на финише.</p>
        <div className="bento__mock">
          <span className="float-badge float-badge--accent" style={{ top: 8, right: 14, transform: 'rotate(-8deg)' }}>
            <Check />
          </span>
          <div className="mock-price">
            <div className="lbl">
              <span className="mock-check"><Check /></span>
              Зафиксировано в договоре
            </div>
            <div className="val">5 190 000 ₽</div>
            <div className="was">≈ 46 500 € + растаможка</div>
          </div>
        </div>
      </div>

      {/* 3 — Документы */}
      <div className="bento__cell">
        <h3>Документы под ключ</h3>
        <p>Полностью официально. Весь пакет оформляем и отдаём вам на руки.</p>
        <div className="bento__mock">
          <span className="float-badge float-badge--dark" style={{ top: 16, right: 12, transform: 'rotate(7deg)' }}>
            <Doc />
          </span>
          <div className="mock-chips" style={{ marginRight: 30 }}>
            {['Таможенная очистка', 'Учёт в ГИБДД', 'Договор'].map((c) => (
              <span className="mock-chip" key={c}>
                <span className="mock-check"><Check /></span>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4 — Трекинг (wide) */}
      <div className="bento__cell bento__cell--wide">
        <h3>Доставка с трекингом</h3>
        <p>Видите статус и геопозицию автомобиля на каждом этапе пути из Германии.</p>
        <div className="bento__mock">
          <div className="mock-card">
            <div className="mock-route">
              <div className="mock-route__pt done">
                <div className="mock-route__dot" />
                <div><b>Выкуп</b><span>Германия</span></div>
              </div>
              <div className="mock-route__pt done">
                <div className="mock-route__dot" />
                <div><b>Граница</b><span>Литва</span></div>
              </div>
              <div className="mock-route__pt live">
                <div className="mock-route__dot" />
                <div><b>В пути</b><span>сейчас</span></div>
              </div>
              <div className="mock-route__pt">
                <div className="mock-route__dot" />
                <div><b>Выдача</b><span>Россия</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 — Подбор (wide) */}
      <div className="bento__cell bento__cell--wide">
        <h3>Подбор за один день</h3>
        <p>Опишите запрос — пришлём живые варианты с реальными ценами под ключ.</p>
        <div className="bento__mock">
          <span className="float-badge float-badge--accent" style={{ top: 10, right: 14, transform: 'rotate(-10deg)' }}>
            <Spark />
          </span>
          <div className="mock-list" style={{ marginRight: 20 }}>
            {[
              ['car1', 'BMW M340i xDrive', '5 190 000 ₽'],
              ['car2', 'Audi A6 50 TDI', '4 590 000 ₽'],
              ['car3', 'Mercedes GLE 300d', '6 570 000 ₽'],
            ].map(([img, nm, pr]) => (
              <div className="mock-list-row" key={nm}>
                <img src={`/images/${img}.jpg`} alt="" loading="lazy" />
                <span className="nm">{nm}</span>
                <span className="pr">{pr}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
