import { useEffect, useState } from "react";
import { fetchFullWeddingData, type FullWeddingData } from "../../utils/rsvpService";
import AdminRsvpTable from "./AdminTable";

export default function AdminField() {
  const [adminData, setAdminData] = useState<FullWeddingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAdminData = async () => {
    try {
      setError("");
      setLoading(true);

      const result = await fetchFullWeddingData();

      setAdminData(result);
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

  if (loading) {
    return <p>Loading admin data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!adminData) {
    return <p>No admin data found.</p>;
  }

  console.log(adminData)
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflow: "hidden" }}>
      <h2>Admin Dashboard</h2>

      <AdminRsvpTable rsvps={adminData.rsvps}/>
    </div>
  );
}