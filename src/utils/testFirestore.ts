import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export async function testWriteRSVP() {
  try {
    const docRef = await addDoc(collection(db, "rsvps"), {
      inviteCode: "TEST001",
      householdName: "Test Household",
      contactName: "Test Household",
      contactPhone: "91234567",
      contactEmail: "test@example.com",
      status: "draft",
      guests: [
        {
          id: "guest-1",
          name: "Adult One",
          category: "adult",
          attending: true,
          mealType: "adult_meal",
          adultMenuChoice: "fish",
        },
        {
          id: "guest-2",
          name: "Child One",
          category: "child",
          attending: true,
          mealType: "kids_2_course",
        },
      ],
      dietaryNotes: "No peanuts",
      lastUpdatedAt: new Date().toISOString(),
      submittedAt: "",
      confirmedAt: "",
    });

    console.log("Document written with ID:", docRef.id);
    alert(`Test RSVP saved. Doc ID: ${docRef.id}`);
  } catch (error) {
    console.error("Error adding document:", error);
    alert("Failed to save test RSVP. Check console.");
  }
}