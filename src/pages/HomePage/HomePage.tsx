/* ── import styles ──────────────────────────────────────────────── */
import './HomePage.css'
/* ── import internal components ─────────────────────────────────── */
import ContentSection from './ContentSection/ContentSection'
import HeroSection from './HeroSection/HeroSection'


/* ── prop ───────────────────────────────────────────────────────── */
type HomePageProp = {
	eventTime: Date
}


export default function HomePage({ eventTime }: HomePageProp) {
  return (
    <div className="home-page">
      <HeroSection eventTime={eventTime}/>
      <main className="home-content">
        <ContentSection eventTime={eventTime}/>
      </main>
    </div>
  )
}