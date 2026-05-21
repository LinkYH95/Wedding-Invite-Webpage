import { signInWithGoogle } from "../utils/googleLogin";

export default function AdminLogin() {
  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Logged in as:", user.email, user.uid);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}