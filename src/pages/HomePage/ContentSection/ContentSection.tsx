/* ── import styles ──────────────────────────────────────────────── */
import './ContentSection.css'
/* ── import external libraries ──────────────────────────────────── */
import { useNavigate } from 'react-router-dom'
/* ── import internal components ─────────────────────────────────── */
import ContentCard from '../ContentCard/ContentCard'
import CountdownTimer from '../../../components/CountDownTimer'
/* ── import context / hooks ─────────────────────────────────────── */
import { useImageModal } from '../../../components/ImageModalContext'
/* ── import assets ──────────────────────────────────────────────── */
import leftTop from "../../../assets/Corner Flower Top (2).png"
import leftBottom from "../../../assets/Corner Flower Bottom (2).png"
import image1 from "../../../assets/shoes.png"
import poloroid1 from "../../../assets/image (3).png"
import poloroid2 from "../../../assets/image (4).png"
import poloroid3 from "../../../assets/image (5).png"


/* ── prop ───────────────────────────────────────────────────────── */
type ContentSectionProp = {
	eventTime: Date
}


export default function ContentSection({ eventTime }: ContentSectionProp) {
  /* ── Hooks ────────────────────────────────────────────────────── */
  const navigate = useNavigate();
  const { openImage } = useImageModal();

  /* ── Render ───────────────────────────────────────────────────── */
  return (
    <>
    <ContentCard type='primary'>
      <div className="card-main">
        <img src={leftTop} className="corner top-left"/>
        <img src={leftBottom} className="corner bottom-right"/>
        <h1 className="date-header">{eventTime.toLocaleDateString("en-SG", { weekday: 'long' })}<br/>{eventTime.toLocaleDateString("en-SG", { year: 'numeric', month: 'long', day: 'numeric' })}</h1>
        <p className="address-header">Vineyard @ Hortpark</p>
        <button className="primary-button" onClick={() => navigate('/rsvp')}>RSVP</button>
      </div>
    </ContentCard>
    <ContentCard type='photo'>
      <img
          src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80"
          alt="Wedding photo 1"
          className="wedding-photo"
        />
    </ContentCard>
    <ContentCard>
      <CountdownTimer targetDate={eventTime}/>
    </ContentCard>
    <ContentCard>
      <p className="address-header">OUR STORY</p>
      <p className="text-header" style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus neque in nibh iaculis interdum. Ut congue ac turpis et tincidunt. Quisque placerat mattis tortor a eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium elit nisi, vitae maximus ipsum interdum eget. Vestibulum at ornare felis. Fusce accumsan magna fermentum feugiat tempus. Integer tristique pellentesque dapibus. Curabitur sit amet sem commodo, sagittis nunc ac, interdum lacus. Nulla vel elit sollicitudin, molestie sapien at, aliquam erat. Etiam non lorem non dolor accumsan sagittis feugiat et magna.</p>
    </ContentCard>
    <ContentCard>
      <img src={poloroid1} style={{ marginBottom: 50, position: "sticky", top: "15%" }} onClick={()=>openImage?.(poloroid1)}/>
      <img src={poloroid2} style={{ marginBottom: 50, position: "sticky", top: "15%" }} onClick={()=>openImage?.(poloroid2)}/>
      <img src={poloroid3} style={{ marginBottom: 50, position: "sticky", top: "15%" }} onClick={()=>openImage?.(poloroid3)}/>
    </ContentCard>
    <ContentCard>
      <p className="address-header">TIDBIT</p>
      <p className="text-header" style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus neque in nibh iaculis interdum. Ut congue ac turpis et tincidunt. Quisque placerat mattis tortor a eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium elit nisi, vitae maximus ipsum interdum eget. Vestibulum at ornare felis. Fusce accumsan magna fermentum feugiat tempus. Integer tristique pellentesque dapibus. Curabitur sit amet sem commodo, sagittis nunc ac, interdum lacus. Nulla vel elit sollicitudin, molestie sapien at, aliquam erat. Etiam non lorem non dolor accumsan sagittis feugiat et magna.</p>
    </ContentCard>
    <ContentCard type='photo'>
      <img
        src={image1}
        alt="Wedding photo 2"
        className="wedding-photo"
      />
    </ContentCard>
    <ContentCard>
      <p className="address-header">DIRECTION</p>
      <p className="text-header" style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus neque in nibh iaculis interdum. Ut congue ac turpis et tincidunt. Quisque placerat mattis tortor a eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium elit nisi, vitae maximus ipsum interdum eget. Vestibulum at ornare felis. Fusce accumsan magna fermentum feugiat tempus. Integer tristique pellentesque dapibus. Curabitur sit amet sem commodo, sagittis nunc ac, interdum lacus. Nulla vel elit sollicitudin, molestie sapien at, aliquam erat. Etiam non lorem non dolor accumsan sagittis feugiat et magna.</p>
    </ContentCard>
    <ContentCard>
      <p className="address-header">IMPORTANT TO NOTE</p>
      <p className="text-header" style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus neque in nibh iaculis interdum. Ut congue ac turpis et tincidunt. Quisque placerat mattis tortor a eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium elit nisi, vitae maximus ipsum interdum eget. Vestibulum at ornare felis. Fusce accumsan magna fermentum feugiat tempus. Integer tristique pellentesque dapibus. Curabitur sit amet sem commodo, sagittis nunc ac, interdum lacus. Nulla vel elit sollicitudin, molestie sapien at, aliquam erat. Etiam non lorem non dolor accumsan sagittis feugiat et magna.</p>
    </ContentCard>
    <ContentCard type='photo'>
        <img
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80"
          alt="Wedding photo 3"
          className="wedding-photo"
        />
    </ContentCard>
    </>
  )
}