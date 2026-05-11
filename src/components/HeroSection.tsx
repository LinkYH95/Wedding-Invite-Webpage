import './HeroSection.css'
import hero1 from "../assets/DSC_2753.jpg"

type HeroSectionProps = {
}

export default function HeroSection({}: HeroSectionProps) {
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
            <h1 className="hero-overlay-title">Mr&nbsp;X&nbsp; & &nbsp;Mrs&nbsp;Y</h1>
            <p className="hero-overlay-text" style={{ marginBottom: 12 }}>
              We can't wait to share our special day with you.
            </p>
            <p className="hero-overlay-text">
              Scroll down to find out more information about the event.
            </p>
          </div>

          <div className="hero-overlay-actions">
            <span className="rsvp-deadline">RSVP by 31 Dec 2026</span>
            <button className="primary-button">RSVP</button>
          </div>
        </div>

      </div>
    </section>
  )
}