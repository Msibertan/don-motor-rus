import { useState, useEffect, useRef } from 'react'

export default function FloatingWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const widgetRef = useRef(null)

  const toggleWidget = () => setIsOpen((prev) => !prev)

  // Close widget when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`floating-widget ${isOpen ? 'open' : ''}`} ref={widgetRef}>
      <div className="floating-widget__menu">
        <a
          href="https://telegram.me/donmotorrussupport"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-widget__item"
        >
          <span className="floating-widget__label">Telegram</span>
          <div className="floating-widget__icon tg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.37-.49 1.02-.74 3.99-1.74 6.66-2.88 8.01-3.43 3.81-1.57 4.6-.18 4.6.14.01.12.01.24 0 .37z"/>
            </svg>
          </div>
        </a>

        <a
          href="https://max.ru/u/f9LHodD0cOLDzLNMiVkrjCNfaWJWu-gsGPCqI57Sp63KPJJz_lELKgbLcWY"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-widget__item"
        >
          <span className="floating-widget__label">Макс</span>
          <div className="floating-widget__icon max">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              <path d="M9 14V10l3 2.5 3-2.5v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </a>

        <a href="mailto:info@motordon.ru" className="floating-widget__item">
          <span className="floating-widget__label">Почта</span>
          <div className="floating-widget__icon mail">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
        </a>

        <a href="tel:+73422640087" className="floating-widget__item">
          <span className="floating-widget__label">Телефон</span>
          <div className="floating-widget__icon phone">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
        </a>
      </div>

      <button className="floating-widget__trigger" onClick={toggleWidget} aria-label="Связаться с нами">
        {isOpen ? (
          <svg className="close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg className="chat-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>
    </div>
  )
}
