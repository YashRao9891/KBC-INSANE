const fs = require('fs');
const path = require('path');

const CLIENT_QUESTIONS_PATH = path.join(__dirname, '../client/src/questions.js');
const SERVER_QUESTIONS_PATH = path.join(__dirname, '../data/questions.json');

// Helper to shuffle array
function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

// Logic to process raw question data
function processQuestion(level, qData) {
    const correctVal = qData.correct;
    const wrongVals = qData.wrong;
    const options = shuffleArray([correctVal, ...wrongVals]);

    return {
        question: qData.question,
        options: options,
        correct: options.indexOf(correctVal) + 1
    };
}

const fileContent = fs.readFileSync(CLIENT_QUESTIONS_PATH, 'utf8');
let currentQuestions = {};

if (fs.existsSync(SERVER_QUESTIONS_PATH)) {
    currentQuestions = JSON.parse(fs.readFileSync(SERVER_QUESTIONS_PATH, 'utf8'));
}

// Regex to find addQuestions blocks
const regex = /addQuestions\((\d+),\s*(\[[\s\S]*?\])\);/g;
let match;
let count = 0;

while ((match = regex.exec(fileContent)) !== null) {
    const level = parseInt(match[1]);
    // Use Function to safely evaluate the array string (as it's valid JS object literal syntax)
    // We wrap it in parenthesis to ensure it's treated as an expression
    const rawQuestions = new Function(`return ${match[2]}`)();

    const qKey = `Q${level}`;
    if (!currentQuestions[qKey]) {
        currentQuestions[qKey] = [];
    }

    rawQuestions.forEach(q => {
        const processed = processQuestion(level, q);
        // Avoid duplicate questions (simple check by question text)
        const exists = currentQuestions[qKey].some(existing => existing.question === processed.question);
        if (!exists) {
            currentQuestions[qKey].push(processed);
            count++;
        }
    });
}

fs.writeFileSync(SERVER_QUESTIONS_PATH, JSON.stringify(currentQuestions, null, 2));
console.log(`Migrated ${count} questions to data/questions.json`);
