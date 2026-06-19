// Фирменный знак: линейный силуэт автомобиля в акцентном цвете.
export default function Logo() {
  return (
    <span className="brand__mark" aria-hidden="true">
      <svg
        viewBox="0 0 50 26"
        width="42"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* силуэт кузова */}
        <path d="M4 21 L4.4 18.4 C4.6 17.6 5.3 17.1 6.2 17 L14 16.2 L18.6 11 C19.4 10.2 20.5 9.8 21.7 9.8 L29.4 9.8 C31 9.8 32.5 10.5 33.5 11.9 L37.3 16.8 L43 17.6 C44.8 17.9 46 19.1 46 21" />
        {/* днище между колёсами */}
        <path d="M4 21 L9.6 21 M17.6 21 L31.6 21 M39.6 21 L46 21" />
        {/* колёса */}
        <circle cx="13.6" cy="21" r="3.9" />
        <circle cx="35.6" cy="21" r="3.9" />
        <circle cx="13.6" cy="21" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="35.6" cy="21" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    </span>
  )
}
