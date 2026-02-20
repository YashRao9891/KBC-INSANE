const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data/questions_general.json');
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

const targets = ['"Q5":', '"Q10":', '"Q15":'];

targets.forEach(target => {
    lines.forEach((line, index) => {
        if (line.includes(target)) {
            console.log(`${target} found at line ${index + 1}`);
        }
    });
});
