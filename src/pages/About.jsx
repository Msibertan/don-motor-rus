import Reveal from '../components/Reveal.jsx'

const senior = { name: 'Николай Сурков', role: 'Старший менеджер', img: 'NikolaySurkov.webp' }

const team = [
  { name: 'Александр Зайцев', img: 'AlexandrZaytsev.webp' },
  { name: 'Сергей Смирнов', img: 'SergeySmirnov.webp' },
  { name: 'Юрий Минин', img: 'YuriyMinin.webp' },
  { name: 'Невьявцев Олег', img: 'OlegRakotov.webp' },
  { name: 'Максим Кириенко', img: 'MaksimKirienko.webp' },
  { name: 'Юрий Смирнов', img: 'YuriySmironv.webp' },
  { name: 'Виктор Ушаков', img: 'ushakov.webp' },
  { name: 'Андрей Коваленко', img: 'KovalenkoAndrey.webp' },
  { name: 'Дмитрий Бондарь', img: 'bondar.webp' },
  { name: 'Ветчанов Андрей', img: 'vetchanov.webp' },
  { name: 'Дмитрий Лиховских', img: 'lihovskih.webp' },
  { name: 'Помазан Юрий', img: 'pomazan.webp' },
  { name: 'Андрейцева Яна', img: 'andreeitseva.webp' },
  { name: 'Ольга Макарова', img: 'makarova.webp' },
  { name: 'Васнецова Анастасия', img: 'vasnetsova.webp' },
  { name: 'Дмитрий Якименко', img: 'yakimenko.webp' },
  { name: 'Владимир Копытин', img: 'kopytin.webp' },
  { name: 'Виолетта Карнаухова', img: 'karnaukhova.webp' },
]

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="page-head__bg">
          <img src="/images/team-hero.jpg" alt="Команда Дон Мотор Рус" />
        </div>
        <div className="container page-head__inner">
          <span className="eyebrow">О компании</span>
          <h1>Люди, а не логотип</h1>
          <p className="lead" style={{ marginTop: 22 }}>
            За каждым пригоном стоит живая команда: подбор, проверка, логистика и
            документы — всё ведут конкретные специалисты, с которыми вы на связи.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="manifesto-grid">
              <p className="manifesto">
                Мы убрали из пригона главное — <span className="accent">риск</span>.
                А доверие строим на людях, которые отвечают за результат.
              </p>
              <div className="manifesto-aside">
                <p>
                  Работаем с декабря 2024 года: возим премиальные автомобили из
                  Европы. Подбор у владельцев, проверка до оплаты, прозрачная
                  логистика и официальная таможенная очистка.
                </p>
                <p>
                  За вами закрепляется личный менеджер, который ведёт сделку от
                  первого звонка до выдачи ключей.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Команда</span>
            <h2 className="h-section">Кто ведёт ваш пригон</h2>
          </div>

          <div className="team-senior">
            <Reveal>
              <div className="team-card team-card--senior">
                <div className="team-photo team-photo--lg">
                  <img src={`/team/${senior.img}`} alt={senior.name} />
                </div>
                <span className="team-role team-role--senior">Руководитель отдела</span>
                <h3>{senior.name}</h3>
                <p>{senior.role}</p>
              </div>
            </Reveal>
          </div>

          <div className="team-grid">
            {team.map((m, i) => (
              <Reveal key={m.img} delay={(i % 4) * 60}>
                <div className="team-card">
                  <div className="team-photo">
                    <img src={`/team/${m.img}`} alt={m.name} loading="lazy" />
                  </div>
                  <h3>{m.name}</h3>
                  <p>Менеджер</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Реквизиты</span>
            <h2 className="h-section">Официально и прозрачно</h2>
            <p>
              Работаем как юридическое лицо — договор, официальная растаможка и
              полный пакет документов на автомобиль.
            </p>
          </div>
          <Reveal>
            <div className="reqs">
              {[
                ['Полное наименование', 'ООО «Дон Мотор Рус»'],
                ['ИНН', '7100060510'],
                ['ОГРН', '1247100012301'],
                ['КПП', '710001001'],
                ['Дата регистрации', '26 декабря 2024 г.'],
                ['Юридический адрес', '301637, Тульская обл., Узловский р-н, Индустриальный Парк, ул. Индустриальная, зд. 11, пом. 07-303'],
              ].map(([k, v]) => (
                <div className="reqs__row" key={k}>
                  <span>{k}</span>
                  <b>{v}</b>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
