/* ── import styles ──────────────────────────────────────────────── */
import './LocationMap.css'

/* ── prop ───────────────────────────────────────────────────────── */
type LocationMapProps = {
  address: string
  venueName?: string
  mapLabel?: string
}

export default function LocationMap({ address, venueName, mapLabel }: LocationMapProps) {
  const encodedAddress = encodeURIComponent(address)
  const embedSrc = `https://www.google.com/maps?q=${encodedAddress}&output=embed`

  return (
    <div className="map-card">
      {venueName && <p className="address-header">{venueName}</p>}

      <div className="map-frame">
        <iframe
          src={embedSrc}
          title={mapLabel ?? venueName ?? 'Venue location'}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

    </div>
  )
}