import { useState } from 'react'

// Достаёт id ролика из ссылки rutube (video/shorts/embed).
function rutubeId(url) {
  const m = (url || '').match(/rutube\.ru\/(?:video|shorts|play\/embed)\/([0-9a-f]+)/i)
  return m ? m[1] : null
}

const Play = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)

export default function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false)
  const id = rutubeId(video.video_url)
  const embed = id ? `https://rutube.ru/play/embed/${id}` : null

  const meta = (
    <div className="video-card__body">
      <span className="video-card__title">{video.title}</span>
      {video.platform ? (
        <span className="review__platform">{video.platform}</span>
      ) : null}
    </div>
  )

  // Если не распознали площадку — обычная ссылка наружу.
  if (!embed) {
    return (
      <a className="video-card" href={video.video_url} target="_blank" rel="noreferrer">
        <div className="video-card__thumb">
          <span className="video-card__play">
            <Play />
          </span>
        </div>
        {meta}
      </a>
    )
  }

  if (playing) {
    return (
      <div className="video-card video-card--playing">
        <div className="video-card__thumb">
          <iframe
            src={`${embed}?autoplay=1`}
            title={video.title}
            allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        </div>
        {meta}
      </div>
    )
  }

  return (
    <button type="button" className="video-card" onClick={() => setPlaying(true)}>
      <div className="video-card__thumb">
        {video.thumbnail_url ? (
          <img src={video.thumbnail_url} alt="" loading="lazy" />
        ) : null}
        <span className="video-card__play">
          <Play />
        </span>
      </div>
      {meta}
    </button>
  )
}
