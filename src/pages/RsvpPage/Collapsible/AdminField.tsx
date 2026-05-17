/* ── prop ───────────────────────────────────────────────────────── */
type AdminFieldProp = {
  guestID?: string,
  guestName?: string,
  attending?: boolean,
  menuSelection?: string | null,
  coldStarter?: string | null,
  hotAppetizer?: string | null,
  soup?: string | null,
  mains?: string | null,
  dessert?: string | null,
  dietaryRestriction?: string,
  submitted?: boolean,
  submittedAt?: Date | null,
  updatedAt?: Date | null,
}

export default function AdminField(props: AdminFieldProp) {
  return (
    <div className="rsvp-member" >
      <div className="rsvp-field">
        <label className="rsvp-label">member ID</label>
        <input
          className="rsvp-input"
          value={props.guestID || ''}
          type="text"
          placeholder="member ID"
          // onChange={(e) => props((prev: any) => ({
          //   ...prev,
          //   guestID: e.target.value
          // }))}
        />
      </div>

      <div className="rsvp-field">
        <label className="rsvp-label">member name</label>
        <input
          className="rsvp-input"
          type="text"
          placeholder="member name"
          value={props.guestName || ''}
          // onChange={(e) => updatetemp((prev: any) => ({
          //   ...prev,
          //   guestName: e.target.value
          // }))}
        />
      </div>

      {/* Menu selection — replace options with your real menu */}
      <div className="rsvp-field">
        <label className="rsvp-label">Menu Selection</label>
        <select className="rsvp-select" /*onChange={(event) => updatetemp((prev: any) => ({
              ...prev,
              menuSelection: event.target.value
            }))}*/>
          <option value="">Select a meal</option>
          <option
            value="child-2-course"
          >
            Child 2-Course Meal
          </option>
          <option value="child-4-course">Child 4-Course Meal</option>
          <option value="adult-5-course">Adult 5-Course Meal</option>
        </select>
      </div>

      {/* Cold Starter */}
      <div className="rsvp-field">
        <label className="rsvp-label">Cold Starter</label>
        <select className="rsvp-select">
          <option value="">Select a meal</option>
          <option value="cold-starter-1">Blue Swimmer Crabmeat & Avocado</option>
          <option value="cold-starter-2">Heirloom Beetroot Tartare & Avocado</option>
        </select>
      </div>

      {/* Hot Appetizer */}
      <div className="rsvp-field">
        <label className="rsvp-label">Hot Appetizer</label>
        <select className="rsvp-select">
          <option value="">Select a meal</option>
          <option value="hot-appetizer-1">Pan-roasted Hokkaido Scallop & Ikura</option>
          <option value="hot-appetizer-2">King Mushroom "Scallop" with Seaweed Caviar</option>
        </select>
      </div>

      {/* Soup */}
      <div className="rsvp-field">
        <label className="rsvp-label">Soup</label>
        <select className="rsvp-select">
          <option value="">Select a meal</option>
          <option value="soup-1">Lobster Bisque</option>
          <option value="soup-2">Locally Grown Mushroom Soup</option>
        </select>
      </div>

      {/* Mains */}
      <div className="rsvp-field">
        <label className="rsvp-label">Mains</label>
        <select className="rsvp-select">
          <option value="">Select a meal</option>
          <option value="mains-1">Farmed Chicken Chou Farci with Foie Gras Poêlé</option>
          <option value="main-2">Herb Crusted Tasmania Salmon</option>
        </select>
      </div>

      {/* Dessert */}
      <div className="rsvp-field">
        <label className="rsvp-label">Dessert</label>
        <select className="rsvp-select">
          <option value="">Select a meal</option>
          <option value="dessert-1">Mango Savarin</option>
          <option value="dessert-2">Wild Berries Sorbet (Non-Dairy)</option>
        </select>
      </div>

      {/* Dietary requirements */}
      <div className="rsvp-field">
        <label className="rsvp-label">Dietary Requirements</label>
        <input
          className="rsvp-input"
          type="text"
          placeholder="e.g. Nut allergy, Halal, Vegan..."
        />
      </div>

      {/* <button onClick={() => setUpdateInput(temp)}>add</button>
      <button onClick={() => testSaveRSVP(inputs)}>console.log</button> */}
    </div>
  )
}