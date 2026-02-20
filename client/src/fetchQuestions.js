// fetchQuestions.js — 3-Tier Hybrid Question Fetcher
// Priority: 1) AI cache (instant)  →  2) OpenTDB  →  3) Local question bank

// Use relative path for production (Render), localhost for local dev
const API = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');
/* ── Decode HTML entities from OpenTDB ──────────────── */
function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

/* ── Tier 1: Fetch cached AI questions from server (instant) ── */
async function fetchFromAI() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

    try {
        const res = await fetch(`${API}/api/generate-questions`, {
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new Error(body.error || `Server returned ${res.status}`);
        }

        const questions = await res.json();

        // Validate — expect an array of 16 question objects
        if (!Array.isArray(questions) || questions.filter(Boolean).length < 12) {
            throw new Error("AI returned insufficient questions");
        }

        return questions;
    } catch (err) {
        clearTimeout(timeout);
        throw err;
    }
}

/* ── Tier 2: Fetch from Open Trivia DB ────────────────── */
export async function fetchFromOpenTDB(amount, difficulty, categoryId) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
        let url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
        if (categoryId) {
            url += `&category=${categoryId}`;
        }

        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        const data = await res.json();

        if (data.response_code !== 0 || !data.results?.length) {
            throw new Error(`OpenTDB returned code ${data.response_code}`);
        }

        return data.results.map(q => {
            const options = [...q.incorrect_answers, q.correct_answer]
                .map(decodeHTML)
                .sort(() => Math.random() - 0.5);

            return {
                question: decodeHTML(q.question),
                options,
                correct: options.indexOf(decodeHTML(q.correct_answer)) + 1
            };
        });
    } catch (err) {
        clearTimeout(timeout);
        throw err;
    }
}

/* ── Helper: Fetch a single question from local DB ── */
async function getLocalQuestion(level, category) {
    try {
        const catParam = category ? `?category=${category}` : "";
        const res = await fetch(`${API}/api/questions/${level}${catParam}`);
        if (!res.ok) return null;

        const questions = await res.json();
        if (!questions || questions.length === 0) return null;

        return questions[Math.floor(Math.random() * questions.length)];
    } catch (err) {
        console.error(`Failed to fetch local question for level ${level}`, err);
        return null;
    }
}

export const OPENTDB_CATEGORY_MAP = {
    general: 9,
    science: 17,
    history: 23,
    sports: 21,
    geography: 22,
    entertainment: 11,
    mythology: 20
};

/* ── Build a full 16-question game set ───────────────── */
export async function fetchHybridQuestions(ladder, category = "general") {
    console.log(`🚀 Fetching questions for category: ${category}`);

    /* ── STRATEGY: 
       1. Try Local Question for specific level (Best Quality)
       2. If General, try AI (Good Variety)
       3. Fallback to OpenTDB (Quantity)
    ── */

    // Pre-fetch AI questions if General category
    let aiQuestions = [];
    if (category === "general") {
        try {
            aiQuestions = await fetchFromAI();
        } catch (err) {
            console.warn("AI fetch failed, skipping:", err.message);
        }
    }

    // Pre-fetch OpenTDB pool as backup
    let easyPool = [], mediumPool = [], hardPool = [];
    try {
        const openTdbCatId = OPENTDB_CATEGORY_MAP[category] || 9;
        const [easyRes, mediumRes, hardRes] = await Promise.all([
            fetchFromOpenTDB(10, "easy", openTdbCatId),
            fetchFromOpenTDB(10, "medium", openTdbCatId),
            fetchFromOpenTDB(10, "hard", openTdbCatId)
        ]);
        easyPool = easyRes;
        mediumPool = mediumRes;
        hardPool = hardRes;
    } catch (err) {
        console.warn("OpenTDB pool fetch failed:", err.message);
    }

    // Build the ladder level by level
    const selectedQuestions = await Promise.all(ladder.map(async (item, index) => {
        const level = index + 1;
        let q = null;

        // 1. Try Local Question (Exact Match)
        try {
            q = await getLocalQuestion(level, category);
            if (q) console.log(`✅ Level ${level}: Found local question`);
        } catch (e) { console.error(e); }

        // 2. If General & No Local, Try AI
        if (!q && category === "general" && aiQuestions[index]) {
            q = aiQuestions[index];
            console.log(`🤖 Level ${level}: Using AI question`);
        }

        // 3. Fallback to OpenTDB
        if (!q) {
            if (index < 5) q = easyPool.shift();
            else if (index < 10) q = mediumPool.shift();
            else q = hardPool.shift();
            if (q) console.log(`🌍 Level ${level}: Using OpenTDB question`);
        }

        // 4. Final Safety Fallback
        if (!q) {
            q = {
                question: `Fallback Question Level ${level}: Server Error or No Data`,
                options: ["Option A", "Option B", "Option C", "Option D"],
                correct: 1
            };
        }

        return {
            ...q,
            prize: item.prize,
            milestone: item.milestone || false,
            jackpot: item.jackpot || false
        };
    }));

    return selectedQuestions;
}
