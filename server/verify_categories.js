const API = "http://localhost:5000/api";

async function runVerification() {
    console.log("🚀 Starting Category Verification...");

    try {
        // 1. Add a Science Question
        console.log("1️⃣ Adding a Science Question...");
        const addRes = await fetch(`${API}/questions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                level: 1,
                question: "Test Science Question?",
                options: ["A", "B", "C", "D"],
                correct: 1,
                category: "science"
            })
        });

        if (!addRes.ok) throw new Error(`Add failed: ${addRes.statusText}`);
        console.log("✅ Added Science Question");

        // 2. Fetch Science Questions
        console.log("2️⃣ Fetching Science Questions for Level 1...");
        const scienceRes = await fetch(`${API}/questions/1?category=science`);
        if (!scienceRes.ok) throw new Error(`Fetch Science failed: ${scienceRes.statusText}`);
        const scienceQuestions = await scienceRes.json();
        const found = scienceQuestions.find(q => q.question === "Test Science Question?");

        if (found) {
            console.log("✅ Found Science Question in Science Category");
        } else {
            console.error("❌ Did NOT find Science Question in Science Category");
        }

        // 3. Fetch General Questions
        console.log("3️⃣ Fetching General Questions for Level 1...");
        const generalRes = await fetch(`${API}/questions/1?category=general`);
        if (!generalRes.ok) throw new Error(`Fetch General failed: ${generalRes.statusText}`);
        const generalQuestions = await generalRes.json();
        const foundInGeneral = generalQuestions.find(q => q.question === "Test Science Question?");

        if (!foundInGeneral) {
            console.log("✅ Correctly did NOT find Science Question in General Category");
        } else {
            console.error("❌ Found Science Question in General Category (Leaking!)");
        }

        // 4. Delete the test question
        if (found) {
            const index = scienceQuestions.indexOf(found);
            console.log(`4️⃣ Deleting test question at index ${index}...`);
            const deleteRes = await fetch(`${API}/questions/1/${index}?category=science`, {
                method: 'DELETE'
            });
            if (!deleteRes.ok) throw new Error(`Delete failed: ${deleteRes.statusText}`);
            console.log("✅ Deleted test question");
        }

        console.log("🎉 Verification Complete!");

    } catch (err) {
        console.error("❌ Verification Failed:", err.message);
    }
}

runVerification();
