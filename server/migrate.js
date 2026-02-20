require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const DATA_DIR = path.join(__dirname, "../data");
const LEADERBOARD_PATH = path.join(DATA_DIR, "leaderboard.json");
const MONGODB_URI = process.env.MONGODB_URI;

const leaderboardSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    avatar: String,
    timeTaken: Number,
    category: { type: String, default: 'general' },
    lifelinesUsed: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

async function migrate() {
    console.log("🚀 Starting MongoDB Migration...");

    if (!MONGODB_URI) {
        console.error("❌ No MONGODB_URI found in .env");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("🍃 Connected to MongoDB!");

        if (!fs.existsSync(LEADERBOARD_PATH)) {
            console.log("⚠️ No leaderboard.json found. Nothing to migrate.");
            process.exit(0);
        }

        const data = JSON.parse(fs.readFileSync(LEADERBOARD_PATH, "utf-8"));
        console.log(`📂 Found ${data.length} records in local JSON.`);

        if (data.length === 0) {
            console.log("✔️ Local JSON is empty. Done.");
            process.exit(0);
        }

        console.log("⏳ Clearing existing MongoDB Leaderboard records (optional safety)...");
        // Opting not to clear in case they ran this twice, but could use await Leaderboard.deleteMany({});

        console.log("⬆️ Uploading records to Cloud...");
        const result = await Leaderboard.insertMany(data);
        console.log(`✅ Successfully inserted ${result.length} records into MongoDB!`);

    } catch (err) {
        console.error("❌ Migration Failed:", err);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected from DB.");
        process.exit(0);
    }
}

migrate();
