// context/ImageModalContext.tsx
import { createContext, useContext, useState } from 'react'
import ImageModal from './ImageModal'

const ImageModalContext = createContext<{
  openImage: (src: string) => void
} | null>(null)

export function ImageModalProvider({ children }: { children: React.ReactNode }) {
  const [src, setSrc] = useState<string | null>(null)

  return (
    <ImageModalContext.Provider value={{ openImage: setSrc }}>
      {children}
      <ImageModal src={src} onClose={() => setSrc(null)} />
    </ImageModalContext.Provider>
  )
}

export function useImageModal() {
  const ctx = useContext(ImageModalContext)
  if (!ctx) throw new Error('useImageModal must be used within ImageModalProvider')
  return ctx
}