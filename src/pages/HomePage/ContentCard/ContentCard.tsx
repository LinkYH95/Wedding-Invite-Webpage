/* ── import styles ──────────────────────────────────────────────── */
import './ContentCard.css'


/* ── prop ───────────────────────────────────────────────────────── */
type ContentCardProps = {
  children?: React.ReactNode
  style?: React.CSSProperties
  type?: "primary" | "secondary" | "photo"
}


export default function ContentCard({
  children,
  type = "secondary",
}: ContentCardProps) {

  /* ── Conditional Styling ───────────────────────────────────────── */
  let contentCardStyle = {};
  let contentStyle = { padding: "20px" };

  switch (type) {
    case "primary":
      contentCardStyle = { minHeight: '100vh' };
      contentStyle = { padding: "0px" }
      break;
    case "photo":
      contentStyle = { padding: "0px" };
      break;
    case "secondary":
    default:
      break;
  } 

  /* ── Render ────────────────────────────────────────────────────── */
  return (
    <div className="content-card" style={{ ...contentCardStyle }}>
      <div className="content-blank"/>
      <div style={{ ...contentStyle }}>
        {children}
      </div>
    </div>
  );
}