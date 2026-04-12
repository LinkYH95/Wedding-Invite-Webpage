import './ContentSection.css'
// import leftTop from "../assets/Corner Flower Top.png"
// import leftBottom from "../assets/Corner Flower Bottom.png"
import leftTop from "../assets/Corner Flower Top (2).png"
import leftBottom from "../assets/Corner Flower Bottom (2).png"

type ContentSectionProps = {
}

export default function ContentSection({}: ContentSectionProps) {
  return (
    <section className="content-section">
      <div className="content-blank"/>
      <div className="content" style={{ gap: "50px" }}>
        <div className="card-main">
          <img src={leftTop} className="corner top-left"/>
          <img src={leftBottom} className="corner bottom-right"/>
          <h1 className="date-header">Thursday<br/>December 31, 2026</h1>
          <p className="address-header">Vineyard @ Hortpark</p>
          <p className="text-header">123 days 20 hrs 25 mins</p>
          <button className="primary-button">RSVP</button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80"
          alt="Wedding photo 1"
          className="wedding-photo"
        />
        <div className="content" style={{ padding: "0px 25px" }}>
            <p className="address-header">Header</p>
            <p className="text-header" style={{ maxWidth: "75vw", textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus neque in nibh iaculis interdum. Ut congue ac turpis et tincidunt. Quisque placerat mattis tortor a eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium elit nisi, vitae maximus ipsum interdum eget. Vestibulum at ornare felis. Fusce accumsan magna fermentum feugiat tempus. Integer tristique pellentesque dapibus. Curabitur sit amet sem commodo, sagittis nunc ac, interdum lacus. Nulla vel elit sollicitudin, molestie sapien at, aliquam erat. Etiam non lorem non dolor accumsan sagittis feugiat et magna.</p>
            <div style={{ height: "5%" }}/>
        </div>
        <img
          src="https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=1200&q=80"
          alt="Wedding photo 2"
          className="wedding-photo"
        />
        <div className="content" style={{ padding: "0px 25px" }}>
            <p className="address-header">Header</p>
            <p className="text-header" style={{ maxWidth: "75vw", textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus neque in nibh iaculis interdum. Ut congue ac turpis et tincidunt. Quisque placerat mattis tortor a eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium elit nisi, vitae maximus ipsum interdum eget. Vestibulum at ornare felis. Fusce accumsan magna fermentum feugiat tempus. Integer tristique pellentesque dapibus. Curabitur sit amet sem commodo, sagittis nunc ac, interdum lacus. Nulla vel elit sollicitudin, molestie sapien at, aliquam erat. Etiam non lorem non dolor accumsan sagittis feugiat et magna.</p>
            <div style={{ height: "5%" }}/>
        </div>
        <div className="content" style={{ padding: "0px 25px" }}>
            <p className="address-header">Header</p>
            <p className="text-header" style={{ maxWidth: "75vw", textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus neque in nibh iaculis interdum. Ut congue ac turpis et tincidunt. Quisque placerat mattis tortor a eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium elit nisi, vitae maximus ipsum interdum eget. Vestibulum at ornare felis. Fusce accumsan magna fermentum feugiat tempus. Integer tristique pellentesque dapibus. Curabitur sit amet sem commodo, sagittis nunc ac, interdum lacus. Nulla vel elit sollicitudin, molestie sapien at, aliquam erat. Etiam non lorem non dolor accumsan sagittis feugiat et magna.</p>
            <div style={{ height: "5%" }}/>
        </div>
        <img
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80"
          alt="Wedding photo 3"
          className="wedding-photo"
        />
        <div className="content" style={{ padding: "0px 25px" }}>
            <p className="address-header">Header</p>
            <p className="text-header" style={{ maxWidth: "75vw", textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus neque in nibh iaculis interdum. Ut congue ac turpis et tincidunt. Quisque placerat mattis tortor a eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium elit nisi, vitae maximus ipsum interdum eget. Vestibulum at ornare felis. Fusce accumsan magna fermentum feugiat tempus. Integer tristique pellentesque dapibus. Curabitur sit amet sem commodo, sagittis nunc ac, interdum lacus. Nulla vel elit sollicitudin, molestie sapien at, aliquam erat. Etiam non lorem non dolor accumsan sagittis feugiat et magna.</p>
            <div style={{ height: "5%" }}/>
        </div>
      </div>
    </section>
  )
}