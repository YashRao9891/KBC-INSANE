// generateQuestions.js — AI Question Generator using Google Gemini
// Generates unique, level-appropriate KBC questions (1–16 difficulty tiers)
// Uses a SINGLE API call for all 16 questions to minimize rate-limit issues

const { GoogleGenerativeAI } = require("@google/generative-ai");

/* ── Utility: sleep for rate limiting ──────────────────── */
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/**
 * Generate all 16 KBC questions in a SINGLE Gemini API call.
 * This avoids rate-limit issues entirely (1 request instead of 16).
 */
async function generateAllQuestions(genAI) {
    const prompt = `You are a quiz master for "Kaun Banega Crorepati" (KBC), India's biggest quiz show.

Generate exactly 16 multiple-choice questions with INCREASING difficulty, one for each level:

Level 1 (Very Easy): basic arithmetic, everyday objects — for a 5-year-old
Level 2 (Very Easy): simple math, animal facts, shapes — for a 6-year-old
Level 3 (Easy): capitals, basic science — for a 7-year-old
Level 4 (Easy): Indian states, festivals, inventions — for an 8-year-old
Level 5 (Easy-Medium): historical figures, Indian freedom fighters — for a 10-year-old
Level 6 (Medium): world geography, monuments, Olympics — for a middle-schooler
Level 7 (Medium): Indian Constitution, famous authors, world wars — for a middle-schooler
Level 8 (Medium-Hard): science discoveries, space, Nobel Prize — for a high-schooler
Level 9 (Medium-Hard): advanced geography, world leaders, economy — for a high-schooler
Level 10 (Hard): Indian legal system, advanced physics, world history — for a college student
Level 11 (Hard): organic chemistry, geopolitics, computer science — for a competitive exam aspirant
Level 12 (Very Hard): nuclear physics, Indian judiciary, economics — for an expert
Level 13 (Very Hard): astrophysics, genetic engineering, philosophy — for a subject expert
Level 14 (Expert): quantum mechanics, number theory, biochemistry — for a genius
Level 15 (Expert): obscure facts, advanced theorems, cryptography — for a polymath
Level 16 (Genius): nearly impossible question, worthy of the ₹7 Crore KBC jackpot — for a quiz champion

RULES:
1. Each question must be factually accurate and unambiguous
2. Each must have exactly 4 options, exactly one correct
3. Wrong options should be plausible, not obviously wrong
4. Keep questions concise (under 120 chars) and options concise (under 50 chars)
5. Mix Indian and international topics
6. Every question must cover a DIFFERENT subject
7. Difficulty MUST increase progressively from Level 1 to Level 16

Respond ONLY with a valid JSON array (16 objects), nothing else:
[{"level":1,"question":"...","options":["A","B","C","D"],"correct":1}, ...]

"correct" = 1-based index of the correct option.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            console.log(`🧠 Calling Gemini API (attempt ${attempt + 1}/3)...`);
            const result = await model.generateContent(prompt);
            const text = result.response.text().trim();

            // Extract JSON array from response (handle markdown code blocks)
            const jsonMatch = text.match(/\[[\s\S]*\]/);
            if (!jsonMatch) throw new Error("No JSON array found in response");

            const parsed = JSON.parse(jsonMatch[0]);
            if (!Array.isArray(parsed)) throw new Error("Response is not an array");

            // Validate each question
            const valid = parsed.filter(q =>
                q &&
                typeof q.question === "string" &&
                Array.isArray(q.options) &&
                q.options.length === 4 &&
                typeof q.correct === "number" &&
                q.correct >= 1 &&
                q.correct <= 4 &&
                q.options.every(opt => typeof opt === "string" && opt.trim().length > 0)
            ).map(q => ({
                question: q.question.trim(),
                options: q.options.map(o => o.trim()),
                correct: q.correct,
                level: q.level
            }));

            console.log(`✅ Gemini returned ${valid.length} valid questions`);
            return valid;
        } catch (err) {
            // Parse retryDelay from Gemini error details (e.g., "52s" or "30.5s")
            let waitTime = 60000; // default 60s
            const errStr = err.message || JSON.stringify(err.errorDetails || "");
            const delayMatch = errStr.match(/retryDelay["\s:]*["']?(\d+\.?\d*)\s*s/i);
            if (delayMatch) {
                waitTime = Math.ceil(parseFloat(delayMatch[1]) * 1000) + 5000; // parsed delay + 5s buffer
            }

            console.warn(`⚠️ Attempt ${attempt + 1} failed: ${errStr.substring(0, 120)}`);

            if (attempt < 2) {
                console.log(`⏳ Waiting ${Math.round(waitTime / 1000)}s before retry...`);
                await sleep(waitTime);
            } else {
                throw err;
            }
        }
    }

    return [];
}

/**
 * Generate a full set of 16 KBC questions using Gemini AI.
 * Single API call approach to avoid rate limits.
 */
async function generateFullGameSet(apiKey) {
    const genAI = new GoogleGenerativeAI(apiKey);

    const allQuestions = await generateAllQuestions(genAI);

    // Build a level-indexed result (fill missing levels with null)
    const result = [];
    for (let level = 1; level <= 16; level++) {
        const q = allQuestions.find(q => q.level === level) || null;
        result.push(q);
    }

    console.log(`✅ Total: ${result.filter(Boolean).length}/16 questions ready`);
    return result;
}

/**
 * Generate a single question for a specific level.
 */
async function generateSingleQuestion(apiKey, level) {
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const config = {
        1: "Very Easy", 2: "Very Easy", 3: "Easy", 4: "Easy", 5: "Easy-Medium",
        6: "Medium", 7: "Medium", 8: "Medium-Hard", 9: "Medium-Hard", 10: "Hard",
        11: "Hard", 12: "Very Hard", 13: "Very Hard", 14: "Expert", 15: "Expert", 16: "Genius"
    };

    const difficulty = config[level] || "Medium";

    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            if (attempt > 0) await sleep(35000);

            const result = await model.generateContent(
                `Generate 1 KBC quiz question at ${difficulty} difficulty (Level ${level}/16). Respond ONLY with JSON: {"level":${level},"question":"...","options":["A","B","C","D"],"correct":1}`
            );
            const text = result.response.text().trim();
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error("No JSON found");

            const parsed = JSON.parse(jsonMatch[0]);
            if (!parsed.question || !parsed.options || parsed.options.length !== 4) throw new Error("Invalid structure");

            return {
                question: parsed.question.trim(),
                options: parsed.options.map(o => o.trim()),
                correct: parsed.correct,
                level
            };
        } catch (err) {
            if (attempt === 2) throw err;
        }
    }
}

module.exports = { generateFullGameSet, generateSingleQuestion };
