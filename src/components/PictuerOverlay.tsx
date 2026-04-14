import { useEffect } from "react";
import "./PictureOverlay.css";

type PictureOverlayProps = {
  isOpen?: boolean
  onClose: () => void
  picSrc?: string | ""
}

export default function PictureOverlay({ isOpen, onClose, picSrc }: PictureOverlayProps) {

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`picture-backdrop ${isOpen ? "open" : ""}`}
        onClick={() => onClose()}
      />

      <div className={`picture-model ${isOpen ? "open" : ""}`} style={{ placeItems: "center", alignContent: "center" }}>
        <button
          type="button"
          className="picture-close"
          style={{ display: isOpen ? "initial" : "none", margin: "30px", right: 0, top: 0, position: "absolute" }}
          aria-label={isOpen ? "Close Picture" : "Open Picture"}
          onClick={() => onClose()}
        >
          <span className="picture-close">×</span>
        </button>
        <img src={picSrc} style={{ maxWidth: "100%", height: "auto", maxHeight: "800px", display: "block" }}/>
      </div>
    </>
  )
}