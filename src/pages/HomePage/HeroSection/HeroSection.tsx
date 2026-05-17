/* ── import styles ──────────────────────────────────────────────── */
import './HeroSection.css'
/* ── import external libraries ──────────────────────────────────── */
import { useNavigate } from 'react-router-dom'
/* ── import assets ──────────────────────────────────────────────── */
import hero1 from "../../../assets/DSC_2754.png"


/* ── prop ───────────────────────────────────────────────────────── */
type HeroSectionProps = {
	eventTime: Date
}


export default function HeroSection({ eventTime }: HeroSectionProps) {
  const navigate = useNavigate()

  return (
    <section className="hero-section">
      <div className="hero-image-panel">
        <img
          src={hero1}
          alt="Wedding hero"
          className="hero-image"
        />

        <div className="hero-image-box">
          <div className="hero-image-overlay">
            <h1 className="hero-overlay-title">Mr&nbsp;Chian&nbsp; & &nbsp;Mrs&nbsp;Toh</h1>
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