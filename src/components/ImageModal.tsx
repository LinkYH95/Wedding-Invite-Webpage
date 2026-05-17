import { useEffect, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import './ImageModal.css'

type ImageModalProps = {
  src: string | null
  onClose: () => void
}

export default function ImageModal({ src, onClose }: ImageModalProps) {
  const [zoomed, setZoomed] = useState(false)
  const [pan, setPan] = useState({ x: 0, y: 0 })

  const dragging = useRef(false)
  const hasDragged = useRef(false)
  const startPos = useRef({ x: 0, y: 0 })
  const startPan = useRef({ x: 0, y: 0 })
  const imgRef = useRef<HTMLImageElement>(null)

  // ── Lock body scroll when open ──────────────────────────────
  useEffect(() => {
    if (src) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setZoomed(false)
      setPan({ x: 0, y: 0 })
    }
    return () => { document.body.style.overflow = '' }
  }, [src])

  // ── Shared drag start ───────────────────────────────────────
  const onDragStart = (clientX: number, clientY: number) => {
    if (!zoomed) return
    dragging.current = true
    hasDragged.current = false
    startPos.current = { x: clientX, y: clientY }
    startPan.current = { ...pan }
  }

  // ── Shared drag move ────────────────────────────────────────
  const onDragMove = (clientX: number, clientY: number) => {
    if (!dragging.current || !imgRef.current) return
    hasDragged.current = true

    const maxX = imgRef.current.clientWidth / 2
    const maxY = imgRef.current.clientHeight / 2

    const newX = startPan.current.x + (clientX - startPos.current.x)
    const newY = startPan.current.y + (clientY - startPos.current.y)

    setPan({
      x: Math.max(-maxX, Math.min(maxX, newX)),
      y: Math.max(-maxY, Math.min(maxY, newY)),
    })
  }

  // ── Shared drag end ─────────────────────────────────────────
  const onDragEnd = () => {
    dragging.current = false
  }

  // ── Click / tap to zoom toggle ──────────────────────────────
  const handleToggleZoom = () => {
    if (hasDragged.current) {
      hasDragged.current = false
      return
    }
    if (zoomed) {
      setZoomed(false)
      setPan({ x: 0, y: 0 })
    } else {
      setZoomed(true)
    }
  }

  // ── Mouse handlers ──────────────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    onDragStart(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    onDragMove(e.clientX, e.clientY)
  }

  const handleMouseUp = () => onDragEnd()

  // ── Touch handlers ──────────────────────────────────────────
  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      const t = e.touches[0]
      onDragStart(t.clientX, t.clientY)
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const t = e.touches[0]
      onDragMove(t.clientX, t.clientY)
    }

    const onTouchEnd = () => {
      onDragEnd()
      handleToggleZoom()
    }

    img.addEventListener('touchstart', onTouchStart, { passive: false })
    img.addEventListener('touchmove', onTouchMove, { passive: false })
    img.addEventListener('touchend', onTouchEnd)

    return () => {
      img.removeEventListener('touchstart', onTouchStart)
      img.removeEventListener('touchmove', onTouchMove)
      img.removeEventListener('touchend', onTouchEnd)
    }
  }, [zoomed, pan]) // re-attach when zoomed or pan changes so closures are fresh

  return (
    <Dialog.Root open={!!src} onOpenChange={(open) => { if (!open) onClose() }}>
      <Dialog.Portal>

        {/* Clicking overlay closes modal */}
        <Dialog.Overlay className="image-modal-overlay" />

        <Dialog.Content className="image-modal-content" aria-describedby={undefined}>
          <VisuallyHidden.Root>
            <Dialog.Title>Image Preview</Dialog.Title>
          </VisuallyHidden.Root>

          {/* Image wrapper — interaction and close button scoped here */}
          <div className="image-modal-wrapper">

            {/* Close button — always fixed to top-right corner of wrapper */}
            <Dialog.Close className="image-modal-close">✕</Dialog.Close>

            {src && (
              <img
                ref={imgRef}
                src={src}
                className="image-modal-img"
                draggable={false}
                style={{
                  transform: zoomed
                    ? `scale(2) translate(${pan.x / 2}px, ${pan.y / 2}px)`
                    : 'scale(1)',
                  cursor: zoomed
                    ? dragging.current ? 'grabbing' : 'grab'
                    : 'zoom-in',
                  transition: dragging.current ? 'none' : 'transform 0.3s ease',
                }}
                onClick={handleToggleZoom}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
            )}
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}