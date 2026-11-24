export interface EventDetails {
  occasion: string;
  childName: string;
  nickname: string;
  turningAge: number;
  theme: string;
  date: string;
  isoDate: string;
  time: string;
  venueName: string;
  address: string;
  locationUrl: string;
  hindiVoiceover: string;
  englishTranslation: string;
}

export const EVENT_DETAILS: EventDetails = {
  occasion: "1st Birthday Celebration",
  childName: "Sharvil",
  nickname: "Shivi",
  turningAge: 1,
  theme: "Bluey",
  date: "Sunday, November 29, 2026",
  isoDate: "2026-11-29T17:30:00+05:30",
  time: "After 5:30 PM",
  venueName: "Kesarinandan Parkway",
  address: "Nathdwara Highway, opposite ISKCON COVEY, Mohanpura, Udaipur, Rajasthan 313202",
  locationUrl: "https://share.google/4bhAkqoxDUFR5ZIjQ",
  hindiVoiceover: "Main 29th ko 1 saal ka hone ja raha hu, mere birthday par aap zaroor padhare!",
  englishTranslation: "I am turning 1 year old on the 29th, please do grace my birthday with your presence!",
};

export interface SeatInfo {
  id: string;
  tableId: string;
  tableName: string;
  seatNumber: number;
  isReserved?: boolean;
  reservedBy?: string;
}

export interface RSVPRecord {
  guestName: string;
  guestCount: number;
  phone?: string;
  selectedSeatId: string;
  selectedSeatLabel: string;
  status: "accepted" | "denied";
  wishes?: string;
  createdAt: Date | string;
}
