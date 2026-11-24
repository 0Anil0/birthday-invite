export interface RSVPFormData {
  parentName: string;
  childName: string;
  phone: string;
  attendingCount: number;
  dietaryRestrictions: string;
  birthdayWish: string;
  accepted: boolean;
}

export interface BirthdayEventDetails {
  childName: string;
  turningAge: number;
  date: string;
  time: string;
  venueName: string;
  address: string;
  theme: string;
  hostName: string;
  hostPhone: string;
}

export const EVENT_DETAILS: BirthdayEventDetails = {
  childName: "Liam",
  turningAge: 5,
  date: "Saturday, December 12, 2026",
  time: "3:00 PM - 6:00 PM",
  venueName: "Sunshine Wonderland & Adventure Clubhouse",
  address: "742 Evergreen Gardens, Rainbow Park Way",
  theme: "Magical Safari & Superhero Adventure 🦁✨",
  hostName: "David & Sarah (Liam's Parents)",
  hostPhone: "+1 (555) 789-2026",
};
