import { doc, writeBatch, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

interface GuestEntry {
  guestID?: string,
  guestName?: string,
  attending?: string | null,
  menuSelection?: string | null,
  coldStarter?: string | null,
  hotAppetizer?: string | null,
  soup?: string | null,
  mains?: string | null,
  dessert?: string | null,
  dietaryRestriction?: string,
  submitted?: boolean,
  submittedAt?: Date | null,
  updatedAt?: Date | null,
}

export async function batchSaveRSVP(rsvps: Record<string, GuestEntry>) {
  const batch = writeBatch(db);

  Object.entries(rsvps).forEach(([guestID, data]) => {
    const ref = doc(db, "rsvps", guestID);

    batch.set(ref, {
      ...data,
      guestID,
      updatedAt: serverTimestamp(),
    });
  });

  await batch.commit();
}