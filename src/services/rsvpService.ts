import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { RSVPSubmission } from "../types/rsvp";

export async function saveRSVP(data: RSVPSubmission) {
  const docRef = doc(db, "rsvps", data.inviteCode);
  await setDoc(docRef, data);
}

export async function getRSVP(inviteCode: string) {
  const docRef = doc(db, "rsvps", inviteCode);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as RSVPSubmission;
}