require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const { GoogleGenAI } = require("@google/genai");

async function testAI() {
    try {
        console.log("Starting test...");
        console.log("Key exists?", !!process.env.GEMINI_API_KEY);
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Just say hello.",
        });

        console.log("SUCCESS:", response.text);
    } catch (err) {
        console.error("DEBUG ERROR:", err);
    }
}

testAI();
