export type MealType =
  | "adult_meal"
  | "kids_2_course"
  | "kids_4_course"
  | "no_meal";

export type AdultMenuChoice =
  | "fish"
  | "chicken"
  | "vegetarian";

export type RSVPStatus =
  | "draft"
  | "confirmed"
  | "locked";

export type GuestCategory = "adult" | "child";

export type Guest = {
  id: string;
  name: string;
  category: GuestCategory;
  attending: boolean;
  mealType?: MealType;
  adultMenuChoice?: AdultMenuChoice;
};

export type RSVPSubmission = {
  inviteCode: string;
  householdName: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  status: RSVPStatus;
  guests: Guest[];
  dietaryNotes?: string;
  lastUpdatedAt: string;
  submittedAt?: string;
  confirmedAt?: string;
};