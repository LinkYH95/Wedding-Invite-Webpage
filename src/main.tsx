/* ── import styles ──────────────────────────────────────────────── */
import './index.css'
/* ── import external libraries ──────────────────────────────────── */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
/* ── import internal components ─────────────────────────────────── */
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
