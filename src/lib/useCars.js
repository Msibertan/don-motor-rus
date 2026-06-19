import { useEffect, useState } from 'react'
import { supabase, mapCar } from './supabase.js'
import { cars as fallbackCars } from '../data/cars.js'

// Загружает авто из Supabase (таблица `cars`). При отсутствии настроек или ошибке
// откатывается на статичные примеры, чтобы сайт не ломался.
export function useCars({ limit } = {}) {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    async function load() {
      if (!supabase) {
        setCars(fallbackCars)
        setLoading(false)
        return
      }
      let query = supabase
        .from('cars')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false })
      if (limit) query = query.limit(limit)

      const { data, error } = await query
      if (!active) return

      if (error) {
        setError(error.message)
        setCars(fallbackCars)
      } else if (data && data.length) {
        setCars(data.map(mapCar))
      } else {
        setCars([])
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
