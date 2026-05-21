import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export type InviteGroupData = {
  id: string;
  groupName: string;
  memberCodes: string[];
  [key: string]: any;
};

export type GuestEntry = {
  id: string;
  guestID: string;
  guestName: string;
  attending?: string | null;
  coldStarter?: string | null;
  hotAppetizer?: string | null;
  soup?: string | null;
  mains?: string | null;
  dessert?: string | null;
  dietaryRestriction?: string;
  [key: string]: any;
};

export type FullWeddingData = {
  inviteGroups: Record<string, InviteGroupData>;
  rsvps: Record<string, GuestEntry>;
};

export async function fetchFullWeddingData(): Promise<FullWeddingData> {
  try {
    const [inviteGroupsSnap, rsvpsSnap] = await Promise.all([
      getDocs(collection(db, "inviteGroups")),
      getDocs(collection(db, "rsvps")),
    ]);

    const inviteGroups: Record<string, InviteGroupData> = {};
    const rsvps: Record<string, GuestEntry> = {};

    inviteGroupsSnap.forEach((docSnap) => {
      inviteGroups[docSnap.id] = {
        id: docSnap.id,
        ...docSnap.data(),
      } as InviteGroupData;
    });

    rsvpsSnap.forEach((docSnap) => {
      rsvps[docSnap.id] = {
        id: docSnap.id,
        ...docSnap.data(),
      } as GuestEntry;
    });

    return {
      inviteGroups,
      rsvps,
    };
  } catch (error) {
    console.error("Failed to fetch full wedding data:", error);
    throw error;
  }
}