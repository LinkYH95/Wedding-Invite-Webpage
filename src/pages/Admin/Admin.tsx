import "./Admin.css";
import hero1 from "../../assets/DSC_2754.png"
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User, } from "firebase/auth";
import AdminLogin from "./AdminLogin";
import AdminField from "./AdminField";
import { auth } from "../../firebase";
import { logoutAdmin } from "../../utils/googleLogin";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return <p>Checking admin access...</p>;
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <div className="admin-page">
      {/* Blurred background image */}
      <div className="admin-bg" style={{ backgroundImage: `url(${hero1})` }}/>

      {/* Scrollable middle column */}
      <div className="admin-card">

        {/* Back to home */}
        <button className="admin-back" onClick={logoutAdmin}>
          ← Logout
        </button>

        
        {/* <div className="admin-header">
          <button onClick={logoutAdmin}>
            Logout
          </button>
        </div> */}

        <AdminField />
      </div>
    </div>
  );
}