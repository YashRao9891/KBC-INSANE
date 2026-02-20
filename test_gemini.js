// Quick test of the /api/generate-questions endpoint
const http = require("http");

console.log("Testing /api/generate-questions...");
console.log("This may take 1-2 minutes if rate limited (will auto-retry).\n");

http.get("http://localhost:5000/api/generate-questions", (res) => {
    let data = "";
    res.on("data", chunk => data += chunk);
    res.on("end", () => {
        try {
            const json = JSON.parse(data);
            if (json.error) {
                console.log("ERROR:", json.error);
                return;
            }
            const count = json.filter(Boolean).length;
            console.log(`\n✅ Questions generated: ${count}/16\n`);
            json.filter(Boolean).forEach(q => {
                console.log(`Level ${q.level}: ${q.question}`);
                q.options.forEach((opt, i) => {
                    const marker = (i + 1 === q.correct) ? " ✓" : "";
                    console.log(`  ${String.fromCharCode(65 + i)}. ${opt}${marker}`);
                });
                console.log();
            });
        } catch (e) {
            console.log("Raw response:", data.substring(0, 500));
        }
    });
}).on("error", e => console.error("Connection error:", e.message));
