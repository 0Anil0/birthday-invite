import { MongoClient } from "mongodb";

const uri = "mongodb+srv://anil:anil@cluster0.q9ojgls.mongodb.net/birthday-invite?retryWrites=true&w=majority";

async function initializeDatabase() {
  console.log("Connecting to MongoDB Atlas...");
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas!");

    const db = client.db("birthday-invite");

    // 1. Create or ensure collections exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);
    console.log("Existing collections:", collectionNames);

    if (!collectionNames.includes("rsvps")) {
      await db.createCollection("rsvps");
      console.log("Created 'rsvps' collection!");
    } else {
      console.log("'rsvps' collection already exists.");
    }

    if (!collectionNames.includes("tables")) {
      await db.createCollection("tables");
      console.log("Created 'tables' collection!");
    } else {
      console.log("'tables' collection already exists.");
    }

    // 2. Create index on selectedSeatId for fast lookups
    await db.collection("rsvps").createIndex({ selectedSeatId: 1 });
    await db.collection("rsvps").createIndex({ createdAt: -1 });
    console.log("Created indexes on 'rsvps' collection.");

    // 3. Seed floor plan table definitions into 'tables' collection
    const tablesData = [];
    // Head Table
    tablesData.push({
      tableId: "HT",
      name: "Head Table (VIP & Family)",
      totalSeats: 10,
      seats: Array.from({ length: 10 }, (_, i) => `HT-S${i + 1}`),
    });

    // Tables 1 to 16
    for (let i = 1; i <= 16; i++) {
      tablesData.push({
        tableId: `T${i}`,
        name: `Table ${i}`,
        totalSeats: 10,
        seats: Array.from({ length: 10 }, (_, s) => `T${i}-S${s + 1}`),
      });
    }

    // Upsert table records
    for (const t of tablesData) {
      await db.collection("tables").updateOne(
        { tableId: t.tableId },
        { $set: t },
        { upsert: true }
      );
    }
    console.log("Seeded 17 table records (Head Table + Tables 1-16) into 'tables' collection!");

    // 4. Insert an initial sample VIP RSVP if empty
    const rsvpCount = await db.collection("rsvps").countDocuments();
    if (rsvpCount === 0) {
      await db.collection("rsvps").insertOne({
        guestName: "Host Family (Sharvil)",
        guestCount: 2,
        phone: "9876543210",
        selectedSeatId: "HT-S1",
        selectedSeatLabel: "Head Table (Seat 1)",
        status: "accepted",
        wishes: "Welcome to Sharvil's 1st Birthday! 🐾",
        createdAt: new Date(),
      });
      console.log("Inserted initial Host Family reservation for HT-S1!");
    } else {
      console.log(`Current RSVPs count in DB: ${rsvpCount}`);
    }

    console.log("Database initialization complete!");
  } catch (error) {
    console.error("Error during database initialization:", error.message);
  } finally {
    await client.close();
  }
}

initializeDatabase();
