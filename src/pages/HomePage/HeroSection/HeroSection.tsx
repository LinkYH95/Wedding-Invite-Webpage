/* ── import styles ──────────────────────────────────────────────── */
import './HeroSection.css'
/* ── import external libraries ──────────────────────────────────── */
import { useNavigate } from 'react-router-dom'
/* ── import assets ──────────────────────────────────────────────── */
import hero1 from "../../../assets/DSC_2754.png"
import hero2 from "../../../assets/DSC_6346.jpg"
import hero3 from "../../../assets/DSC_6409.jpg"
import hero4 from "../../../assets/DSC_2800.jpg"
import { useEffect, useState } from 'react'


/* ── prop ───────────────────────────────────────────────────────── */
type HeroSectionProps = {
	eventTime: Date
}

const images = [hero1, hero2, hero3, hero4]
const thresholds = [0, 0.25, 0.5, 0.75]


export default function HeroSection({ eventTime }: HeroSectionProps) {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleScoll = () => {
      const scrolled = window.scrollY
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight

      if (totalHeight <= 0) return

      const progress = scrolled / totalHeight

      let next = 0
      for (let i = thresholds.length - 1; i >= 0; i--) {
        if (progress >= thresholds[i]) { next = i; break }
      }

      setActiveIndex(next)
    }

    window.addEventListener('scroll', handleScoll, { passive: true })
    return () => window.removeEventListener('scroll', handleScoll)
  }, [])

  return (
    <section className="hero-section">
      <div className="hero-image-panel">

        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Wedding hero ${i + 1}`}
            className={`hero-image-slide ${i === activeIndex ? 'hero-image-active' : ''}`}
            style={i === 2 ? { objectPosition: 'center 20%'} : undefined}
          />
        ))}

        <div className="hero-image-box">
          <div className="hero-image-overlay">
            {/* <h1 className="hero-overlay-title">Mr&nbsp;Chian&nbsp; & &nbsp;Mrs&nbsp;Toh</h1> */}
            <h1 className="hero-overlay-title">Yao Hui&nbsp; & &nbsp;Yi Jun</h1>
            <p className="hero-overlay-text" style={{ marginBottom: `var(--space-xs)` }}>
              We can't wait to share our special day with you.
            </p>
            <p className="hero-overlay-text">
              Scroll down to find out more information about the event.
            </p>
          </div>

          <div className="hero-overlay-actions">
            <span className="rsvp-deadline">{`RSVP by ${eventTime.toLocaleDateString("en-SG", { year: 'numeric', month: 'long', day: 'numeric' })}`}</span>
            <button className="primary-button" onClick={() => navigate('/rsvp')}>RSVP</button>
          </div>
        </div>

      </div>
    </section>
  )
}