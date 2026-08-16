import { useEffect, useMemo, useState } from "react";
import { fetchFullWeddingData, type FullWeddingData } from "../../utils/rsvpService";
import AdminRsvpTable from "./AdminTable";

export default function AdminField() {
  const [adminData, setAdminData] = useState<FullWeddingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ── Original (untouched) vs working (editable) copies ──────────
  const [originalRsvps, setOriginalRsvps] = useState<Record<string, any>>({});
  const [workingRsvps, setWorkingRsvps] = useState<Record<string, any>>({});

  const loadAdminData = async () => {
    try {
      setError("");
      setLoading(true);

      const result = await fetchFullWeddingData();

      setAdminData(result);
      setOriginalRsvps(result.rsvps);
      setWorkingRsvps(result.rsvps);
    } catch (error) {
      console.error(error);
      setError("Failed to load admin data. You may not have admin permission.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const updateField = (guestID: string, field: string, value: any) => {
    setWorkingRsvps((prev) => ({
      ...prev,
      [guestID]: {
        ...prev[guestID],
        [field]: value,
      },
    }));
  };

  // ── Dirty detection: compare working vs original, field by field ──
  const dirtyFields = useMemo(() => {
    const dirty: Record<string, Set<string>> = {};

    Object.keys(workingRsvps).forEach((guestID) => {
      const workingRow = workingRsvps[guestID];
      const originalRow = originalRsvps[guestID];

      if (!originalRow) return;

      Object.keys(workingRow).forEach((field) => {
        if (workingRow[field] !== originalRow[field]) {
          if (!dirty[guestID]) dirty[guestID] = new Set();
          dirty[guestID].add(field);
        }
      });
    });

    return dirty;
  }, [workingRsvps, originalRsvps]);

  const dirtyGuestCount = Object.keys(dirtyFields).length;

  if (loading) {
    return <p>Loading admin data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!adminData) {
    return <p>No admin data found.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflow: "hidden" }}>
      <h2>Admin Dashboard</h2>

      <AdminRsvpTable
        rsvps={workingRsvps}
        dirtyFields={dirtyFields}
        dirtyGuestCount={dirtyGuestCount}
        onFieldChange={updateField}
      />
    </div>
  );
}