import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Клиент создаётся только если заданы переменные окружения.
export const supabase = url && key ? createClient(url, key) : null

// Маппинг строки таблицы `cars` → форма карточки на сайте.
export function mapCar(row) {
  const engine = row.engine_volume
    ? `${(row.engine_volume / 1000).toFixed(1)} ${row.fuel_type || ''}`.trim()
    : row.fuel_type || '—'
  return {
    id: row.id,
    name: `${row.brand || ''} ${row.model || ''}`.replace(/\s+/g, ' ').trim(),
    brand: (row.brand || '').toUpperCase(),
    country: row.location || 'Под заказ из Европы',
    year: row.year,
    mileage: row.mileage,
    engine,
    gearbox: row.transmission || '',
    priceRub: row.price,
    image: Array.isArray(row.images) && row.images.length ? row.images[0] : null,
    badge: null,
  }
}
