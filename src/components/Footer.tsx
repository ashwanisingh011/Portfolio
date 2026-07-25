import { useEffect, useState } from 'react'
import { socials } from '@/data/socials'

/** Live local time in IST — replaces the previously hardcoded clock. */
function useClock() {
  const [time, setTime] = useState(() => format())

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

function format() {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(new Date())
}

export function Footer() {
  const time = useClock()
  const year = new Date().getFullYear()

  return (
    <footer id="footer">
      <div className="footer-left">
        <h5>{year} &copy; Ashwani Singh</h5>
        <h5 className="footer-clock">
          {time} <span>IST</span>
        </h5>
      </div>

      <div className="footer-right">
        {socials.map((s) => (
          <a key={s.href} href={s.href} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
