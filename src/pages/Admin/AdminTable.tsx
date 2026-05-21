import "./Admin.css";
import { useEffect, useMemo, useState } from "react";
// import { batchUpdateRsvps, RsvpsObj } from "../services/adminService";

// type AdminRsvpTableProps = {
//   rsvps: RsvpsObj;
// };

const lockedFields = ["id", "guestID"];

const preferredFieldOrder = [
  "id",
  "guestID",
  "guestName",
  "groupId",
  "groupID",
  "groupName",
  "attending",
  "coldStarter",
  "hotAppetizer",
  "soup",
  "mains",
  "dessert",
  "dietaryRestriction",
  "remarks",
  "submittedAt",
  "updatedAt",
];

function getGroupId(row: Record<string, any>) {
  return row.groupId || row.groupID || "";
}

function formatValue(value: any) {
  if (value === null || value === undefined) return "";

  // Firestore Timestamp
  if (value?.toDate && typeof value.toDate === "function") {
    return value.toDate().toLocaleString();
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

export default function AdminRsvpTable({ rsvps }: any) {
  const [rows, setRows] = useState<any>(rsvps);
  const [searchName, setSearchName] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [dirtyRows, setDirtyRows] = useState<Record<string, boolean>>({});
  const [saving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setRows(rsvps);
    setDirtyRows({});
  }, [rsvps]);

  const allFields = useMemo(() => {
    const fieldSet = new Set<string>();

    Object.values(rows).forEach((row: any) => {
      Object.keys(row).forEach((field) => fieldSet.add(field));
    });

    const fields = Array.from(fieldSet);

    const orderedFields = preferredFieldOrder.filter((field) =>
      fieldSet.has(field)
    );

    const remainingFields = fields
      .filter((field) => !preferredFieldOrder.includes(field))
      .sort();

    return [...orderedFields, ...remainingFields];
  }, [rows]);

  const groupOptions = useMemo(() => {
    const groupSet = new Set<string>();

    Object.values(rows).forEach((row: any) => {
      const groupId = getGroupId(row);

      if (groupId) {
        groupSet.add(groupId);
      }
    });

    return Array.from(groupSet).sort();
  }, [rows]);

  const filteredEntries = useMemo(() => {
    const search = searchName.trim().toLowerCase();

    return Object.entries(rows).filter(([guestID, row]: any) => {
      const guestName = String(row.guestName || "").toLowerCase();
      const groupId = getGroupId(row);

      const matchesName =
        !search ||
        guestName.includes(search) ||
        guestID.toLowerCase().includes(search);

      const matchesGroup =
        !selectedGroupId || groupId === selectedGroupId;

      return matchesName && matchesGroup;
    });
  }, [rows, searchName, selectedGroupId]);

  const updateCell = (guestID: string, field: string, value: any) => {
    setRows((prev: any) => ({
      ...prev,
      [guestID]: {
        ...prev[guestID],
        [field]: value,
      },
    }));

    setDirtyRows((prev) => ({
      ...prev,
      [guestID]: true,
    }));

    setMessage("");
  };

  // const handleSaveChanges = async () => {
  //   const changedData: any = {};

  //   Object.keys(dirtyRows).forEach((guestID) => {
  //     if (dirtyRows[guestID]) {
  //       changedData[guestID] = rows[guestID];
  //     }
  //   });

  //   if (Object.keys(changedData).length === 0) {
  //     setMessage("No changes to save.");
  //     return;
  //   }

  //   try {
  //     setSaving(true);
  //     setMessage("");

  //     await batchUpdateRsvps(changedData);

  //     setDirtyRows({});
  //     setMessage("Changes saved successfully.");
  //   } catch (error) {
  //     console.error("Failed to save RSVP changes:", error);
  //     setMessage("Failed to save changes. Please try again.");
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  const renderEditableCell = (
    guestID: string,
    field: string,
    value: any
  ) => {
    const isLocked = lockedFields.includes(field);

    if (isLocked) {
      return <span>{formatValue(value)}</span>;
    }

    if (typeof value === "boolean") {
      return (
        <select
          value={String(value)}
          onChange={(e) =>
            updateCell(guestID, field, e.target.value === "true")
          }
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      );
    }

    if (value === null || value === undefined) {
      return (
        <input
          value=""
          placeholder="null"
          onChange={(e) => updateCell(guestID, field, e.target.value)}
        />
      );
    }

    if (typeof value === "number") {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => updateCell(guestID, field, Number(e.target.value))}
        />
      );
    }

    if (typeof value === "object") {
      return <span>{formatValue(value)}</span>;
    }

    return (
      <input
        value={String(value)}
        onChange={(e) => updateCell(guestID, field, e.target.value)}
      />
    );
  };

  return (
    <div className="admin-scroll-area" >
      <div className="admin-rsvp-table-wrapper">
        <div className="admin-rsvp-controls">
          <input
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by guest name or guest ID"
          />

          <select
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
          >
            <option value="">All groups</option>
            {groupOptions.map((groupId) => (
              <option key={groupId} value={groupId}>
                {groupId}
              </option>
            ))}
          </select>

          <button /*onClick={handleSaveChanges}*/ disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="admin-rsvp-summary">
          Showing {filteredEntries.length} of {Object.keys(rows).length} RSVP
          records.
          {Object.keys(dirtyRows).length > 0 && (
            <span> Unsaved changes: {Object.keys(dirtyRows).length}</span>
          )}
        </div>

        {message && <p className="admin-rsvp-message">{message}</p>}

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
                  <td>{dirtyRows[guestID] ? "Edited" : ""}</td>

                  {allFields.map((field) => (
                    <td key={`${guestID}-${field}`}>
                      {renderEditableCell(guestID, field, row[field])}
                    </td>
                  ))}
                </tr>
              ))}

              {filteredEntries.length === 0 && (
                <tr>
                  <td colSpan={allFields.length + 1}>
                    No RSVP records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}