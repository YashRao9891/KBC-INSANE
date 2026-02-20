// questions.js — Massive Local Question Bank (250+ questions)
// Organized by 16 difficulty levels matching KBC prize ladder

// Utility to shuffle options
function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

// Question builder (auto shuffles options & sets correct index)
function createQuestion(level, question, correctAnswer, wrongAnswers) {
    const options = shuffleArray([correctAnswer, ...wrongAnswers]);
    return {
        level,
        question,
        options,
        correct: options.indexOf(correctAnswer) + 1
    };
}

const questionBank = [];

function addQuestions(level, questions) {
    questions.forEach(q => {
        questionBank.push(
            createQuestion(level, q.question, q.correct, q.wrong)
        );
    });
}

// ============================================================
// LEVEL 1 — Very Easy (₹1,000) — Basic for a 5-year-old
// ============================================================
addQuestions(1, [
    { question: "2 + 2 equals?", correct: "4", wrong: ["3", "5", "6"] },
    { question: "Color of a banana?", correct: "Yellow", wrong: ["Red", "Blue", "Black"] },
    { question: "How many days in a week?", correct: "7", wrong: ["5", "6", "8"] },
    { question: "Which animal barks?", correct: "Dog", wrong: ["Cat", "Cow", "Horse"] },
    { question: "How many legs does a cat have?", correct: "4", wrong: ["2", "6", "8"] },
    { question: "What color is the sky on a clear day?", correct: "Blue", wrong: ["Green", "Red", "Yellow"] },
    { question: "Which fruit is red and round?", correct: "Apple", wrong: ["Banana", "Grapes", "Mango"] },
    { question: "3 + 1 equals?", correct: "4", wrong: ["2", "5", "3"] },
    { question: "How many eyes do you have?", correct: "2", wrong: ["1", "3", "4"] },
    { question: "What shape is a ball?", correct: "Round", wrong: ["Square", "Triangle", "Flat"] },
    { question: "Which animal says 'meow'?", correct: "Cat", wrong: ["Dog", "Cow", "Duck"] },
    { question: "What do you drink from a glass?", correct: "Water", wrong: ["Stone", "Paper", "Sand"] },
    { question: "Which is bigger: an elephant or a mouse?", correct: "Elephant", wrong: ["Mouse", "Both same", "Neither"] },
    { question: "5 - 2 equals?", correct: "3", wrong: ["2", "4", "5"] },
    { question: "What color is grass?", correct: "Green", wrong: ["Blue", "Red", "Yellow"] },
]);

// ============================================================
// LEVEL 2 — Very Easy (₹2,000) — Basic for a 6-year-old
// ============================================================
addQuestions(2, [
    { question: "How many wheels does a bicycle have?", correct: "2", wrong: ["3", "4", "1"] },
    { question: "Which shape has 4 equal sides?", correct: "Square", wrong: ["Triangle", "Circle", "Oval"] },
    { question: "Sun rises in the?", correct: "East", wrong: ["West", "North", "South"] },
    { question: "How many months in a year?", correct: "12", wrong: ["10", "11", "13"] },
    { question: "What comes after Monday?", correct: "Tuesday", wrong: ["Wednesday", "Sunday", "Friday"] },
    { question: "Which animal lives in water?", correct: "Fish", wrong: ["Lion", "Elephant", "Dog"] },
    { question: "What is the first letter of the English alphabet?", correct: "A", wrong: ["B", "Z", "C"] },
    { question: "How many fingers do you have on one hand?", correct: "5", wrong: ["4", "6", "3"] },
    { question: "Which season is the hottest?", correct: "Summer", wrong: ["Winter", "Autumn", "Spring"] },
    { question: "What do bees make?", correct: "Honey", wrong: ["Milk", "Butter", "Cheese"] },
    { question: "10 - 3 equals?", correct: "7", wrong: ["6", "8", "5"] },
    { question: "Which bird is known for its colorful feathers?", correct: "Peacock", wrong: ["Crow", "Sparrow", "Pigeon"] },
    { question: "What shape has 3 sides?", correct: "Triangle", wrong: ["Square", "Circle", "Rectangle"] },
    { question: "Where does ice cream feel cold or hot?", correct: "Cold", wrong: ["Hot", "Warm", "Spicy"] },
    { question: "What do cows give us?", correct: "Milk", wrong: ["Eggs", "Honey", "Wool"] },
]);

// ============================================================
// LEVEL 3 — Easy (₹3,000) — For a 7-year-old
// ============================================================
addQuestions(3, [
    { question: "Capital of India?", correct: "New Delhi", wrong: ["Mumbai", "Kolkata", "Chennai"] },
    { question: "Which planet do we live on?", correct: "Earth", wrong: ["Mars", "Jupiter", "Venus"] },
    { question: "Water freezes at what temperature?", correct: "0°C", wrong: ["10°C", "100°C", "50°C"] },
    { question: "How many continents are there?", correct: "7", wrong: ["5", "6", "8"] },
    { question: "Which is the largest animal on land?", correct: "Elephant", wrong: ["Lion", "Horse", "Bear"] },
    { question: "What is the national bird of India?", correct: "Peacock", wrong: ["Parrot", "Eagle", "Sparrow"] },
    { question: "Which gas do we breathe in?", correct: "Oxygen", wrong: ["Carbon Dioxide", "Nitrogen", "Hydrogen"] },
    { question: "How many sides does a hexagon have?", correct: "6", wrong: ["5", "7", "8"] },
    { question: "Which is the largest ocean?", correct: "Pacific", wrong: ["Atlantic", "Indian", "Arctic"] },
    { question: "What is the boiling point of water?", correct: "100°C", wrong: ["50°C", "200°C", "0°C"] },
    { question: "Who is called the Father of the Nation in India?", correct: "Mahatma Gandhi", wrong: ["Nehru", "Ambedkar", "Patel"] },
    { question: "Which vegetable makes you cry when cut?", correct: "Onion", wrong: ["Potato", "Carrot", "Tomato"] },
    { question: "What is the baby of a dog called?", correct: "Puppy", wrong: ["Kitten", "Cub", "Calf"] },
    { question: "How many colors are in a rainbow?", correct: "7", wrong: ["5", "6", "8"] },
    { question: "What is the smallest planet in our solar system?", correct: "Mercury", wrong: ["Mars", "Venus", "Pluto"] },
]);

// ============================================================
// LEVEL 4 — Easy (₹5,000) — For an 8-year-old
// ============================================================
addQuestions(4, [
    { question: "Which Indian state is known as 'God's Own Country'?", correct: "Kerala", wrong: ["Goa", "Tamil Nadu", "Karnataka"] },
    { question: "Who invented the telephone?", correct: "Alexander Graham Bell", wrong: ["Thomas Edison", "Nikola Tesla", "Marconi"] },
    { question: "Which festival is called the 'Festival of Lights'?", correct: "Diwali", wrong: ["Holi", "Eid", "Christmas"] },
    { question: "Which planet is known as the Red Planet?", correct: "Mars", wrong: ["Jupiter", "Saturn", "Venus"] },
    { question: "What is the national flower of India?", correct: "Lotus", wrong: ["Rose", "Sunflower", "Jasmine"] },
    { question: "Which river is the longest in India?", correct: "Ganga", wrong: ["Yamuna", "Godavari", "Krishna"] },
    { question: "How many zeros are in one thousand?", correct: "3", wrong: ["2", "4", "5"] },
    { question: "Which is the fastest land animal?", correct: "Cheetah", wrong: ["Tiger", "Lion", "Horse"] },
    { question: "What instrument did Ravi Shankar play?", correct: "Sitar", wrong: ["Tabla", "Flute", "Veena"] },
    { question: "Which direction does a compass needle point?", correct: "North", wrong: ["South", "East", "West"] },
    { question: "How many innings in a standard cricket test match?", correct: "4", wrong: ["2", "3", "5"] },
    { question: "What does CPU stand for?", correct: "Central Processing Unit", wrong: ["Computer Power Unit", "Central Program Unit", "Core Processing Unit"] },
    { question: "Which country gave us the game of chess?", correct: "India", wrong: ["China", "Russia", "Persia"] },
    { question: "What is the tallest mountain in the world?", correct: "Mt. Everest", wrong: ["K2", "Kangchenjunga", "Mont Blanc"] },
    { question: "Which animal is known as the King of the Jungle?", correct: "Lion", wrong: ["Tiger", "Elephant", "Bear"] },
]);

// ============================================================
// LEVEL 5 — Easy-Medium (₹10,000) — Milestone!
// ============================================================
addQuestions(5, [
    { question: "Who wrote the Indian National Anthem?", correct: "Rabindranath Tagore", wrong: ["Bankim Chandra", "Sarojini Naidu", "Iqbal"] },
    { question: "Which element has the chemical symbol 'O'?", correct: "Oxygen", wrong: ["Gold", "Osmium", "Oganesson"] },
    { question: "In which year did India gain independence?", correct: "1947", wrong: ["1945", "1950", "1942"] },
    { question: "Who was the first President of India?", correct: "Dr. Rajendra Prasad", wrong: ["Nehru", "Ambedkar", "S. Radhakrishnan"] },
    { question: "Which sport is played at Wimbledon?", correct: "Tennis", wrong: ["Cricket", "Football", "Badminton"] },
    { question: "What is the chemical symbol for gold?", correct: "Au", wrong: ["Ag", "Go", "Gd"] },
    { question: "Which Mughal emperor built the Taj Mahal?", correct: "Shah Jahan", wrong: ["Akbar", "Babur", "Aurangzeb"] },
    { question: "Which vitamin do we get from sunlight?", correct: "Vitamin D", wrong: ["Vitamin A", "Vitamin C", "Vitamin B"] },
    { question: "What is the currency of Japan?", correct: "Yen", wrong: ["Won", "Yuan", "Ringgit"] },
    { question: "Which planet has the most moons?", correct: "Saturn", wrong: ["Jupiter", "Uranus", "Neptune"] },
    { question: "Who discovered penicillin?", correct: "Alexander Fleming", wrong: ["Louis Pasteur", "Edward Jenner", "Robert Koch"] },
    { question: "Which Indian city is called the 'Pink City'?", correct: "Jaipur", wrong: ["Jodhpur", "Udaipur", "Delhi"] },
    { question: "What is the hardest natural substance?", correct: "Diamond", wrong: ["Gold", "Iron", "Quartz"] },
    { question: "Who painted the Mona Lisa?", correct: "Leonardo da Vinci", wrong: ["Picasso", "Van Gogh", "Michelangelo"] },
    { question: "How many players in a football team on the field?", correct: "11", wrong: ["10", "9", "12"] },
]);

// ============================================================
// LEVEL 6 — Medium (₹20,000)
// ============================================================
addQuestions(6, [
    { question: "Which country hosted the 2016 Olympics?", correct: "Brazil", wrong: ["China", "UK", "Russia"] },
    { question: "Which Indian state has the longest coastline?", correct: "Gujarat", wrong: ["Maharashtra", "Kerala", "Tamil Nadu"] },
    { question: "What is the capital of Australia?", correct: "Canberra", wrong: ["Sydney", "Melbourne", "Perth"] },
    { question: "Which gas makes up most of Earth's atmosphere?", correct: "Nitrogen", wrong: ["Oxygen", "Carbon Dioxide", "Argon"] },
    { question: "Who was the first man to walk on the Moon?", correct: "Neil Armstrong", wrong: ["Buzz Aldrin", "Yuri Gagarin", "John Glenn"] },
    { question: "The Great Wall is in which country?", correct: "China", wrong: ["Japan", "Korea", "Mongolia"] },
    { question: "Which blood group is the universal donor?", correct: "O Negative", wrong: ["A Positive", "B Positive", "AB Positive"] },
    { question: "What is the SI unit of electric current?", correct: "Ampere", wrong: ["Volt", "Watt", "Ohm"] },
    { question: "Which battle was fought in 1757?", correct: "Battle of Plassey", wrong: ["Battle of Panipat", "Battle of Buxar", "Battle of Haldighati"] },
    { question: "The Suez Canal connects which two seas?", correct: "Mediterranean and Red Sea", wrong: ["Atlantic and Pacific", "Black and Caspian", "Red and Arabian"] },
    { question: "Who is known as the 'Missile Man of India'?", correct: "APJ Abdul Kalam", wrong: ["Vikram Sarabhai", "Homi Bhabha", "C.V. Raman"] },
    { question: "Which organ pumps blood in the body?", correct: "Heart", wrong: ["Liver", "Lungs", "Kidney"] },
    { question: "What is the largest desert in the world?", correct: "Sahara", wrong: ["Gobi", "Thar", "Kalahari"] },
    { question: "Which country is known as the 'Land of the Rising Sun'?", correct: "Japan", wrong: ["China", "Thailand", "Nepal"] },
    { question: "What is the chemical formula of table salt?", correct: "NaCl", wrong: ["NaOH", "KCl", "CaCl₂"] },
]);

// ============================================================
// LEVEL 7 — Medium (₹40,000)
// ============================================================
addQuestions(7, [
    { question: "How many fundamental rights in the Indian Constitution?", correct: "6", wrong: ["5", "7", "8"] },
    { question: "Who wrote 'Romeo and Juliet'?", correct: "William Shakespeare", wrong: ["Charles Dickens", "Mark Twain", "Jane Austen"] },
    { question: "In which World War was the atomic bomb first used?", correct: "World War II", wrong: ["World War I", "Korean War", "Vietnam War"] },
    { question: "Which element has the atomic number 1?", correct: "Hydrogen", wrong: ["Helium", "Lithium", "Carbon"] },
    { question: "Which planet is known for its rings?", correct: "Saturn", wrong: ["Jupiter", "Uranus", "Neptune"] },
    { question: "What is the largest bone in the human body?", correct: "Femur", wrong: ["Humerus", "Tibia", "Spine"] },
    { question: "Who founded the Maurya Empire?", correct: "Chandragupta Maurya", wrong: ["Ashoka", "Bindusara", "Chanakya"] },
    { question: "Which is the most spoken language in the world?", correct: "English", wrong: ["Mandarin", "Spanish", "Hindi"] },
    { question: "DNA stands for?", correct: "Deoxyribonucleic Acid", wrong: ["Dinitro Acid", "Dual Nucleic Acid", "Deoxy Nitrogen Acid"] },
    { question: "What is the currency of South Korea?", correct: "Won", wrong: ["Yen", "Yuan", "Baht"] },
    { question: "Which Indian leader led the Salt March?", correct: "Mahatma Gandhi", wrong: ["Nehru", "Subhas Bose", "Patel"] },
    { question: "The Amazon rainforest is mainly in which country?", correct: "Brazil", wrong: ["Peru", "Colombia", "Venezuela"] },
    { question: "What is the main component of natural gas?", correct: "Methane", wrong: ["Ethane", "Propane", "Butane"] },
    { question: "Who composed the Indian national song 'Vande Mataram'?", correct: "Bankim Chandra Chatterjee", wrong: ["Rabindranath Tagore", "Iqbal", "Sarojini Naidu"] },
    { question: "Which vitamin deficiency causes scurvy?", correct: "Vitamin C", wrong: ["Vitamin A", "Vitamin D", "Vitamin K"] },
]);

// ============================================================
// LEVEL 8 — Medium-Hard (₹80,000)
// ============================================================
addQuestions(8, [
    { question: "Who was the first Indian in space?", correct: "Rakesh Sharma", wrong: ["Kalpana Chawla", "Sunita Williams", "Ravish Malhotra"] },
    { question: "Which is the longest river in the world?", correct: "Nile", wrong: ["Amazon", "Yangtze", "Mississippi"] },
    { question: "What does HTTP stand for?", correct: "HyperText Transfer Protocol", wrong: ["High Text Transfer Protocol", "HyperText Technical Process", "High Transfer Text Protocol"] },
    { question: "Who received the first Bharat Ratna?", correct: "C. Rajagopalachari", wrong: ["Nehru", "Radhakrishnan", "C.V. Raman"] },
    { question: "Binary of the number 10?", correct: "1010", wrong: ["1000", "1100", "1001"] },
    { question: "Which country has the most time zones?", correct: "France", wrong: ["USA", "Russia", "China"] },
    { question: "The term 'light year' measures what?", correct: "Distance", wrong: ["Time", "Speed", "Brightness"] },
    { question: "Who proposed the heliocentric model?", correct: "Copernicus", wrong: ["Galileo", "Kepler", "Ptolemy"] },
    { question: "ISRO headquarters is in which city?", correct: "Bengaluru", wrong: ["Delhi", "Mumbai", "Chennai"] },
    { question: "Which Indian PM introduced economic liberalization in 1991?", correct: "P.V. Narasimha Rao", wrong: ["Rajiv Gandhi", "Vajpayee", "Manmohan Singh"] },
    { question: "The Nobel Prize was established by a citizen of which country?", correct: "Sweden", wrong: ["Norway", "Denmark", "Finland"] },
    { question: "What is the speed of sound in air approximately?", correct: "343 m/s", wrong: ["300 m/s", "400 m/s", "500 m/s"] },
    { question: "Which language is used for Android app development?", correct: "Kotlin", wrong: ["Swift", "Ruby", "Perl"] },
    { question: "Chandrayaan-3 landed on which part of the Moon?", correct: "South Pole", wrong: ["North Pole", "Equator", "Far Side"] },
    { question: "Which Indian city is famous for its IT industry?", correct: "Bengaluru", wrong: ["Pune", "Hyderabad", "Chennai"] },
]);

// ============================================================
// LEVEL 9 — Medium-Hard (₹1,60,000)
// ============================================================
addQuestions(9, [
    { question: "Mt. K2 is in which mountain range?", correct: "Karakoram", wrong: ["Himalayas", "Andes", "Alps"] },
    { question: "Who is known as the 'Father of Computer'?", correct: "Charles Babbage", wrong: ["Alan Turing", "John von Neumann", "Bill Gates"] },
    { question: "The Sensex is the stock index of which exchange?", correct: "BSE (Bombay Stock Exchange)", wrong: ["NSE", "NYSE", "NASDAQ"] },
    { question: "Which river flows through Paris?", correct: "Seine", wrong: ["Thames", "Danube", "Rhine"] },
    { question: "Starry Night was painted by whom?", correct: "Vincent van Gogh", wrong: ["Monet", "Picasso", "Da Vinci"] },
    { question: "What is the pH value of pure water?", correct: "7", wrong: ["0", "14", "1"] },
    { question: "Who directed the movie 'Lagaan'?", correct: "Ashutosh Gowariker", wrong: ["Aamir Khan", "Rajkumar Hirani", "Sanjay Leela Bhansali"] },
    { question: "Which element is used in pencil leads?", correct: "Graphite", wrong: ["Lead", "Carbon", "Charcoal"] },
    { question: "The Tropic of Cancer passes through how many Indian states?", correct: "8", wrong: ["6", "7", "9"] },
    { question: "Who wrote 'A Brief History of Time'?", correct: "Stephen Hawking", wrong: ["Einstein", "Carl Sagan", "Richard Feynman"] },
    { question: "Which acid is found in lemon?", correct: "Citric Acid", wrong: ["Acetic Acid", "Lactic Acid", "Malic Acid"] },
    { question: "What is India's rank in area among world countries?", correct: "7th", wrong: ["5th", "6th", "8th"] },
    { question: "What is the currency of Turkey?", correct: "Lira", wrong: ["Euro", "Dinar", "Peso"] },
    { question: "Which instrument is Ustad Zakir Hussain famous for?", correct: "Tabla", wrong: ["Sitar", "Sarod", "Flute"] },
    { question: "The term 'Googol' represents 10 to the power of?", correct: "100", wrong: ["10", "1000", "50"] },
]);

// ============================================================
// LEVEL 10 — Hard (₹3,20,000) — Milestone!
// ============================================================
addQuestions(10, [
    { question: "Who proposed the General Theory of Relativity?", correct: "Einstein", wrong: ["Newton", "Bohr", "Planck"] },
    { question: "Article 370 was related to which region?", correct: "Jammu & Kashmir", wrong: ["Punjab", "Assam", "Sikkim"] },
    { question: "Which is the longest-serving Indian PM?", correct: "Jawaharlal Nehru", wrong: ["Indira Gandhi", "Manmohan Singh", "Modi"] },
    { question: "Which composer wrote 'Für Elise'?", correct: "Beethoven", wrong: ["Mozart", "Bach", "Chopin"] },
    { question: "What is the square root of 1764?", correct: "42", wrong: ["44", "38", "46"] },
    { question: "The 'Right to Education' is under which article?", correct: "Article 21A", wrong: ["Article 19", "Article 14", "Article 32"] },
    { question: "Which Indian scientist won the Nobel Prize in Physics?", correct: "C.V. Raman", wrong: ["Homi Bhabha", "S.N. Bose", "Vikram Sarabhai"] },
    { question: "What is the half-life of Carbon-14?", correct: "5,730 years", wrong: ["1,000 years", "10,000 years", "2,500 years"] },
    { question: "Who built the city of Fatehpur Sikri?", correct: "Akbar", wrong: ["Shah Jahan", "Humayun", "Babur"] },
    { question: "The Treaty of Versailles ended which war?", correct: "World War I", wrong: ["World War II", "Franco-Prussian War", "Napoleonic Wars"] },
    { question: "Which particle has no electric charge?", correct: "Neutron", wrong: ["Proton", "Electron", "Positron"] },
    { question: "Opera 'The Magic Flute' was composed by?", correct: "Mozart", wrong: ["Verdi", "Wagner", "Puccini"] },
    { question: "The Indian Constitution was adopted on which date?", correct: "26 November 1949", wrong: ["26 January 1950", "15 August 1947", "15 August 1950"] },
    { question: "Which programming language was created by Guido van Rossum?", correct: "Python", wrong: ["Java", "Ruby", "C++"] },
    { question: "Chandrasekhar limit relates to what?", correct: "White Dwarf mass", wrong: ["Black hole radius", "Star temperature", "Galaxy size"] },
]);

// ============================================================
// LEVEL 11 — Hard (₹6,40,000)
// ============================================================
addQuestions(11, [
    { question: "Which organic compound is the simplest alkane?", correct: "Methane (CH₄)", wrong: ["Ethane (C₂H₆)", "Propane (C₃H₈)", "Butane (C₄H₁₀)"] },
    { question: "The 42nd Amendment is called the?", correct: "Mini Constitution", wrong: ["Magna Carta", "Bill of Rights", "Golden Amendment"] },
    { question: "The Booker Prize is awarded for excellence in?", correct: "Fiction writing", wrong: ["Science", "Poetry", "Journalism"] },
    { question: "Who coined the term 'Cold War'?", correct: "George Orwell", wrong: ["Churchill", "Truman", "Kennan"] },
    { question: "What is the time complexity of binary search?", correct: "O(log n)", wrong: ["O(n)", "O(n²)", "O(1)"] },
    { question: "The Kyoto Protocol deals with?", correct: "Climate change", wrong: ["Nuclear weapons", "Trade", "Human rights"] },
    { question: "Which dynasty built the Konark Sun Temple?", correct: "Eastern Ganga dynasty", wrong: ["Chola", "Pallava", "Maurya"] },
    { question: "Fermat's Last Theorem was proved by whom?", correct: "Andrew Wiles", wrong: ["Fermat", "Euler", "Gauss"] },
    { question: "What is the main ore of aluminium?", correct: "Bauxite", wrong: ["Haematite", "Chalcopyrite", "Galena"] },
    { question: "Who directed the movie 'Schindler's List'?", correct: "Steven Spielberg", wrong: ["Martin Scorsese", "Francis Coppola", "Ridley Scott"] },
    { question: "The Indian Space Research Organisation was founded in?", correct: "1969", wrong: ["1962", "1975", "1972"] },
    { question: "Which acid is found in gastric juice?", correct: "Hydrochloric Acid (HCl)", wrong: ["Sulfuric Acid", "Nitric Acid", "Acetic Acid"] },
    { question: "The Hubble Space Telescope orbits at what altitude approx.?", correct: "547 km", wrong: ["200 km", "1000 km", "36000 km"] },
    { question: "Who wrote the epic poem 'Paradise Lost'?", correct: "John Milton", wrong: ["Homer", "Virgil", "Dante"] },
    { question: "What is the Rydberg constant used in?", correct: "Spectroscopy", wrong: ["Thermodynamics", "Mechanics", "Optics"] },
]);

// ============================================================
// LEVEL 12 — Very Hard (₹12,50,000)
// ============================================================
addQuestions(12, [
    { question: "Which particle was predicted by Higgs and discovered in 2012?", correct: "Higgs Boson", wrong: ["Graviton", "Tachyon", "Gluon"] },
    { question: "Who was the first Chief Justice of India?", correct: "H.J. Kania", wrong: ["M. Patanjali Sastri", "B.K. Mukherjea", "S.R. Das"] },
    { question: "What is GDP measured at factor cost also called?", correct: "GVA (Gross Value Added)", wrong: ["NNP", "NDP", "GNI"] },
    { question: "The Rosetta Stone helped decipher which script?", correct: "Egyptian Hieroglyphs", wrong: ["Cuneiform", "Linear A", "Sanskrit"] },
    { question: "CRISPR-Cas9 is used for?", correct: "Gene editing", wrong: ["Protein synthesis", "Drug delivery", "Cell imaging"] },
    { question: "Which battle did Napoleon lose in 1815?", correct: "Battle of Waterloo", wrong: ["Battle of Austerlitz", "Battle of Leipzig", "Battle of Trafalgar"] },
    { question: "The Chandrasekhar limit is approximately?", correct: "1.4 solar masses", wrong: ["3.0 solar masses", "0.5 solar masses", "2.0 solar masses"] },
    { question: "Who proposed the 'Double Helix' model of DNA?", correct: "Watson and Crick", wrong: ["Rosalind Franklin", "Linus Pauling", "Erwin Chargaff"] },
    { question: "The Laffer Curve relates tax rates to?", correct: "Tax revenue", wrong: ["GDP growth", "Inflation", "Unemployment"] },
    { question: "Madhubani painting originates from which Indian state?", correct: "Bihar", wrong: ["Rajasthan", "Gujarat", "West Bengal"] },
    { question: "What is Avogadro's number approximately?", correct: "6.022 × 10²³", wrong: ["3.14 × 10²³", "1.6 × 10⁻¹⁹", "9.8 × 10²³"] },
    { question: "The Panchsheel Agreement was signed between India and?", correct: "China", wrong: ["Pakistan", "Nepal", "Sri Lanka"] },
    { question: "Which enzyme breaks down starch in saliva?", correct: "Amylase", wrong: ["Lipase", "Protease", "Lactase"] },
    { question: "The Drake Equation estimates the number of?", correct: "Alien civilizations in the Milky Way", wrong: ["Stars in the universe", "Habitable planets", "Black holes"] },
    { question: "Who formulated the laws of planetary motion?", correct: "Johannes Kepler", wrong: ["Galileo", "Copernicus", "Tycho Brahe"] },
]);

// ============================================================
// LEVEL 13 — Very Hard (₹25,00,000)
// ============================================================
addQuestions(13, [
    { question: "In quantum mechanics, the Pauli Exclusion Principle applies to?", correct: "Fermions", wrong: ["Bosons", "Photons", "Mesons"] },
    { question: "The ICJ (International Court of Justice) is located in?", correct: "The Hague", wrong: ["Geneva", "New York", "Brussels"] },
    { question: "What does PCR stand for in genetics?", correct: "Polymerase Chain Reaction", wrong: ["Protein Chain Replication", "Polymer Cell Reaction", "Primary Cell Response"] },
    { question: "Who wrote 'The Republic'?", correct: "Plato", wrong: ["Aristotle", "Socrates", "Homer"] },
    { question: "The Indus Valley script has been?", correct: "Not yet deciphered", wrong: ["Fully decoded", "Partially decoded", "Identified as Sanskrit"] },
    { question: "What is the Schwarzschild radius related to?", correct: "Black holes", wrong: ["White dwarfs", "Neutron stars", "Pulsars"] },
    { question: "Mitochondrial DNA is inherited from?", correct: "Mother only", wrong: ["Father only", "Both parents", "Neither parent"] },
    { question: "The Bretton Woods Conference established which institutions?", correct: "IMF and World Bank", wrong: ["UN and WHO", "WTO and GATT", "NATO and EU"] },
    { question: "Which ancient city was buried by the eruption of Mt. Vesuvius?", correct: "Pompeii", wrong: ["Troy", "Carthage", "Athens"] },
    { question: "Euler's identity (e^iπ + 1 = 0) combines how many fundamental constants?", correct: "5", wrong: ["3", "4", "6"] },
    { question: "The Arthashastra was written by whom?", correct: "Kautilya (Chanakya)", wrong: ["Kalidasa", "Valmiki", "Tulsidas"] },
    { question: "What is the Heisenberg Uncertainty Principle about?", correct: "Position and momentum of particles", wrong: ["Energy of atoms", "Speed of light", "Nuclear decay rates"] },
    { question: "Which hormone regulates blood sugar levels?", correct: "Insulin", wrong: ["Adrenaline", "Thyroxine", "Cortisol"] },
    { question: "The Fibonacci sequence was first described in which text?", correct: "Liber Abaci", wrong: ["Elements", "Principia", "Aryabhatiya"] },
    { question: "What type of bond holds DNA strands together?", correct: "Hydrogen bonds", wrong: ["Covalent bonds", "Ionic bonds", "Metallic bonds"] },
]);

// ============================================================
// LEVEL 14 — Expert (₹50,00,000)
// ============================================================
addQuestions(14, [
    { question: "The Dirac equation describes?", correct: "Relativistic quantum mechanics of fermions", wrong: ["Classical mechanics", "Electromagnetic waves", "Thermodynamic processes"] },
    { question: "Gödel's Incompleteness Theorems relate to?", correct: "Limits of formal mathematical systems", wrong: ["Quantum computing", "Set theory", "Calculus"] },
    { question: "The Treaty of Westphalia (1648) established the concept of?", correct: "State sovereignty", wrong: ["Free trade", "Human rights", "Democracy"] },
    { question: "Restriction enzymes are also known as?", correct: "Molecular scissors", wrong: ["Gene glue", "DNA copiers", "Cell builders"] },
    { question: "Who discovered the structure of benzene?", correct: "August Kekulé", wrong: ["Faraday", "Dalton", "Lavoisier"] },
    { question: "The Kolmogorov complexity measures?", correct: "Shortest program to produce a string", wrong: ["Algorithm speed", "Memory usage", "Data compression ratio"] },
    { question: "Ashoka's inscriptions were deciphered by?", correct: "James Prinsep", wrong: ["Max Müller", "William Jones", "Alexander Cunningham"] },
    { question: "What is the Chandrayaan-3 lander named?", correct: "Vikram", wrong: ["Pragyan", "Mangal", "Aditya"] },
    { question: "In chemistry, chirality refers to?", correct: "Non-superimposable mirror images", wrong: ["Bond angles", "Electron sharing", "Isotope ratios"] },
    { question: "The Riemann Hypothesis concerns the zeros of which function?", correct: "Riemann zeta function", wrong: ["Gamma function", "Bessel function", "Euler function"] },
    { question: "Which Indian defeat led to the Third Battle of Panipat?", correct: "Maratha Confederacy", wrong: ["Mughal Empire", "Sikh Empire", "Rajputs"] },
    { question: "What does the Planck length represent?", correct: "Smallest meaningful length in physics", wrong: ["Wavelength of light", "Atomic radius", "Electron size"] },
    { question: "The Krebs Cycle occurs in which organelle?", correct: "Mitochondria", wrong: ["Nucleus", "Ribosome", "Endoplasmic Reticulum"] },
    { question: "RSA encryption is based on the difficulty of?", correct: "Factoring large prime numbers", wrong: ["Discrete logarithm", "Matrix multiplication", "Hash collision"] },
    { question: "Who synthesized the first artificial element?", correct: "Emilio Segrè (Technetium)", wrong: ["Marie Curie", "Glenn Seaborg", "Lise Meitner"] },
]);

// ============================================================
// LEVEL 15 — Expert (₹1,00,00,000) — Milestone!
// ============================================================
addQuestions(15, [
    { question: "The Poincaré Conjecture was proved by?", correct: "Grigori Perelman", wrong: ["Andrew Wiles", "Terence Tao", "Fields Medal Committee"] },
    { question: "Article 356 of the Indian Constitution is about?", correct: "President's Rule", wrong: ["Fundamental Rights", "Emergency Provisions", "Amendment Process"] },
    { question: "What is the Mpemba effect?", correct: "Hot water freezing faster than cold", wrong: ["Cold water boiling faster", "Ice melting in reverse", "Water flowing uphill"] },
    { question: "Shannon's theorem is fundamental to?", correct: "Information theory", wrong: ["Quantum mechanics", "Relativity", "Thermodynamics"] },
    { question: "The Antikythera mechanism is believed to be an ancient?", correct: "Analog computer for astronomy", wrong: ["Navigation tool", "Musical instrument", "Clock"] },
    { question: "Who discovered the phenomenon of radioactivity?", correct: "Henri Becquerel", wrong: ["Marie Curie", "Rutherford", "Röntgen"] },
    { question: "In cryptography, what does AES stand for?", correct: "Advanced Encryption Standard", wrong: ["Automated Encoding System", "Asymmetric Encryption Security", "Advanced Electronic Security"] },
    { question: "The Noether's theorem links symmetries to?", correct: "Conservation laws", wrong: ["Quantum states", "Thermodynamic cycles", "Wave functions"] },
    { question: "Which Indian mathematician contributed to partition theory?", correct: "Ramanujan", wrong: ["Aryabhata", "Brahmagupta", "Bhaskara II"] },
    { question: "The speed of light in vacuum is exactly?", correct: "299,792,458 m/s", wrong: ["300,000,000 m/s", "299,792,000 m/s", "299,800,000 m/s"] },
    { question: "The Sapir-Whorf hypothesis relates to?", correct: "Language shaping thought", wrong: ["Gravity waves", "Quantum entanglement", "Evolution"] },
    { question: "What is the Bekenstein-Hawking entropy of a black hole proportional to?", correct: "Its surface area", wrong: ["Its mass", "Its volume", "Its charge"] },
    { question: "The Zimmermann Telegram was related to which war?", correct: "World War I", wrong: ["World War II", "Cold War", "Spanish-American War"] },
    { question: "P vs NP is an unsolved problem in?", correct: "Computational complexity theory", wrong: ["Number theory", "Topology", "Group theory"] },
    { question: "Who proposed the theory of Continental Drift?", correct: "Alfred Wegener", wrong: ["Darwin", "Lyell", "Hutton"] },
]);

// ============================================================
// LEVEL 16 — Genius (₹7,00,00,000) — JACKPOT!
// ============================================================
addQuestions(16, [
    { question: "The Langlands Program connects which two branches of math?", correct: "Number theory and geometry", wrong: ["Algebra and topology", "Calculus and statistics", "Logic and set theory"] },
    { question: "Who proposed the 'Many-Worlds' interpretation of quantum mechanics?", correct: "Hugh Everett III", wrong: ["Niels Bohr", "Werner Heisenberg", "Erwin Schrödinger"] },
    { question: "The Birch and Swinnerton-Dyer conjecture relates to?", correct: "Elliptic curves", wrong: ["Prime numbers", "Knot invariants", "Graph coloring"] },
    { question: "Taxol, an anti-cancer drug, was originally derived from?", correct: "Pacific Yew tree bark", wrong: ["Amazon fungi", "Deep sea sponges", "Arctic lichens"] },
    { question: "The Carrington Event of 1859 was a massive?", correct: "Solar storm", wrong: ["Earthquake", "Volcanic eruption", "Hurricane"] },
    { question: "Who first synthesized the element Oganesson (Og)?", correct: "Yuri Oganessian's team at JINR", wrong: ["CERN team", "Fermilab", "Brookhaven Lab"] },
    { question: "The Banach-Tarski Paradox involves?", correct: "Decomposing a sphere into two identical spheres", wrong: ["Infinite hotel rooms", "Unmeasurable sets", "Non-Euclidean geometry"] },
    { question: "In Indian history, the 'Doctrine of Lapse' was introduced by?", correct: "Lord Dalhousie", wrong: ["Lord Curzon", "Lord Mountbatten", "Lord Cornwallis"] },
    { question: "What is the Kolmogorov-Arnold-Moser (KAM) theorem about?", correct: "Stability of dynamical systems", wrong: ["Fluid turbulence", "Chaos theory", "Entropy maximization"] },
    { question: "The Voynich Manuscript is written in?", correct: "An unknown, undeciphered script", wrong: ["Medieval Latin", "Old English", "Arabic cipher"] },
    { question: "Which theorem proves that no consistent system can prove its own consistency?", correct: "Gödel's Second Incompleteness Theorem", wrong: ["Church-Turing Thesis", "Tarski's Undefinability", "Rice's Theorem"] },
    { question: "The Tunguska Event of 1908 was most likely caused by?", correct: "An airburst of a meteoroid", wrong: ["A volcanic eruption", "An earthquake", "A nuclear test"] },
    { question: "Yang-Mills existence and mass gap is one of the?", correct: "Millennium Prize Problems", wrong: ["Fields Medal problems", "Abel Prize problems", "Turing Award challenges"] },
    { question: "Who deciphered the Brahmi script?", correct: "James Prinsep", wrong: ["Max Müller", "Alexander Cunningham", "William Jones"] },
    { question: "The Casimir effect is caused by?", correct: "Quantum vacuum fluctuations", wrong: ["Gravitational waves", "Dark matter interactions", "Electromagnetic interference"] },
]);

// ============================================================
// LEVEL 1 — BATCH 2 — Very Easy (₹1,000)
// ============================================================
addQuestions(1, [
    { question: "1 + 3 equals?", correct: "4", wrong: ["2", "5", "7"] },
    { question: "Which animal gives us wool?", correct: "Sheep", wrong: ["Cow", "Dog", "Horse"] },
    { question: "What color is a tomato?", correct: "Red", wrong: ["Green", "Blue", "Purple"] },
    { question: "How many ears do you have?", correct: "2", wrong: ["1", "3", "4"] },
    { question: "What do we use to write on paper?", correct: "Pencil", wrong: ["Spoon", "Plate", "Cup"] },
    { question: "Which is heavier: a stone or a feather?", correct: "Stone", wrong: ["Feather", "Both same", "Neither"] },
    { question: "What sound does a duck make?", correct: "Quack", wrong: ["Moo", "Bark", "Roar"] },
    { question: "What do we wear on our feet?", correct: "Shoes", wrong: ["Hat", "Gloves", "Belt"] },
    { question: "Which fruit is yellow and curved?", correct: "Banana", wrong: ["Apple", "Orange", "Grapes"] },
    { question: "What do you brush every morning?", correct: "Teeth", wrong: ["Floor", "Hair only", "Nails"] },
    { question: "4 - 1 equals?", correct: "3", wrong: ["2", "4", "5"] },
    { question: "Where do fish live?", correct: "Water", wrong: ["Trees", "Sky", "Underground"] },
    { question: "What is ice made of?", correct: "Water", wrong: ["Milk", "Juice", "Air"] },
    { question: "How many noses do you have?", correct: "1", wrong: ["2", "3", "0"] },
    { question: "What does a hen give us?", correct: "Eggs", wrong: ["Milk", "Honey", "Wool"] },
]);

// ============================================================
// LEVEL 2 — BATCH 2 — Very Easy (₹2,000)
// ============================================================
addQuestions(2, [
    { question: "Which planet is closest to the Sun?", correct: "Mercury", wrong: ["Venus", "Earth", "Mars"] },
    { question: "6 + 4 equals?", correct: "10", wrong: ["8", "9", "11"] },
    { question: "What is the opposite of 'hot'?", correct: "Cold", wrong: ["Warm", "Wet", "Dry"] },
    { question: "How many wheels does a car have?", correct: "4", wrong: ["2", "3", "6"] },
    { question: "What grows on trees?", correct: "Leaves", wrong: ["Rocks", "Fish", "Stars"] },
    { question: "Which meal do we eat in the morning?", correct: "Breakfast", wrong: ["Lunch", "Dinner", "Supper"] },
    { question: "Which is taller: a giraffe or a cat?", correct: "Giraffe", wrong: ["Cat", "Both same", "Neither"] },
    { question: "What color is snow?", correct: "White", wrong: ["Blue", "Yellow", "Gray"] },
    { question: "Where does the Sun go at night?", correct: "Below the horizon", wrong: ["Behind the Moon", "Into the ocean", "It disappears"] },
    { question: "Which animal has a trunk?", correct: "Elephant", wrong: ["Tiger", "Monkey", "Rabbit"] },
    { question: "How many sides does a rectangle have?", correct: "4", wrong: ["3", "5", "6"] },
    { question: "What sound does a lion make?", correct: "Roar", wrong: ["Chirp", "Hiss", "Squeak"] },
    { question: "What do you use an umbrella for?", correct: "Rain protection", wrong: ["Flying", "Cooking", "Swimming"] },
    { question: "Which day comes after Friday?", correct: "Saturday", wrong: ["Sunday", "Thursday", "Monday"] },
    { question: "What is the color of a polar bear?", correct: "White", wrong: ["Brown", "Black", "Gray"] },
]);

// ============================================================
// LEVEL 3 — BATCH 2 — Easy (₹3,000)
// ============================================================
addQuestions(3, [
    { question: "Capital of the USA?", correct: "Washington D.C.", wrong: ["New York", "Los Angeles", "Chicago"] },
    { question: "Which is the tallest animal?", correct: "Giraffe", wrong: ["Elephant", "Horse", "Camel"] },
    { question: "What is the national animal of India?", correct: "Tiger", wrong: ["Lion", "Elephant", "Cow"] },
    { question: "How many planets are in our solar system?", correct: "8", wrong: ["7", "9", "10"] },
    { question: "Which metal is attracted by magnets?", correct: "Iron", wrong: ["Gold", "Silver", "Copper"] },
    { question: "The Nile River is in which continent?", correct: "Africa", wrong: ["Asia", "Europe", "South America"] },
    { question: "What is a baby cow called?", correct: "Calf", wrong: ["Foal", "Lamb", "Kid"] },
    { question: "Which organ do we use to see?", correct: "Eyes", wrong: ["Ears", "Nose", "Tongue"] },
    { question: "What is the currency of India?", correct: "Rupee", wrong: ["Dollar", "Pound", "Euro"] },
    { question: "Which season do leaves fall from trees?", correct: "Autumn", wrong: ["Spring", "Summer", "Winter"] },
    { question: "What is H₂O commonly known as?", correct: "Water", wrong: ["Oxygen", "Hydrogen", "Salt"] },
    { question: "Which creature spins a web?", correct: "Spider", wrong: ["Ant", "Bee", "Butterfly"] },
    { question: "Capital of the United Kingdom?", correct: "London", wrong: ["Paris", "Dublin", "Edinburgh"] },
    { question: "What is the largest continent?", correct: "Asia", wrong: ["Africa", "Europe", "North America"] },
    { question: "Which planet is the biggest in our solar system?", correct: "Jupiter", wrong: ["Saturn", "Uranus", "Neptune"] },
]);

// ============================================================
// LEVEL 4 — BATCH 2 — Easy (₹5,000)
// ============================================================
addQuestions(4, [
    { question: "Which festival involves throwing colors?", correct: "Holi", wrong: ["Diwali", "Eid", "Pongal"] },
    { question: "Who invented the light bulb?", correct: "Thomas Edison", wrong: ["Newton", "Einstein", "Tesla"] },
    { question: "What is the capital of Rajasthan?", correct: "Jaipur", wrong: ["Jodhpur", "Udaipur", "Bikaner"] },
    { question: "How many chambers does the human heart have?", correct: "4", wrong: ["2", "3", "6"] },
    { question: "Which Indian city is called the 'City of Joy'?", correct: "Kolkata", wrong: ["Mumbai", "Delhi", "Chennai"] },
    { question: "What is the national game of India?", correct: "Hockey", wrong: ["Cricket", "Kabaddi", "Football"] },
    { question: "Photosynthesis happens in which part of a plant?", correct: "Leaves", wrong: ["Roots", "Stem", "Flowers"] },
    { question: "Which ocean lies between India and Africa?", correct: "Indian Ocean", wrong: ["Pacific", "Atlantic", "Arctic"] },
    { question: "How many bones does an adult human have?", correct: "206", wrong: ["300", "150", "200"] },
    { question: "Which insect produces silk?", correct: "Silkworm", wrong: ["Butterfly", "Spider", "Bee"] },
    { question: "The Statue of Liberty is in which country?", correct: "USA", wrong: ["France", "UK", "Italy"] },
    { question: "What does RAM stand for in computers?", correct: "Random Access Memory", wrong: ["Read Access Memory", "Rapid Action Memory", "Random Action Module"] },
    { question: "Which famous Indian leader was known as 'Chacha'?", correct: "Jawaharlal Nehru", wrong: ["Gandhi", "Patel", "Ambedkar"] },
    { question: "What is the chemical formula of water?", correct: "H₂O", wrong: ["CO₂", "O₂", "NaCl"] },
    { question: "Which planet is closest to Earth?", correct: "Venus", wrong: ["Mars", "Mercury", "Jupiter"] },
]);

// ============================================================
// LEVEL 5 — BATCH 2 — Easy-Medium (₹10,000) — Milestone!
// ============================================================
addQuestions(5, [
    { question: "Who gave the 'Tryst with Destiny' speech?", correct: "Jawaharlal Nehru", wrong: ["Gandhi", "Ambedkar", "Patel"] },
    { question: "Which element's symbol is 'Fe'?", correct: "Iron", wrong: ["Fluorine", "Francium", "Fermium"] },
    { question: "In which year was the Indian Constitution adopted?", correct: "1950", wrong: ["1947", "1949", "1952"] },
    { question: "Who was the first woman PM of India?", correct: "Indira Gandhi", wrong: ["Sarojini Naidu", "Pratibha Patil", "Sonia Gandhi"] },
    { question: "Which sport uses a shuttlecock?", correct: "Badminton", wrong: ["Tennis", "Cricket", "Table Tennis"] },
    { question: "What is the chemical symbol for silver?", correct: "Ag", wrong: ["Si", "Sv", "Sr"] },
    { question: "The Qutub Minar is in which city?", correct: "Delhi", wrong: ["Agra", "Jaipur", "Lucknow"] },
    { question: "Which vitamin deficiency causes night blindness?", correct: "Vitamin A", wrong: ["Vitamin B", "Vitamin C", "Vitamin D"] },
    { question: "What is the currency of the UK?", correct: "Pound Sterling", wrong: ["Euro", "Dollar", "Franc"] },
    { question: "Which is the smallest continent?", correct: "Australia", wrong: ["Europe", "Antarctica", "South America"] },
    { question: "Who invented the printing press?", correct: "Johannes Gutenberg", wrong: ["Thomas Edison", "Benjamin Franklin", "Galileo"] },
    { question: "Which Indian city is called the 'Blue City'?", correct: "Jodhpur", wrong: ["Jaipur", "Udaipur", "Pushkar"] },
    { question: "What is the largest organ of the human body?", correct: "Skin", wrong: ["Liver", "Brain", "Lungs"] },
    { question: "Who wrote 'The Jungle Book'?", correct: "Rudyard Kipling", wrong: ["Mark Twain", "R.K. Narayan", "Roald Dahl"] },
    { question: "How many overs in a T20 cricket innings?", correct: "20", wrong: ["50", "10", "15"] },
]);

// ============================================================
// LEVEL 6 — BATCH 2 — Medium (₹20,000)
// ============================================================
addQuestions(6, [
    { question: "In which year were the first modern Olympics held?", correct: "1896", wrong: ["1900", "1880", "1912"] },
    { question: "Which Indian state was formed most recently?", correct: "Telangana", wrong: ["Jharkhand", "Uttarakhand", "Chhattisgarh"] },
    { question: "What is the capital of Canada?", correct: "Ottawa", wrong: ["Toronto", "Vancouver", "Montreal"] },
    { question: "CO₂ is also known as?", correct: "Carbon Dioxide", wrong: ["Carbon Monoxide", "Calcium Oxide", "Chlorine Dioxide"] },
    { question: "Who was the first woman in space?", correct: "Valentina Tereshkova", wrong: ["Sally Ride", "Kalpana Chawla", "Mae Jemison"] },
    { question: "The Colosseum is in which city?", correct: "Rome", wrong: ["Athens", "Paris", "London"] },
    { question: "Which blood type is the universal receiver?", correct: "AB Positive", wrong: ["O Positive", "A Negative", "B Positive"] },
    { question: "What is the SI unit of force?", correct: "Newton", wrong: ["Joule", "Watt", "Pascal"] },
    { question: "Who founded the Mughal Empire in India?", correct: "Babur", wrong: ["Akbar", "Humayun", "Shah Jahan"] },
    { question: "The Panama Canal connects which two oceans?", correct: "Atlantic and Pacific", wrong: ["Indian and Pacific", "Arctic and Atlantic", "Indian and Atlantic"] },
    { question: "Who wrote India's national pledge?", correct: "Pydimarri Venkata Subba Rao", wrong: ["Nehru", "Tagore", "Ambedkar"] },
    { question: "Which part of the eye controls how much light enters?", correct: "Iris", wrong: ["Retina", "Cornea", "Pupil"] },
    { question: "The Kalahari Desert is in which continent?", correct: "Africa", wrong: ["Asia", "Australia", "South America"] },
    { question: "Which country is known as the 'Land of Thunder Dragon'?", correct: "Bhutan", wrong: ["China", "Tibet", "Nepal"] },
    { question: "What is the chemical formula of baking soda?", correct: "NaHCO₃", wrong: ["Na₂CO₃", "CaCO₃", "NaOH"] },
]);

// ============================================================
// LEVEL 7 — BATCH 2 — Medium (₹40,000)
// ============================================================
addQuestions(7, [
    { question: "Which Directive Principle relates to the uniform civil code?", correct: "Article 44", wrong: ["Article 39", "Article 45", "Article 48"] },
    { question: "Who wrote 'War and Peace'?", correct: "Leo Tolstoy", wrong: ["Dostoevsky", "Chekhov", "Pushkin"] },
    { question: "The Battle of Stalingrad was fought during which war?", correct: "World War II", wrong: ["World War I", "Cold War", "Korean War"] },
    { question: "What is the atomic number of carbon?", correct: "6", wrong: ["8", "12", "14"] },
    { question: "Which is the only planet that rotates on its side?", correct: "Uranus", wrong: ["Neptune", "Venus", "Pluto"] },
    { question: "How many bones are in the human spine?", correct: "33", wrong: ["26", "24", "30"] },
    { question: "Who was India's first female IPS officer?", correct: "Kiran Bedi", wrong: ["Sarojini Naidu", "Indira Gandhi", "Bachendri Pal"] },
    { question: "Which is the most widely spoken first language?", correct: "Mandarin Chinese", wrong: ["English", "Spanish", "Hindi"] },
    { question: "RNA stands for?", correct: "Ribonucleic Acid", wrong: ["Ribo Nitrogen Acid", "Redo Nucleic Acid", "Reactive Nucleic Acid"] },
    { question: "What is the currency of Egypt?", correct: "Egyptian Pound", wrong: ["Dinar", "Dirham", "Riyal"] },
    { question: "Who led the Quit India Movement?", correct: "Mahatma Gandhi", wrong: ["Subhas Chandra Bose", "Bhagat Singh", "Tilak"] },
    { question: "The Rhine river flows mainly through which country?", correct: "Germany", wrong: ["France", "Netherlands", "Austria"] },
    { question: "What is the primary gas in LPG?", correct: "Butane", wrong: ["Methane", "Propane", "Ethylene"] },
    { question: "Who designed the Indian Parliament House?", correct: "Edwin Lutyens & Herbert Baker", wrong: ["Le Corbusier", "Charles Correa", "B.V. Doshi"] },
    { question: "Which mineral deficiency causes anemia?", correct: "Iron", wrong: ["Calcium", "Zinc", "Potassium"] },
]);

// ============================================================
// LEVEL 8 — BATCH 2 — Medium-Hard (₹80,000)
// ============================================================
addQuestions(8, [
    { question: "Who was the first Indian woman in space?", correct: "Kalpana Chawla", wrong: ["Sunita Williams", "Sirisha Bandla", "Shawna Pandya"] },
    { question: "Which is the deepest ocean trench?", correct: "Mariana Trench", wrong: ["Tonga Trench", "Philippine Trench", "Java Trench"] },
    { question: "What does URL stand for?", correct: "Uniform Resource Locator", wrong: ["Universal Resource Link", "Unified Resource Locator", "Universal Record Locator"] },
    { question: "Who was the youngest Bharat Ratna recipient?", correct: "Sachin Tendulkar", wrong: ["Lata Mangeshkar", "Ravi Shankar", "APJ Abdul Kalam"] },
    { question: "What is the hexadecimal equivalent of decimal 255?", correct: "FF", wrong: ["FE", "F0", "FA"] },
    { question: "Which country has the most official languages?", correct: "Zimbabwe (16)", wrong: ["India (22)", "South Africa (11)", "Bolivia (37)"] },
    { question: "A 'parsec' is a unit of what?", correct: "Distance", wrong: ["Time", "Speed", "Mass"] },
    { question: "Who discovered gravity?", correct: "Isaac Newton", wrong: ["Einstein", "Galileo", "Kepler"] },
    { question: "Mangalyaan was launched by ISRO in which year?", correct: "2013", wrong: ["2014", "2015", "2012"] },
    { question: "Which Indian PM was in office during the 1971 war?", correct: "Indira Gandhi", wrong: ["Lal Bahadur Shastri", "Nehru", "Morarji Desai"] },
    { question: "The Pulitzer Prize is awarded in which country?", correct: "USA", wrong: ["UK", "France", "Sweden"] },
    { question: "What is the approximate speed of light?", correct: "3 × 10⁸ m/s", wrong: ["3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"] },
    { question: "Which programming language was created by James Gosling?", correct: "Java", wrong: ["Python", "C++", "JavaScript"] },
    { question: "India's first nuclear test was conducted at?", correct: "Pokhran", wrong: ["Sriharikota", "Thumba", "Chandipur"] },
    { question: "Which Indian classical dance is from Kerala?", correct: "Kathakali", wrong: ["Bharatanatyam", "Odissi", "Kuchipudi"] },
]);

// ============================================================
// LEVEL 9 — BATCH 2 — Medium-Hard (₹1,60,000)
// ============================================================
addQuestions(9, [
    { question: "The Andes mountain range is in which continent?", correct: "South America", wrong: ["North America", "Asia", "Europe"] },
    { question: "Who is known as the 'Father of the Internet'?", correct: "Vint Cerf", wrong: ["Tim Berners-Lee", "Bill Gates", "Steve Jobs"] },
    { question: "NIFTY 50 belongs to which stock exchange?", correct: "NSE (National Stock Exchange)", wrong: ["BSE", "NYSE", "LSE"] },
    { question: "Which river flows through London?", correct: "Thames", wrong: ["Seine", "Danube", "Rhine"] },
    { question: "The 'Persistence of Memory' was painted by?", correct: "Salvador Dalí", wrong: ["Picasso", "Monet", "Magritte"] },
    { question: "What pH value indicates a strong acid?", correct: "1", wrong: ["7", "14", "10"] },
    { question: "Who composed the background score for 'Slumdog Millionaire'?", correct: "A.R. Rahman", wrong: ["Hans Zimmer", "John Williams", "Ilayaraja"] },
    { question: "Which element is the best conductor of electricity?", correct: "Silver", wrong: ["Copper", "Gold", "Aluminum"] },
    { question: "The Equator passes through how many countries?", correct: "13", wrong: ["10", "15", "20"] },
    { question: "Who wrote 'The God of Small Things'?", correct: "Arundhati Roy", wrong: ["Salman Rushdie", "Jhumpa Lahiri", "Amitav Ghosh"] },
    { question: "Which acid is known as the 'King of Chemicals'?", correct: "Sulfuric Acid", wrong: ["Hydrochloric Acid", "Nitric Acid", "Phosphoric Acid"] },
    { question: "India's first satellite was named?", correct: "Aryabhata", wrong: ["Bhaskara", "Rohini", "INSAT"] },
    { question: "What is the currency of Saudi Arabia?", correct: "Riyal", wrong: ["Dinar", "Dirham", "Pound"] },
    { question: "Which Indian musician won the Grammy for 'Planet Drum'?", correct: "Zakir Hussain", wrong: ["Ravi Shankar", "A.R. Rahman", "L. Shankar"] },
    { question: "How many bits in a byte?", correct: "8", wrong: ["4", "16", "32"] },
]);

// ============================================================
// LEVEL 10 — BATCH 2 — Hard (₹3,20,000) — Milestone!
// ============================================================
addQuestions(10, [
    { question: "Who proposed the Theory of Special Relativity?", correct: "Albert Einstein", wrong: ["Newton", "Maxwell", "Planck"] },
    { question: "Article 32 of the Indian Constitution is about?", correct: "Right to Constitutional Remedies", wrong: ["Right to Equality", "Right to Freedom", "Right to Education"] },
    { question: "Who was India's first woman President?", correct: "Pratibha Patil", wrong: ["Indira Gandhi", "Sarojini Naidu", "Sushma Swaraj"] },
    { question: "Which composer wrote 'The Four Seasons'?", correct: "Vivaldi", wrong: ["Bach", "Handel", "Chopin"] },
    { question: "What is the cube root of 1331?", correct: "11", wrong: ["13", "9", "12"] },
    { question: "The Preamble of the Indian Constitution begins with?", correct: "We, the people of India", wrong: ["The Government of India", "The Parliament of India", "In the name of God"] },
    { question: "Who won the first Nobel Prize in Literature?", correct: "Sully Prudhomme", wrong: ["Leo Tolstoy", "Rudyard Kipling", "Rabindranath Tagore"] },
    { question: "What is absolute zero in Celsius?", correct: "-273.15°C", wrong: ["-100°C", "-459.67°C", "0°C"] },
    { question: "The Red Fort was built by which Mughal Emperor?", correct: "Shah Jahan", wrong: ["Akbar", "Aurangzeb", "Jahangir"] },
    { question: "The Geneva Convention relates to?", correct: "Laws of war", wrong: ["Trade agreements", "Climate change", "Space exploration"] },
    { question: "What is an isotope?", correct: "Same element, different neutrons", wrong: ["Same element, different electrons", "Different elements", "Same neutrons, different protons"] },
    { question: "Which opera is 'La donna è mobile' from?", correct: "Rigoletto", wrong: ["La Traviata", "Aida", "Carmen"] },
    { question: "When did the Indian Constitution come into effect?", correct: "26 January 1950", wrong: ["15 August 1947", "26 November 1949", "1 January 1950"] },
    { question: "Who created the Linux operating system?", correct: "Linus Torvalds", wrong: ["Bill Gates", "Dennis Ritchie", "Steve Wozniak"] },
    { question: "A light year is approximately how many km?", correct: "9.46 trillion km", wrong: ["1 million km", "300,000 km", "1 billion km"] },
]);

// ============================================================
// LEVEL 11 — BATCH 2 — Hard (₹6,40,000)
// ============================================================
addQuestions(11, [
    { question: "What is the IUPAC name of acetone?", correct: "Propan-2-one", wrong: ["Ethanal", "Methanol", "Butanone"] },
    { question: "The 44th Amendment restored which right?", correct: "Right to Property (removed as fundamental)", wrong: ["Right to Education", "Right to Privacy", "Right to Vote"] },
    { question: "The Man Booker International Prize was won first by an Indian author, who?", correct: "No Indian has won it first", wrong: ["Arundhati Roy", "Salman Rushdie", "Amitav Ghosh"] },
    { question: "The Iron Curtain speech was delivered by?", correct: "Winston Churchill", wrong: ["Truman", "Stalin", "Roosevelt"] },
    { question: "What is the space complexity of merge sort?", correct: "O(n)", wrong: ["O(1)", "O(log n)", "O(n²)"] },
    { question: "COP28 was held in which city?", correct: "Dubai", wrong: ["Paris", "Glasgow", "Sharm el-Sheikh"] },
    { question: "Which dynasty built Khajuraho temples?", correct: "Chandela dynasty", wrong: ["Chola", "Pallava", "Gupta"] },
    { question: "The Goldbach Conjecture states that every even number > 2 is?", correct: "Sum of two primes", wrong: ["Product of two primes", "A perfect square", "Divisible by 3"] },
    { question: "What is the main ore of copper?", correct: "Chalcopyrite", wrong: ["Bauxite", "Haematite", "Galena"] },
    { question: "Who directed '2001: A Space Odyssey'?", correct: "Stanley Kubrick", wrong: ["Spielberg", "Ridley Scott", "James Cameron"] },
    { question: "India's first supercomputer was?", correct: "PARAM 8000", wrong: ["CRAY-1", "Anupam", "Prithvi"] },
    { question: "Which enzyme helps in DNA replication?", correct: "DNA Polymerase", wrong: ["RNA Polymerase", "Helicase", "Ligase"] },
    { question: "The ISS orbits at approximately what altitude?", correct: "408 km", wrong: ["200 km", "1000 km", "36000 km"] },
    { question: "Who wrote 'One Hundred Years of Solitude'?", correct: "Gabriel García Márquez", wrong: ["Borges", "Neruda", "Allende"] },
    { question: "What is Planck's constant approximately?", correct: "6.626 × 10⁻³⁴ J·s", wrong: ["6.022 × 10²³", "3 × 10⁸", "1.6 × 10⁻¹⁹"] },
]);

// ============================================================
// LEVEL 12 — BATCH 2 — Very Hard (₹12,50,000)
// ============================================================
addQuestions(12, [
    { question: "Which particle mediates the strong nuclear force?", correct: "Gluon", wrong: ["Photon", "W Boson", "Graviton"] },
    { question: "Who was the first Attorney General of India?", correct: "M.C. Setalvad", wrong: ["K.K. Venugopal", "Niren De", "C.K. Daphtary"] },
    { question: "The Phillips Curve shows the relationship between?", correct: "Inflation and unemployment", wrong: ["GDP and investment", "Supply and demand", "Interest rates and savings"] },
    { question: "The Linear B script was used by which civilization?", correct: "Mycenaean Greeks", wrong: ["Egyptians", "Sumerians", "Indus Valley"] },
    { question: "What is CRISPR an acronym for?", correct: "Clustered Regularly Interspaced Short Palindromic Repeats", wrong: ["Central RNA Integration System", "Coded RNA Insertion Protocol", "Cellular Repair Integrated System"] },
    { question: "The Congress of Vienna took place in which year?", correct: "1814-1815", wrong: ["1789", "1848", "1776"] },
    { question: "A neutron star is the remnant of a?", correct: "Supernova", wrong: ["Red giant", "White dwarf", "Black hole merger"] },
    { question: "Who discovered the double-helix structure of DNA?", correct: "Watson, Crick, and Franklin", wrong: ["Mendel", "Darwin", "Pasteur"] },
    { question: "The Gini coefficient measures?", correct: "Income inequality", wrong: ["GDP growth", "Population density", "Literacy rate"] },
    { question: "Pattachitra painting originates from?", correct: "Odisha", wrong: ["Kerala", "Rajasthan", "Gujarat"] },
    { question: "What is Boltzmann's constant approximately?", correct: "1.38 × 10⁻²³ J/K", wrong: ["6.626 × 10⁻³⁴ J·s", "8.314 J/mol·K", "9.8 m/s²"] },
    { question: "The Non-Aligned Movement was co-founded by Nehru and?", correct: "Tito, Nasser, Sukarno, Nkrumah", wrong: ["Churchill, Roosevelt", "Mao, Stalin", "De Gaulle, Adenauer"] },
    { question: "Which hormone controls the sleep-wake cycle?", correct: "Melatonin", wrong: ["Serotonin", "Dopamine", "Cortisol"] },
    { question: "The Fermi Paradox asks why we haven't?", correct: "Found evidence of alien civilizations", wrong: ["Reached light speed", "Created AI consciousness", "Unified quantum and gravity"] },
    { question: "Who discovered X-rays?", correct: "Wilhelm Röntgen", wrong: ["Marie Curie", "Becquerel", "Rutherford"] },
]);

// ============================================================
// LEVEL 13 — BATCH 2 — Very Hard (₹25,00,000)
// ============================================================
addQuestions(13, [
    { question: "The spin quantum number for an electron is?", correct: "±1/2", wrong: ["±1", "0", "±3/2"] },
    { question: "The International Criminal Court is governed by the?", correct: "Rome Statute", wrong: ["Geneva Convention", "UN Charter", "Hague Convention"] },
    { question: "What is gel electrophoresis used to separate?", correct: "DNA fragments by size", wrong: ["Proteins by charge", "Cells by type", "RNA by function"] },
    { question: "Who wrote 'Thus Spoke Zarathustra'?", correct: "Friedrich Nietzsche", wrong: ["Immanuel Kant", "Hegel", "Schopenhauer"] },
    { question: "The Harappan civilization's major port was?", correct: "Lothal", wrong: ["Mohenjo-daro", "Harappa", "Dholavira"] },
    { question: "What is the Roche limit?", correct: "Distance within which a body is torn apart by tidal forces", wrong: ["Maximum orbit height", "Speed of light boundary", "Nuclear fusion threshold"] },
    { question: "Epigenetics studies changes caused by?", correct: "Gene expression modification, not DNA changes", wrong: ["DNA mutations", "Chromosome deletions", "RNA interference"] },
    { question: "The Marshall Plan was designed to rebuild?", correct: "Post-WWII Europe", wrong: ["Post-WWI Germany", "Cold War Asia", "Latin America"] },
    { question: "The ancient city of Persepolis was capital of which empire?", correct: "Achaemenid (Persian) Empire", wrong: ["Roman Empire", "Byzantine Empire", "Ottoman Empire"] },
    { question: "The Riemann zeta function is defined for which values?", correct: "Complex numbers with real part > 1 (analytically continued)", wrong: ["Only real numbers", "Only integers", "Only positive numbers"] },
    { question: "Who wrote the Arthashastra?", correct: "Chanakya", wrong: ["Ashoka", "Kalidasa", "Panini"] },
    { question: "Bell's Theorem disproves?", correct: "Local hidden variable theories", wrong: ["General relativity", "Quantum superposition", "Wave-particle duality"] },
    { question: "Which gland is called the 'master gland'?", correct: "Pituitary", wrong: ["Thyroid", "Adrenal", "Pineal"] },
    { question: "The Golden Ratio is approximately?", correct: "1.618", wrong: ["3.14", "2.718", "1.414"] },
    { question: "Telomeres are located at the?", correct: "Ends of chromosomes", wrong: ["Center of chromosomes", "Cell membrane", "Nucleus wall"] },
]);

// ============================================================
// LEVEL 14 — BATCH 2 — Expert (₹50,00,000)
// ============================================================
addQuestions(14, [
    { question: "The Lamb shift is a difference in energy levels of?", correct: "Hydrogen atom", wrong: ["Helium atom", "Carbon atom", "Uranium atom"] },
    { question: "The Millennium Prize Problems are set by?", correct: "Clay Mathematics Institute", wrong: ["Fields Institute", "MIT", "Princeton"] },
    { question: "The Peace of Westphalia ended which wars?", correct: "Thirty Years' War and Eighty Years' War", wrong: ["Hundred Years' War", "Seven Years' War", "Napoleonic Wars"] },
    { question: "Cas9 is what type of molecule in CRISPR?", correct: "Endonuclease (protein)", wrong: ["RNA", "DNA", "Lipid"] },
    { question: "Who discovered the benzene ring structure via a dream?", correct: "Friedrich August Kekulé", wrong: ["Lavoisier", "Dalton", "Mendeleev"] },
    { question: "Big-O notation O(n log n) describes which sorting algorithm?", correct: "Merge Sort", wrong: ["Bubble Sort", "Insertion Sort", "Selection Sort"] },
    { question: "The Satavahana dynasty ruled primarily in?", correct: "Deccan India", wrong: ["Northern India", "Eastern India", "Western India"] },
    { question: "India's GSLV rocket uses which cryogenic stage?", correct: "CE-20", wrong: ["CE-7.5", "Vikas", "RD-180"] },
    { question: "Enantiomers are molecules that are?", correct: "Non-superimposable mirror images", wrong: ["Structural isomers", "Identical copies", "Different compounds"] },
    { question: "The Hodge Conjecture is about which mathematical objects?", correct: "Algebraic cycles on algebraic varieties", wrong: ["Prime number distribution", "Topological spaces", "Group symmetries"] },
    { question: "The Battle of Talikota (1565) destroyed which empire?", correct: "Vijayanagara Empire", wrong: ["Mughal Empire", "Chola Empire", "Maratha Empire"] },
    { question: "What is the Planck temperature?", correct: "~1.42 × 10³² Kelvin", wrong: ["~1 × 10⁶ Kelvin", "~1 × 10¹⁰ Kelvin", "Absolute zero"] },
    { question: "The citric acid cycle produces how many ATP per cycle?", correct: "2 (via GTP)", wrong: ["36", "10", "0"] },
    { question: "Diffie-Hellman key exchange is based on?", correct: "Discrete logarithm problem", wrong: ["Integer factorization", "Elliptic curves", "Hash functions"] },
    { question: "Who created the first periodic table?", correct: "Dmitri Mendeleev", wrong: ["Dalton", "Bohr", "Lavoisier"] },
]);

// ============================================================
// LEVEL 15 — BATCH 2 — Expert (₹1,00,00,000) — Milestone!
// ============================================================
addQuestions(15, [
    { question: "The Navier-Stokes existence problem is about?", correct: "Smooth solutions in fluid dynamics", wrong: ["Quantum gravity", "String theory", "Nuclear fusion"] },
    { question: "Which Schedule of Indian Constitution deals with languages?", correct: "Eighth Schedule", wrong: ["Seventh Schedule", "Ninth Schedule", "Tenth Schedule"] },
    { question: "What is the Meissner effect?", correct: "Expulsion of magnetic field from a superconductor", wrong: ["Quantum tunneling", "Electron pairing", "Photon emission"] },
    { question: "Claude Shannon is the father of?", correct: "Information Theory", wrong: ["Computer Science", "Quantum Computing", "Cybernetics"] },
    { question: "The Phaistos Disc from Crete remains?", correct: "Undeciphered", wrong: ["Translated to Greek", "A forgery", "A star map"] },
    { question: "Who discovered the neutron?", correct: "James Chadwick", wrong: ["Rutherford", "Bohr", "Thomson"] },
    { question: "In cryptography, what is a zero-knowledge proof?", correct: "Proving knowledge without revealing it", wrong: ["Encrypting with no key", "A hash with no collisions", "A signature without identity"] },
    { question: "Emmy Noether's theorem connects?", correct: "Symmetries and conservation laws", wrong: ["Mass and energy", "Space and time", "Charge and current"] },
    { question: "Which Indian mathematician independently discovered the 'Hardy-Ramanujan number'?", correct: "Srinivasa Ramanujan", wrong: ["Aryabhata", "Brahmagupta", "C.R. Rao"] },
    { question: "The fine-structure constant is approximately?", correct: "1/137", wrong: ["1/100", "1/42", "1/256"] },
    { question: "The Chomsky hierarchy classifies?", correct: "Formal grammars and languages", wrong: ["Neural networks", "Operating systems", "Database models"] },
    { question: "Hawking radiation is emitted from?", correct: "Black hole event horizons", wrong: ["Neutron stars", "White dwarfs", "Pulsars"] },
    { question: "The Sykes-Picot Agreement (1916) secretly divided?", correct: "Ottoman territories between Britain and France", wrong: ["African colonies", "Indian provinces", "Chinese ports"] },
    { question: "What is NP-Completeness?", correct: "Problems verifiable in polynomial time, at least as hard as any NP problem", wrong: ["Unsolvable problems", "Linear time algorithms", "Constant space problems"] },
    { question: "The Chandrasekhar mass limit is for?", correct: "White dwarf stars", wrong: ["Black holes", "Neutron stars", "Red giants"] },
]);

// ============================================================
// LEVEL 16 — BATCH 2 — Genius (₹7,00,00,000) — JACKPOT!
// ============================================================
addQuestions(16, [
    { question: "The ABC conjecture in number theory was claimed proved by?", correct: "Shinichi Mochizuki", wrong: ["Terence Tao", "Andrew Wiles", "Grigori Perelman"] },
    { question: "Who proposed the holographic principle in physics?", correct: "Gerard 't Hooft", wrong: ["Stephen Hawking", "Leonard Susskind", "Roger Penrose"] },
    { question: "The Collatz conjecture involves iterating what operations?", correct: "If even halve, if odd triple+1", wrong: ["Square and subtract", "Add primes", "Divide by 3"] },
    { question: "Topoisomerase enzymes control?", correct: "DNA supercoiling", wrong: ["RNA splicing", "Protein folding", "Lipid synthesis"] },
    { question: "The Wow! Signal of 1977 came from which constellation?", correct: "Sagittarius", wrong: ["Orion", "Andromeda", "Cygnus"] },
    { question: "Who synthesized the first organic compound from inorganic materials?", correct: "Friedrich Wöhler (urea)", wrong: ["Lavoisier", "Pasteur", "Berzelius"] },
    { question: "The Continuum Hypothesis was shown to be independent of ZFC by?", correct: "Paul Cohen", wrong: ["Kurt Gödel", "Cantor", "Zermelo"] },
    { question: "In Indian history, who wrote Rajatarangini?", correct: "Kalhana", wrong: ["Kalidasa", "Banabhatta", "Vishakhadatta"] },
    { question: "The Navier-Stokes equations describe?", correct: "Fluid dynamics", wrong: ["Electromagnetic waves", "Quantum fields", "Gravitational forces"] },
    { question: "The 'Ship of Theseus' is a paradox about?", correct: "Identity persistence", wrong: ["Time travel", "Free will", "Infinite regress"] },
    { question: "Which theorem states every continuous function on a closed interval attains max and min?", correct: "Extreme Value Theorem", wrong: ["Mean Value Theorem", "Rolle's Theorem", "Intermediate Value Theorem"] },
    { question: "The Antikythera mechanism dates to approximately?", correct: "150-100 BC", wrong: ["500 AD", "1000 BC", "50 AD"] },
    { question: "The Berezinskii–Kosterlitz–Thouless transition occurs in?", correct: "2D systems", wrong: ["3D crystals", "Black holes", "Nuclear reactors"] },
    { question: "Who first observed the photoelectric effect?", correct: "Heinrich Hertz", wrong: ["Einstein", "Planck", "Bohr"] },
    { question: "The Mpemba effect in physics describes?", correct: "Hot water freezing faster than cold", wrong: ["Cold fusion", "Quantum tunneling of water", "Supercooling reversal"] },
]);

// ============================================================
// LEVEL 1 — BATCH 3 — Very Easy (₹1,000)
// ============================================================
addQuestions(1, [
    { question: "What color is milk?", correct: "White", wrong: ["Blue", "Green", "Red"] },
    { question: "Which animal has a long neck?", correct: "Giraffe", wrong: ["Dog", "Cat", "Fish"] },
    { question: "2 + 3 equals?", correct: "5", wrong: ["4", "6", "7"] },
    { question: "What do we use to cut paper?", correct: "Scissors", wrong: ["Spoon", "Pen", "Plate"] },
    { question: "Which fruit is orange in color?", correct: "Orange", wrong: ["Apple", "Grape", "Kiwi"] },
    { question: "How many legs does a bird have?", correct: "2", wrong: ["4", "6", "0"] },
    { question: "What falls from clouds?", correct: "Rain", wrong: ["Sand", "Stones", "Leaves"] },
    { question: "Which vehicle flies in the sky?", correct: "Airplane", wrong: ["Car", "Boat", "Bus"] },
    { question: "6 - 4 equals?", correct: "2", wrong: ["3", "1", "4"] },
    { question: "What do we sleep on?", correct: "Bed", wrong: ["Table", "Chair", "Shelf"] },
    { question: "Which season brings snow?", correct: "Winter", wrong: ["Summer", "Spring", "Monsoon"] },
    { question: "What shape is an egg?", correct: "Oval", wrong: ["Square", "Triangle", "Star"] },
    { question: "Which animal hops?", correct: "Rabbit", wrong: ["Snake", "Fish", "Turtle"] },
    { question: "What do you do with a book?", correct: "Read", wrong: ["Eat", "Wear", "Throw"] },
    { question: "How many thumbs do you have?", correct: "2", wrong: ["1", "5", "10"] },
]);

// ============================================================
// LEVEL 2 — BATCH 3 — Very Easy (₹2,000)
// ============================================================
addQuestions(2, [
    { question: "Which animal is called man's best friend?", correct: "Dog", wrong: ["Cat", "Parrot", "Horse"] },
    { question: "What is the opposite of 'big'?", correct: "Small", wrong: ["Tall", "Fast", "Heavy"] },
    { question: "Which instrument has black and white keys?", correct: "Piano", wrong: ["Guitar", "Drum", "Flute"] },
    { question: "7 + 3 equals?", correct: "10", wrong: ["8", "9", "11"] },
    { question: "Where do penguins live?", correct: "Antarctica", wrong: ["Desert", "Jungle", "City"] },
    { question: "What is the color of an emerald?", correct: "Green", wrong: ["Red", "Blue", "Purple"] },
    { question: "Which day comes before Wednesday?", correct: "Tuesday", wrong: ["Thursday", "Monday", "Friday"] },
    { question: "What do butterflies come from?", correct: "Caterpillars", wrong: ["Eggs", "Seeds", "Flowers"] },
    { question: "Which fruit has seeds on the outside?", correct: "Strawberry", wrong: ["Mango", "Apple", "Banana"] },
    { question: "How many hours in a day?", correct: "24", wrong: ["12", "20", "30"] },
    { question: "What is frozen water called?", correct: "Ice", wrong: ["Steam", "Fog", "Snow only"] },
    { question: "Which body part do we hear with?", correct: "Ears", wrong: ["Eyes", "Nose", "Mouth"] },
    { question: "What does a clock tell us?", correct: "Time", wrong: ["Weather", "Direction", "Speed"] },
    { question: "Which animal carries its home on its back?", correct: "Snail", wrong: ["Dog", "Bird", "Frog"] },
    { question: "15 - 5 equals?", correct: "10", wrong: ["8", "11", "12"] },
]);

// ============================================================
// LEVEL 3 — BATCH 3 — Easy (₹3,000)
// ============================================================
addQuestions(3, [
    { question: "Which country is famous for the Eiffel Tower?", correct: "France", wrong: ["Italy", "Germany", "Spain"] },
    { question: "What is the national fruit of India?", correct: "Mango", wrong: ["Apple", "Banana", "Guava"] },
    { question: "How many teeth does a normal adult have?", correct: "32", wrong: ["28", "36", "40"] },
    { question: "Which animal is the fastest in water?", correct: "Sailfish", wrong: ["Shark", "Dolphin", "Whale"] },
    { question: "What is the largest island in the world?", correct: "Greenland", wrong: ["Madagascar", "Iceland", "Australia"] },
    { question: "Which instrument does a doctor use to listen to heartbeats?", correct: "Stethoscope", wrong: ["Thermometer", "Microscope", "Barometer"] },
    { question: "What do plants need to make food?", correct: "Sunlight", wrong: ["Moonlight", "Sand", "Plastic"] },
    { question: "Which planet is closest to the Sun?", correct: "Mercury", wrong: ["Venus", "Earth", "Mars"] },
    { question: "What is the capital of Japan?", correct: "Tokyo", wrong: ["Beijing", "Seoul", "Bangkok"] },
    { question: "How many legs does a spider have?", correct: "8", wrong: ["6", "10", "4"] },
    { question: "Which gas do plants absorb?", correct: "Carbon Dioxide", wrong: ["Oxygen", "Nitrogen", "Helium"] },
    { question: "What type of animal is a dolphin?", correct: "Mammal", wrong: ["Fish", "Reptile", "Bird"] },
    { question: "Which bird is the largest in the world?", correct: "Ostrich", wrong: ["Eagle", "Penguin", "Albatross"] },
    { question: "What is a group of lions called?", correct: "Pride", wrong: ["Pack", "Flock", "Herd"] },
    { question: "Which organ helps us breathe?", correct: "Lungs", wrong: ["Heart", "Liver", "Stomach"] },
]);

// ============================================================
// LEVEL 4 — BATCH 3 — Easy (₹5,000)
// ============================================================
addQuestions(4, [
    { question: "Which sport is played with a racket and shuttlecock?", correct: "Badminton", wrong: ["Tennis", "Cricket", "Golf"] },
    { question: "What is the capital of Germany?", correct: "Berlin", wrong: ["Munich", "Hamburg", "Frankfurt"] },
    { question: "Which planet is known for 'The Great Red Spot'?", correct: "Jupiter", wrong: ["Mars", "Saturn", "Neptune"] },
    { question: "Who wrote the Ramayana?", correct: "Valmiki", wrong: ["Tulsidas", "Vyasa", "Kalidasa"] },
    { question: "What does a barometer measure?", correct: "Air pressure", wrong: ["Temperature", "Humidity", "Wind speed"] },
    { question: "Which Indian state is the largest by area?", correct: "Rajasthan", wrong: ["Madhya Pradesh", "Maharashtra", "Uttar Pradesh"] },
    { question: "How many strings does a standard guitar have?", correct: "6", wrong: ["4", "5", "8"] },
    { question: "Which ancient wonder was in Egypt?", correct: "Great Pyramid of Giza", wrong: ["Colosseum", "Machu Picchu", "Stonehenge"] },
    { question: "What is the main source of energy for Earth?", correct: "Sun", wrong: ["Moon", "Wind", "Volcanoes"] },
    { question: "Which is the hardest rock?", correct: "Diamond", wrong: ["Granite", "Marble", "Quartz"] },
    { question: "What is the currency of the United States?", correct: "Dollar", wrong: ["Euro", "Pound", "Peso"] },
    { question: "Which vitamin is abundant in citrus fruits?", correct: "Vitamin C", wrong: ["Vitamin A", "Vitamin D", "Vitamin K"] },
    { question: "What is the study of stars and space called?", correct: "Astronomy", wrong: ["Astrology", "Biology", "Geography"] },
    { question: "Which dance form is from Punjab?", correct: "Bhangra", wrong: ["Kathak", "Bharatanatyam", "Garba"] },
    { question: "How many states are in India?", correct: "28", wrong: ["29", "30", "27"] },
]);

// ============================================================
// LEVEL 5 — BATCH 3 — Easy-Medium (₹10,000)
// ============================================================
addQuestions(5, [
    { question: "Who was the first Governor-General of independent India?", correct: "Lord Mountbatten", wrong: ["C. Rajagopalachari", "Nehru", "Patel"] },
    { question: "What is the chemical symbol for sodium?", correct: "Na", wrong: ["So", "Sd", "No"] },
    { question: "The Battle of Panipat (1526) was fought between?", correct: "Babur and Ibrahim Lodi", wrong: ["Akbar and Hemu", "Aurangzeb and Shivaji", "Prithviraj and Ghori"] },
    { question: "Who invented the World Wide Web?", correct: "Tim Berners-Lee", wrong: ["Bill Gates", "Steve Jobs", "Vint Cerf"] },
    { question: "Which lake is the largest freshwater lake by area?", correct: "Lake Superior", wrong: ["Lake Baikal", "Lake Victoria", "Caspian Sea"] },
    { question: "What does SIM stand for in SIM card?", correct: "Subscriber Identity Module", wrong: ["System Identity Module", "Smart Internet Module", "Signal Input Module"] },
    { question: "Which Indian state is known for tea plantations?", correct: "Assam", wrong: ["Punjab", "Rajasthan", "Gujarat"] },
    { question: "What is the powerhouse of a cell?", correct: "Mitochondria", wrong: ["Nucleus", "Ribosome", "Golgi body"] },
    { question: "Which country has the most population?", correct: "India", wrong: ["China", "USA", "Indonesia"] },
    { question: "What is the SI unit of temperature?", correct: "Kelvin", wrong: ["Celsius", "Fahrenheit", "Joule"] },
    { question: "Who composed 'Saare Jahan Se Accha'?", correct: "Muhammad Iqbal", wrong: ["Tagore", "Faiz", "Ghalib"] },
    { question: "Which gas is used in fire extinguishers?", correct: "Carbon Dioxide", wrong: ["Oxygen", "Nitrogen", "Helium"] },
    { question: "What is the national tree of India?", correct: "Banyan", wrong: ["Neem", "Peepal", "Teak"] },
    { question: "Which planet rotates the fastest?", correct: "Jupiter", wrong: ["Saturn", "Earth", "Mars"] },
    { question: "How many decades in a century?", correct: "10", wrong: ["5", "20", "50"] },
]);

// ============================================================
// LEVEL 6 — BATCH 3 — Medium (₹20,000)
// ============================================================
addQuestions(6, [
    { question: "Which treaty ended World War I?", correct: "Treaty of Versailles", wrong: ["Treaty of Paris", "Treaty of Tordesillas", "Treaty of Westphalia"] },
    { question: "Which Indian state was the first to be formed on a linguistic basis?", correct: "Andhra Pradesh", wrong: ["Tamil Nadu", "Karnataka", "Maharashtra"] },
    { question: "What is the capital of Brazil?", correct: "Brasília", wrong: ["Rio de Janeiro", "São Paulo", "Salvador"] },
    { question: "Which vitamin is also known as ascorbic acid?", correct: "Vitamin C", wrong: ["Vitamin A", "Vitamin D", "Vitamin E"] },
    { question: "Who was the first Indian to win an Olympic individual gold medal?", correct: "Abhinav Bindra", wrong: ["Neeraj Chopra", "Sushil Kumar", "P.V. Sindhu"] },
    { question: "Machu Picchu is in which country?", correct: "Peru", wrong: ["Brazil", "Mexico", "Chile"] },
    { question: "Which blood cells fight infections?", correct: "White Blood Cells", wrong: ["Red Blood Cells", "Platelets", "Plasma"] },
    { question: "What is the SI unit of resistance?", correct: "Ohm", wrong: ["Volt", "Ampere", "Watt"] },
    { question: "Who founded the Sikh Empire?", correct: "Maharaja Ranjit Singh", wrong: ["Guru Nanak", "Guru Gobind Singh", "Banda Bahadur"] },
    { question: "The Strait of Gibraltar separates which two continents?", correct: "Europe and Africa", wrong: ["Asia and Africa", "Europe and Asia", "North and South America"] },
    { question: "Who is considered the father of modern physics?", correct: "Galileo Galilei", wrong: ["Newton", "Einstein", "Faraday"] },
    { question: "Which organ produces bile?", correct: "Liver", wrong: ["Stomach", "Pancreas", "Kidney"] },
    { question: "The Dead Sea borders which two countries?", correct: "Israel and Jordan", wrong: ["Egypt and Libya", "Iraq and Iran", "Turkey and Syria"] },
    { question: "Which country is called the 'Land of White Elephants'?", correct: "Thailand", wrong: ["Myanmar", "Cambodia", "Laos"] },
    { question: "What is the chemical formula of methane?", correct: "CH₄", wrong: ["CO₂", "C₂H₆", "CH₃OH"] },
]);

// ============================================================
// LEVEL 7 — BATCH 3 — Medium (₹40,000)
// ============================================================
addQuestions(7, [
    { question: "Which amendment lowered the voting age from 21 to 18 in India?", correct: "61st Amendment", wrong: ["42nd Amendment", "44th Amendment", "73rd Amendment"] },
    { question: "Who wrote 'The Canterbury Tales'?", correct: "Geoffrey Chaucer", wrong: ["Shakespeare", "Milton", "Keats"] },
    { question: "The Cuban Missile Crisis occurred in which year?", correct: "1962", wrong: ["1960", "1965", "1959"] },
    { question: "What is the atomic number of oxygen?", correct: "8", wrong: ["6", "10", "16"] },
    { question: "Which is the densest planet in our solar system?", correct: "Earth", wrong: ["Mercury", "Jupiter", "Venus"] },
    { question: "What is the smallest bone in the human body?", correct: "Stapes", wrong: ["Malleus", "Incus", "Hyoid"] },
    { question: "Who founded the Gupta Empire?", correct: "Sri Gupta", wrong: ["Chandragupta I", "Samudragupta", "Chandragupta II"] },
    { question: "Which language has the most native speakers after Mandarin?", correct: "Spanish", wrong: ["English", "Hindi", "Arabic"] },
    { question: "What does HTML stand for?", correct: "HyperText Markup Language", wrong: ["High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"] },
    { question: "What is the currency of Switzerland?", correct: "Swiss Franc", wrong: ["Euro", "Dollar", "Krona"] },
    { question: "Who started the Bhoodan Movement?", correct: "Vinoba Bhave", wrong: ["Gandhi", "Jayaprakash Narayan", "Ambedkar"] },
    { question: "The Danube River flows through how many countries?", correct: "10", wrong: ["5", "8", "15"] },
    { question: "What is CNG primarily composed of?", correct: "Methane", wrong: ["Propane", "Butane", "Ethane"] },
    { question: "Who designed Chandigarh city?", correct: "Le Corbusier", wrong: ["Edwin Lutyens", "Charles Correa", "Laurie Baker"] },
    { question: "Which mineral deficiency causes goitre?", correct: "Iodine", wrong: ["Iron", "Calcium", "Zinc"] },
]);

// ============================================================
// LEVEL 8 — BATCH 3 — Medium-Hard (₹80,000)
// ============================================================
addQuestions(8, [
    { question: "Who was the first Indian to win a Nobel Prize?", correct: "Rabindranath Tagore", wrong: ["C.V. Raman", "Amartya Sen", "Mother Teresa"] },
    { question: "Which is the longest canal in the world?", correct: "Grand Canal of China", wrong: ["Suez Canal", "Panama Canal", "Indira Gandhi Canal"] },
    { question: "What does SMTP stand for?", correct: "Simple Mail Transfer Protocol", wrong: ["Secure Mail Transfer Protocol", "Server Message Transfer Protocol", "Simple Message Transmission Protocol"] },
    { question: "Who was the last Mughal Emperor?", correct: "Bahadur Shah Zafar", wrong: ["Aurangzeb", "Shah Alam II", "Akbar Shah II"] },
    { question: "What is the octal equivalent of decimal 16?", correct: "20", wrong: ["16", "18", "22"] },
    { question: "Which country has the most volcanoes?", correct: "Indonesia", wrong: ["Japan", "Philippines", "Iceland"] },
    { question: "A 'micron' is equal to how many meters?", correct: "10⁻⁶ meters", wrong: ["10⁻³ meters", "10⁻⁹ meters", "10⁻¹² meters"] },
    { question: "Who proposed the Uncertainty Principle?", correct: "Werner Heisenberg", wrong: ["Bohr", "Schrödinger", "Dirac"] },
    { question: "Hampi ruins belong to which empire?", correct: "Vijayanagara Empire", wrong: ["Chola Empire", "Mughal Empire", "Maratha Empire"] },
    { question: "Which Indian PM declared Emergency in 1975?", correct: "Indira Gandhi", wrong: ["Morarji Desai", "Charan Singh", "Rajiv Gandhi"] },
    { question: "The Ramon Magsaysay Award is named after the president of?", correct: "Philippines", wrong: ["Mexico", "Argentina", "Brazil"] },
    { question: "What is the speed of light approximately?", correct: "3 × 10⁸ m/s", wrong: ["3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"] },
    { question: "Which programming language is named after a coffee-producing island?", correct: "Java", wrong: ["Python", "Ruby", "Go"] },
    { question: "India's first nuclear power plant is at?", correct: "Tarapur", wrong: ["Kalpakkam", "Kudankulam", "Rawatbhata"] },
    { question: "Which classical dance form is from Manipur?", correct: "Manipuri", wrong: ["Mohiniyattam", "Sattriya", "Kuchipudi"] },
]);

// ============================================================
// LEVEL 9 — BATCH 3 — Medium-Hard (₹1,60,000)
// ============================================================
addQuestions(9, [
    { question: "The Himalayas are an example of which type of mountains?", correct: "Fold mountains", wrong: ["Block mountains", "Volcanic mountains", "Residual mountains"] },
    { question: "Who is known as the 'Father of Artificial Intelligence'?", correct: "John McCarthy", wrong: ["Alan Turing", "Marvin Minsky", "Geoffrey Hinton"] },
    { question: "The Dow Jones index belongs to which country?", correct: "USA", wrong: ["UK", "Japan", "Germany"] },
    { question: "Which river flows through Baghdad?", correct: "Tigris", wrong: ["Euphrates", "Nile", "Jordan"] },
    { question: "'Guernica' was painted by?", correct: "Pablo Picasso", wrong: ["Dalí", "Monet", "Van Gogh"] },
    { question: "What is the pH of human blood approximately?", correct: "7.4", wrong: ["7.0", "6.8", "8.0"] },
    { question: "Who directed 'Sholay'?", correct: "Ramesh Sippy", wrong: ["Yash Chopra", "Raj Kapoor", "Manmohan Desai"] },
    { question: "Which allotrope of carbon is used in nuclear reactors?", correct: "Graphite", wrong: ["Diamond", "Fullerene", "Carbon nanotube"] },
    { question: "How many Union Territories does India have?", correct: "8", wrong: ["7", "9", "6"] },
    { question: "Who wrote 'Gitanjali'?", correct: "Rabindranath Tagore", wrong: ["Sarojini Naidu", "Premchand", "Mirza Ghalib"] },
    { question: "Which acid is present in vinegar?", correct: "Acetic Acid", wrong: ["Citric Acid", "Hydrochloric Acid", "Formic Acid"] },
    { question: "India's first communication satellite was?", correct: "APPLE", wrong: ["INSAT-1A", "Bhaskara", "Aryabhata"] },
    { question: "What is the currency of Poland?", correct: "Zloty", wrong: ["Euro", "Koruna", "Forint"] },
    { question: "Which Carnatic musician is called the 'Musical Trinity' along with Tyagaraja and Muthuswami Dikshitar?", correct: "Syama Sastri", wrong: ["M.S. Subbulakshmi", "Purandara Dasa", "Swati Tirunal"] },
    { question: "How many bits in a kilobyte?", correct: "8192", wrong: ["1000", "1024", "8000"] },
]);

// ============================================================
// LEVEL 10 — BATCH 3 — Hard (₹3,20,000)
// ============================================================
addQuestions(10, [
    { question: "Who proposed the theory of natural selection alongside Darwin?", correct: "Alfred Russel Wallace", wrong: ["Lamarck", "Mendel", "Huxley"] },
    { question: "Article 19 of the Indian Constitution deals with?", correct: "Right to Freedom", wrong: ["Right to Equality", "Right against Exploitation", "Right to Education"] },
    { question: "Who was India's first Field Marshal?", correct: "Sam Manekshaw", wrong: ["K.M. Cariappa", "Arjan Singh", "Kodandera Thimayya"] },
    { question: "Which composer wrote 'The Messiah'?", correct: "Handel", wrong: ["Bach", "Mozart", "Beethoven"] },
    { question: "What is the value of 'e' (Euler's number) approximately?", correct: "2.718", wrong: ["3.14", "1.618", "2.236"] },
    { question: "The Goods and Services Tax (GST) was introduced in India in which year?", correct: "2017", wrong: ["2016", "2018", "2015"] },
    { question: "Which Indian scientist is known for the Bose-Einstein statistics?", correct: "Satyendra Nath Bose", wrong: ["C.V. Raman", "Homi Bhabha", "Vikram Sarabhai"] },
    { question: "What is the SI unit of luminous intensity?", correct: "Candela", wrong: ["Lumen", "Lux", "Watt"] },
    { question: "Who built Humayun's Tomb?", correct: "Haji Begum (Hamida Banu)", wrong: ["Humayun himself", "Akbar", "Shah Jahan"] },
    { question: "The Kyoto Protocol was adopted in which year?", correct: "1997", wrong: ["2000", "1992", "2005"] },
    { question: "Which subatomic particle was discovered by J.J. Thomson?", correct: "Electron", wrong: ["Proton", "Neutron", "Positron"] },
    { question: "Which opera features the aria 'Nessun Dorma'?", correct: "Turandot", wrong: ["Aida", "La Bohème", "Tosca"] },
    { question: "When was the Right to Information (RTI) Act passed in India?", correct: "2005", wrong: ["2002", "2010", "2000"] },
    { question: "Who developed the first computer programming language?", correct: "Ada Lovelace", wrong: ["Charles Babbage", "Alan Turing", "Grace Hopper"] },
    { question: "The Oort Cloud is located at the edge of what?", correct: "Solar System", wrong: ["Milky Way", "Andromeda Galaxy", "Kuiper Belt"] },
]);

// ============================================================
// LEVEL 11 — BATCH 3 — Hard (₹6,40,000)
// ============================================================
addQuestions(11, [
    { question: "What is the IUPAC name of ethyl alcohol?", correct: "Ethanol", wrong: ["Methanol", "Propanol", "Butanol"] },
    { question: "The 73rd Amendment deals with?", correct: "Panchayati Raj", wrong: ["Municipalities", "Scheduled Tribes", "Anti-Defection"] },
    { question: "The Pulitzer Prize for Fiction was first awarded in?", correct: "1918", wrong: ["1900", "1925", "1945"] },
    { question: "Who coined the term 'Iron Curtain'?", correct: "Winston Churchill", wrong: ["Stalin", "Truman", "Roosevelt"] },
    { question: "What is the time complexity of quicksort in the average case?", correct: "O(n log n)", wrong: ["O(n²)", "O(n)", "O(log n)"] },
    { question: "The Paris Agreement on climate change was adopted in?", correct: "2015", wrong: ["2012", "2018", "2020"] },
    { question: "Which dynasty built the Brihadeeswarar Temple?", correct: "Chola dynasty", wrong: ["Pallava", "Pandya", "Chalukya"] },
    { question: "Cantor's diagonal argument proves what?", correct: "Uncountability of real numbers", wrong: ["Infinity of primes", "Completeness of rationals", "Finiteness of integers"] },
    { question: "What is the main ore of iron?", correct: "Haematite", wrong: ["Bauxite", "Chalcopyrite", "Magnetite"] },
    { question: "Who directed 'The Godfather'?", correct: "Francis Ford Coppola", wrong: ["Martin Scorsese", "Steven Spielberg", "Stanley Kubrick"] },
    { question: "India's Gaganyaan mission aims to send astronauts to?", correct: "Low Earth Orbit", wrong: ["Moon", "Mars", "Space Station"] },
    { question: "Which enzyme breaks down fat?", correct: "Lipase", wrong: ["Amylase", "Protease", "Trypsin"] },
    { question: "The James Webb Space Telescope orbits at?", correct: "L2 Lagrange point", wrong: ["Low Earth orbit", "Geostationary orbit", "Lunar orbit"] },
    { question: "Who wrote 'Crime and Punishment'?", correct: "Fyodor Dostoevsky", wrong: ["Tolstoy", "Chekhov", "Gogol"] },
    { question: "What is the gravitational constant G approximately?", correct: "6.674 × 10⁻¹¹ N⋅m²/kg²", wrong: ["9.8 m/s²", "6.022 × 10²³", "1.6 × 10⁻¹⁹ C"] },
]);

// ============================================================
// LEVEL 12 — BATCH 3 — Very Hard (₹12,50,000)
// ============================================================
addQuestions(12, [
    { question: "Which particle is the antiparticle of an electron?", correct: "Positron", wrong: ["Proton", "Neutron", "Muon"] },
    { question: "Who was the first Speaker of the Lok Sabha?", correct: "G.V. Mavalankar", wrong: ["Hukam Singh", "Neelam Sanjiva Reddy", "Balram Jakhar"] },
    { question: "The Lorenz curve graphically represents?", correct: "Income distribution inequality", wrong: ["Supply and demand", "Interest rate trends", "GDP growth"] },
    { question: "The Coptic script is derived from which alphabet?", correct: "Greek alphabet", wrong: ["Latin alphabet", "Phoenician", "Aramaic"] },
    { question: "What is optogenetics used for?", correct: "Controlling neurons with light", wrong: ["Gene editing", "Protein analysis", "Cell division"] },
    { question: "The Battle of Midway was fought during which war?", correct: "World War II", wrong: ["World War I", "Korean War", "Vietnam War"] },
    { question: "A pulsar is a rapidly rotating?", correct: "Neutron star", wrong: ["Black hole", "White dwarf", "Red giant"] },
    { question: "Frederick Sanger is known for sequencing?", correct: "DNA and insulin", wrong: ["RNA only", "Proteins only", "Enzymes only"] },
    { question: "The Human Development Index (HDI) was developed by?", correct: "Mahbub ul Haq", wrong: ["Amartya Sen", "Joseph Stiglitz", "Paul Krugman"] },
    { question: "Warli painting originates from which Indian state?", correct: "Maharashtra", wrong: ["Gujarat", "Rajasthan", "Madhya Pradesh"] },
    { question: "What is the Hubble constant used to estimate?", correct: "Rate of expansion of the universe", wrong: ["Mass of galaxies", "Speed of light", "Age of the Sun"] },
    { question: "The Shimla Agreement was signed between India and?", correct: "Pakistan", wrong: ["China", "Bangladesh", "Nepal"] },
    { question: "Which enzyme unwinds the DNA double helix?", correct: "Helicase", wrong: ["Ligase", "Polymerase", "Primase"] },
    { question: "The Riemann Hypothesis is about zeros of the?", correct: "Zeta function", wrong: ["Gamma function", "Beta function", "Theta function"] },
    { question: "Who discovered electromagnetic induction?", correct: "Michael Faraday", wrong: ["Maxwell", "Ampere", "Coulomb"] },
]);

// ============================================================
// LEVEL 13 — BATCH 3 — Very Hard (₹25,00,000)
// ============================================================
addQuestions(13, [
    { question: "In particle physics, what are quarks held together by?", correct: "Gluons (strong force)", wrong: ["Photons", "W/Z bosons", "Gravitons"] },
    { question: "The International Atomic Energy Agency (IAEA) is headquartered in?", correct: "Vienna", wrong: ["Geneva", "New York", "Paris"] },
    { question: "What is the function of reverse transcriptase?", correct: "Makes DNA from RNA", wrong: ["Makes RNA from DNA", "Destroys DNA", "Repairs RNA"] },
    { question: "Who wrote 'Critique of Pure Reason'?", correct: "Immanuel Kant", wrong: ["Hegel", "Nietzsche", "Descartes"] },
    { question: "The Sangam literature belongs to which region?", correct: "Tamil Nadu", wrong: ["Kerala", "Karnataka", "Andhra Pradesh"] },
    { question: "What is the Tolman-Oppenheimer-Volkoff limit?", correct: "Maximum mass of a neutron star", wrong: ["Size of a black hole", "Temperature of a star", "Speed of a quasar"] },
    { question: "CRISPR interference (CRISPRi) is used for?", correct: "Gene silencing without cutting DNA", wrong: ["Gene deletion", "Gene insertion", "Chromosome duplication"] },
    { question: "The Truman Doctrine was aimed at containing?", correct: "Soviet influence (Communism)", wrong: ["Fascism", "Colonialism", "Terrorism"] },
    { question: "The ancient Library of Alexandria was in which country?", correct: "Egypt", wrong: ["Greece", "Turkey", "Italy"] },
    { question: "What is the significance of Euler's number e?", correct: "Base of natural logarithms", wrong: ["Ratio of circle circumference to diameter", "Golden ratio", "Square root of 2"] },
    { question: "Who composed the Natyashastra?", correct: "Bharata Muni", wrong: ["Kalidasa", "Panini", "Patanjali"] },
    { question: "The EPR paradox challenges which aspect of quantum mechanics?", correct: "Completeness and local realism", wrong: ["Conservation of energy", "Wave-particle duality", "Uncertainty principle"] },
    { question: "Which gland produces adrenaline?", correct: "Adrenal glands", wrong: ["Pituitary", "Thyroid", "Pancreas"] },
    { question: "The P vs NP problem asks whether?", correct: "Every quickly verifiable problem can be quickly solved", wrong: ["Every problem has a solution", "Computers can think", "AI can surpass humans"] },
    { question: "What are prions?", correct: "Misfolded proteins that cause disease", wrong: ["A type of virus", "Bacterial spores", "DNA fragments"] },
]);

// ============================================================
// LEVEL 14 — BATCH 3 — Expert (₹50,00,000)
// ============================================================
addQuestions(14, [
    { question: "The Yang-Mills theory describes?", correct: "Non-abelian gauge fields", wrong: ["Gravitational waves", "String vibrations", "Quantum tunneling"] },
    { question: "Hilbert's 10th Problem was proven undecidable by?", correct: "Yuri Matiyasevich (with Davis, Putnam, Robinson)", wrong: ["Gödel", "Turing", "Church"] },
    { question: "The Treaty of Tordesillas (1494) divided the world between?", correct: "Spain and Portugal", wrong: ["England and France", "Rome and Constantinople", "Netherlands and Spain"] },
    { question: "What is a ribozyme?", correct: "RNA molecule with catalytic activity", wrong: ["A protein enzyme", "A DNA repair mechanism", "A lipid membrane"] },
    { question: "Who first proposed the concept of entropy?", correct: "Rudolf Clausius", wrong: ["Boltzmann", "Carnot", "Kelvin"] },
    { question: "The halting problem was proven undecidable by?", correct: "Alan Turing", wrong: ["Church", "Gödel", "Von Neumann"] },
    { question: "The Satavahana rulers are known for which type of coins?", correct: "Lead and potin coins", wrong: ["Gold coins", "Silver coins", "Copper coins"] },
    { question: "India's Aditya-L1 mission studies what?", correct: "The Sun", wrong: ["Mars", "Moon", "Jupiter"] },
    { question: "What is the Pauli Exclusion Principle?", correct: "No two fermions can occupy the same quantum state", wrong: ["Energy is always conserved", "Light has a maximum speed", "Mass creates gravity"] },
    { question: "The Navier-Stokes equations are fundamental to?", correct: "Fluid dynamics", wrong: ["Quantum field theory", "General relativity", "Thermodynamics"] },
    { question: "The Battle of Saraighat (1671) was fought by?", correct: "Ahom general Lachit Borphukan", wrong: ["Shivaji", "Rana Pratap", "Tipu Sultan"] },
    { question: "What is the Schwarzschild radius of the Sun approximately?", correct: "~3 km", wrong: ["~30 km", "~300 km", "~0.3 km"] },
    { question: "The Calvin cycle is part of which process?", correct: "Photosynthesis (light-independent reactions)", wrong: ["Cellular respiration", "Nitrogen fixation", "Fermentation"] },
    { question: "Shor's algorithm can break which type of encryption?", correct: "RSA (integer factorization)", wrong: ["AES", "SHA-256", "One-time pad"] },
    { question: "Who synthesized the first vitamin artificially?", correct: "Casimir Funk (Vitamin B1)", wrong: ["Linus Pauling", "Albert Szent-Györgyi", "Frederick Gowland Hopkins"] },
]);

// ============================================================
// LEVEL 15 — BATCH 3 — Expert (₹1,00,00,000)
// ============================================================
addQuestions(15, [
    { question: "The Yang-Baxter equation is fundamental in?", correct: "Exactly solvable models in statistical mechanics", wrong: ["Fluid dynamics", "Quantum computing gates", "String theory compactification"] },
    { question: "Which part of the Indian Constitution deals with emergency provisions?", correct: "Part XVIII", wrong: ["Part XII", "Part XIV", "Part XX"] },
    { question: "What is the Casimir-Polder force?", correct: "Attraction between a neutral atom and a conducting surface due to vacuum fluctuations", wrong: ["Gravity between molecules", "Nuclear binding force", "Electromagnetic repulsion"] },
    { question: "The Curry-Howard correspondence relates?", correct: "Proofs and programs", wrong: ["Algorithms and data", "Hardware and software", "Logic and grammar"] },
    { question: "The Nebra Sky Disc dates to approximately?", correct: "1600 BC", wrong: ["3000 BC", "500 BC", "200 AD"] },
    { question: "Who derived the blackbody radiation formula?", correct: "Max Planck", wrong: ["Einstein", "Boltzmann", "Wien"] },
    { question: "In cryptography, what is homomorphic encryption?", correct: "Computing on encrypted data without decrypting", wrong: ["Encrypting with multiple keys", "Self-decrypting ciphers", "One-way hash functions"] },
    { question: "Lie groups are named after?", correct: "Sophus Lie", wrong: ["Emmy Noether", "Évariste Galois", "Niels Abel"] },
    { question: "Which Indian mathematician proved the irrationality of π?", correct: "Srinivasa Ramanujan contributed series, but Johann Lambert proved it", wrong: ["Aryabhata", "Brahmagupta", "Bhaskara II"] },
    { question: "What is the cosmological constant problem?", correct: "Discrepancy between observed and predicted vacuum energy density", wrong: ["Dark matter detection", "Galaxy rotation curves", "Cosmic microwave background anisotropy"] },
    { question: "The Zipf's law describes?", correct: "Word frequency distribution in natural language", wrong: ["Prime number gaps", "Radioactive decay rates", "Population growth"] },
    { question: "What is Hawking temperature?", correct: "Temperature of black hole radiation, inversely proportional to mass", wrong: ["Cosmic background temperature", "Surface temperature of neutron stars", "Core temperature of the Sun"] },
    { question: "The Battle of Longewala (1971) was fought in which Indian state?", correct: "Rajasthan", wrong: ["Punjab", "Gujarat", "Jammu & Kashmir"] },
    { question: "What is the Church-Turing thesis?", correct: "Any effectively calculable function can be computed by a Turing machine", wrong: ["P equals NP", "Halting problem is solvable", "Quantum computers surpass classical ones"] },
    { question: "The triple point of water is at approximately?", correct: "0.01°C at 611.73 Pa", wrong: ["0°C at 1 atm", "100°C at 1 atm", "4°C at 1 atm"] },
]);

// ============================================================
// LEVEL 16 — BATCH 3 — Genius (₹7,00,00,000) — JACKPOT!
// ============================================================
addQuestions(16, [
    { question: "The Geometric Langlands Program connects which areas?", correct: "Algebraic geometry and representation theory", wrong: ["Topology and number theory", "Calculus and combinatorics", "Logic and algebra"] },
    { question: "Who formulated the 'Many-Minds' interpretation as distinct from Many-Worlds?", correct: "H. Dieter Zeh and David Albert", wrong: ["Everett", "Bohr", "Bohm"] },
    { question: "The Hodge conjecture concerns which mathematical structures?", correct: "Cohomology classes of algebraic varieties", wrong: ["Prime factorization", "Topological manifolds", "Differential equations"] },
    { question: "Checkpoint kinase inhibitors are being developed to treat?", correct: "Cancer (by preventing DNA repair in tumor cells)", wrong: ["Alzheimer's", "Diabetes", "Heart disease"] },
    { question: "The Miyake Event of 774 AD was a massive?", correct: "Cosmic ray event", wrong: ["Volcanic eruption", "Solar eclipse", "Meteorite impact"] },
    { question: "Who first isolated fluorine?", correct: "Henri Moissan", wrong: ["Lavoisier", "Humphry Davy", "Scheele"] },
    { question: "The Nash Embedding Theorem proves what?", correct: "Every Riemannian manifold can be isometrically embedded in Euclidean space", wrong: ["Every game has an equilibrium", "Every surface is orientable", "Every group has a representation"] },
    { question: "In Indian history, the Arthashastra discusses?", correct: "Statecraft, economics, and military strategy", wrong: ["Poetry and literature", "Religious rituals", "Astronomical calculations"] },
    { question: "What is the Bekenstein bound?", correct: "Maximum entropy in a bounded region", wrong: ["Minimum mass of a black hole", "Maximum speed of information", "Energy density of vacuum"] },
    { question: "The Rongorongo script from Easter Island remains?", correct: "Undeciphered", wrong: ["Translated to Polynesian", "A form of Austronesian", "A mathematical notation"] },
    { question: "Which theorem proves there are infinitely many primes in arithmetic progressions?", correct: "Dirichlet's theorem", wrong: ["Euclid's theorem", "Fermat's little theorem", "Chinese Remainder Theorem"] },
    { question: "The Great Oxidation Event occurred approximately?", correct: "2.4 billion years ago", wrong: ["500 million years ago", "4 billion years ago", "65 million years ago"] },
    { question: "The AdS/CFT correspondence relates?", correct: "Gravity in Anti-de Sitter space to conformal field theory on its boundary", wrong: ["Quantum mechanics to classical physics", "Thermodynamics to information theory", "String theory to loop quantum gravity"] },
    { question: "Who first observed Brownian motion and linked it to atomic theory?", correct: "Robert Brown (observed), Einstein (explained)", wrong: ["Newton", "Dalton", "Boltzmann"] },
    { question: "What is annealing in quantum computing?", correct: "Using quantum tunneling to find global minimum of an objective function", wrong: ["Cooling qubits to absolute zero", "Error correction technique", "Qubit entanglement method"] },
]);

// ============================================================
// BATCH 4: 120+ QUESTIONS (LEVELS 1-8)
// ============================================================

// LEVEL 1: ₹1,000 (Very Easy - Kids/Common Knowledge)
addQuestions(1, [
    { question: "Which animal is known as the 'Ship of the Desert'?", correct: "Camel", wrong: ["Horse", "Elephant", "Lion"] },
    { question: "How many colors are there in a rainbow?", correct: "7", wrong: ["5", "8", "10"] },
    { question: "Which fruit is known as the 'King of Fruits' in India?", correct: "Mango", wrong: ["Apple", "Orange", "Banana"] },
    { question: "What do you use to write on a blackboard?", correct: "Chalk", wrong: ["Pen", "Pencil", "Marker"] },
    { question: "Which festival is known as the 'Festival of Lights'?", correct: "Diwali", wrong: ["Holi", "Eid", "Christmas"] },
    { question: "What is the capital of India?", correct: "New Delhi", wrong: ["Mumbai", "Kolkata", "Chennai"] },
    { question: "Which organ pumps blood in our body?", correct: "Heart", wrong: ["Lungs", "Brain", "Kidney"] },
    { question: "How many hours are there in a day?", correct: "24", wrong: ["12", "48", "30"] },
    { question: "Which gas do we breathe in?", correct: "Oxygen", wrong: ["Carbon Dioxide", "Nitrogen", "Helium"] },
    { question: "What is the baby of a dog called?", correct: "Puppy", wrong: ["Kitten", "Calf", "Cub"] },
    { question: "Which planet is closest to the Sun?", correct: "Mercury", wrong: ["Venus", "Mars", "Earth"] },
    { question: "Who is known as the 'Father of the Nation' in India?", correct: "Mahatma Gandhi", wrong: ["Jawaharlal Nehru", "Subhash Chandra Bose", "Bhagat Singh"] },
    { question: "What is 10 + 20?", correct: "30", wrong: ["20", "40", "50"] },
    { question: "Which direction does the Sun rise from?", correct: "East", wrong: ["West", "North", "South"] },
    { question: "How many legs does a spider have?", correct: "8", wrong: ["6", "4", "10"] }
]);

// LEVEL 2: ₹2,000 (Easy - Daily Life/Pop Culture)
addQuestions(2, [
    { question: "Which cricketer is known as 'Captain Cool'?", correct: "MS Dhoni", wrong: ["Virat Kohli", "Rohit Sharma", "Sachin Tendulkar"] },
    { question: "In which city is the Taj Mahal located?", correct: "Agra", wrong: ["Delhi", "Jaipur", "Lucknow"] },
    { question: "Which app is used for sharing photos and stories?", correct: "Instagram", wrong: ["Excel", "Calculator", "Notepad"] },
    { question: "Which movie features the character 'Baahubali'?", correct: "Baahubali", wrong: ["RRR", "KGF", "Pushpa"] },
    { question: "What is the national bird of India?", correct: "Peacock", wrong: ["Parrot", "Eagle", "Sparrow"] },
    { question: "Which body part helps you taste food?", correct: "Tongue", wrong: ["Teeth", "Lips", "Throat"] },
    { question: "What is the currency of the USA?", correct: "Dollar", wrong: ["Euro", "Rupee", "Pound"] },
    { question: "How many players are there in a cricket team on the field?", correct: "11", wrong: ["10", "12", "9"] },
    { question: "Which of these is a root vegetable?", correct: "Carrot", wrong: ["Tomato", "Brinjal", "Cucumber"] },
    { question: "Which vehicle runs on tracks?", correct: "Train", wrong: ["Bus", "Car", "Bike"] },
    { question: "Who wrote 'Jana Gana Mana'?", correct: "Rabindranath Tagore", wrong: ["Bankim Chandra Chatterjee", "Sarojini Naidu", "Premchand"] },
    { question: "Which is the largest ocean in the world?", correct: "Pacific Ocean", wrong: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"] },
    { question: "How many days are there in a leap year?", correct: "366", wrong: ["365", "364", "367"] },
    { question: "What moves around the Earth?", correct: "Moon", wrong: ["Sun", "Mars", "Jupiter"] },
    { question: "Which bird lays the largest egg?", correct: "Ostrich", wrong: ["Peacock", "Eagle", "Penguin"] }
]);

// LEVEL 3: ₹3,000 (Easy - School Knowledge)
addQuestions(3, [
    { question: "What is the chemical symbol for Water?", correct: "H2O", wrong: ["O2", "CO2", "NaCl"] },
    { question: "Who invented the telephone?", correct: "Alexander Graham Bell", wrong: ["Thomas Edison", "Nikola Tesla", "Einstein"] },
    { question: "Which state is known as 'God's Own Country'?", correct: "Kerala", wrong: ["Goa", "Himachal Pradesh", "Uttarakhand"] },
    { question: "Which is the tallest animal on Earth?", correct: "Giraffe", wrong: ["Elephant", "Camel", "Zebra"] },
    { question: "What is the hardest natural substance?", correct: "Diamond", wrong: ["Gold", "Iron", "Platinum"] },
    { question: "Who was the first Prime Minister of India?", correct: "Jawaharlal Nehru", wrong: ["Indira Gandhi", "Lal Bahadur Shastri", "Rajendra Prasad"] },
    { question: "Which gas is filled in balloons to make them float?", correct: "Helium", wrong: ["Oxygen", "Nitrogen", "Hydrogen"] },
    { question: "How many continents are there?", correct: "7", wrong: ["5", "6", "8"] },
    { question: "Which continent is known as the 'Dark Continent'?", correct: "Africa", wrong: ["Asia", "Europe", "South America"] },
    { question: "Which is the longest river in the world?", correct: "Nile", wrong: ["Amazon", "Ganga", "Yangtze"] },
    { question: "Who painted the Mona Lisa?", correct: "Leonardo da Vinci", wrong: ["Picasso", "Van Gogh", "Michelangelo"] },
    { question: "Which planet is known as the Red Planet?", correct: "Mars", wrong: ["Jupiter", "Venus", "Saturn"] },
    { question: "How many bones are there in an adult human body?", correct: "206", wrong: ["208", "210", "200"] },
    { question: "What does CPU stand for?", correct: "Central Processing Unit", wrong: ["Central Process Unit", "Computer Processing Unit", "Central Power Unit"] },
    { question: "Which festival marks the end of Ramadan?", correct: "Eid-ul-Fitr", wrong: ["Bakrid", "Muharram", "Diwali"] }
]);

// LEVEL 4: ₹5,000 (Easy/Medium - Trivia)
addQuestions(4, [
    { question: "Which country gifted the Statue of Liberty to the USA?", correct: "France", wrong: ["UK", "Germany", "Spain"] },
    { question: "What is the currency of Japan?", correct: "Yen", wrong: ["Won", "Yuan", "Ringgit"] },
    { question: "Who is the 'Iron Man of India'?", correct: "Sardar Vallabhbhai Patel", wrong: ["Bhagat Singh", "Subhash Chandra Bose", "Lal Bahadur Shastri"] },
    { question: "Which is the largest desert in the world?", correct: "Antarctic Desert", wrong: ["Sahara", "Gobi", "Kalahari"] },
    { question: "In which year did India win its first Cricket World Cup?", correct: "1983", wrong: ["1975", "2011", "1992"] },
    { question: "Which organ produces insulin?", correct: "Pancreas", wrong: ["Liver", "Kidney", "Stomach"] },
    { question: "Who discovered gravity?", correct: "Isaac Newton", wrong: ["Galileo", "Einstein", "Darwin"] },
    { question: "Which is the smallest state in India by area?", correct: "Goa", wrong: ["Sikkim", "Tripura", "Manipur"] },
    { question: "What is the full form of WiFi?", correct: "Wireless Fidelity", wrong: ["Wireless Frequency", "Wide Fidelity", "Web Fidelity"] },
    { question: "Which country is famous for the Pyramids?", correct: "Egypt", wrong: ["Mexico", "Peru", "Sudan"] },
    { question: "Who wrote 'Harry Potter'?", correct: "J.K. Rowling", wrong: ["Tolkien", "George R.R. Martin", "Stephen King"] },
    { question: "Which movie won the Oscar for Best Picture in 2024?", correct: "Oppenheimer", wrong: ["Barbie", "Killers of the Flower Moon", "Poor Things"] },
    { question: "What is the capital of Australia?", correct: "Canberra", wrong: ["Sydney", "Melbourne", "Perth"] },
    { question: "Which vitamin is obtained from sunlight?", correct: "Vitamin D", wrong: ["Vitamin C", "Vitamin A", "Vitamin B"] },
    { question: "Who occupies the Oval Office?", correct: "US President", wrong: ["UK Prime Minister", "UN Secretary General", "Queen of England"] }
]);

// LEVEL 5: ₹10,000 (Medium - General Knowledge)
addQuestions(5, [
    { question: "Which element has the chemical symbol 'Au'?", correct: "Gold", wrong: ["Silver", "Copper", "Aluminum"] },
    { question: "Who was the first man to step on the Moon?", correct: "Neil Armstrong", wrong: ["Buzz Aldrin", "Yuri Gagarin", "Rakesh Sharma"] },
    { question: "Which city is known as the 'Silicon Valley of India'?", correct: "Bengaluru", wrong: ["Hyderabad", "Pune", "Gurgaon"] },
    { question: "What is the study of birds called?", correct: "Ornithology", wrong: ["Entomology", "Zoology", "Botany"] },
    { question: "Which blood group is known as the Universal Donor?", correct: "O Negative", wrong: ["O Positive", "AB Positive", "A Negative"] },
    { question: "How many rings are there in the Olympic logo?", correct: "5", wrong: ["4", "6", "7"] },
    { question: "Which emperor built the Sanchi Stupa?", correct: "Ashoka", wrong: ["Chandragupta Maurya", "Akbar", "Shah Jahan"] },
    { question: "What is the main ingredient in glass?", correct: "Sand (Silica)", wrong: ["Clay", "Limestone", "Gypsum"] },
    { question: "Which gas is most abundant in Earth's atmosphere?", correct: "Nitrogen", wrong: ["Oxygen", "Carbon Dioxide", "Argon"] },
    { question: "Who is the CEO of Tesla?", correct: "Elon Musk", wrong: ["Jeff Bezos", "Bill Gates", "Mark Zuckerberg"] },
    { question: "Which Indian state has the longest coastline?", correct: "Gujarat", wrong: ["Andhra Pradesh", "Tamil Nadu", "Maharashtra"] },
    { question: "In which year did the Titanic sink?", correct: "1912", wrong: ["1910", "1915", "1905"] },
    { question: "What is the capital of Canada?", correct: "Ottawa", wrong: ["Toronto", "Vancouver", "Montreal"] },
    { question: "Which planet has the most moons?", correct: "Saturn", wrong: ["Jupiter", "Uranus", "Neptune"] },
    { question: "Who invented the World Wide Web?", correct: "Tim Berners-Lee", wrong: ["Bill Gates", "Steve Jobs", "Larry Page"] }
]);

// LEVEL 6: ₹20,000 (Medium - History/Geography)
addQuestions(6, [
    { question: "Who was the last Viceroy of India?", correct: "Lord Mountbatten", wrong: ["Lord Curzon", "Lord Dalhousie", "Lord Canning"] },
    { question: "Which river crosses the Equator twice?", correct: "Congo River", wrong: ["Nile", "Amazon", "Mekong"] },
    { question: "What is the largest internal organ in the human body?", correct: "Liver", wrong: ["Lungs", "Heart", "Stomach"] },
    { question: "Which country is known as the 'Land of the Rising Sun'?", correct: "Japan", wrong: ["China", "Thailand", "South Korea"] },
    { question: "Who wrote 'Discovery of India'?", correct: "Jawaharlal Nehru", wrong: ["Mahatma Gandhi", "Indira Gandhi", "Sardar Patel"] },
    { question: "Which metal is liquid at room temperature?", correct: "Mercury", wrong: ["Gallium", "Bromine", "Cesium"] },
    { question: "What is the speed of light?", correct: "299,792 km/s", wrong: ["300,000 m/s", "150,000 km/s", "1,080 km/h"] },
    { question: "Which layer of the atmosphere protects us from UV rays?", correct: "Ozone Layer", wrong: ["Troposphere", "Mesosphere", "Exosphere"] },
    { question: "Who founded the Maurya Empire?", correct: "Chandragupta Maurya", wrong: ["Ashoka", "Bindusara", "Porus"] },
    { question: "Which is the smallest bird in the world?", correct: "Hummingbird", wrong: ["Sparrow", "Robin", "Finch"] },
    { question: "What does 'DNA' stand for?", correct: "Deoxyribonucleic Acid", wrong: ["Deoxyribose Acid", "Denatured Nuclear Acid", "Deoxy Nucleic Acid"] },
    { question: "Which Indian city hosted the 2010 Commonwealth Games?", correct: "New Delhi", wrong: ["Mumbai", "Pune", "Chennai"] },
    { question: "Who is the author of 'Gitanjali'?", correct: "Rabindranath Tagore", wrong: ["Premchand", "R.K. Narayan", "Ruskin Bond"] },
    { question: "Which sea has no coast?", correct: "Sargasso Sea", wrong: ["Red Sea", "Dead Sea", "Caspian Sea"] },
    { question: "What is the capital of Brazil?", correct: "Brasilia", wrong: ["Rio de Janeiro", "Sao Paulo", "Salvador"] }
]);

// LEVEL 7: ₹40,000 (Medium/Hard - Science/Tech)
addQuestions(7, [
    { question: "Which unit measures electric current?", correct: "Ampere", wrong: ["Volt", "Watt", "Ohm"] },
    { question: "What is the pH value of pure water?", correct: "7", wrong: ["0", "14", "5"] },
    { question: "Which programming language is named after a snake?", correct: "Python", wrong: ["Cobra", "Java", "Ruby"] },
    { question: "Who developed the Theory of Relativity?", correct: "Albert Einstein", wrong: ["Isaac Newton", "Stephen Hawking", "Niels Bohr"] },
    { question: "Which part of the brain controls balance?", correct: "Cerebellum", wrong: ["Cerebrum", "Medulla", "Hypothalamus"] },
    { question: "What is the fear of confined spaces called?", correct: "Claustrophobia", wrong: ["Acrophobia", "Hydrophobia", "Arachnophobia"] },
    { question: "Which country has the most time zones?", correct: "France", wrong: ["Russia", "USA", "China"] },
    { question: "Who was the first woman Prime Minister of India?", correct: "Indira Gandhi", wrong: ["Sarojini Naidu", "Pratibha Patil", "Sushma Swaraj"] },
    { question: "Which element is used in pencils?", correct: "Graphite", wrong: ["Lead", "Carbon", "Coal"] },
    { question: "What is the capital of Germany?", correct: "Berlin", wrong: ["Munich", "Frankfurt", "Hamburg"] },
    { question: "Which planet spins clockwise?", correct: "Venus", wrong: ["Mars", "Jupiter", "Neptune"] },
    { question: "Which vitamin helps in blood clotting?", correct: "Vitamin K", wrong: ["Vitamin C", "Vitamin A", "Vitamin B12"] },
    { question: "Who invented the light bulb?", correct: "Thomas Edison", wrong: ["Nikola Tesla", "Alexander Graham Bell", "Benjamin Franklin"] },
    { question: "Which is the largest gland in the human body?", correct: "Liver", wrong: ["Thyroid", "Pancreas", "Pituitary"] },
    { question: "What is the currency of Russia?", correct: "Ruble", wrong: ["Euro", "Dinar", "Yen"] }
]);

// LEVEL 8: ₹80,000 (Hard - Mixed Trivia)
addQuestions(8, [
    { question: "Which battle marked the end of the Mughal Empire's power?", correct: "Battle of Karnal (1739)", wrong: ["Battle of Plassey", "Battle of Buxar", "Battle of Panipat"] },
    { question: "Who is the only Indian to win an individual gold in Olympics athletics?", correct: "Neeraj Chopra", wrong: ["Abhinav Bindra", "Milkha Singh", "P.T. Usha"] },
    { question: "What is the chemical formula for Chalk?", correct: "CaCO3", wrong: ["CaO", "CaSO4", "NaCl"] },
    { question: "Which is the longest bone in the human body?", correct: "Femur", wrong: ["Tibia", "Humerus", "Radius"] },
    { question: "Which country was formerly known as Persia?", correct: "Iran", wrong: ["Iraq", "Syria", "Turkey"] },
    { question: "Who wrote 'Romeo and Juliet'?", correct: "William Shakespeare", wrong: ["Charles Dickens", "Mark Twain", "Jane Austen"] },
    { question: "What is the term for a group of crows?", correct: "Murder", wrong: ["Flock", "Herd", "School"] },
    { question: "Which gas is used in fire extinguishers?", correct: "Carbon Dioxide", wrong: ["Oxygen", "Nitrogen", "Argon"] },
    { question: "Who was the first President of the USA?", correct: "George Washington", wrong: ["Abraham Lincoln", "Thomas Jefferson", "John F. Kennedy"] },
    { question: "Which planet is known as the 'Morning Star'?", correct: "Venus", wrong: ["Mercury", "Mars", "Jupiter"] },
    { question: "What is the capital of South Korea?", correct: "Seoul", wrong: ["Tokyo", "Beijing", "Bangkok"] },
    { question: "Which organ is affected by Jaundice?", correct: "Liver", wrong: ["Lungs", "Kidney", "Heart"] },
    { question: "Who is known as the 'Missile Man of India'?", correct: "APJ Abdul Kalam", wrong: ["Homi Bhabha", "Vikram Sarabhai", "CV Raman"] },
    { question: "Which is the largest island in the world?", correct: "Greenland", wrong: ["Australia", "New Guinea", "Borneo"] },
    { question: "What does 'USB' stand for?", correct: "Universal Serial Bus", wrong: ["United Serial Bus", "Universal System Bus", "United System Bus"] }
]);

// ============================================================
// BATCH 4 (PART 2): LEVELS 9-16
// ============================================================

// LEVEL 9: ₹1,60,000 (Medium/Hard - Advanced GK)
addQuestions(9, [
    { question: "Which country has the most islands in the world?", correct: "Sweden", wrong: ["Indonesia", "Philippines", "Finland"] },
    { question: "Who wrote 'Principia Mathematica' (1910)?", correct: "Bertrand Russell & Alfred North Whitehead", wrong: ["Isaac Newton", "Albert Einstein", "Stephen Hawking"] },
    { question: "Where is the headquarters of the International Court of Justice?", correct: "The Hague", wrong: ["Geneva", "New York", "Vienna"] },
    { question: "The phrase 'Satyamev Jayate' is taken from which Upanishad?", correct: "Mundaka Upanishad", wrong: ["Kathopanishad", "Mandukya Upanishad", "Chhandogya Upanishad"] },
    { question: "Which acid is found in vinegar?", correct: "Acetic Acid", wrong: ["Citric Acid", "Lactic Acid", "Tartaric Acid"] },
    { question: "Who was the first Indian woman to win the Booker Prize?", correct: "Arundhati Roy", wrong: ["Kiran Desai", "Jhumpa Lahiri", "Anita Desai"] },
    { question: "What is the chemical name of Baking Soda?", correct: "Sodium Bicarbonate", wrong: ["Sodium Carbonate", "Calcium Carbonate", "Sodium Chloride"] },
    { question: "Which Viceroys partition of Bengal took place in 1905?", correct: "Lord Curzon", wrong: ["Lord Minto", "Lord Chelmsford", "Lord Irwin"] },
    { question: "Which planet has a day longer than its year?", correct: "Venus", wrong: ["Mercury", "Jupiter", "Uranus"] },
    { question: "Who is known as the 'Nightingale of India'?", correct: "Sarojini Naidu", wrong: ["Lata Mangeshkar", "Indira Gandhi", "Mother Teresa"] },
    { question: "What is the largest living species of lizard?", correct: "Komodo Dragon", wrong: ["Crocodile", "Monitor Lizard", "Iguana"] },
    { question: "In which year did the Quit India Movement start?", correct: "1942", wrong: ["1920", "1930", "1947"] },
    { question: "Who designed the Indian National Flag?", correct: "Pingali Venkayya", wrong: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Mahatma Gandhi"] },
    { question: "Which gas is known as Laughing Gas?", correct: "Nitrous Oxide", wrong: ["Nitric Oxide", "Sulfur Dioxide", "Helium"] },
    { question: "Which city is known as the 'City of Joy'?", correct: "Kolkata", wrong: ["Mumbai", "Chennai", "Jaipur"] }
]);

// LEVEL 10: ₹3,20,000 (Hard - Significant Events/People)
addQuestions(10, [
    { question: "Who was the first Indian to win a Nobel Prize?", correct: "Rabindranath Tagore", wrong: ["CV Raman", "Mother Teresa", "Amartya Sen"] },
    { question: "What is the hardest substance in the human body?", correct: "Tooth Enamel", wrong: ["Femur", "Skull", "Spine"] },
    { question: "Which country is known as the 'Land of Thunder Dragon'?", correct: "Bhutan", wrong: ["Nepal", "Tibet", "Myanmar"] },
    { question: "Who founded the Brahmo Samaj?", correct: "Raja Ram Mohan Roy", wrong: ["Swami Vivekananda", "Dayanand Saraswati", "Ishwar Chandra Vidyasagar"] },
    { question: "What is the approximate speed of sound in air?", correct: "343 m/s", wrong: ["300,000 km/s", "1,200 km/h", "500 m/s"] },
    { question: "Which state is the largest producer of Coffee in India?", correct: "Karnataka", wrong: ["Kerala", "Tamil Nadu", "Assam"] },
    { question: "Who wrote 'The God of Small Things'?", correct: "Arundhati Roy", wrong: ["Salman Rushdie", "Vikram Seth", "Chetan Bhagat"] },
    { question: "Which layer of the Earth is liquid?", correct: "Outer Core", wrong: ["Inner Core", "Mantle", "Crust"] },
    { question: "Who was the first woman President of the UN General Assembly?", correct: "Vijaya Lakshmi Pandit", wrong: ["Sarojini Naidu", "Indira Gandhi", "Sucheta Kripalani"] },
    { question: "Which element is named after the creator of the Periodic Table?", correct: "Mendelevium", wrong: ["Einsteinium", "Curium", "Nobelium"] },
    { question: "What is the capital of Turkey?", correct: "Ankara", wrong: ["Istanbul", "Izmir", "Antalya"] },
    { question: "Which battle led to the establishment of British rule in India?", correct: "Battle of Plassey", wrong: ["Battle of Buxar", "Battle of Panipat", "Sepoy Mutiny"] },
    { question: "Who discovered Penicillin?", correct: "Alexander Fleming", wrong: ["Louis Pasteur", "Robert Koch", "Edward Jenner"] },
    { question: "Which is the smallest bone in the human body?", correct: "Stapes", wrong: ["Incus", "Malleus", "Phalanges"] },
    { question: "Who is the author of 'Mein Kampf'?", correct: "Adolf Hitler", wrong: ["Benito Mussolini", "Karl Marx", "Joseph Stalin"] }
]);

// LEVEL 11: ₹6,40,000 (Hard - Specific Facts)
addQuestions(11, [
    { question: "Operation Flood is related to the production of?", correct: "Milk", wrong: ["Wheat", "Rice", "Fish"] },
    { question: "Who was the first Governor-General of Independent India?", correct: "Lord Mountbatten", wrong: ["C. Rajagopalachari", "Jawaharlal Nehru", "Dr. Rajendra Prasad"] },
    { question: "Which country has the longest constitution in the world?", correct: "India", wrong: ["USA", "UK", "China"] },
    { question: "What is the heavily fortified border between North and South Korea called?", correct: "DMZ (Demilitarized Zone)", wrong: ["Berlin Wall", "Radcliffe Line", "38th Parallel"] },
    { question: "Who was the first woman to go into space?", correct: "Valentina Tereshkova", wrong: ["Sally Ride", "Kalpana Chawla", "Sunita Williams"] },
    { question: "Which instrument is used to measure earthquakes?", correct: "Seismograph", wrong: ["Barometer", "Hygrometer", "Thermometer"] },
    { question: "Who is known as the 'Father of the Indian Constitution'?", correct: "Dr. B.R. Ambedkar", wrong: ["Jawaharlal Nehru", "Sardar Patel", "Mahatma Gandhi"] },
    { question: "Which vitamin deficiency causes Scurvy?", correct: "Vitamin C", wrong: ["Vitamin A", "Vitamin D", "Vitamin B"] },
    { question: "Who painted 'The Starry Night'?", correct: "Vincent van Gogh", wrong: ["Pablo Picasso", "Claude Monet", "Leonardo da Vinci"] },
    { question: "What is the capital of New Zealand?", correct: "Wellington", wrong: ["Auckland", "Christchurch", "Sydney"] },
    { question: "Which planet is known as the 'Blue Planet'?", correct: "Earth", wrong: ["Neptune", "Uranus", "Jupiter"] },
    { question: "Who discovered the electron?", correct: "J.J. Thomson", wrong: ["Rutherford", "Bohr", "Chadwick"] },
    { question: "Which is the largest flower in the world?", correct: "Rafflesia", wrong: ["Sunflower", "Lotus", "Rose"] },
    { question: "Who wrote 'Panchatantra'?", correct: "Vishnu Sharma", wrong: ["Kalidasa", "Tulsidas", "Valmiki"] },
    { question: "Which country is known as the 'Land of White Elephants'?", correct: "Thailand", wrong: ["Laos", "Cambodia", "Myanmar"] }
]);

// LEVEL 12: ₹12,50,000 (Very Hard - Deep Knowledge)
addQuestions(12, [
    { question: "Who was the architect of the Indian Parliament House?", correct: "Edwin Lutyens and Herbert Baker", wrong: ["Le Corbusier", "Charles Correa", "B.V. Doshi"] },
    { question: "Which is the purity of 24 carat gold?", correct: "99.9%", wrong: ["91.6%", "100%", "95%"] },
    { question: "Who was the first Indian to win the Miss World title?", correct: "Reita Faria", wrong: ["Aishwarya Rai", "Priyanka Chopra", "Diana Hayden"] },
    { question: "Which gas is used for ripening fruits artificially?", correct: "Acetylene/Ethylene", wrong: ["Methane", "Propane", "Butane"] },
    { question: "Who is the only person to win Nobel Prizes in two different scientific fields?", correct: "Marie Curie", wrong: ["Linus Pauling", "Albert Einstein", "Frederick Sanger"] },
    { question: "What is the capital of Kazakhstan?", correct: "Astana", wrong: ["Almaty", "Tashkent", "Bishkek"] },
    { question: "Which Indian state has the highest literacy rate?", correct: "Kerala", wrong: ["Mizoram", "Goa", "Tripura"] },
    { question: "Who wrote the play 'Waiting for Godot'?", correct: "Samuel Beckett", wrong: ["Harold Pinter", "Arthur Miller", "Tennessee Williams"] },
    { question: "Which element is the most electronegative?", correct: "Fluorine", wrong: ["Oxygen", "Chlorine", "Nitrogen"] },
    { question: "Who was the first Chief Justice of India?", correct: "H.J. Kania", wrong: ["P.B. Gajendragadkar", "M. Patanjali Sastri", "K.G. Balakrishnan"] },
    { question: "Which strait separates India and Sri Lanka?", correct: "Palk Strait", wrong: ["Malacca Strait", "Gibraltar Strait", "Bering Strait"] },
    { question: "Who discovered the structure of DNA?", correct: "Watson and Crick", wrong: ["Rosalind Franklin", "Maurice Wilkins", "Linus Pauling"] },
    { question: "Which is the largest freshwater lake in the world by volume?", correct: "Lake Baikal", wrong: ["Lake Superior", "Caspian Sea", "Lake Victoria"] },
    { question: "Who is known as the 'Bard of Avon'?", correct: "William Shakespeare", wrong: ["John Milton", "Geoffrey Chaucer", "Charles Dickens"] },
    { question: "Which country has the most UNESCO World Heritage Sites?", correct: "Italy", wrong: ["China", "Spain", "France"] }
]);

// LEVEL 13: ₹25,00,000 (Expert - Niche History/Science)
addQuestions(13, [
    { question: "Who gave the title 'Raja' to Ram Mohan Roy?", correct: "Akbar II", wrong: ["Bahadur Shah Zafar", "Aurangzeb", "Shah Alam II"] },
    { question: "Which planet in our solar system has the highest surface temperature?", correct: "Venus", wrong: ["Mercury", "Mars", "Jupiter"] },
    { question: "Who was the first Indian to go to space?", correct: "Rakesh Sharma", wrong: ["Kalpana Chawla", "Sunita Williams", "Ravish Malhotra"] },
    { question: "What is the scientific name of the Tiger?", correct: "Panthera tigris", wrong: ["Panthera leo", "Panthera pardus", "Panthera onca"] },
    { question: "Which is the only metal that is liquid at room temperature?", correct: "Mercury", wrong: ["Gallium", "Bromine", "Francium"] }, // Note: Bromine is liquid non-metal, Gallium melts in hand
    { question: "Who wrote the book 'A Brief History of Time'?", correct: "Stephen Hawking", wrong: ["Carl Sagan", "Neil deGrasse Tyson", "Albert Einstein"] },
    { question: "Which article of the Indian Constitution is known as the 'Heart and Soul'?", correct: "Article 32", wrong: ["Article 21", "Article 19", "Article 14"] },
    { question: "Who was the first woman to climb Mount Everest?", correct: "Junko Tabei", wrong: ["Bachendri Pal", "Santosh Yadav", "Arunima Sinha"] },
    { question: "Which chemical element has the highest melting point?", correct: "Tungsten", wrong: ["Carbon", "Titanium", "Platinum"] },
    { question: "Who is the founder of Microsoft?", correct: "Bill Gates", wrong: ["Steve Jobs", "Larry Page", "Mark Zuckerberg"] },
    { question: "What is the capital of Mongolia?", correct: "Ulaanbaatar", wrong: ["Astana", "Bishkek", "Dushanbe"] },
    { question: "Which battle ended the Napoleonic Wars?", correct: "Battle of Waterloo", wrong: ["Battle of Trafalgar", "Battle of Austerlitz", "Battle of Leipzig"] },
    { question: "Who discovered X-rays?", correct: "Wilhelm Roentgen", wrong: ["Marie Curie", "Becquerel", "Rutherford"] },
    { question: "Which is the largest gland in the human body?", correct: "Liver", wrong: ["Pancreas", "Thyroid", "Pituitary"] },
    { question: "What is the study of inscriptions called?", correct: "Epigraphy", wrong: ["Numismatics", "Paleography", "Archaeology"] }
]);

// LEVEL 14: ₹50,00,000 (Expert - Obscure Facts)
addQuestions(14, [
    { question: "Who was the first Indian to win an Oscar?", correct: "Bhanu Athaiya", wrong: ["Satyajit Ray", "AR Rahman", "Resul Pookutty"] },
    { question: "Which gas is used in electric bulbs?", correct: "Argon", wrong: ["Neon", "Helium", "Nitrogen"] },
    { question: "Who wrote 'Das Kapital'?", correct: "Karl Marx", wrong: ["Friedrich Engels", "Vladimir Lenin", "Adam Smith"] },
    { question: "Which is the smallest country in the world?", correct: "Vatican City", wrong: ["Monaco", "Nauru", "San Marino"] },
    { question: "Who was the first President of the Indian National Congress?", correct: "W.C. Bonnerjee", wrong: ["Dadabhai Naoroji", "A.O. Hume", "Badruddin Tyabji"] },
    { question: "Which planet has the Great Red Spot?", correct: "Jupiter", wrong: ["Saturn", "Neptune", "Mars"] },
    { question: "What is the chemical name of Vitamin C?", correct: "Ascorbic Acid", wrong: ["Citric Acid", "Acetic Acid", "Lactic Acid"] },
    { question: "Who discovered the circulation of blood?", correct: "William Harvey", wrong: ["Andreas Vesalius", "Galen", "Hippocrates"] },
    { question: "Which country has the largest coastline?", correct: "Canada", wrong: ["Indonesia", "Russia", "USA"] },
    { question: "Who painted 'The Last Supper'?", correct: "Leonardo da Vinci", wrong: ["Michelangelo", "Raphael", "Donatello"] },
    { question: "What is the capital of Finland?", correct: "Helsinki", wrong: ["Stockholm", "Oslo", "Copenhagen"] },
    { question: "Which treaty ended World War I?", correct: "Treaty of Versailles", wrong: ["Treaty of Paris", "Treaty of London", "Treaty of Trianon"] },
    { question: "Who is known as the 'Father of Indian Space Program'?", correct: "Vikram Sarabhai", wrong: ["APJ Abdul Kalam", "Homi Bhabha", "Satish Dhawan"] },
    { question: "Which is the hardest substance known?", correct: "Diamond", wrong: ["Graphene", "Carbyne", "Lonsdaleite"] }, // Technically aggregated diamond nanorods/lonsdaleite might be harder but Diamond is the standard KBC answer
    { question: "Who wrote 'The Origin of Species'?", correct: "Charles Darwin", wrong: ["Alfred Russel Wallace", "Jean-Baptiste Lamarck", "Gregor Mendel"] }
]);

// LEVEL 15: ₹1,00,00,000 (Crorepati - Rare Trivia)
addQuestions(15, [
    { question: "Who was the first Indian to cross the English Channel?", correct: "Mihir Sen", wrong: ["Arati Saha", "Bula Choudhury", "Bhakti Sharma"] },
    { question: "Which is the only continent with no active volcanoes?", correct: "Australia", wrong: ["Antarctica", "Europe", "Africa"] },
    { question: "Who invented the analytical engine?", correct: "Charles Babbage", wrong: ["Alan Turing", "Ada Lovelace", "John von Neumann"] },
    { question: "Which acid is present into the stomach of human body?", correct: "Hydrochloric Acid", wrong: ["Sulphuric Acid", "Nitric Acid", "Acetic Acid"] },
    { question: "Who was the first Governor-General of Bengal?", correct: "Warren Hastings", wrong: ["Robert Clive", "Lord Cornwallis", "Lord Wellesley"] },
    { question: "Which gas is responsible for the greenhouse effect?", correct: "Carbon Dioxide", wrong: ["Oxygen", "Nitrogen", "Argon"] },
    { question: "Who wrote 'Anandmath'?", correct: "Bankim Chandra Chatterjee", wrong: ["Rabindranath Tagore", "Sarat Chandra Chattopadhyay", "Premchand"] },
    { question: "Which is the largest moon in the Solar System?", correct: "Ganymede", wrong: ["Titan", "Callisto", "Io"] },
    { question: "Who discovered the South Pole?", correct: "Roald Amundsen", wrong: ["Robert Scott", "Ernest Shackleton", "Edmund Hillary"] },
    { question: "Which country won the first FIFA World Cup?", correct: "Uruguay", wrong: ["Brazil", "Argentina", "Italy"] },
    { question: "What is the capital of Iceland?", correct: "Reykjavik", wrong: ["Oslo", "Helsinki", "Copenhagen"] },
    { question: "Who is known as the 'Man of Blood and Iron'?", correct: "Otto von Bismarck", wrong: ["Napoleon Bonaparte", "Adolf Hitler", "Joseph Stalin"] },
    { question: "Which vitamin is also known as Retinol?", correct: "Vitamin A", wrong: ["Vitamin C", "Vitamin D", "Vitamin E"] },
    { question: "Who discovered the law of planetary motion?", correct: "Johannes Kepler", wrong: ["Galileo Galilei", "Nicolaus Copernicus", "Tycho Brahe"] },
    { question: "Which is the deepest point in the ocean?", correct: "Mariana Trench", wrong: ["Puerto Rico Trench", "Java Trench", "Tonga Trench"] }
]);

// LEVEL 16: ₹7,00,00,000 (Jackpot - Insane/Obscure)
addQuestions(16, [
    { question: "Who was the first person to reach the North Pole alone?", correct: "Naomi Uemura", wrong: ["Robert Peary", "Roald Amundsen", "Matthew Henson"] },
    { question: "Which is the rarest blood group in humans?", correct: "Rh-null", wrong: ["AB Negative", "O Negative", "Bombay Blood Group"] },
    { question: "What is the name of the oldest known star in the universe?", correct: "Methuselah Star (HD 140283)", wrong: ["Betelgeuse", "Sirius", "Proxima Centauri"] },
    { question: "Who was the only US President to serve two non-consecutive terms?", correct: "Grover Cleveland", wrong: ["Theodore Roosevelt", "Franklin D. Roosevelt", "Woodrow Wilson"] },
    { question: "Which element was discovered on the Sun before it was found on Earth?", correct: "Helium", wrong: ["Hydrogen", "Carbon", "Oxygen"] }, // Common fact but good for jackpot context if user knows helium history
    { question: "Who is the only person to win two unshared Nobel Prizes?", correct: "Linus Pauling", wrong: ["Marie Curie", "Frederick Sanger", "John Bardeen"] },
    { question: "Which country has the most lakes in the world?", correct: "Canada", wrong: ["Finland", "Russia", "USA"] },
    { question: "Who was the first woman to win a Nobel Prize?", correct: "Marie Curie", wrong: ["Mother Teresa", "Rosalind Franklin", "Dorothy Hodgkin"] },
    { question: "What is the dense central core of an atom called?", correct: "Nucleus", wrong: ["Proton", "Neutron", "Electron"] },
    { question: "Which is the largest temple in the world?", correct: "Angkor Wat", wrong: ["Akshardham", "Brihadeeswarar Temple", "Karnak Temple"] },
    { question: "Who wrote the 'Mahabharata'?", correct: "Ved Vyasa", wrong: ["Valmiki", "Tulsidas", "Kalidasa"] },
    { question: "Which planet has the most extensive ring system?", correct: "Saturn", wrong: ["Jupiter", "Uranus", "Neptune"] },
    { question: "Who discovered the neutron?", correct: "James Chadwick", wrong: ["Rutherford", "Bohr", "Thomson"] },
    { question: "Which is the longest mountain range in the world?", correct: "Andes", wrong: ["Himalayas", "Rockies", "Alps"] },
    { question: "Who is known as the 'Father of Geometry'?", correct: "Euclid", wrong: ["Pythagoras", "Archimedes", "Thales"] }
]);


// RANDOM QUESTION FETCHER
// ============================================================

export function getRandomQuestionByLevel(level) {
    const filtered = questionBank.filter(q => q.level === level);
    if (filtered.length === 0) {
        // Fallback: find closest available level
        const closest = questionBank.reduce((prev, curr) =>
            Math.abs(curr.level - level) < Math.abs(prev.level - level) ? curr : prev
        );
        return closest;
    }
    return filtered[Math.floor(Math.random() * filtered.length)];
}

export default questionBank;
