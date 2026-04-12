import ContentSection from "../components/ContentSection"
import HeroSection from "../components/HeroSection"
import './HomePage.css'

export default function HomePage() {
	return (
		<div className="homepage">
			<HeroSection/>
			<ContentSection/>
		</div>
	)
}