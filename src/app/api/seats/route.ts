import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    try {
      const client = await clientPromise;
      const db = client.db("birthday-invite");
      const collection = db.collection("rsvps");

      const rsvps = await collection
        .find({ status: "accepted", selectedSeatId: { $exists: true, $ne: "" } })
        .project({ selectedSeatId: 1, guestName: 1 })
        .toArray();

      const reservedSeatIds = rsvps.map((r) => r.selectedSeatId);

      return NextResponse.json({
        reservedSeats: reservedSeatIds,
        count: reservedSeatIds.length,
      });
    } catch (dbError) {
      console.warn("MongoDB read fallback:", dbError);
      return NextResponse.json({
        reservedSeats: ["A-2", "B-1", "D-4"], // standard mock seeds if offline
        offline: true,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load reserved seats", details: String(error) },
      { status: 500 }
    );
  }
}
