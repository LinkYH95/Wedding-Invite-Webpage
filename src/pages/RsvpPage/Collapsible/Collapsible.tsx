import { Collapsible, RadioGroup, Select } from "radix-ui"
import { useState } from "react"
import './Collapsible.css'


// ── Reusable Radix Select ────────────────────────────────────────────────────
function RsvpSelect({ name, value, options, onValueChange, placeholder = "Select a meal" }: any) {
  return (
    <Select.Root name={name} value={value ?? ""} onValueChange={onValueChange}>
      <Select.Trigger className="rsvp-select-trigger" aria-label={placeholder}>
        <Select.Value placeholder={placeholder} className="rsvp-select-value"/>
        <Select.Icon>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="rsvp-select-content" position="popper" sideOffset={4}>
          <Select.Viewport>
            {options.map(({ value, label }: any) => (
              <Select.Item key={value} value={value} className="rsvp-select-item">
                <Select.ItemText className="rsvp-select-item-text">{label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function CollapsibleSection(props: any) {
  const i = 1
  const [opened, setOpen] = useState(true)

  return (
    <>
      {/* Inject styles once */}
      <Collapsible.Root
        className="rsvp-member"
        open={opened}
        onOpenChange={setOpen}
      >
        <Collapsible.Trigger asChild>
          <button className="icon-button">
            <h3 className="rsvp-member-name">
              {props.guestName}
              <span className="chevron">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </h3>
          </button>
        </Collapsible.Trigger>

        <Collapsible.Content className="rsvp-box">
          <div className="rsvp-content">
            {/* Attendance — Radix RadioGroup */}
            <div className="rsvp-field">
              <label className="rsvp-label">Attending?</label>
              <RadioGroup.Root className="rsvp-radio-group" name={`attending-${i}`} value={props.attending} onValueChange={(value) => props.onchange('attending', value)}>
                {[
                  { value: "yes", label: "Yes, I'll be there" },
                  { value: "no",  label: "Sorry, I can't make it" },
                ].map(({ value, label }) => (
                  <label key={value} className="rsvp-radio-item">
                    <RadioGroup.Item value={value} className="rsvp-radio-indicator-root">
                      <RadioGroup.Indicator asChild>
                        <span className="rsvp-radio-dot" />
                      </RadioGroup.Indicator>
                    </RadioGroup.Item>
                    <span>{label}</span>
                  </label>
                ))}
              </RadioGroup.Root>
            </div>

            {/* Menu Selection */}
            {props.attending === "yes" && (
              <>
                <div className="rsvp-field">
                  <label className="rsvp-label">Menu Selection</label>
                  <RsvpSelect
                    name="menu-selection"
                    value={props.menuSelection}
                    onValueChange={(value: any) => props.onchange('menuSelection', value)}
                    options={[
                      { value: "child-2-course", label: "Child 2-Course Meal" },
                      { value: "child-4-course", label: "Child 4-Course Meal" },
                      { value: "adult-5-course", label: "Adult 5-Course Meal" },
                    ]}
                  />
                </div>

                {/* Cold Starter */}
                {props.menuSelection === "adult-5-course" && (
                  <>
                    <div className="rsvp-field">
                      <label className="rsvp-label">Cold Starter</label>
                      <RsvpSelect
                        name="cold-starter"
                        placeholder="Default: Blue Swimmer Crabmeat & Avocado"
                        value={props.coldStarter}
                        onValueChange={(value: any) => props.onchange('coldStarter', value)}
                        options={[
                          { value: "cold-starter-1", label: "Blue Swimmer Crabmeat & Avocado" },
                          { value: "cold-starter-2", label: "Heirloom Beetroot Tartare & Avocado" },
                        ]}
                      />
                    </div>

                    {/* Hot Appetizer */}
                    <div className="rsvp-field">
                      <label className="rsvp-label">Hot Appetizer</label>
                      <RsvpSelect
                        name="hot-appetizer"
                        placeholder="Default: Pan-roasted Hokkaido Scallop & Ikura"
                        value={props.hotAppetizer}
                        onValueChange={(value: any) => props.onchange('hotAppetizer', value)}
                        options={[
                          { value: "hot-appetizer-1", label: "Pan-roasted Hokkaido Scallop & Ikura" },
                          { value: "hot-appetizer-2", label: `King Mushroom "Scallop" with Seaweed Caviar` },
                        ]}
                      />
                    </div>

                    {/* Soup */}
                    <div className="rsvp-field">
                      <label className="rsvp-label">Soup</label>
                      <RsvpSelect
                        name="soup"
                        placeholder="Default: Lobster Bisque"
                        value={props.soup}
                        onValueChange={(value: any) => props.onchange('soup', value)}
                        options={[
                          { value: "soup-1", label: "Lobster Bisque" },
                          { value: "soup-2", label: "Locally Grown Mushroom Soup" },
                        ]}
                      />
                    </div>

                    {/* Mains */}
                    <div className="rsvp-field">
                      <label className="rsvp-label">Mains</label>
                      <RsvpSelect
                        name="mains"
                        placeholder="Default: Farmed Chicken Chou Farci with Foie Gras Poêlé"
                        value={props.mains}
                        onValueChange={(value: any) => props.onchange('mains', value)}
                        options={[
                          { value: "mains-1", label: "Farmed Chicken Chou Farci with Foie Gras Poêlé" },
                          { value: "mains-2", label: "Herb Crusted Tasmania Salmon" },
                        ]}
                      />
                    </div>

                    {/* Dessert */}
                    <div className="rsvp-field">
                      <label className="rsvp-label">Dessert</label>
                      <RsvpSelect
                        name="dessert"
                        placeholder="Default: Wild Berries Sorbet (Non-Dairy)"
                        value={props.dessert}
                        onValueChange={(value: any) => props.onchange('dessert', value)}
                        options={[
                          { value: "dessert-1", label: "Mango Savarin" },
                          { value: "dessert-2", label: "Wild Berries Sorbet (Non-Dairy)" },
                        ]}
                      />
                    </div>
                  </>
                )}

                {/* Dietary Requirements — native input (no Radix TextField in core) */}
                <div className="rsvp-field">
                  <label className="rsvp-label">Dietary Requirements</label>
                  <input
                    className="rsvp-input"
                    value={props.dietaryRestriction}
                    onChange={(e) => props.onchange('dietaryRestriction', e.target.value)}
                    type="text"
                    placeholder="e.g. Nut allergy, Halal, Vegan..."
                  />
                </div>
              </>
            )}
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  )
}