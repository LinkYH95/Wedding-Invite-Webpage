import { Collapsible, RadioGroup, Select } from "radix-ui"
import { useState } from "react"
import './Collapsible.css'
import { useTranslation } from "react-i18next";

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
            {options.map(({ value, label, disabled }: any) => (
              <Select.Item key={value} value={value} disabled={disabled} className="rsvp-select-item">
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

  const menuSelectionOption = []
  const { t } = useTranslation();

  if (props.isChild) {
    menuSelectionOption.push(
      { value: "none", label: t("form.menu_option_none") },
      { value: "child-2-course", label: t("form.menu_option_child_2") },
      { value: "child-4-course", label: t("form.menu_option_child_4") },
      { value: "adult-5-course", label: t("form.menu_option_adult_5") },
    )
  } else {
    menuSelectionOption.push(
      { value: "adult-5-course", label: t("form.menu_option_adult_5") },
    )
  }

  const renderMenuSelect = () => {
    switch (props.menuSelection) {
      case "child-2-course": 
        return (
          <>
            {/* Mains */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_mains")}</label>
              <RsvpSelect
                name="mains"
                placeholder={`${t("form.default_prefix")} ${t("form.dish_chicken_chou_farci")}`}
                value={props.mains}
                onValueChange={(value: any) => props.onchange('mains', value)}
                options={[
                  { value: "fish", label: t("form.dish_chicken_chou_farci") },
                  { value: "mushroom", label: t("form.dish_mushroom_pasta") },
                ]}
              />
            </div>

            {/* Dessert */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_dessert")}</label>
              <RsvpSelect
                name="dessert"
                placeholder={`${t("form.default_prefix")} ${t("form.dish_wild_berries_sorbet")}`}
                value={props.dessert}
                onValueChange={(value: any) => props.onchange('dessert', value)}
                options={[{ value: "sorbet", label: t("form.dish_chocolate_sorbet") }]}
              />
            </div>
          </>
        )
      case "child-4-course":
        return (
          <>
            {/* Hot Appetizer */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_hot_appetizer")}</label>
              <RsvpSelect
                name="hot-appetizer"
                placeholder={`${t("form.default_prefix")} ${t("form.dish_scallop_ikura")}`}
                value={props.hotAppetizer}
                onValueChange={(value: any) => props.onchange('hotAppetizer', value)}
                options={[{ value: "nuggets", label: t("form.dish_chicken_nuggets") }]}
              />
            </div>

            {/* Soup */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_soup")}</label>
              <RsvpSelect
                name="soup"
                placeholder={`${t("form.default_prefix")} ${t("form.dish_lobster_bisque")}`}
                value={props.soup}
                onValueChange={(value: any) => props.onchange('soup', value)}
                options={[{ value: "mushroom", label: t("form.dish_mushroom_veloute") }]}
              />
            </div>

            {/* Mains */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_mains")}</label>
              <RsvpSelect
                name="mains"
                placeholder={`${t("form.default_prefix")} ${t("form.dish_chicken_chou_farci")}`}
                value={props.mains}
                onValueChange={(value: any) => props.onchange('mains', value)}
                options={[
                  { value: "fish", label: t("form.dish_fish_chips") },
                  { value: "mushroom", label: t("form.dish_mushroom_pasta") },
                ]}
              />
            </div>

            {/* Dessert */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_dessert")}</label>
              <RsvpSelect
                name="dessert"
                placeholder={`${t("form.default_prefix")} ${t("form.dish_wild_berries_sorbet")}`}
                value={props.dessert}
                onValueChange={(value: any) => props.onchange('dessert', value)}
                options={[{ value: "sorbet", label: t("form.dish_chocolate_sorbet") }]}
              />
            </div>
          </>
        )
      case "adult-5-course":
        return (
          <>
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_cold_starter")}</label>
              <RsvpSelect
                name="cold-starter"
                placeholder={`${t("form.default_prefix")} ${t("form.dish_crab_avocado")}`}
                value={props.coldStarter}
                onValueChange={(value: any) => props.onchange('coldStarter', value)}
                options={[
                  { value: "cold-starter-1", label: t("form.dish_crab_avocado") },
                  { value: "cold-starter-2", label: t("form.dish_beetroot_avocado") },
                ]}
              />
            </div>

            {/* Hot Appetizer */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_hot_appetizer")}</label>
              <RsvpSelect
                name="hot-appetizer"
                placeholder={`${t("form.default_prefix")} ${t("form.dish_scallop_ikura")}`}
                value={props.hotAppetizer}
                onValueChange={(value: any) => props.onchange('hotAppetizer', value)}
                options={[
                  { value: "hot-appetizer-1", label: t("form.dish_scallop_ikura") },
                  { value: "hot-appetizer-2", label: t("form.dish_mushroom_scallop") },
                ]}
              />
            </div>

            {/* Soup */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_soup")}</label>
              <RsvpSelect
                name="soup"
                placeholder={`${t("form.default_prefix")} ${t("form.dish_lobster_bisque")}`}
                value={props.soup}
                onValueChange={(value: any) => props.onchange('soup', value)}
                options={[
                  { value: "soup-1", label: t("form.dish_lobster_bisque") },
                  { value: "soup-2", label: t("form.dish_mushroom_soup") },
                ]}
              />
            </div>

            {/* Mains */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_mains")}</label>
              <RsvpSelect
                name="mains"
                placeholder={`${t("form.default_prefix")} ${t("form.dish_chicken_chou_farci")}`}
                value={props.mains}
                onValueChange={(value: any) => props.onchange('mains', value)}
                options={[
                  { value: "mains-1", label: t("form.dish_chicken_chou_farci") },
                  { value: "mains-2", label: t("form.dish_salmon") },
                ]}
              />
            </div>

            {/* Dessert */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_dessert")}</label>
              <RsvpSelect
                name="dessert"
                placeholder={`${t("form.default_prefix")} ${t("form.dish_wild_berries_sorbet")}`}
                value={props.dessert}
                onValueChange={(value: any) => props.onchange('dessert', value)}
                options={[
                  { value: "dessert-1", label: t("form.dish_mango_savarin") },
                  { value: "dessert-2", label: t("form.dish_wild_berries_sorbet") },
                ]}
              />
            </div>
          </>
        )
      default:
        return <></>
    } 
  }

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
              <label className="rsvp-label">{t("form.attending_label")}</label>
              <RadioGroup.Root className="rsvp-radio-group" name={`attending-${i}`} value={props.attending} onValueChange={(value) => props.onchange('attending', value)}>
                {[
                  { value: "yes", label: t("form.attending_yes") },
                  { value: "no",  label: t("form.attending_no") },
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
                  <label className="rsvp-label">{t("form.menu_selection_label")}</label>
                  <RsvpSelect
                    name="menu-selection"
                    value={props.menuSelection}
                    onValueChange={(value: any) => props.onchange('menuSelection', value)}
                    options={menuSelectionOption}
                    placeholder={t("form.menu_placeholder")}
                  />
                </div>

                {/* Cold Starter */}
                {renderMenuSelect()}

                {/* Dietary Requirements — native input (no Radix TextField in core) */}
                <div className="rsvp-field">
                  <label className="rsvp-label">{t("form.dietary_label")}</label>
                  <input
                    className="rsvp-input"
                    value={props.dietaryRestriction}
                    onChange={(e) => props.onchange('dietaryRestriction', e.target.value)}
                    type="text"
                    placeholder={t("form.dietary_placeholder")}
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