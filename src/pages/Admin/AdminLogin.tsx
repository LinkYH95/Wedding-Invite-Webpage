import "./Admin.css";
import { signInWithGoogle } from "../../utils/googleLogin";
import { useNavigate } from "react-router-dom";
import hero1 from "../../assets/DSC_2754.webp"


export default function AdminLogin() {
  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();

      console.log("Logged in as:", user.email);
      console.log("Firebase UID:", user.uid);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const navigate = useNavigate()

  return (
    <div className="admin-page">
      {/* Blurred background image */}
      <div className="admin-bg" style={{ backgroundImage: `url(${hero1})` }}/>

      {/* Scrollable middle column */}
      <div className="admin-scroll-area" style={{ alignItems: 'center' }}>
        <div className="admin-card">

          {/* Back to home */}
          <button className="admin-back" onClick={() => { navigate("/") }}>
            ← Back
          </button>

          <div className="admin-step admin-step--form">
            <div className="admin-step admin-step--form">
              <h2 className="admin-title">Admin Login</h2>
           
              <button className="admin-submit" style={{ marginBottom: 20 }}>
                <h3 className="button-text-dark" onClick={handleLogin}>Sign in with Google hi</h3>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}