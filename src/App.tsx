import { useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import PictureOverlay from './components/PictuerOverlay'
import HomePage from './pages/HomePage'

export default function App() {
  const [picSrc, setPicSrc] = useState<string>("");
  let showPicOverlay = !!picSrc

  return (
    <>
      <Navbar/>
      <PictureOverlay isOpen={showPicOverlay} picSrc={picSrc} onClose={() => setPicSrc("")}/>
      <HomePage onClickImage={(src: any) => setPicSrc(src)}/>
    </>
  )
}
