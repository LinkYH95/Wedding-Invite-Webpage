import { useEffect, useState } from "react";
import "./Navbar.css";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Story", href: "#story" },
  { label: "Tidbits", href: "#tidbits" },
  { label: "Schedule", href: "#schedule" },
  { label: "Q & A", href: "#qa" },
  { label: "Get the app", href: "#app" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <span className="menu-close">×</span>
        ) : (
          <span className="menu-hamburger">
            <span />
            <span />
            <span />
          </span>
        )}
      </button>

      <div
        className={`menu-backdrop ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`side-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <div className="drawer-brand">Mr.X &amp; Mrs.Y</div>

          <button
            type="button"
            className="drawer-close-button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="drawer-nav">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="drawer-link"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}