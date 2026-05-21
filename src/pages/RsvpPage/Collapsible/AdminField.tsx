import { useState } from "react"
import { batchSaveRSVP } from "../../../utils/testRsvpService"

/* ── prop ───────────────────────────────────────────────────────── */
export default function AdminField() {
  
  const defaultData = {
    guestID: '',
    guestName: '',
    attending: 'yes',
    menuSelection: null,
    coldStarter: null,
    hotAppetizer: null,
    soup: null,
    mains: null,
    dessert: null,
    dietaryRestriction: '',
    submitted: false,
  }

  const [guestDetails, setGuestDetails] = useState(defaultData)

  const updateGuestDetails = (field: string, value: any) => {
    setGuestDetails((prev: any) => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="rsvp-member" >
      <div className="rsvp-field">
        <label className="rsvp-label">member ID</label>
        <input
          className="rsvp-input"
          value={guestDetails.guestID || ''}
          type="text"
          placeholder="member ID"
          onChange={(e) => updateGuestDetails('guestID', e.target.value)}
        />
      </div>

      <div className="rsvp-field">
        <label className="rsvp-label">member name</label>
        <input
          className="rsvp-input"
          type="text"
          placeholder="member name"
          value={guestDetails.guestName || ''}
          onChange={(e) => updateGuestDetails('guestName', e.target.value)}
        />
      </div>

      <button onClick={() => console.log(guestDetails)}>console.log</button>
      <button onClick={() => batchSaveRSVP({[guestDetails.guestID]: guestDetails})}>add</button>
    </div>
  )
}