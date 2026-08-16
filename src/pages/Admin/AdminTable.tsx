import "./Admin.css";
import { useMemo, useState } from "react";
import * as XLSX from "xlsx";

// ── Field schema: identity-driven, not value-driven ────────────────
const lockedFields = ["id", "guestID", "isChild", "submittedAt", "updatedAt"];
const hiddenFields = ["attending", "groupID", "groupId"];

const preferredFieldOrder = [
  "id",
  "guestID",
  "guestName",
  "isChild",
  "menuSelection",
  "coldStarter",
  "hotAppetizer",
  "soup",
  "mains",
  "dessert",
  "dietaryRestriction",
  "submittedAt",
  "updatedAt",
];

// ── Menu selection options, depend on isChild ───────────────────────
function getMenuSelectionOptions(isChild: boolean, menuSelection: string | null) {
  if (isChild) {
    return [
      { value: "none", label: "N/A, bring own" },
      { value: "child-2-course", label: "Child 2-Course" },
      { value: "child-4-course", label: "Child 4-Course" },
      { value: "adult-5-course", label: "Adult 5-Course" },
    ];
  } else if (menuSelection === "veg-5-course") {
      return [{ value: "veg-5-course", label: "veg-5-course" }]
  }
  return [{ value: "adult-5-course", label: "Adult 5-Course" }];
}

// ── Course options, depend on menuSelection ─────────────────────────
const courseOptionsBySelection: Record<string, Record<string, { value: string; label: string }[]>> = {
  "child-2-course": {
    mains: [
      { value: "fish", label: "Fish & Chips" },
      { value: "mushroom", label: "Mushroom Pasta" },
    ],
    dessert: [{ value: "sorbet", label: "Chocolate Sorbet" }],
  },
  "child-4-course": {
    hotAppetizer: [{ value: "nuggets", label: "Chicken Nuggets" }],
    soup: [{ value: "mushroom", label: "Mushroom Veloute" }],
    mains: [
      { value: "fish", label: "Fish & Chips" },
      { value: "mushroom", label: "Mushroom Pasta" },
    ],
    dessert: [{ value: "sorbet", label: "Chocolate Sorbet" }],
  },
  "adult-5-course": {
    coldStarter: [
      { value: "cold-starter-1", label: "Crab & Avocado" },
      { value: "cold-starter-2", label: "Beetroot & Avocado" },
    ],
    hotAppetizer: [
      { value: "hot-appetizer-1", label: "Scallop & Ikura" },
      { value: "hot-appetizer-2", label: "Mushroom 'Scallop'" },
    ],
    soup: [
      { value: "soup-1", label: "Lobster Bisque" },
      { value: "soup-2", label: "Mushroom Soup" },
    ],
    mains: [
      { value: "mains-1", label: "Chicken Chou Farci" },
      { value: "mains-2", label: "Salmon" },
    ],
    dessert: [
      { value: "dessert-1", label: "Mango Savarin" },
      { value: "dessert-2", label: "Wild Berries Sorbet" },
    ],
  },
};

const courseFields = ["coldStarter", "hotAppetizer", "soup", "mains", "dessert"];

function getCourseOptions(field: string, menuSelection: string | null | undefined) {
  if (!menuSelection) return [];
  return courseOptionsBySelection[menuSelection]?.[field] ?? [];
}

function formatValue(value: any) {
  if (value === null || value === undefined) return "";
  if (value?.toDate && typeof value.toDate === "function") {
    return value.toDate().toLocaleString();
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
}

// ── Converts the dropdown's empty-string selection back to null ─────
function handleSelectChange(
  guestID: string,
  field: string,
  rawValue: string,
  onFieldChange: (guestID: string, field: string, value: any) => void
) {
  onFieldChange(guestID, field, rawValue === "" ? null : rawValue);
}

type AdminRsvpTableProps = {
  rsvps: Record<string, any>;
  dirtyFields: Record<string, Set<string>>;
  dirtyGuestCount: number;
  onFieldChange: (guestID: string, field: string, value: any) => void;
};

export default function AdminRsvpTable({
  rsvps,
  dirtyFields,
  dirtyGuestCount,
  onFieldChange,
}: AdminRsvpTableProps) {
  const [searchName, setSearchName] = useState("");

  const allFields = useMemo(() => {
    const fieldSet = new Set<string>();

    Object.values(rsvps).forEach((row: any) => {
      Object.keys(row).forEach((field) => {
        if (!hiddenFields.includes(field)) fieldSet.add(field);
      });
    });

    const fields = Array.from(fieldSet);
    const orderedFields = preferredFieldOrder.filter((field) => fieldSet.has(field));
    const remainingFields = fields.filter((field) => !preferredFieldOrder.includes(field)).sort();

    return [...orderedFields, ...remainingFields];
  }, [rsvps]);

  const filteredEntries = useMemo(() => {
    const search = searchName.trim().toLowerCase();

    return Object.entries(rsvps).filter(([guestID, row]: any) => {
      const guestName = String(row.guestName || "").toLowerCase();
      return !search || guestName.includes(search) || guestID.toLowerCase().includes(search);
    });
  }, [rsvps, searchName]);

  const isFieldDirty = (guestID: string, field: string) =>
    dirtyFields[guestID]?.has(field) ?? false;

  const renderEditableCell = (guestID: string, field: string, row: any) => {
    const value = row[field];

    // ── Locked fields: always plain display, regardless of type ──
    if (lockedFields.includes(field)) {
      if (field === "isChild") {
        return <span>{value ? "Yes" : "No"}</span>;
      }
      return <span>{formatValue(value)}</span>;
    }

    // ── Known select field: menuSelection ──────────────────────
    if (field === "menuSelection") {
      const options = getMenuSelectionOptions(!!row.isChild, row.menuSelection);
      return (
        <select
          value={value ?? ""}
          onChange={(e) => handleSelectChange(guestID, field, e.target.value, onFieldChange)}
        >
          <option value="">— Not selected —</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      );
    }

    // ── Known select fields: course selections, depend on menuSelection ──
    if (courseFields.includes(field)) {
      const options = getCourseOptions(field, row.menuSelection);

      if (options.length === 0) {
        return <span style={{ opacity: 0.5 }}>—</span>;
      }

      return (
        <select
          value={value ?? ""}
          onChange={(e) => handleSelectChange(guestID, field, e.target.value, onFieldChange)}
        >
          <option value="">— Not selected —</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      );
    }

    // ── Known free-text fields ──────────────────────────────────
    if (field === "guestName" || field === "dietaryRestriction") {
      return (
        <input
          value={value ?? ""}
          onChange={(e) => onFieldChange(guestID, field, e.target.value)}
        />
      );
    }

    // ── Unknown / unschema'd field: show but never editable ────
    return <span>{formatValue(value)}</span>;
  };

  const handleExport = () => {
    const exportRows = filteredEntries.map(([guestID, row]: any) => {
      const exportRow: Record<string, any> = { guestID };

      allFields.forEach((field) => {
        if (field === "guestID") return;
        if (field === "isChild") {
          exportRow[field] = row[field] ? "Yes" : "No";
          return;
        }
        exportRow[field] = formatValue(row[field]);
      });

      return exportRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RSVPs");

    const timestamp = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `rsvp-export-${timestamp}.xlsx`);
  };

  return (
    <div className="admin-scroll-area">
      <div className="admin-rsvp-table-wrapper">
        <div className="admin-rsvp-controls">
          <input
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by guest name or guest ID"
          />

          <button onClick={handleExport}>Export to Excel</button>
          <button disabled>Save Changes</button>
        </div>

        <div className="admin-rsvp-summary">
          Showing {filteredEntries.length} of {Object.keys(rsvps).length} RSVP records.
          {dirtyGuestCount > 0 && <span> Unsaved changes: {dirtyGuestCount}</span>}
        </div>

        <div className="admin-rsvp-table-scroll">
          <table className="admin-rsvp-table">
            <thead>
              <tr>
                <th>Status</th>
                {allFields.map((field) => (
                  <th key={field}>{field}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredEntries.map(([guestID, row]: any) => (
                <tr key={guestID}>
                  <td>{dirtyFields[guestID] ? "Edited" : ""}</td>

                  {allFields.map((field) => {
                    const dirty = isFieldDirty(guestID, field);
                    return (
                      <td
                        key={`${guestID}-${field}`}
                        className={dirty ? "admin-cell-dirty" : undefined}
                      >
                        {renderEditableCell(guestID, field, row)}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {filteredEntries.length === 0 && (
                <tr>
                  <td colSpan={allFields.length + 1}>No RSVP records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}