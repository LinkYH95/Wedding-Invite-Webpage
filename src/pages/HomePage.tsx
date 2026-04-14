import ContentSection from "../components/ContentSection"
import HeroSection from "../components/HeroSection"
import './HomePage.css'

type HomePageProp = {
  onClickImage: (src: any) => void
}

export default function HomePage({ onClickImage }: HomePageProp) {
	return (
		<div className="homepage">
			<HeroSection/>
			<ContentSection onClickImage={(onClickImage)}/>
		</div>
	)
}