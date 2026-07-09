// Отправка заявок в Telegram-бот.
// Токен/чат берутся из env (VITE_*). ВНИМАНИЕ: это статический сайт без бэкенда,
// поэтому значения попадают в клиентский бандл. Для полного сокрытия нужен прокси.
const TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN
const CHAT = import.meta.env.TELEGRAM_CHAT_ID

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// type — что за форма; fields — { 'Поле': значение }
export async function sendLead(type, fields) {
  if (!TOKEN || !CHAT) {
    console.warn('Telegram не настроен: нет VITE_TG_BOT_TOKEN / VITE_TG_CHAT_ID')
    return false
  }
  const lines = Object.entries(fields)
    .filter(([, v]) => v != null && String(v).trim() !== '')
    .map(([k, v]) => `<b>${esc(k)}:</b> ${esc(v)}`)

  const text =
    `🚗 <b>Заявка с сайта «Дон Мотор Рус»</b>\n` +
    `📋 ${esc(type)}\n\n` +
    lines.join('\n')

  const ids = String(CHAT)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  try {
    await Promise.all(
      ids.map((chat_id) =>
        fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id, text, parse_mode: 'HTML' }),
        })
      )
    )
    return true
  } catch (e) {
    console.error('Telegram send error', e)
    return false
  }
}
