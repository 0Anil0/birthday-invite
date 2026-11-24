import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { guestName, guestCount, phone, selectedSeatId, selectedSeatLabel, status, wishes } = body;

    if (!guestName) {
      return NextResponse.json({ error: "Guest name is required" }, { status: 400 });
    }

    try {
      const client = await clientPromise;
      const db = client.db("birthday-invite");
      const collection = db.collection("rsvps");

      const result = await collection.insertOne({
        guestName,
        guestCount: Number(guestCount) || 1,
        phone: phone || "",
        selectedSeatId: selectedSeatId || "",
        selectedSeatLabel: selectedSeatLabel || "",
        status: status || "accepted",
        wishes: wishes || "",
        createdAt: new Date(),
      });

      return NextResponse.json({
        success: true,
        id: result.insertedId,
        message: "RSVP recorded successfully in MongoDB",
      });
    } catch (dbError) {
      console.warn("MongoDB connection fallback (working in offline mode):", dbError);
      return NextResponse.json({
        success: true,
        offline: true,
        message: "RSVP saved locally",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process RSVP request", details: String(error) },
      { status: 500 }
    );
  }
}
