require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { generateFullGameSet, generateSingleQuestion } = require("./generateQuestions");

const app = express();
app.use(cors());
app.use(express.json());

// Absolute safe paths
const DATA_DIR = path.join(__dirname, "../data");
const LEADERBOARD_PATH = path.join(DATA_DIR, "leaderboard.json");
const AI_CACHE_PATH = path.join(DATA_DIR, "ai_questions_cache.json");

// Helper to get questions path for a category
function getQuestionsPath(category) {
  const safeCategory = (category || "general").toLowerCase().replace(/[^a-z0-9]/g, "");
  return path.join(DATA_DIR, `questions_${safeCategory}.json`);
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/* ── In-memory AI question cache ────────────────────── */
let cachedAIQuestions = null;
let isGenerating = false;

// Load cached questions from disk if available
try {
  if (fs.existsSync(AI_CACHE_PATH)) {
    cachedAIQuestions = JSON.parse(fs.readFileSync(AI_CACHE_PATH, "utf-8"));
    console.log(`📦 Loaded ${cachedAIQuestions.filter(Boolean).length} cached AI questions from disk`);
  }
} catch (e) {
  console.log("No cached AI questions found — will generate fresh ones");
}

/* ── Background question generation ─────────────────── */
async function generateAndCacheQuestions() {
  if (isGenerating) {
    console.log("⏳ Generation already in progress, skipping...");
    return;
  }
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
    console.log("⚠️ No Gemini API key configured — skipping AI generation");
    return;
  }

  isGenerating = true;
  try {
    console.log("🧠 Starting background AI question generation...");
    const questions = await generateFullGameSet(GEMINI_API_KEY);
    const validCount = questions.filter(Boolean).length;

    if (validCount >= 12) {
      cachedAIQuestions = questions;
      // Save to disk for persistence across restarts
      fs.writeFileSync(AI_CACHE_PATH, JSON.stringify(questions, null, 2));
      console.log(`✅ Cached ${validCount}/16 AI questions to disk`);
    } else {
      console.warn(`⚠️ Only generated ${validCount}/16 questions — keeping previous cache`);
    }
  } catch (err) {
    console.error("❌ Background AI generation failed:", err.message);
  } finally {
    isGenerating = false;
  }
}

// Start background generation 5 seconds after server boot (avoids startup delay)
setTimeout(() => generateAndCacheQuestions(), 5000);

/* ── Existing endpoints (updated for categories) ──────────────────── */

// Get all questions for a specific level & category
app.get("/api/questions/:level", (req, res) => {
  try {
    const level = parseInt(req.params.level);
    const category = req.query.category || "general";

    if (isNaN(level) || level < 1 || level > 16) {
      return res.status(400).json({ error: "Invalid level" });
    }

    const qKey = `Q${level}`;
    const filePath = getQuestionsPath(category);

    if (!fs.existsSync(filePath)) {
      return res.json([]);
    }

    const allQuestions = JSON.parse(fs.readFileSync(filePath));
    res.json(allQuestions[qKey] || []);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// Delete a question by index
app.delete("/api/questions/:level/:index", (req, res) => {
  try {
    const level = parseInt(req.params.level);
    const index = parseInt(req.params.index);
    const category = req.query.category || "general";

    if (isNaN(level) || level < 1 || level > 16) {
      return res.status(400).json({ error: "Invalid level" });
    }

    const qKey = `Q${level}`;
    const filePath = getQuestionsPath(category);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Category not found" });
    }

    const allQuestions = JSON.parse(fs.readFileSync(filePath));

    if (!allQuestions[qKey] || !allQuestions[qKey][index]) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Remove the question at the specified index
    allQuestions[qKey].splice(index, 1);

    fs.writeFileSync(filePath, JSON.stringify(allQuestions, null, 2));

    console.log(`🗑️ Deleted question from ${qKey} in ${category} at index ${index}`);
    res.json({ success: true, message: "Question deleted successfully!" });
  } catch (err) {
    console.error("Failed to delete question:", err);
    res.status(500).json({ error: "Failed to delete question" });
  }
});

// Add a new manual question
app.post("/api/questions", (req, res) => {
  try {
    const { level, question, options, correct, category } = req.body;
    const targetCategory = category || "general";

    // Basic validation
    if (!level || !question || !options || options.length !== 4 || !correct) {
      return res.status(400).json({ error: "Invalid question format" });
    }

    const qKey = `Q${level}`;
    const filePath = getQuestionsPath(targetCategory);

    let allQuestions = {};
    if (fs.existsSync(filePath)) {
      allQuestions = JSON.parse(fs.readFileSync(filePath));
    }

    if (!allQuestions[qKey]) {
      allQuestions[qKey] = [];
    }

    const newQuestion = {
      question,
      options,
      correct: parseInt(correct)
    };

    allQuestions[qKey].push(newQuestion);

    fs.writeFileSync(filePath, JSON.stringify(allQuestions, null, 2));

    console.log(`📝 Added new question to ${qKey} in ${targetCategory}`);
    res.json({ success: true, message: "Question added successfully!" });
  } catch (err) {
    console.error("Failed to add question:", err);
    res.status(500).json({ error: "Failed to save question" });
  }
});

// Generate a single question for a specific level
app.get("/api/generate-question/:level", async (req, res) => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
    return res.status(503).json({ error: "Gemini API key not configured" });
  }

  const level = parseInt(req.params.level, 10);
  if (isNaN(level) || level < 1 || level > 16) {
    return res.status(400).json({ error: "Level must be between 1 and 16" });
  }

  try {
    const question = await generateSingleQuestion(GEMINI_API_KEY, level);
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: `Failed to generate question for level ${level}` });
  }
});

const FFF_QUESTIONS_PATH = path.join(DATA_DIR, "fff_questions.json");

// ... (existing code)

// Get FFF Question (Random)
app.get("/api/fff-questions", (req, res) => {
  try {
    if (!fs.existsSync(FFF_QUESTIONS_PATH)) {
      return res.status(404).json({ error: "FFF Questions not found" });
    }
    const data = JSON.parse(fs.readFileSync(FFF_QUESTIONS_PATH, 'utf-8'));
    const questions = data.fffQuestions || [];
    if (questions.length === 0) return res.json(null);

    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    res.json(randomQ);
  } catch (err) {
    console.error("Failed to fetch FFF question:", err);
    res.status(500).json({ error: "Failed to fetch FFF question" });
  }
});

app.get("/leaderboard", (req, res) => {
  try {
    if (!fs.existsSync(LEADERBOARD_PATH)) {
      fs.writeFileSync(LEADERBOARD_PATH, "[]", 'utf-8');
    }
    const leaderboard = JSON.parse(fs.readFileSync(LEADERBOARD_PATH, 'utf-8'));

    // Sort to be safe before sending to client
    leaderboard.sort((a, b) => {
      if (b.amount !== a.amount) return b.amount - a.amount;
      const lifelinesA = a.lifelinesUsed !== undefined ? a.lifelinesUsed : 99;
      const lifelinesB = b.lifelinesUsed !== undefined ? b.lifelinesUsed : 99;
      if (lifelinesA !== lifelinesB) return lifelinesA - lifelinesB;
      const timeA = a.timeTaken !== undefined ? a.timeTaken : 999999;
      const timeB = b.timeTaken !== undefined ? b.timeTaken : 999999;
      return timeA - timeB;
    });

    res.json(leaderboard);
  } catch (err) {
    console.error("Failed to load leaderboard:", err);
    res.status(500).json({ error: "Failed to load leaderboard" });
  }
});

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE";
const client = new OAuth2Client(CLIENT_ID);

app.post("/leaderboard", async (req, res) => {
  try {
    let { name, amount, avatar, timeTaken, category, lifelinesUsed } = req.body;

    // Verify Google Token if provided
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        // Override with verified Google profile data
        name = payload.name;
        avatar = payload.picture;
        console.log(`✅ Verified Google score submission for ${name}`);
      } catch (authErr) {
        console.warn(`⚠️ Google Token expired or invalid: ${authErr.message}. Falling back to client-provided data.`);
        // DO NOT return 401 here! Let the score save proceed with unverified req.body
      }
    }

    if (!fs.existsSync(LEADERBOARD_PATH)) {
      fs.writeFileSync(LEADERBOARD_PATH, "[]", 'utf-8');
    }
    const leaderboard = JSON.parse(fs.readFileSync(LEADERBOARD_PATH, 'utf-8'));

    leaderboard.push({
      name,
      amount,
      avatar,
      timeTaken: timeTaken || 0,
      category: category || 'general',
      lifelinesUsed: lifelinesUsed || 0,
      date: new Date().toISOString()
    });

    leaderboard.sort((a, b) => {
      if (b.amount !== a.amount) return b.amount - a.amount; // 1. Score (Desc)
      const lifelinesA = a.lifelinesUsed !== undefined ? a.lifelinesUsed : 99;
      const lifelinesB = b.lifelinesUsed !== undefined ? b.lifelinesUsed : 99;
      if (lifelinesA !== lifelinesB) return lifelinesA - lifelinesB; // 2. Lifelines (Asc)
      const timeA = a.timeTaken !== undefined ? a.timeTaken : 999999;
      const timeB = b.timeTaken !== undefined ? b.timeTaken : 999999;
      return timeA - timeB; // 3. Time (Asc)
    });

    fs.writeFileSync(
      LEADERBOARD_PATH,
      JSON.stringify(leaderboard.slice(0, 100), null, 2), // Keep top 100
      'utf-8'
    );
    res.json({ success: true, message: "Score saved to local JSON store" });
  } catch (err) {
    console.error("Score Save Error:", err);
    res.status(500).json({ error: "Failed to save score" });
  }
});

/* ── AI Question endpoints ───────────────────────────── */

// Get cached AI questions (instant — no waiting!)
app.get("/api/generate-questions", (req, res) => {
  if (cachedAIQuestions && cachedAIQuestions.filter(Boolean).length >= 12) {
    console.log("📦 Serving cached AI questions");
    res.json(cachedAIQuestions);

    // Trigger background regeneration for NEXT game
    setTimeout(() => generateAndCacheQuestions(), 1000);
    return;
  }

  if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
    return res.status(503).json({
      error: "Gemini API key not configured",
      hint: "Set GEMINI_API_KEY in .env file"
    });
  }

  if (isGenerating) {
    return res.status(202).json({
      error: "AI questions are being generated, please try again in ~60 seconds",
      status: "generating"
    });
  }

  return res.status(503).json({
    error: "AI questions not yet available — generation in progress",
    status: "pending"
  });
});

// Force regenerate (for manual trigger)
app.post("/api/regenerate-questions", async (req, res) => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
    return res.status(503).json({ error: "Gemini API key not configured" });
  }

  res.json({ status: "Regeneration started in background" });
  generateAndCacheQuestions();
});



// Status endpoint — check if AI questions are ready
app.get("/api/ai-status", (req, res) => {
  res.json({
    hasKey: !!(GEMINI_API_KEY && GEMINI_API_KEY !== "YOUR_API_KEY_HERE"),
    hasCachedQuestions: !!(cachedAIQuestions && cachedAIQuestions.filter(Boolean).length >= 12),
    cachedCount: cachedAIQuestions ? cachedAIQuestions.filter(Boolean).length : 0,
    isGenerating
  });
});

/* ── Serve React Frontend (For Render) ─────────── */
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🔥 KBC Backend running on port ${PORT}`)
);
