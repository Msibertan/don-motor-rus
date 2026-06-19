import { useEffect, useState } from 'react'
import { supabase } from './supabase.js'

const norm = (s) => (s || '').toLowerCase().replace(/\s+/g, ' ').trim()

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

// Загружает отзывы из Supabase: текстовые (photo_reviews) и видео (video_reviews).
export function useReviews({ photoLimit, videoLimit } = {}) {
  const [photos, setPhotos] = useState([])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    async function load() {
      if (!supabase) {
        setLoading(false)
        return
      }
      const pq = supabase
        .from('photo_reviews')
        .select('*')
        .order('created_at', { ascending: false })
      const vq = supabase
        .from('video_reviews')
        .select('*')
        .order('created_at', { ascending: false })

      const [p, v] = await Promise.all([pq, vq])
      if (!active) return
      if (!p.error && p.data) {
        let list = dedupe(p.data, (r) => norm(r.text))
        if (photoLimit) list = list.slice(0, photoLimit)
        setPhotos(list)
      }
      if (!v.error && v.data) {
        let list = dedupe(v.data, (r) => r.video_url)
        if (videoLimit) list = list.slice(0, videoLimit)
        setVideos(list)
      }
      setLoading(false)
    }
    load()
    return () => {
      active = false
    }
  }, [photoLimit, videoLimit])

  return { photos, videos, loading }
}
