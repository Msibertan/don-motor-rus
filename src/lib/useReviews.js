import { useEffect, useState } from 'react'
import { supabase } from './supabase.js'
import { photoReviews, videoReviews } from '../data/reviews.js'

const norm = (s) => (s || '').toLowerCase().replace(/\s+/g, ' ').trim()
const TIMEOUT = 8000

function dedupe(arr, keyFn) {
  const seen = new Set()
  return arr.filter((x) => {
    const k = keyFn(x)
    if (!k) return true
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

// Запрос с таймаутом: если база молчит, не держим страницу в «Загружаем…».
function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((resolve) => setTimeout(() => resolve({ error: new Error('timeout') }), ms))])
}

// Загружает отзывы из Supabase: текстовые (photo_reviews) и видео (video_reviews).
// Если база недоступна или пуста, показывает резервную копию из src/data/reviews.js.
export function useReviews({ photoLimit, videoLimit } = {}) {
  const [photos, setPhotos] = useState([])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const apply = (p, v) => {
      if (!active) return
      let pl = dedupe(p, (r) => norm(r.text))
      let vl = dedupe(v, (r) => r.video_url)
      if (photoLimit) pl = pl.slice(0, photoLimit)
      if (videoLimit) vl = vl.slice(0, videoLimit)
      setPhotos(pl)
      setVideos(vl)
      setLoading(false)
    }

    async function load() {
      if (!supabase) return apply(photoReviews, videoReviews)
      try {
        const [p, v] = await Promise.all([
          withTimeout(supabase.from('photo_reviews').select('*').order('created_at', { ascending: false }), TIMEOUT),
          withTimeout(supabase.from('video_reviews').select('*').order('created_at', { ascending: false }), TIMEOUT),
        ])
        const pOk = !p.error && Array.isArray(p.data) && p.data.length > 0
        const vOk = !v.error && Array.isArray(v.data) && v.data.length > 0
        apply(pOk ? p.data : photoReviews, vOk ? v.data : videoReviews)
      } catch {
        apply(photoReviews, videoReviews)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [photoLimit, videoLimit])

  return { photos, videos, loading }
}
