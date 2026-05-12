import ContentSection from "../components/ContentSection"
import HeroSection from "../components/HeroSection"
import './HomePage.css'
import { testWriteRSVP } from "../utils/testFirestore";
import RsvpPage from "./RsvpPage";
import { testSaveRSVP, testLoadRSVP } from "../utils/testRsvpService";


type HomePageProp = {
  onClickImage: (src: any) => void
}

export default function HomePage({ onClickImage }: HomePageProp) {
	return (
		<div className="homepage">
			{/* <button onClick={testWriteRSVP}>
				Test Firestore Write
			</button> */}
			<button onClick={testSaveRSVP}>Test Save RSVP</button>
			<button onClick={testLoadRSVP}>Test Load RSVP</button>
			{/* <HeroSection/> */}
			<ContentSection onClickImage={(onClickImage)}/>
			{/* <RsvpPage/> */}
		</div>
	)
}

