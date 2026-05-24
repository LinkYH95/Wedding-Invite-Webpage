/* ── import styles ──────────────────────────────────────────────── */
import './App.css'
/* ── import external libraries ──────────────────────────────────── */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
/* ── import internal components ─────────────────────────────────── */
import HomePage from './pages/HomePage/HomePage'
import RSVPPage from './pages/RsvpPage/RsvpPage';
import AdminPage from './pages/Admin/Admin';
/* ── import context / hooks ─────────────────────────────────────── */
import { ImageModalProvider } from './components/ImageModalContext';


export default function App() {
  /* ── Constants ────────────────────────────────────────────────── */
  const eventTime = new Date("2026-10-25T18:00:00+08:00")

  /* ── Render ───────────────────────────────────────────────────── */
  return (
    <BrowserRouter>
      <ImageModalProvider>
        <Routes>
          <Route path='/' element={<HomePage eventTime={eventTime}/>}/>
          <Route path='/rsvp' element={<RSVPPage />}/>
          <Route path='/admin' element={<AdminPage />}/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ImageModalProvider>
    </BrowserRouter>
  )
}