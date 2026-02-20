const fs = require('fs');
const path = require('path');

const files = [
    'data/questions_general.json',
    'data/questions_science.json',
    'data/questions_entertainment.json'
];

let hasError = false;

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        JSON.parse(content);
        console.log(`✅ ${file} is valid JSON.`);
    } catch (err) {
        console.error(`❌ ${file} has invalid JSON:`, err.message);
        hasError = true;
    }
});

if (hasError) {
    process.exit(1);
}
