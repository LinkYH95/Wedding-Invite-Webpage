import { useState } from "react";
import type { RSVPSubmission } from "../types/rsvp";

export default function RsvpPage() {
  const [formData, setFormData] = useState<RSVPSubmission>({
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    adultsCount: 0,
    kidsCount: 0,
    guests: [],
    dietaryNotes: "",
    submittedAt: "",
  });

  return (
    <div>
      <h1>RSVP Form</h1>

      <div>
        <label>Contact Name</label>
        <input
          type="text"
          value={formData.contactName}
          onChange={(e) =>
            setFormData({ ...formData, contactName: e.target.value })
          }
        />
      </div>

      <div>
        <label>Contact Phone</label>
        <input
          type="text"
          value={formData.contactPhone}
          onChange={(e) =>
            setFormData({ ...formData, contactPhone: e.target.value })
          }
        />
      </div>

      <div>
        <label>Contact Email</label>
        <input
          type="email"
          value={formData.contactEmail}
          onChange={(e) =>
            setFormData({ ...formData, contactEmail: e.target.value })
          }
        />
      </div>

      <div>
        <label>Number of Adults</label>
        <input
          type="number"
          value={formData.adultsCount}
          onChange={(e) =>
            setFormData({ ...formData, adultsCount: Number(e.target.value) })
          }
        />
      </div>

      <div>
        <label>Number of Kids</label>
        <input
          type="number"
          value={formData.kidsCount}
          onChange={(e) =>
            setFormData({ ...formData, kidsCount: Number(e.target.value) })
          }
        />
      </div>

      <div>
        <label>Dietary Notes</label>
        <textarea
          value={formData.dietaryNotes}
          onChange={(e) =>
            setFormData({ ...formData, dietaryNotes: e.target.value })
          }
        />
      </div>

      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}