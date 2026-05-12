import { getRSVP, saveRSVP } from "../services/rsvpService";
import type { RSVPSubmission } from "../types/rsvp";

const testData: RSVPSubmission = {
  inviteCode: "TEST001",
  householdName: "Tan Family",
  contactName: "Tan Ah Kow",
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
};

export async function testSaveRSVP() {
  try {
    await saveRSVP(testData);
    alert("RSVP saved successfully");
    console.log("Saved RSVP:", testData);
  } catch (error) {
    console.error(error);
    alert("Failed to save RSVP");
  }
}

export async function testLoadRSVP() {
  try {
    const data = await getRSVP("TEST001");
    console.log("Loaded RSVP:", data);
    alert(data ? "RSVP loaded successfully" : "No RSVP found");
  } catch (error) {
    console.error(error);
    alert("Failed to load RSVP");
  }
}