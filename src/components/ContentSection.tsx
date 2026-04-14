import './ContentSection.css'
import leftTop from "../assets/Corner Flower Top (2).png"
import leftBottom from "../assets/Corner Flower Bottom (2).png"
import poloroid1 from "../assets/image (3).png"
import poloroid2 from "../assets/image (4).png"
import poloroid3 from "../assets/image (5).png"
import ContentCard from './ContentCard'
import CountdownTimer from './CountDownTimer'

type ContentSectionProps = {
  onClickImage: (src: any) => void
}

export default function ContentSection({ onClickImage }: ContentSectionProps) {
  return (
    <>
    <ContentCard type='primary'>
      <div className="card-main">
        <img src={leftTop} className="corner top-left"/>
        <img src={leftBottom} className="corner bottom-right"/>
        <h1 className="date-header">Thursday<br/>December 31, 2026</h1>
        <p className="address-header">Vineyard @ Hortpark</p>
        <p className="text-header">123 days 20 hrs 25 mins</p>
        <button className="primary-button">RSVP</button>
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
      <CountdownTimer targetDate={"2026-10-25T17:00:00+08:00"}/>
    </ContentCard>
    <ContentCard>
      <p className="address-header">Header</p>
      <p className="text-header" style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus neque in nibh iaculis interdum. Ut congue ac turpis et tincidunt. Quisque placerat mattis tortor a eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium elit nisi, vitae maximus ipsum interdum eget. Vestibulum at ornare felis. Fusce accumsan magna fermentum feugiat tempus. Integer tristique pellentesque dapibus. Curabitur sit amet sem commodo, sagittis nunc ac, interdum lacus. Nulla vel elit sollicitudin, molestie sapien at, aliquam erat. Etiam non lorem non dolor accumsan sagittis feugiat et magna.</p>
    </ContentCard>
    <ContentCard>
      <p className="address-header" style={{ position: "sticky", top: "10%"}}>Header</p>
      <img src={poloroid1} style={{ marginBottom: 50, position: "sticky", top: "15%" }} onClick={()=>onClickImage(poloroid1)}/>
      <img src={poloroid2} style={{ marginBottom: 50, position: "sticky", top: "15%" }} onClick={()=>onClickImage(poloroid2)}/>
      <img src={poloroid3} style={{ marginBottom: 50, position: "sticky", top: "15%" }} onClick={()=>onClickImage(poloroid3)}/>
    </ContentCard>
    <ContentCard>
      <p className="address-header">Header</p>
      <p className="text-header" style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus neque in nibh iaculis interdum. Ut congue ac turpis et tincidunt. Quisque placerat mattis tortor a eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium elit nisi, vitae maximus ipsum interdum eget. Vestibulum at ornare felis. Fusce accumsan magna fermentum feugiat tempus. Integer tristique pellentesque dapibus. Curabitur sit amet sem commodo, sagittis nunc ac, interdum lacus. Nulla vel elit sollicitudin, molestie sapien at, aliquam erat. Etiam non lorem non dolor accumsan sagittis feugiat et magna.</p>
    </ContentCard>
    <ContentCard type='photo'>
      <img
        src="https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=1200&q=80"
        alt="Wedding photo 2"
        className="wedding-photo"
      />
    </ContentCard>
    <ContentCard>
      <p className="address-header">Header</p>
      <p className="text-header" style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus neque in nibh iaculis interdum. Ut congue ac turpis et tincidunt. Quisque placerat mattis tortor a eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium elit nisi, vitae maximus ipsum interdum eget. Vestibulum at ornare felis. Fusce accumsan magna fermentum feugiat tempus. Integer tristique pellentesque dapibus. Curabitur sit amet sem commodo, sagittis nunc ac, interdum lacus. Nulla vel elit sollicitudin, molestie sapien at, aliquam erat. Etiam non lorem non dolor accumsan sagittis feugiat et magna.</p>
    </ContentCard>
    <ContentCard>
      <p className="address-header">Header</p>
      <p className="text-header" style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus neque in nibh iaculis interdum. Ut congue ac turpis et tincidunt. Quisque placerat mattis tortor a eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium elit nisi, vitae maximus ipsum interdum eget. Vestibulum at ornare felis. Fusce accumsan magna fermentum feugiat tempus. Integer tristique pellentesque dapibus. Curabitur sit amet sem commodo, sagittis nunc ac, interdum lacus. Nulla vel elit sollicitudin, molestie sapien at, aliquam erat. Etiam non lorem non dolor accumsan sagittis feugiat et magna.</p>
    </ContentCard>
    <ContentCard>
        <img
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80"
          alt="Wedding photo 3"
          className="wedding-photo"
        />
    </ContentCard>
    </>
  )
}