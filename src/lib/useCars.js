import { useEffect, useState } from 'react'
import { supabase, mapCar } from './supabase.js'

const TIMEOUT = 8000

function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((resolve) => setTimeout(() => resolve({ error: new Error('timeout') }), ms))])
}

// Загружает авто из Supabase (таблица `cars`). Если база недоступна,
// не держим страницу в «Загружаем…», а показываем пустой каталог с предложением подбора.
export function useCars({ limit } = {}) {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    async function load() {
      if (!supabase) {
        setError('Каталог не настроен')
        setLoading(false)
        return
      }
      let query = supabase
        .from('cars')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false })
      if (limit) query = query.limit(limit)

      let res
      try {
        res = await withTimeout(query, TIMEOUT)
      } catch (e) {
        res = { error: e }
      }
      if (!active) return

      if (res.error) {
        setError(res.error.message || 'Каталог временно недоступен')
        setCars([])
      } else {
        setCars((res.data || []).map(mapCar))
      }
      setLoading(false)
    }

    load()
    return () => {
      active = false
    }
  }, [limit])

  return { cars, loading, error }
}
