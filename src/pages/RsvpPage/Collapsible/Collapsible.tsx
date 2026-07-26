import { Collapsible, RadioGroup, Select } from "radix-ui"
import { useState } from "react"
import './Collapsible.css'
import { useTranslation } from "react-i18next";
import starter1 from "../../../assets/starter-crab.jpg"
import starter2 from "../../../assets/starter-beetroot.jpg"
import appetizer1 from "../../../assets/appetizer-scallop.jpg"
import appetizer2 from "../../../assets/appetizer-mushroom scallop.jpg"
import soup1 from "../../../assets/soup-lobster.jpg"
import soup2 from "../../../assets/soup-mushroom.jpg"
import mains1 from "../../../assets/mains-salmon.jpg"
import mains2 from "../../../assets/mains-chicken.jpg"
import dessert1 from "../../../assets/dessert-mango.jpg"
import dessert2 from "../../../assets/dessert-sorbert.jpg"
import weddingMenuChild from "../../../assets/Wedding-Menu-Child.png"

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

// ── Reusable Radix Radio ────────────────────────────────────────────────────
function RsvpRadioCard({
  name,
  selected,
  options,
  onValueChange,
}: any) {
  return (
    <RadioGroup.Root
      className="rsvp-card-group"
      name={name}
      value={selected ?? ""}
      onValueChange={onValueChange}
    >
      {options.map((option: any) => (
        <label
          key={option.value}
          className={`rsvp-card ${
            selected === option.value ? "selected" : ""
          }`}
        >
          <div className="rsvp-card-header">
            <div className="rsvp-card-left">
              <RadioGroup.Item
                value={option.value}
                className="rsvp-radio-indicator-root"
              >
                <RadioGroup.Indicator asChild>
                  <span className="rsvp-radio-dot" />
                </RadioGroup.Indicator>
              </RadioGroup.Item>

              <div className="rsvp-card-text">
                <div className="rsvp-card-title">
                  {option.label}
                </div>

                {option.description && (
                  <div className="rsvp-card-description">
                    {option.description}
                  </div>
                )}
              </div>
            </div>

            {option.onView && (
              <button
                type="button"
                className="rsvp-card-view"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  option.onView();
                }}
              >
                👁 View
              </button>
            )}
          </div>
        </label>
      ))}
    </RadioGroup.Root>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function CollapsibleSection(props: any) {
  // const i = 1
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
              <label className="rsvp-label">{t("form.course_mains")} </label>
              <RsvpRadioCard
                name="mains"
                selected={props.mains}
                onValueChange={(value:any)=>props.onchange("mains", value)}
                options={[
                    {
                        value:"fish",
                        label:t("form.dish_fish_chips")+t("form.default_prefix"),
                    },
                    {
                        value:"mushroom",
                        label:t("form.dish_mushroom_pasta"),
                    }
                ]}
              />
            </div>

            {/* Dessert */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_dessert")}</label>
              <RsvpRadioCard
                name="dessert"
                selected={props.dessert}
                onValueChange={(value:any)=>props.onchange("dessert", value)}
                options={[
                    {
                        value:"sorbet",
                        label:t("form.dish_chocolate_sorbet")+t("form.default_prefix"),
                    }
                ]}
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
              <RsvpRadioCard
                name="hot-appetizer"
                selected={props.hotAppetizer}
                onValueChange={(value:any)=>props.onchange("hotAppetizer", value)}
                options={[
                    {
                        value:"nuggets",
                        label:t("form.dish_chicken_nuggets")+t("form.default_prefix"),
                    }
                ]}
              />
            </div>

            {/* Soup */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_soup")}</label>
              <RsvpRadioCard
                name="soup"
                selected={props.soup}
                onValueChange={(value:any)=>props.onchange("soup", value)}
                options={[
                    {
                        value:"mushroom",
                        label:t("form.dish_mushroom_veloute")+t("form.default_prefix"),
                    }
                ]}
              />
            </div>

            {/* Mains */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_mains")}</label>
              <RsvpRadioCard
                name="mains"
                selected={props.mains}
                onValueChange={(value:any)=>props.onchange("mains", value)}
                options={[
                    {
                        value:"fish",
                        label:t("form.dish_fish_chips")+t("form.default_prefix"),
                    },
                    {
                        value:"mushroom",
                        label:t("form.dish_mushroom_pasta"),
                    }
                ]}
              />
            </div>

            {/* Dessert */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_dessert")}</label>
              <RsvpRadioCard
                name="dessert"
                selected={props.dessert}
                onValueChange={(value:any)=>props.onchange("dessert", value)}
                options={[
                    {
                        value:"sorbet",
                        label:t("form.dish_chocolate_sorbet")+t("form.default_prefix"),
                    }
                ]}
              />
            </div>
          </>
        )
      case "adult-5-course":
        return (
          <>
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_cold_starter")}</label>
              <RsvpRadioCard
                name="cold-starter"
                selected={props.coldStarter}
                onValueChange={(value:any)=>props.onchange("coldStarter", value)}
                options={[
                    {
                        value:"cold-starter-1",
                        label:t("form.dish_crab_avocado")+t("form.default_prefix"),
                        description:t("form.desc_crab_avocado"),
                        onView:()=>props.onOpenImage(starter1)
                    },
                    {
                        value:"cold-starter-2",
                        label:t("form.dish_beetroot_avocado"),
                        description:t("form.desc_beetroot_avocado"),
                        onView:()=>props.onOpenImage(starter2)
                    }
                ]}
              />
            </div>

            {/* Hot Appetizer */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_hot_appetizer")}</label>
              <RsvpRadioCard
                name="hot-appetizer"
                selected={props.hotAppetizer}
                onValueChange={(value:any)=>props.onchange("hotAppetizer", value)}
                options={[
                    {
                        value:"hot-appetizer-1",
                        label:t("form.dish_scallop_ikura")+t("form.default_prefix"),
                        description:t("form.desc_scallop_ikura"),
                        onView:()=>props.onOpenImage(appetizer1)
                    },
                    {
                        value:"hot-appetizer-2",
                        label:t("form.dish_mushroom_scallop"),
                        description:t("form.desc_mushroom_scallop"),
                        onView:()=>props.onOpenImage(appetizer2)
                    }
                ]}
              />
            </div>

            {/* Soup */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_soup")}</label>
              <RsvpRadioCard
                name="soup"
                selected={props.soup}
                onValueChange={(value:any)=>props.onchange("soup", value)}
                options={[
                    {
                        value:"soup-1",
                        label:t("form.dish_lobster_bisque"),
                        description:t("form.desc_lobster_bisque"),
                        onView:()=>props.onOpenImage(soup1)
                    },
                    {
                        value:"soup-2",
                        label:t("form.dish_mushroom_soup")+t("form.default_prefix"),
                        description:t("form.desc_mushroom_soup"),
                        onView:()=>props.onOpenImage(soup2)
                    }
                ]}
              />
            </div>

            {/* Mains */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_mains")}</label>
              <RsvpRadioCard
                name="mains"
                selected={props.mains}
                onValueChange={(value:any)=>props.onchange("mains", value)}
                options={[
                    {
                        value:"mains-1",
                        label:t("form.dish_chicken_chou_farci")+t("form.default_prefix"),
                        description:t("form.desc_chicken_chou_farci"),
                        onView:()=>props.onOpenImage(mains2)
                    },
                    {
                        value:"mains-2",
                        label:t("form.dish_salmon"),
                        description:t("form.desc_salmon"),
                        onView:()=>props.onOpenImage(mains1)
                    }
                ]}
              />
            </div>

            {/* Dessert */}
            <div className="rsvp-field">
              <label className="rsvp-label">{t("form.course_dessert")}</label>
              <RsvpRadioCard
                name="dessert"
                selected={props.dessert}
                onValueChange={(value:any)=>props.onchange("dessert", value)}
                options={[
                    {
                        value:"dessert-1",
                        label:t("form.dish_mango_savarin")+t("form.default_prefix"),
                        description:t("form.desc_mango_savarin"),
                        onView:()=>props.onOpenImage(dessert1)
                    },
                    {
                        value:"dessert-2",
                        label:t("form.dish_wild_berries_sorbet"),
                        description:t("form.desc_wild_berries_sorbet"),
                        onView:()=>props.onOpenImage(dessert2)
                    }
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
            {props.isChild === true && (
              <div className="rsvp-field">
                <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
                  <label className="rsvp-label">{t("form.menu_selection_label")}</label>
                  <a className="text-hyperlink" onClick={() => props.onOpenImage(weddingMenuChild)}>{t('form.menu_kids')}</a>
                </div>
                <RsvpSelect
                  name="menu-selection"
                  value={props.menuSelection}
                  onValueChange={(value: any) => props.onchange('menuSelection', value)}
                  options={menuSelectionOption}
                  placeholder={t("form.menu_placeholder")}
                />
              </div>
            )}

            {/* Menu Selection Fields */}
            {(props.isChild === undefined || props.isChild === null || (props.isChild === true && props.menuSelection)) && (
              renderMenuSelect()
            )}

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
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  )
}