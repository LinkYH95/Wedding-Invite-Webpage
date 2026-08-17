/* ── import styles ──────────────────────────────────────────────── */
import './ContentSection.css'
/* ── import external libraries ──────────────────────────────────── */
import { useNavigate } from 'react-router-dom'
/* ── import internal components ─────────────────────────────────── */
import ContentCard from '../ContentCard/ContentCard'
import CountdownTimer from '../../../components/CountDownTimer'
/* ── import context / hooks ─────────────────────────────────────── */
// import { useImageModal } from '../../../components/ImageModalContext'
/* ── import assets ──────────────────────────────────────────────── */
import leftTop from "../../../assets/Corner Flower Top (2).png"
import leftBottom from "../../../assets/Corner Flower Bottom (2).png"
import image1 from "../../../assets/shoes.png"
import image2 from "../../../assets/DSC_2800.jpg"
// import poloroid1 from "../../../assets/image (3).png"
// import poloroid2 from "../../../assets/image (4).png"
// import poloroid3 from "../../../assets/image (5).png"
import LocationMap from '../../../components/LocationMap'


/* ── prop ───────────────────────────────────────────────────────── */
type ContentSectionProp = {
	eventTime: Date
}


export default function ContentSection({ eventTime }: ContentSectionProp) {
  /* ── Hooks ────────────────────────────────────────────────────── */
  const navigate = useNavigate();
  // const { openImage } = useImageModal();

  /* ── Render ───────────────────────────────────────────────────── */
  return (
    <>
    <ContentCard type='primary'>
      <div className="card-main">
        <img src={leftTop} className="corner top-left"/>
        <img src={leftBottom} className="corner bottom-right"/>
        <h1 className="date-header">{eventTime.toLocaleDateString("en-SG", { weekday: 'long' })}<br/>{eventTime.toLocaleDateString("en-SG", { year: 'numeric', month: 'long', day: 'numeric' })}</h1>
        <p className="address-header">Vineyard @ Hortpark</p>
        <button className="primary-button" onClick={() => navigate('/rsvp')}>Menu Selection</button>
        <p className="text-header" style={{ whiteSpace: 'pre-wrap' }}>{`Solemnisation: 5.30pm\nDinner Banquet: 6.30pm\nDress Code: Smart Casual`}</p>
      </div>
    </ContentCard>
    <ContentCard>
      <CountdownTimer targetDate={eventTime}/>
    </ContentCard>
    <ContentCard type='photo'>
      <img
        src={image2}
        alt="Wedding photo 1"
        className="wedding-photo"
      />
    </ContentCard>
    <ContentCard>
      <p className="address-header">OUR STORY</p>
      <p className="text-header" style={{ textAlign: "justify" }}>Our story began with a lucky swipe right, which quickly bloomed into a love that changed our lives forever. Over the years, we have been completely inseparable, finding joy in everything from getting creative with handicrafts and cooking together to exploring different parts of Asia. </p>
      <p className="text-header" style={{ textAlign: "justify" }}>Our engagement on 12 September 2025 was the perfect reflection of the deep bond we share. We are incredibly excited for this next chapter and can’t wait to celebrate our wedding day alongside our cherished family and friends!</p>
    </ContentCard>
    <ContentCard>
      <p className="address-header">我们的故事</p>
      <p className="text-header" style={{ textAlign: "justify" }}>我们的故事，始于一次美好的缘分。一次相遇，让两个原本陌生的人走进了彼此的生命，也开启了属于我们的爱情旅程。这些年来，我们一起经历了许多难忘的时光。从动手做手工、一起下厨，到携手探索亚洲各地，每一次欢笑、每一段旅程，都让我们的感情更加深厚，也留下了无数珍贵的回忆。</p>
      <p className="text-header" style={{ textAlign: "justify" }}>2025年9月12日的求婚，更是见证了我们深厚而坚定的感情，也为我们的爱情开启了崭新的篇章。如今，我们满怀期待地迎接人生的下一段旅程，并迫不及待地与挚爱的家人和朋友们，一同庆祝属于我们的婚礼，分享这份喜悦与幸福。</p>
    </ContentCard>
    {/* <ContentCard>
      <img src={poloroid1} style={{ marginBottom: 50, position: "sticky", top: "15%" }} onClick={()=>openImage?.(poloroid1)}/>
      <img src={poloroid2} style={{ marginBottom: 50, position: "sticky", top: "15%" }} onClick={()=>openImage?.(poloroid2)}/>
      <img src={poloroid3} style={{ marginBottom: 50, position: "sticky", top: "15%" }} onClick={()=>openImage?.(poloroid3)}/>
    </ContentCard>
    <ContentCard>
      <p className="address-header">TIDBIT</p>
      <p className="text-header" style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus neque in nibh iaculis interdum. Ut congue ac turpis et tincidunt. Quisque placerat mattis tortor a eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium elit nisi, vitae maximus ipsum interdum eget. Vestibulum at ornare felis. Fusce accumsan magna fermentum feugiat tempus. Integer tristique pellentesque dapibus. Curabitur sit amet sem commodo, sagittis nunc ac, interdum lacus. Nulla vel elit sollicitudin, molestie sapien at, aliquam erat. Etiam non lorem non dolor accumsan sagittis feugiat et magna.</p>
    </ContentCard> */}
    <ContentCard type='photo'>
      <img
        src={image1}
        alt="Wedding photo 2"
        className="wedding-photo"
      />
    </ContentCard>
    <ContentCard>
      <p className="address-header">Getting to Vineyard @ Hortpark</p>
      <p className="text-header" style={{ textAlign: "center" }}>*You are recommended to come earlier to enjoy a scenic stroll through the park*</p>
      <p className="text-header" style={{ textAlign: "center" }}><strong>🚇 By MRT & Bus</strong></p>
      <p className="text-header" style={{ textAlign: "justify" }}><strong>A. Labrador Park MRT (CC27):</strong> Take Exit A. Walk through the sheltered walk way to Alexandra Retail Ctr bus stop. Board Bus 51, 61, 93, 97, 100, 120, 166 or 963. Alight 2 stops later at Aft HortPark stop on Alexandra Road. Walk 5 minutes down Hyderabad Road to the park entrance.</p>
      <p className="text-header" style={{ textAlign: "justify" }}><strong>B. Queenstown MRT (EW19):</strong> Take Exit A/D. Walk to the bus stop right outside the Queenstown Stn Ext A/D.  Board Bus 51 or 111 and alight at Bef Telok Blangah Hill Park along Alexandra Road. Cross the road via overhead bridge to Hortpark side and walk down Hyderabad Road into Hortpark.</p>
      <p className="text-header" style={{ textAlign: "justify" }}><strong>C. HarbourFront MRT (NE1/CC29):</strong> Go to the bus interchange. Board Bus 61, 100, or 166 and alight at Aft Hortpark stop.</p>
      <p className="text-header" style={{ textAlign: "center" }}><strong>🚌 By Direct Bus</strong></p>
      <p className="text-header" style={{ textAlign: "justify" }}>Take any of these buses directly to Alexandra Road, alighting at either the Aft Hortpark stop or Bef Telok Blangah Hill.</p>
      <p className="text-header" style={{ textAlign: "justify" }}><strong>Bus numbers:</strong> 51, 61, 93, 97, 100, 120, 166, 963.</p>
      <p className="text-header" style={{ textAlign: "center" }}><strong>🚗 By Car</strong></p>
      <p className="text-header" style={{ textAlign: "justify" }}>Access the park via Alexandra Road and turn into Hyderabad Road.</p>
      <p className="text-header" style={{ textAlign: "justify" }}><strong>Parking:</strong> The park has an on-site paid parking lot ($0.60 per 30 mins or $0.02 per min) with 149 car lots and accessible parking spaces.</p>
      <LocationMap address="Vineyard @ Hortpark, Singapore"/>
    </ContentCard>
    <ContentCard>
      <p className="address-header">Notes to all guests</p>
      <p className="text-header">Please read carefully!</p>
      <p className="text-header" style={{ textAlign: "justify" }}>Due to the wedding venue (Vineyard @ Hortpark) being subjected to restrictions and stipulations imposed by the National Parks Board (NParks):</p>
      <ul>
        <li><p className="text-header" style={{ textAlign: "justify" }}>No scattering of flower petals or confetti is allowed within Hortpark (a cleaning fee of $500++ will be imposed if otherwise)</p></li>
        <li><p className="text-header" style={{ textAlign: "justify" }}>The carpark is managed by NPark. The automated gates of the car-park at HortPark will be locked after 11PM daily, and vehicles can only be retrieved the next morning after 7AM.</p></li>
        <li><p className="text-header" style={{ textAlign: "justify" }}>HortPark is a non-smoking national park. There is no designated smoking area within the park and smokers are liable to any fines imposed if caught smoking in the park.</p></li>
        <li><p className="text-header" style={{ textAlign: "justify" }}>No open flames (sparkles, lighters, candles) are allowed in HortPark and within the Restaurant's function spaces.</p></li>
      </ul>
    </ContentCard>
    <ContentCard>
      <p className="address-header">致所有宾客</p>
      <p className="text-header">请仔细阅读！</p>
      <p className="text-header" style={{ textAlign: "justify" }}>由于婚礼场地 (Vineyard @ Hortpark) 受国家公园局（NParks）的限制和规定约束，特此说明：</p>
      <ul>
        <li><p className="text-header" style={{ textAlign: "justify" }}>园艺园内禁止撒花瓣或彩纸屑（如有违反，将收取500新元++的清洁费）。</p></li>
        <li><p className="text-header" style={{ textAlign: "justify" }}>停车场由国家公园局管理。园艺园停车场的自动闸门每日晚上11点后关闭，车辆只能于次日早上7点后取回。</p></li>
        <li><p className="text-header" style={{ textAlign: "justify" }}>园艺园为无烟国家公园。园内没有指定的吸烟区，吸烟者如被发现吸烟，将承担相应的罚款。</p></li>
        <li><p className="text-header" style={{ textAlign: "justify" }}>园艺园及餐厅的宴会厅内禁止使用明火（包括烟花、打火机、蜡烛等）。</p></li>
      </ul>
    </ContentCard>
    {/* <ContentCard type='photo'>
        <img
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80"
          alt="Wedding photo 3"
          className="wedding-photo"
        />
    </ContentCard> */}
    </>
  )
}