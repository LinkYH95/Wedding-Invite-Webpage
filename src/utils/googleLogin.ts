import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider(); 
  const result = await signInWithPopup(auth, provider);

  return result.user;
}

export async function logoutAdmin() {
  await signOut(auth)
}