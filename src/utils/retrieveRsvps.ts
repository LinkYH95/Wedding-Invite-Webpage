import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export type InviteGroup = {
  groupName: string;
  memberCodes: string[];
};

export type RsvpData = {
  id: string;
  guestID: string;
  guestName: string;
  isChild: boolean | null;
  attending: string | null;
  menuSelection: string | null;
  coldStarter: string | null;
  hotAppetizer: string | null;
  soup: string | null;
  mains: string | null;
  dessert: string | null;
  dietaryRestriction: string;
};

export type RsvpDataObj = {
  [guestID: string]: RsvpData;
};

export type InviteGroupWithRsvps = {
  inviteGroupId: string;
  groupName: string;
  memberCodes: string[];
  rsvps: RsvpDataObj;
};

export const getInviteGroupWithRsvps = async (
  inviteGroupId: string
): Promise<InviteGroupWithRsvps> => {
  const inviteGroupRef = doc(db, "inviteGroups", inviteGroupId);
  const inviteGroupSnap = await getDoc(inviteGroupRef);

  if (!inviteGroupSnap.exists()) {
    throw new Error("Invalid invite code");
  }

  const inviteGroup = inviteGroupSnap.data() as InviteGroup;
  const memberCodes = inviteGroup.memberCodes || [];

  if (memberCodes.length === 0) {
    return {
      inviteGroupId,
      groupName: inviteGroup.groupName,
      memberCodes: [],
      rsvps: {},
    };
  }

  const rsvpQuery = query(
    collection(db, "rsvps"),
    where(documentId(), "in", memberCodes)
  );

  const rsvpSnap = await getDocs(rsvpQuery);

  const rsvps: RsvpDataObj = {};

  rsvpSnap.docs.forEach((rsvpDoc) => {
    const data = rsvpDoc.data();

    rsvps[rsvpDoc.id] = {
      id: rsvpDoc.id,
      guestID: data.guestID,
      guestName: data.guestName,
      isChild: data.isChild,
      attending: "yes",
      menuSelection: data.isChild ? data.menuSelection : data.menuSelection || "adult-5-course",
      coldStarter: data.coldStarter,
      hotAppetizer: data.hotAppetizer,
      soup: data.soup,
      mains: data.mains,
      dessert: data.dessert,
      dietaryRestriction: data.dietaryRestriction,
    };
  });

  return {
    inviteGroupId,
    groupName: inviteGroup.groupName,
    memberCodes,
    rsvps,
  };
};