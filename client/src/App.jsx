import { useEffect, useState, useRef } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./App.css";
import { fetchHybridQuestions, fetchFromOpenTDB, OPENTDB_CATEGORY_MAP } from "./fetchQuestions";
import WinnerScreen from "./WinnerScreen";
import FastestFinger from "./FastestFinger";
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { fffQuestions } from "./fffQuestions";
// Dynamically map API to relative routing for Render deployment
const API = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');
const ladder = [
    { level: "Q1", prize: 1000 },
    { level: "Q2", prize: 2000 },
    { level: "Q3", prize: 3000 },
    { level: "Q4", prize: 5000 },
    { level: "Q5", prize: 10000, milestone: true },
    { level: "Q6", prize: 20000 },
    { level: "Q7", prize: 40000 },
    { level: "Q8", prize: 80000 },
    { level: "Q9", prize: 160000 },
    { level: "Q10", prize: 320000, milestone: true },
    { level: "Q11", prize: 640000 },
    { level: "Q12", prize: 1250000 },
    { level: "Q13", prize: 2500000 },
    { level: "Q14", prize: 5000000 },
    { level: "Q15", prize: 10000000, milestone: true },
    { level: "Q16", prize: 70000000, jackpot: true }
];

const MEDALS = ["🥇", "🥈", "🥉", "4", "5"];

const CATEGORIES = [
    { id: "general", name: "General Knowledge", icon: "🌍" },
    { id: "science", name: "Science", icon: "🔬" },
    { id: "history", name: "History", icon: "📜" },
    { id: "sports", name: "Sports", icon: "🏆" },
    { id: "geography", name: "Geography", icon: "🗺️" },
    { id: "entertainment", name: "Entertainment", icon: "🎬" },
    { id: "mythology", name: "Mythology", icon: "🕉️" }
];

/* ── AI Commentary Templates (Amitabh Bachchan style) ── */
/* {name} is replaced with the player's name at runtime   */
const COMMENTARY = {
    newQuestion: [
        "Chaliye, dekhte hain computer ne aapke liye kya chuna hai...",
        "Aapka agla sawaal screen par hai. Dhyan se padhiye.",
        "Aaiye, aage badhte hain! Jaldi mat kijiye... sochiye, samjhiye.",
        "Yeh sawaal interesting hai. Main kuch nahi bolunga — aap khud padhiye!",
        "Ek aur sawaal, ek aur mauka. Let's see what you've got, {name}!",
        "Concentrate kijiye. Har shabd important hai is sawaal mein.",
        "Alright {name}... let's see what computer ji ne aapke liye rakhaa hai.",
        "Dhyan se padhiye... kabhi kabhi jawaab sawaal mein hi chhupa hota hai.",
        "Next question is ready. Take a deep breath... aur shuru karte hain!",
        "Dekhiye... samjhiye... aur phir answer kijiye. No hurry.",
        "Computer ji... agla sawaal please! Dekhte hain {name} kya kar paate hain.",
        "Toh chaliye... ek aur challenge. Aap tayyar hain?",
        "Naya sawaal... nayi ummeed. Padhiye, {name}, dhyan se padhiye.",
        "Aaiye dekhte hain... yeh sawaal aapki zindagi badal sakta hai!",
        "Sawaal number... well, aap jaante hain. Computer ji, please proceed.",
        "Ruk mat jaiye, {name}! Aage badhiye. Yeh safar abhi khatam nahi hua.",
        "Ab yeh dekhiye... main bhi curious hoon ki aap kya jawaab denge.",
        "Har sawaal ek darwaaza hai... sahi jawaab se aage ka raasta khulta hai."
    ],
    correctEasy: [
        "Bilkul sahi jawaab! Bahut accha! 🎯",
        "Correct! Shuruat toh bahut acchi hai!",
        "Ekdum sahi! Confidence dikhai de raha hai!",
        "Waah! Aapne toh turant bol diya! Very good!",
        "Sahi jawaab! Aise hi aage badhiye!",
        "Bahut khoob! Yeh toh aapke liye chhota tha, hai na?",
        "Correct, {name}! Aapki tayyari dikhai de rahi hai.",
        "Sahi hai! Momentum banaye rakhiye!",
        "Arey waah! Pehla sawaal... aur confident answer. I like it!",
        "Bilkul theek! Hot seat par aapki entry zabardast rahi!",
        "Computer ji kehna chahte hain... SAHI JAWAAB! 🎯",
        "Chalo... acchi shuruaat. Par {name}, asli imtihaan aage hai!",
        "Sahi! Aapki aankhon mein ek chamak dikh rahi hai mujhe.",
        "Very good! Ekdum filmi entry ki tarah... dhamaakedaar!"
    ],
    correctMid: [
        "Kya baat hai! Brilliant answer! 🔥",
        "Sahi jawaab! Prize money badh rahi hai!",
        "Bahut accha! Yeh aasan nahi tha, lekin aapne kar diya!",
        "Waah waah waah! Audience bhi impress hai!",
        "Sahi jawaab! Aap toh kamaal kar rahe ho, {name}!",
        "Absolutely right! Momentum aapke saath hai!",
        "Hot seat aap par suit karta hai! What a player!",
        "Shabash {name}! Bahut intelligent game khel rahe ho!",
        "Correct! Lagta hai aapne poori tayyari karke aaye hain!",
        "Main impress hoon... sach mein! Kya confidence hai!",
        "Deviyon aur sajjano... {name} ne phir se sahi jawaab diya!",
        "Aapka dimaag... razor-sharp hai! Bahut khoob!",
        "Yeh jawaab dena aasan nahi tha... par aapne kar dikhaya!",
        "Prize money chadh rahi hai! Aur {name} ka josh bhi!",
        "Computer ji bhi soch rahe honge... yeh contestant toh kamaal hai!"
    ],
    correctHard: [
        "INCREDIBLE! Bahut kam log yeh jawaab de paate! 🏆",
        "Aapne toh sabko chup kara diya! Kya player hain aap!",
        "Phenomenal! Poora desh dekh raha hai aapko!",
        "Genius! Aap is hot seat ke liye hi bane hain!",
        "Standing ovation! Kya dimaag hai, {name}!",
        "Main bhi hairaan hoon! That was a masterstroke!",
        "Itihaas ban raha hai, deviyon aur sajjano!",
        "{name}, aapne toh sabko hairaan kar diya! Unbelievable!",
        "Yeh... yeh toh KAMAAL ho gaya! Main toh soch raha tha aap nahi de paayenge!",
        "Deviyon aur sajjano... ZAALIM! Kya jawaab hai! 🏆",
        "Audience ki taaliyon ki goonj sun rahe hain? Yeh aapke liye hai!",
        "Aap jaante hain... bahut bahut kam log yahan tak aate hain. Shaan se!",
        "Mere rom rom mein josh aa gaya hai! KYA PLAYER HAIN AAP!",
        "Main 35 saal se yeh show host kar raha hoon... aap special hain, {name}!"
    ],
    highStakes: [
        "🔥 Ab baat serious ho rahi hai, {name}. Har option sochkar choose kijiye.",
        "🔥 Yeh woh zone hai jahan ek galat jawaab sab chhin leta hai.",
        "🔥 Lakho rupaye daaon par hain! Dimaag se kheliye, dil se nahi.",
        "🔥 {name}, ab aap uncharted territory mein hain. Proceed with caution!",
        "🔥 Bahut paisa ban raha hai... par risk bhi badh raha hai!",
        "🔥 Is level par har option ek jaaal ho sakta hai. Dhyan se!",
        "🔥 Audience saans rok ke baithi hai... kya aap sahi jawaab denge?",
        "🔥 Deviyon aur sajjano... yeh woh pal hai jab legends bante hain!",
        "🔥 Main kehta hoon... agar sure nahi hain toh lifeline le lijiye.",
        "🔥 Ab toh stakes itne high hain ki mera bhi dil dhadak raha hai!"
    ],
    streak: [
        "🔥 Kya lagataar sahi jawaab! {name}, aap on fire hain!",
        "🔥 Hat-trick! Teen sahi jawaab lagaataar! Zabardast!",
        "🔥 Unstoppable! Lagta hai aaj aapka din hai, {name}!",
        "🔥 Ek ke baad ek sahi jawaab! Audience pagal ho rahi hai!",
        "🔥 Main toh kehta hoon... aap is show ke sabse tez contestant hain!",
        "🔥 Lagaataar correct! {name}, aap toh toofaan hain!",
        "🔥 Yeh toh tsunami hai knowledge ki! Koi nahi rok sakta aapko!",
        "🔥 Boss mode ON! Shaandaar run, {name}!"
    ],
    thinking: [
        "🤔 Sochiye... koi jaldi nahi hai. Par zyada mat sochiye bhi!",
        "🤔 {name}, kya soch rahe hain? Share kijiye apni thought process.",
        "🤔 Options ko ek baar phir se padh lijiye... shayad kuch chhoot raha ho.",
        "🤔 Agar confuse hain... toh lifeline lene mein koi sharam nahi hai.",
        "🤔 Take your time... par yaad rakhiye, ghadi chal rahi hai!",
        "🤔 Kya man keh raha hai? Kabhi kabhi gut feeling sahi hoti hai.",
        "🤔 Hmmm... mushkil sawaal hai. Par aap mushkil contestant bhi toh hain!",
        "🤔 {name}, 50-50 ya audience poll... kisi se madad le lijiye?"
    ],
    wrong: [
        "Ohh... yeh sahi jawaab nahi tha. Dil toot gaya. 💔",
        "Maaf kijiyega, lekin yeh galat hai. Aap bahut kareeb the!",
        "Sahi jawaab toh saamne tha... dil dukhta hai yeh dekhkar.",
        "Afsos! Yeh khel kabhi kabhi bahut cruel hota hai.",
        "Yeh jawaab nahi tha... but aapne bahut accha khela, {name}.",
        "Kabhi kabhi acche se acche khiladi bhi ruk jaate hain.",
        "Khel ka faisla ho gaya. Lekin aapko garv hona chahiye.",
        "Ohh {name}... itne paas aake... ruk gaye. Dil dukhta hai.",
        "Sahi jawaab tha... par koi baat nahi. Aapne daring dikhaayi!",
        "Afsos... yeh safar yahan khatam hota hai. Par kya safar tha!",
        "Computer ji kehte hain... galat jawaab. Main kya karoon... mera bhi dil toota.",
        "Kabhi kabhi zindagi mein haar bhi ek seekh hoti hai, {name}.",
        "Ohh... audience bhi udaas hai. Par aapne dilon mein jagah bana li."
    ],
    timerLow: [
        "⏰ Samay khatam ho raha hai! Apni instinct par bharosa kijiye!",
        "⏰ Jaldi kijiye! Waqt kisi ka intezaar nahi karta!",
        "⏰ Ab sochne ka waqt nahi hai! Faisla kijiye, {name}!",
        "⏰ Bus kuch second bache hain! Go with your gut!",
        "⏰ Ghadi tik tik kar rahi hai! Answer lock kijiye!",
        "⏰ Hurry {name}! Lock kar dijiye!",
        "⏰ Samay bahut kam hai... jo mann kahe, woh choose kijiye!",
        "⏰ {name}! Ghadi ruk nahi rahi! Kuch toh choose kijiye!",
        "⏰ Tik tok tik tok... faisla ab ya kabhi nahi!",
        "⏰ Waqt nikla jaa raha hai... aapke haath mein abhi bhi mauka hai!"
    ],
    fiftyFifty: [
        "Do galat jawaab hat gaye! Ab do mein se ek chuniye.",
        "50-50 use ho gaya! Ab chances aapke favour mein hain.",
        "Smart move! Ab field narrow ho gaya hai. Sochiye dhyan se.",
        "Accha kiya 50-50 liya. Ab dono options ko carefully analyse kijiye.",
        "Do gaye, do bache, {name}. Ab faisla aapka hai.",
        "Fifty-fifty! Computer ji ne do options hata diye. Ab aasaan ho gaya!",
        "Ab sirf do contestants bach rahe hain... dono options mein se ek sahi hai!",
        "Samajhdaari dikhai {name}! Ab 50-50 chance hai correct hone ka!"
    ],
    audiencePoll: [
        "📊 Audience ne apna vote de diya! Lekin yaad rakhiye — woh bhi galat ho sakte hain...",
        "📊 Interesting! Audience ek option par kaafi confident lag rahi hai.",
        "📊 Janta ne apna faisla suna diya. Kya aap bheed par bharosa karenge?",
        "📊 Loktantra! Lekin kya majority hamesha sahi hoti hai? Yeh sawaal hai.",
        "📊 Audience ka verdict aa gaya, {name}. Ab kya karenge aap?",
        "📊 Audience kehti hai yeh answer hai... par kya audience sach keh rahi hai?",
        "📊 Janta ki awaaz aa gayi! Par aakhiri faisla aapka hai, {name}.",
        "📊 Democracy in action! Audience ne vote diya... ab aap sochiye."
    ],
    phoneFriend: [
        "📞 Chaliye sunte hain aapke dost kya kehte hain! Do dimaag ek se behtar!",
        "📞 Madad ke liye phone! Yeh samajhdaari hai.",
        "📞 Aapka dost line par hai! Dhyan se suniye unki salah.",
        "📞 Phone a Friend! Ummeed karte hain unke paas jawaab hoga.",
        "📞 {name}, yeh aapki madad ki pukar hai. Dekhte hain dost kya kehte hain!",
        "📞 Phone utha rahe hain... saans roko... dekhte hain kya kehte hain!",
        "📞 Ek phone call jo aapki zindagi badal sakti hai! Suniye dhyan se.",
        "📞 Dosti ka imtihaan hai yeh! Dekhte hain aapka dost kitna pakkaa hai."
    ],
    milestone: [
        "🌟 MILESTONE! Yeh amount ab SAFE hai! Chahe kuch bhi ho, yeh aapka hai!",
        "🌟 Badhai ho! Aapne safety net secure kar liya! Ab chain ki saans lijiye.",
        "🌟 Yeh checkpoint hai! Aapka paisa ab pakka hai!",
        "🌟 Bahut accha {name}! Guaranteed amount lock ho gaya. Ab khel ko enjoy kijiye!",
        "🌟 SAFE ZONE! Ab aapke paas kuchh kho jaane ka darr nahi hai, {name}!",
        "🌟 Deviyon aur sajjano... yeh paisa ab {name} ke ghar ja raha hai!",
        "🌟 Milestone reached! Ab aap aazaadi se khel sakte hain!",
        "🌟 Insurance mil gaya! Ab bindaas kheliye, {name}!"
    ],
    jackpot: [
        "🔥 YEH HAI WOH PAL! 7 CRORE ka sawaal! Poora Hindustan saans rok ke baitha hai!",
        "🔥 Ek sawaal aur SAAT CRORE RUPAYE ke beech! Can you believe it?",
        "🔥 Deviyon aur sajjano, {name} JACKPOT attempt kar rahe hain! Itihaas ban sakta hai!",
        "🔥 Poora desh ruk gaya hai aapko dekhne ke liye. Yeh zindagi ka pal hai!",
        "🔥 SAAT CRORE! Main yeh baat teen baar kahunga... SAAT... CRORE... RUPAYE!",
        "🔥 {name}... aap wahan hain jahan koi nahi pahuncha. Yeh itihaas hai!",
        "🔥 Meri aankhen bhi nam hain... yeh pal... yeh pal bahut bada hai!",
        "🔥 Poori duniya rok ke dekh rahi hai... kya {name} 7 crore jeet paayenge?"
    ],
    walkAway: [
        "Samajhdaari ka faisla. Kabhi kabhi rukna hi sabse badi jeet hoti hai.",
        "Aap sir uthake ja rahe hain aur jeb bhari hai. Well played!",
        "Aapne bahut accha khela, {name}. Izzat aur inaam dono lekar ja rahe hain!",
        "Smart move. Lalach ne bahut logon ka safar khatam kiya — lekin aapka nahi!",
        "Samajhdaari aur himmat dono dikhaaye aapne. Waapas zaroor aaiyega!",
        "{name}, aapne woh kiya jo bahut kam log kar paate hain... samay par ruk gaye.",
        "Paisa aapka hai! Izzat aapki hai! Aur yeh anubhav... aapka hai!",
        "Chaliye... taaliyon ke saath vidaai! Kya khiladi the aap!"
    ]
};

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/* Strip emojis for cleaner speech output */
function stripEmoji(str) {
    return str.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}\u200d\ufe0f]/gu, '').replace(/\s+/g, ' ').trim();
}

/** 
 * Avatar Renderer Helper Function
 * Renders an image tag if the avatar is a URL (like a Google Profile Pic),
 * or text if it's a standard Emoji character.
 */
function renderAvatar(avatarStr) {
    if (!avatarStr) return '👤';
    if (avatarStr.startsWith('http') || avatarStr.startsWith('https')) {
        return (
            <img
                src={avatarStr}
                alt="Avatar"
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover'
                }}
            />
        );
    }
    return avatarStr;
}

/* ① Floating particles component */
function Particles() {
    return (
        <div className="particles">
            {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="particle" />
            ))}
        </div>
    );
}

/* Commentary display with typing animation + speech toggle */
function CommentaryBanner({ text, speechEnabled, onToggleSpeech }) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!text) { setDisplayed(""); setDone(false); return; }
        let i = 0;
        const interval = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(interval);
                setDone(true);
            }
        }, 28);
        return () => clearInterval(interval);
    }, [text]);

    if (!text) return null;

    return (
        <motion.div
            className="commentary-banner"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={text}
        >
            <span className="commentary-icon">🎙️</span>
            <span className="commentary-text">
                {displayed}
                {!done && <span className="commentary-cursor">|</span>}
            </span>
            <button
                className="speech-toggle"
                onClick={(e) => { e.stopPropagation(); onToggleSpeech(); }}
                title={speechEnabled ? 'Mute commentary' : 'Unmute commentary'}
            >
                {speechEnabled ? '🔊' : '🔇'}
            </button>
        </motion.div>
    );
}

const AVATARS = ["👤", "🦁", "🦊", "🐼", "🐨", "🐯", "🦄", "👽", "🤖", "👻", "🤡", "🤠"];

export default function App() {
    // ... refs ...
    const suspenseSound = useRef(null);
    const correctSound = useRef(null);
    const themeMusic = useRef(null);
    const ringSound = useRef(null);
    const heartbeatSound = useRef(null);
    const [pendingAnswer, setPendingAnswer] = useState(null);
    const [friendName, setFriendName] = useState("");
    const [nameInput, setNameInput] = useState(() => localStorage.getItem("kbcFriendName") || "");
    const [playerName, setPlayerName] = useState("Player");
    const [avatar, setAvatar] = useState(() => localStorage.getItem("kbcAvatar") || "👤"); // Default Avatar
    const [googleUser, setGoogleUser] = useState(() => {
        try {
            const token = localStorage.getItem("kbcGoogleToken");
            if (token) return jwtDecode(token);
        } catch (e) {
            console.error("Invalid stored Google token", e);
        }
        return null;
    });

    const [playerNameInput, setPlayerNameInput] = useState(() => {
        // Init with Google name if logged in, otherwise use normal storage fallback
        if (googleUser) return googleUser.name;
        return localStorage.getItem("kbcPlayerName") || "";
    });

    const [gameStarted, setGameStarted] = useState(false);
    const [gamePhase, setGamePhase] = useState('start'); // 'start', 'fff', 'hotSeat', 'end'
    const gameStartedRef = useRef(false);

    const [phoneUsed, setPhoneUsed] = useState(false);
    const [showPollModal, setShowPollModal] = useState(false);

    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [phoneMessage, setPhoneMessage] = useState("");

    const [audienceUsed, setAudienceUsed] = useState(false);
    const [audiencePoll, setAudiencePoll] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [fffQuestion, setFffQuestion] = useState(null); // New state for FFF
    const [leaderboard, setLeaderboard] = useState([]);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [gameOver, setGameOver] = useState(false);
    const [jackpotWon, setJackpotWon] = useState(false);
    const [lifelineUsed, setLifelineUsed] = useState(false);
    const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
    const [flipUsed, setFlipUsed] = useState(false);
    const [doubleDipUsed, setDoubleDipUsed] = useState(false);
    const [isDoubleDipActive, setIsDoubleDipActive] = useState(false);
    const [selected, setSelected] = useState(null);
    const [revealing, setRevealing] = useState(false);
    const [stats, setStats] = useState([]);

    const [lifelineTriggeredThisQuestion, setLifelineTriggeredThisQuestion] = useState(false);
    const hasUsedLifeline = lifelineUsed || audienceUsed || phoneUsed;
    const [isLocking, setIsLocking] = useState(false);

    /* Time Tracking State */
    const [totalTimeTaken, setTotalTimeTaken] = useState(0);
    const [questionStartTime, setQuestionStartTime] = useState(null);

    /* ── Admin Mode State ── */
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [showLeaderboardAtStart, setShowLeaderboardAtStart] = useState(false);
    const [adminClicks, setAdminClicks] = useState(0);
    const [adminForm, setAdminForm] = useState({
        level: "1",
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correct: "1"
    });

    /* New State for Question Management */
    const [category, setCategory] = useState("general");
    const [showCategorySelection, setShowCategorySelection] = useState(false);
    const [adminQuestions, setAdminQuestions] = useState([]);
    const [adminView, setAdminView] = useState("add"); // "add" | "list"

    const fetchAdminQuestions = async (lvl) => {
        try {
            const res = await axios.get(`${API}/api/questions/${lvl}?category=${adminForm.category}`);
            setAdminQuestions(res.data);
        } catch (err) {
            console.error("Failed to fetch questions", err);
        }
    };

    // Fetch questions whenever level or category changes in form, if in list view
    useEffect(() => {
        if (showAdminModal && adminView === "list") {
            fetchAdminQuestions(adminForm.level);
        }
    }, [adminForm.level, adminForm.category, adminView, showAdminModal]);

    const handleDeleteQuestion = async (index) => {
        if (!window.confirm("Are you sure you want to delete this question?")) return;

        try {
            await axios.delete(`${API}/api/questions/${adminForm.level}/${index}?category=${adminForm.category}`);
            // Refresh list
            fetchAdminQuestions(adminForm.level);
        } catch (err) {
            alert("❌ Failed to delete question");
        }
    };

    const handleAdminClick = () => {
        setAdminClicks(prev => {
            if (prev + 1 >= 5) {
                setShowAdminModal(true);
                setAdminView("add"); // Default to add view
                return 0;
            }
            return prev + 1;
        });
    };

    const handleAdminSubmit = async () => {
        try {
            await axios.post(`${API}/api/questions`, {
                level: adminForm.level,
                question: adminForm.question,
                options: [
                    adminForm.optionA,
                    adminForm.optionB,
                    adminForm.optionC,
                    adminForm.optionD
                ],
                correct: parseInt(adminForm.correct),
                category: adminForm.category
            });
            alert("✅ Question added successfully!");
            // Optional: Don't close modal to allow adding more
            // setShowAdminModal(false);
            setAdminForm({
                ...adminForm,
                question: "",
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
                correct: "1"
            });
        } catch (err) {
            alert("❌ Failed to add question: " + (err.response?.data?.error || err.message));
        }
    };

    /* 3D Tilt Logic */
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [0, window.innerHeight], [5, -5]);
    const rotateY = useTransform(x, [0, window.innerWidth], [-5, 5]);

    function handleMouseMove(event) {
        x.set(event.clientX);
        y.set(event.clientY);
    }

    /* AI Commentary state */
    const [commentary, setCommentary] = useState("");
    const commentaryTimeoutRef = useRef(null);
    const [speechEnabled, setSpeechEnabled] = useState(true);
    const speechEnabledRef = useRef(true);
    const correctStreakRef = useRef(0);
    const thinkingTimerRef = useRef(null);

    const toggleSpeech = () => {
        const next = !speechEnabled;
        setSpeechEnabled(next);
        speechEnabledRef.current = next;
        if (!next) {
            window.speechSynthesis.cancel();
        }
    };

    /* Returns a Promise that resolves when speech ends (or immediately if muted)
       mood: 'neutral' | 'excited' | 'dramatic' | 'somber' — adjusts rate/pitch */
    const speakText = (text, mood = 'neutral') => {
        return new Promise((resolve) => {
            if (!speechEnabledRef.current || !window.speechSynthesis) {
                resolve();
                return;
            }

            // Clean emojis and insert natural pauses at ellipses
            let clean = stripEmoji(text);
            if (!clean) { resolve(); return; }
            // Convert '...' to comma pauses for more natural speech
            clean = clean.replace(/\.{3,}/g, ', ,');

            const utterance = new SpeechSynthesisUtterance(clean);

            // Dynamic rate/pitch based on mood
            switch (mood) {
                case 'excited':
                    utterance.rate = 0.98;
                    utterance.pitch = 0.95;
                    break;
                case 'dramatic':
                    utterance.rate = 0.82;
                    utterance.pitch = 0.80;
                    break;
                case 'somber':
                    utterance.rate = 0.78;
                    utterance.pitch = 0.75;
                    break;
                default: // neutral
                    utterance.rate = 0.90;
                    utterance.pitch = 0.85;
            }
            utterance.volume = 1;
            utterance.lang = 'hi-IN';

            const voices = window.speechSynthesis.getVoices();
            // Prefer Hindi voice for proper Hindi pronunciation
            // Priority: Google Hindi > Microsoft Hindi > Any Hindi > Indian English > English
            const preferred = voices.find(v => v.lang === 'hi-IN' && v.name.toLowerCase().includes('google'))
                || voices.find(v => v.lang === 'hi-IN' && v.name.toLowerCase().includes('microsoft'))
                || voices.find(v => v.lang === 'hi-IN')
                || voices.find(v => v.lang.startsWith('hi'))
                || voices.find(v => v.lang === 'en-IN')
                || voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('india'))
                || voices.find(v => v.lang.startsWith('en'));
            if (preferred) utterance.voice = preferred;

            if (themeMusic.current) themeMusic.current.volume = 0.10;

            // Failsafe: Resolve after 4 seconds (avg sentence length) to prevent hanging
            const timeout = setTimeout(() => {
                if (themeMusic.current) themeMusic.current.volume = 0.4;
                resolve();
            }, 4000);

            utterance.onend = () => {
                clearTimeout(timeout);
                if (themeMusic.current) themeMusic.current.volume = 0.4;
                resolve();
            };
            utterance.onerror = () => {
                clearTimeout(timeout);
                if (themeMusic.current) themeMusic.current.volume = 0.4;
                resolve();
            };

            window.speechSynthesis.speak(utterance);
        });
    };

    const showCommentary = (text, duration = 5000, mood = 'neutral') => {
        if (commentaryTimeoutRef.current) clearTimeout(commentaryTimeoutRef.current);
        const personalizedText = text.replace(/\{name\}/g, playerName);
        setCommentary(personalizedText);
        commentaryTimeoutRef.current = setTimeout(() => setCommentary(""), duration);
        return speakText(personalizedText, mood);
    };

    /* Reading phase — blocks timer & options until question is read aloud */
    const [isReading, setIsReading] = useState(true);
    const isReadingRef = useRef(true); // Ref to track reading state for timeouts
    const [visibleOptions, setVisibleOptions] = useState(0);
    const [showWalkAwayConfirm, setShowWalkAwayConfirm] = useState(false);

    /* Read question + options aloud, revealing each one by one */
    const readQuestionAloud = async (q) => {
        if (!q || !gameStarted) return;

        // 🛑 Stop any previous speech immediately
        if (window.speechSynthesis) window.speechSynthesis.cancel();

        setIsReading(true);
        isReadingRef.current = true;
        setVisibleOptions(0);

        // Safety: If speech takes too long or fails, force show options
        const safetyTimeout = setTimeout(() => {
            if (isReadingRef.current) {
                console.warn("⚠️ Speech took too long, forcing options display");
                setVisibleOptions(4);
                setIsReading(false);
                isReadingRef.current = false;
                setTimer(30);
            }
        }, 8000); // 8s max reading time

        try {
            // Read question
            await speakText(q.question);

            // Reveal & read each option one by one
            const labels = ['A', 'B', 'C', 'D'];
            for (let i = 0; i < q.options.length; i++) {
                // Check if we already forced finish
                if (!isReading) break;

                if (q.options[i]) {
                    setVisibleOptions(i + 1);  // reveal this option
                    await speakText(`Option ${labels[i]}: ${q.options[i]}`);
                }
            }
        } catch (err) {
            console.error("Speech error:", err);
        } finally {
            clearTimeout(safetyTimeout);
            // Done reading → show all options, start timer
            setVisibleOptions(4);
            setIsReading(false);
            isReadingRef.current = false;
            setIsReading(false);
            isReadingRef.current = false;
            setIsReading(false);
            isReadingRef.current = false;
            setTimer(getTimerForLevel(questions.indexOf(q)));
            setQuestionStartTime(Date.now()); // Start tracking time for this question
        }

        if (q.jackpot) {
            showCommentary(pickRandom(COMMENTARY.jackpot), 6000, 'dramatic');
        } else {
            showCommentary(pickRandom(COMMENTARY.newQuestion), 4000);
        }

        // Start thinking timer — triggers commentary if no answer in 15s
        if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);
        thinkingTimerRef.current = setTimeout(() => {
            if (!revealing && gameStartedRef.current && !gameOver) {
                showCommentary(pickRandom(COMMENTARY.thinking), 4000);
            }
        }, 15000);
    };

    /* ⑦ Track eliminated options for fade-out animation */
    const [eliminatedOptions, setEliminatedOptions] = useState([]);

    const getTimerForLevel = (levelIndex) => {
        if (levelIndex < 5) return 30; // Q1-Q5
        if (levelIndex < 10) return 60; // Q6-Q10
        return null; // Q11+ (Infinity)
    };

    const getTimerColor = () => {
        if (timer === null) return "gold"; // Infinity
        if (timer <= 5) return "red";
        if (timer <= 10) return "orange";
        return "gold";
    };
    useEffect(() => {
        suspenseSound.current = new Audio("/sounds/suspense.mp3");
        correctSound.current = new Audio("/sounds/correct.mp3");
        ringSound.current = new Audio("/sounds/ring.mp3");
        heartbeatSound.current = new Audio("/sounds/heartbeat.mp3");
        heartbeatSound.current.loop = true;
        heartbeatSound.current.volume = 0.6;
        themeMusic.current = new Audio("/sounds/theme.mp3");
        themeMusic.current.loop = true;
        themeMusic.current.volume = 0.4;

        themeMusic.current.play().catch(() => {
            console.log("Autoplay blocked — user interaction required");
        });

        return () => {
            themeMusic.current.pause();
        };
    }, []);

    useEffect(() => {
        if (!heartbeatSound.current) return;

        if (timer === 5 && !gameOver && gameStarted) {
            heartbeatSound.current.currentTime = 0;
            heartbeatSound.current.play().catch(() => { });
        }

        if (timer > 5 || gameOver) {
            heartbeatSound.current.pause();
            heartbeatSound.current.currentTime = 0;
        }
    }, [timer, gameOver, gameStarted]);




    useEffect(() => {
        // Clear any stale game data to prevent loading issues
        localStorage.removeItem("kbcGame");

        // Fetch Leaderboard on mount
        axios.get(`${API}/leaderboard`)
            .then(res => setLeaderboard(res.data.slice(0, 10)))
            .catch(err => console.error("Leaderboard fetch failed", err));

        // Initial fetch is now handled in confirmGameStart based on category
    }, []);



    useEffect(() => {
        if (questions.length > 0 && gameStarted && !gameOver) {
            localStorage.setItem("kbcGame", JSON.stringify({
                current,
                score,
                questions
            }));
        }
    }, [current, score, questions, gameStarted, gameOver]);


    useEffect(() => {
        if (!gameOver && !isLocking && !isReading && timer !== null && timer > 0 && !showAdminModal) {
            const interval = setInterval(() => {
                setTimer(t => (t === null ? null : t - 1));
            }, 1000);
            return () => clearInterval(interval);
        }

        if (timer === 0 && !gameOver && !showAdminModal) {
            endGame();
        }
    }, [timer, gameOver, isLocking, isReading, showAdminModal]);

    /* Commentary: timer low warning */
    useEffect(() => {
        if (timer === 5 && !gameOver && gameStarted && !revealing) {
            showCommentary(pickRandom(COMMENTARY.timerLow), 4000, 'dramatic');
        }
    }, [timer]);

    /* Read question aloud when question changes or game starts */
    useEffect(() => {
        if (!gameStartedRef.current || gameOver || questions.length === 0) {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
            return;
        }
        readQuestionAloud(questions[current]);
    }, [current, gameStarted]);


    const shouldForceLock = () => {
        if (!questions[current]) return false;

        const usedLifeline = lifelineTriggeredThisQuestion;
        const isMilestone = questions[current].milestone;
        const isJackpot = questions[current].jackpot;

        return usedLifeline || isMilestone || isJackpot;
    };

    const handleAnswer = async (index) => {
        if (revealing || isReading) return;

        setSelected(index);
        setIsLocking(true); // Start locking animation

        if (suspenseSound.current) {
            suspenseSound.current.currentTime = 0;
            suspenseSound.current.play();
        }

        /* Calculate time taken for this question */
        let duration = 0;
        if (questionStartTime) {
            duration = (Date.now() - questionStartTime) / 1000;
        }
        setTotalTimeTaken(prev => prev + duration);

        /* Short delay for locking suspense */
        await new Promise(r => setTimeout(r, 2000));

        setIsLocking(false);
        setRevealing(true);

        const isCorrect = index + 1 === questions[current].correct;

        if (isCorrect) {
            if (correctSound.current) {
                correctSound.current.currentTime = 0;
                correctSound.current.play();
            }
            if (questions[current].jackpot && themeMusic.current) {
                themeMusic.current.volume = 0.2;
            }
            /* ⑤ Bigger confetti burst on correct */
            confetti({
                particleCount: 180,
                spread: 90,
                origin: { y: 0.6 },
                colors: ['#ffd700', '#ff8f00', '#00e5ff', '#76ff03']
            });
            const newScore = questions[current].prize;
            setScore(newScore);
            setStats(prev => [...prev, newScore]);

            /* AI Commentary: correct answer */
            const qi = current;
            correctStreakRef.current += 1;
            // Clear thinking timer on answer
            if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);

            // Streak commentary (3+ in a row)
            let speechPromise = Promise.resolve();
            if (correctStreakRef.current >= 3 && !questions[qi].milestone && !questions[qi].jackpot) {
                speechPromise = showCommentary(pickRandom(COMMENTARY.streak), 4000, 'excited');
            } else if (questions[qi].milestone) {
                speechPromise = showCommentary(pickRandom(COMMENTARY.milestone), 5000, 'excited');
            } else if (qi < 5) {
                speechPromise = showCommentary(pickRandom(COMMENTARY.correctEasy), 4000, 'excited');
            } else if (qi < 10) {
                speechPromise = showCommentary(pickRandom(COMMENTARY.correctMid), 4000, 'excited');
            } else if (qi < 15) {
                speechPromise = showCommentary(pickRandom(COMMENTARY.highStakes), 5000, 'dramatic');
            } else {
                speechPromise = showCommentary(pickRandom(COMMENTARY.correctHard), 5000, 'excited');
            }

            if (current === questions.length - 1) {
                /* Jackpot win — big confetti */
                confetti({
                    particleCount: 400,
                    spread: 160,
                    origin: { y: 0.5 },
                    colors: ['#ffd700', '#ff8f00', '#ff4444', '#00e5ff']
                });

                // Post Jackpot Score to Leaderboard
                const lifelinesCount = [fiftyFiftyUsed, audienceUsed, phoneUsed, flipUsed, doubleDipUsed].filter(Boolean).length;

                const token = localStorage.getItem("kbcGoogleToken");
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                axios.post(`${API}/leaderboard`, {
                    name: playerName,
                    amount: questions[current].prize,
                    avatar: googleUser ? googleUser.picture : avatar,
                    timeTaken: totalTimeTaken + ((Date.now() - questionStartTime) / 1000), // Include current q time
                    category: category,
                    lifelinesUsed: lifelinesCount
                }, { headers }).then(() => {
                }).then(() => {
                    // Update leaderboard locally
                    axios.get(`${API}/leaderboard`).then(res => setLeaderboard(res.data.slice(0, 10)));
                }).catch(err => console.error("Failed to post jackpot score", err));

                setJackpotWon(true);
                return;
            }

            // WAIT for commentary to finish before loading next question
            await speechPromise;

            /* ⑥ Small delay before next question for smooth transition */
            await new Promise(r => setTimeout(r, 600));

            setLifelineTriggeredThisQuestion(false);
            setLifelineUsed(false); // Enable lifelines for next question
            setIsDoubleDipActive(false); // Reset active double dip
            setIsReading(true);
            setVisibleOptions(0);
            setCurrent(prev => prev + 1);
            setTimer(getTimerForLevel(current + 1));
            setSelected(null);
            setRevealing(false);
            setAudiencePoll(null);
            setEliminatedOptions([]);
        } else {
            /* Double Dip Logic */
            if (isDoubleDipActive) {
                setIsDoubleDipActive(false);
                showCommentary("Wrong answer! But you have one more chance.", 3000, 'tense');
                setEliminatedOptions(prev => [...prev, index]);
                // Re-enable options
                setRevealing(false);
                setSelected(null);
                return;
            }

            /* AI Commentary: wrong answer */
            correctStreakRef.current = 0;
            if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);
            showCommentary(pickRandom(COMMENTARY.wrong), 4000, 'somber');

            // reveal correct answer
            setRevealing(true);
            setSelected(index); // keep their wrong selection

            // Wait to show correct answer before ending
            setTimeout(() => {
                endGame();
            }, 4000);
        }
    };


    const audiencePollLifeline = () => {
        if (audienceUsed) return;

        const correctIndex = questions[current].correct - 1;
        const totalOptions = questions[current].options.length;

        const correctPercentage = Math.floor(Math.random() * 26) + 50;
        const remaining = 100 - correctPercentage;

        const wrongIndexes = questions[current].options
            .map((_, i) => i)
            .filter(i => i !== correctIndex);

        let remainingPool = remaining;
        const probabilities = new Array(totalOptions).fill(0);

        wrongIndexes.forEach((index, i) => {
            if (i === wrongIndexes.length - 1) {
                probabilities[index] = remainingPool;
            } else {
                const value = Math.floor(Math.random() * (remainingPool / 2));
                probabilities[index] = value;
                remainingPool -= value;
            }
        });

        probabilities[correctIndex] = correctPercentage;

        setAudiencePoll(probabilities);
        setAudienceUsed(true);
        setLifelineTriggeredThisQuestion(true);
        setShowPollModal(true);
        showCommentary(pickRandom(COMMENTARY.audiencePoll), 5000, 'dramatic');
    };

    const phoneFriend = () => {
        if (phoneUsed) return;

        if (themeMusic.current) {
            themeMusic.current.volume = 0.1;
        }
        setShowPhoneModal(true);
        setPhoneMessage(`📞 Calling ${friendName}...`);

        // Reset & play ringing
        if (ringSound.current) {
            ringSound.current.currentTime = 0;
            ringSound.current.loop = true; // keep ringing
            ringSound.current.volume = 1;
            ringSound.current.play();
        }

        setTimeout(() => {
            const correctIndex = questions[current].correct - 1;
            const chance = Math.random();

            let suggestion;
            let confidence;
            let optionLetter;

            const difficultyFactor = current / 16;
            const accuracy = 0.85 - difficultyFactor * 0.4;

            if (chance < accuracy) {
                suggestion = questions[current].options[correctIndex];
                confidence = Math.floor(Math.random() * 21) + 70;
                optionLetter = String.fromCharCode(65 + correctIndex);
            } else {
                const wrongIndexes = questions[current].options
                    .map((_, i) => i)
                    .filter(i => i !== correctIndex);

                const randomIndex =
                    wrongIndexes[Math.floor(Math.random() * wrongIndexes.length)];

                suggestion = questions[current].options[randomIndex];
                confidence = Math.floor(Math.random() * 40) + 40;
                optionLetter = String.fromCharCode(65 + randomIndex);
            }

            // 🔥 STOP RINGING HERE
            const fadeOutRing = () => {
                if (!ringSound.current) return;

                const fadeInterval = setInterval(() => {
                    if (ringSound.current.volume > 0.05) {
                        ringSound.current.volume -= 0.05;
                    } else {
                        clearInterval(fadeInterval);
                        ringSound.current.pause();
                        ringSound.current.currentTime = 0;
                        ringSound.current.volume = 1;
                        ringSound.current.loop = false;
                    }
                }, 100);
            };
            fadeOutRing();

            setPhoneMessage(
                `📞 ${friendName} says:\n"I think it's Option ${optionLetter} - ${suggestion}. I'm ${confidence}% sure."`
            );
            if (themeMusic.current) {
                themeMusic.current.volume = 0.4;
            }

            setPhoneUsed(true);
            setLifelineTriggeredThisQuestion(true);
            showCommentary(pickRandom(COMMENTARY.phoneFriend), 5000, 'dramatic');
        }, 2500);
    };




    /* ⑦ 50-50 with animated fade-out */
    const fiftyFifty = () => {
        if (fiftyFiftyUsed || lifelineUsed) return;

        const correctIndex = questions[current].correct - 1;

        const wrongIndexes = questions[current].options
            .map((_, i) => i)
            .filter(i => i !== correctIndex);

        const removed = wrongIndexes.sort(() => 0.5 - Math.random()).slice(0, 2);

        /* First animate out, then remove after delay */
        setEliminatedOptions(removed);

        setTimeout(() => {
            const filtered = questions[current].options.map((opt, i) =>
                removed.includes(i) ? null : opt
            );

            const updated = [...questions];
            updated[current].options = filtered;
            setQuestions(updated);
        }, 600);

        setLifelineUsed(true);
        setFiftyFiftyUsed(true);
        setLifelineTriggeredThisQuestion(true);
        showCommentary(pickRandom(COMMENTARY.fiftyFifty), 5000, 'dramatic');
    };



    /* ⑧ Flip the Question Lifeline */
    const handleFlip = async () => {
        if (flipUsed) return;

        // Visual feedback
        setFlipUsed(true);
        setLifelineTriggeredThisQuestion(true);
        showCommentary("Let's change the question!", 3000, 'excited');

        // Fetch new question
        try {
            // Try AI first
            let newQuestion = null;
            try {
                const res = await axios.get(`${API}/api/generate-question/${current + 1}?category=${category}`);
                newQuestion = res.data;
            } catch (e) {
                console.warn("AI Flip failed, trying local...");
            }

            // Fallback to local
            if (!newQuestion) {
                const res = await axios.get(`${API}/api/questions/${current + 1}?category=${category}`);
                if (res.data && res.data.length > 0) {
                    // Pick random different from current
                    const candidates = res.data.filter(q => q.question !== questions[current].question);
                    if (candidates.length > 0) {
                        newQuestion = candidates[Math.floor(Math.random() * candidates.length)];
                    }
                }
            }

            // Fallback to OpenTDB if local fails or returns duplicate
            if (!newQuestion || newQuestion.question === questions[current].question) {
                console.log("Local Flip failed or duplicate, trying OpenTDB...");
                const difficulty = current < 5 ? 'easy' : current < 10 ? 'medium' : 'hard';
                const catId = OPENTDB_CATEGORY_MAP[category] || 9; // Default to General
                const tdbRes = await fetchFromOpenTDB(1, difficulty, catId);
                if (tdbRes && tdbRes.length > 0) {
                    newQuestion = tdbRes[0];
                }
            }

            if (newQuestion) {
                // Formatting matches existing structure
                const formattedQ = {
                    ...newQuestion,
                    prize: questions[current].prize,
                    milestone: questions[current].milestone,
                    jackpot: questions[current].jackpot
                };

                const updatedQuestions = [...questions];
                updatedQuestions[current] = formattedQ;
                setQuestions(updatedQuestions);

                // Reset for new question
                setTimer(getTimerForLevel(current + 1));
                setEliminatedOptions([]);
                setRevealing(false);
                setSelected(null);
                readQuestionAloud(formattedQ);
            } else {
                showCommentary("Sorry, we couldn't find another question!", 3000, 'somber');
            }
        } catch (err) {
            console.error("Flip failed:", err);
            showCommentary("Techincal glitch! Can't flip right now.", 3000, 'tense');
        }
    };

    /* ⑨ Double Dip Lifeline */
    const handleDoubleDip = () => {
        if (doubleDipUsed || lifelineUsed) return;
        setDoubleDipUsed(true);
        setIsDoubleDipActive(true);
        setLifelineUsed(true); // Locks other lifelines
        showCommentary("Double Dip active! You have two chances.", 4000, 'excited');
    };

    const getSafetyNetAmount = () => {
        let safeAmount = 0;

        for (let i = 0; i < current; i++) {
            if (questions[i].milestone) {
                safeAmount = questions[i].prize;
            }
        }

        return safeAmount;
    };

    const endGame = (finalAmount = null) => {
        const safeAmount = getSafetyNetAmount();
        const winningAmount = finalAmount !== null ? finalAmount : safeAmount;

        setScore(winningAmount);
        setGameOver(true);
        localStorage.removeItem("kbcGame");

        if (winningAmount > 0) {
            const lifelinesCount = [fiftyFiftyUsed, audienceUsed, phoneUsed, flipUsed, doubleDipUsed].filter(Boolean).length;
            const token = localStorage.getItem("kbcGoogleToken");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            axios.post(`${API}/leaderboard`, {
                name: playerName,
                amount: winningAmount,
                avatar: googleUser ? googleUser.picture : avatar,
                timeTaken: totalTimeTaken,
                category: category,
                lifelinesUsed: lifelinesCount
            }, { headers }).then(() => {
            }).then(() => {
                axios.get(`${API}/leaderboard`).then(res => {
                    setLeaderboard(res.data.slice(0, 10)); // Top 10
                });
            });
        }
    };

    const handleWalkAway = () => {
        if (!gameStarted || gameOver) return;
        // User takes current score (prize of PREVIOUS question, or 0 if Q1)
        // Actually, 'score' state holds the prize of the *last answered* question.
        // So we just take 'score'.
        // Wait, 'score' is updated in handleAnswer.
        // If they are on Q5 (for 10k), 'score' is what they won at Q4.
        // If they walk away ON Q5, they take what they have (score).

        showCommentary(`Smart choice! You're going home with ₹${score.toLocaleString('en-IN')}`, 4000, 'happy');
        endGame(score);
    };


    const restartGame = () => {
        localStorage.removeItem("kbcGame");
        window.location.reload();
    };

    /* ── Helper: Prime Audio Context ── */
    const primeAudio = () => {
        return new Promise((resolve) => {
            if (!window.speechSynthesis) {
                resolve();
                return;
            }
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance("Starting K.B.C Insane.");
            utterance.volume = 0.5;
            utterance.rate = 1.0;

            utterance.onend = () => resolve();
            utterance.onerror = () => resolve();

            window.speechSynthesis.speak(utterance);

            // Forced resolve if takes too long (e.g. if browser blocks it)
            setTimeout(resolve, 2000);
        });
    };

    const confirmGameStart = async (selectedCat) => {
        // 1. Explicitly play audio on User Click (Crucial for Autoplay Policy)
        await primeAudio();

        setCategory(selectedCat);
        setShowCategorySelection(false);
        setGameStarted(true);
        gameStartedRef.current = true;

        // Reset game state
        // Reset game state
        setCurrent(0);
        setScore(0);
        setTimer(30);
        setTotalTimeTaken(0);
        setQuestionStartTime(null);
        setGameOver(false);
        setJackpotWon(false);
        setLifelineUsed(false);
        setFiftyFiftyUsed(false);
        setFlipUsed(false);
        setDoubleDipUsed(false);
        setIsDoubleDipActive(false);
        setAudienceUsed(false);
        setPhoneUsed(false);
        setLifelineTriggeredThisQuestion(false);

        // Fetch questions for the selected category
        try {
            const selectedQuestions = await fetchHybridQuestions(ladder, selectedCat);
            setQuestions(selectedQuestions);

            // Fetch FFF Question
            try {
                const fffRes = await axios.get(`${API}/api/fff-questions`);
                if (fffRes.data) {
                    setFffQuestion(fffRes.data);
                } else {
                    console.warn("No FFF question from server, using fallback");
                    setFffQuestion(fffQuestions[Math.floor(Math.random() * fffQuestions.length)]);
                }
            } catch (e) {
                console.error("Failed to fetch FFF question, using fallback", e);
                setFffQuestion(fffQuestions[Math.floor(Math.random() * fffQuestions.length)]);
            }

            // Start with FFF
            setGamePhase('fff');
        } catch (err) {
            console.error("Failed to fetch questions:", err);
        }
    };

    const handleFffComplete = (success) => {
        if (success) {
            setGamePhase('hotSeat');
            // Prime audio for main game
            primeAudio();
            readQuestionAloud(questions[0]);
        } else {
            // Failed FFF - strictly speaking should be game over or retry
            // For now, let's just reload or go back to start
            alert("Better luck next time!");
            window.location.reload();
        }
    };

    if (!questions.length && gameStarted) return <h1>Loading...</h1>;

    /* ── ⑨ Polished Start Screen ──────────────────────── */
    if (!gameStarted && !showCategorySelection && !showLeaderboardAtStart) {
        return (
            <div className="container">
                <div className="start-screen">
                    <Particles />
                    <Particles />
                    <h1 onClick={handleAdminClick} style={{ cursor: 'default' }}>🔥 KBC INSANE 🔥</h1>
                    <p className="subtitle">The Ultimate Quiz Challenge</p>
                    <h3>Enter your details to begin</h3>

                    <div className="login-section" style={{ background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
                        {!googleUser ? (
                            <>
                                <p style={{ marginBottom: '15px' }}>Sign in with Google to save your scores</p>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <GoogleLogin
                                        onSuccess={credentialResponse => {
                                            const decoded = jwtDecode(credentialResponse.credential);
                                            console.log("Logged in user:", decoded);
                                            setGoogleUser(decoded);
                                            setPlayerNameInput(decoded.name);
                                            setAvatar("👤"); // Can use decoded.picture later
                                            localStorage.setItem("kbcGoogleToken", credentialResponse.credential);
                                        }}
                                        onError={() => {
                                            console.error('Login Failed');
                                            alert("Login Failed. You can still play without saving scores to global leaderboard if you like, just use the manual input below.");
                                        }}
                                        theme="filled_black"
                                        shape="pill"
                                    />
                                </div>

                                <div style={{ margin: '15px 0', fontSize: '0.9em', color: '#888' }}>- OR PLAY AS GUEST -</div>

                                <input
                                    type="text"
                                    placeholder="Guest Name"
                                    value={playerNameInput}
                                    onChange={(e) => setPlayerNameInput(e.target.value)}
                                    className="friend-input"
                                />
                                <div className="avatar-selection" style={{ marginTop: '10px' }}>
                                    <div className="avatar-grid">
                                        {AVATARS.map((av) => (
                                            <div
                                                key={av}
                                                className={`avatar-option ${avatar === av ? "selected" : ""}`}
                                                onClick={() => setAvatar(av)}
                                                style={{ padding: '5px', fontSize: '1.2rem' }}
                                            >
                                                {av}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="logged-in-profile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                                <img src={googleUser.picture} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #ffd700' }} />
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ margin: 0, color: '#ffd700' }}>{googleUser.name}</h3>
                                    <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Ready to play</p>
                                </div>
                                <button
                                    onClick={() => {
                                        googleLogout();
                                        setGoogleUser(null);
                                        setPlayerNameInput("");
                                        localStorage.removeItem("kbcGoogleToken");
                                    }}
                                    style={{ background: 'transparent', border: '1px solid #ff4444', color: '#ff4444', padding: '5px 10px', borderRadius: '5px', marginLeft: '10px', cursor: 'pointer' }}
                                >
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>

                    <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
                        <button
                            className="start-btn"
                            onClick={() => {
                                if (nameInput.trim() === "" || playerNameInput.trim() === "") return;
                                primeAudio(); // Unlock audio
                                localStorage.setItem("kbcPlayerName", playerNameInput.trim());
                                localStorage.setItem("kbcFriendName", nameInput.trim());
                                localStorage.setItem("kbcAvatar", avatar);
                                setPlayerName(playerNameInput.trim());
                                setFriendName(nameInput.trim());
                                setShowCategorySelection(true);
                            }}
                        >
                            🎬 Start Game
                        </button>
                        <button
                            className="start-btn"
                            style={{ background: 'linear-gradient(135deg, #4b6cb7, #182848)' }}
                            onClick={() => {
                                primeAudio();
                                setShowLeaderboardAtStart(true);
                                setCategory("All");
                            }}
                        >
                            🏆 Highscores
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ── Highscores Screen (from Start Menu) ── */
    if (showLeaderboardAtStart) {
        return (
            <div className="container difficulty-8">
                <div className="game-over won">
                    <Particles />
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.5, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        🏆 Hall of Fame
                    </motion.h1>

                    {leaderboard.length > 0 ? (
                        <>
                            <h3>Global Top 3</h3>
                            {/* Global Top 3 Cards */}
                            <div className="top-three-container">
                                {leaderboard.slice(0, 3).map((entry, i) => (
                                    <div key={i} className={`top-card rank-${i + 1}`}>
                                        <div className="top-avatar" style={{ overflow: 'hidden' }}>{renderAvatar(entry.avatar)}</div>
                                        <div className="top-name">{entry.name}</div>
                                        <div className="top-prize">₹{entry.amount.toLocaleString('en-IN')}</div>
                                        <div className="top-badge">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Category Tabs */}
                            <div className="leaderboard-tabs">
                                {['All', ...CATEGORIES.map(c => c.id)].map(catId => (
                                    <button
                                        key={catId}
                                        className={`tab-btn ${category === catId ? 'active' : ''}`}
                                        onClick={() => setCategory(catId)}
                                    >
                                        {catId === 'All' ? '🌍 All' : CATEGORIES.find(c => c.id === catId)?.name}
                                    </button>
                                ))}
                            </div>

                            <table className="leaderboard-table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Player</th>
                                        <th>Prize</th>
                                        <th>Lifelines</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard
                                        .filter(entry => category === 'All' || entry.category === category)
                                        .slice(0, 10)
                                        .map((entry, index) => (
                                            <tr key={index}>
                                                <td className="rank-cell">#{index + 1}</td>
                                                <td className="player-cell">
                                                    <span className="leaderboard-avatar" style={{ overflow: 'hidden' }}>{renderAvatar(entry.avatar)}</span>
                                                    {entry.name}
                                                </td>
                                                <td className="prize-cell">₹{entry.amount.toLocaleString('en-IN')}</td>
                                                <td className="lifeline-cell">
                                                    {entry.lifelinesUsed !== undefined
                                                        ? `${entry.lifelinesUsed}/5`
                                                        : '-'}
                                                </td>
                                                <td className="time-cell">
                                                    {entry.timeTaken
                                                        ? `${Math.floor(entry.timeTaken / 60)}m ${Math.floor(entry.timeTaken % 60)}s`
                                                        : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <h3>No scores yet! Play a game to get on the board.</h3>
                    )}

                    <button className="restart-btn" onClick={() => setShowLeaderboardAtStart(false)} style={{ marginTop: '30px' }}>
                        ⬅️ Back to Start
                    </button>
                </div>
            </div>
        );
    }

    /* ── Category Selection Screen ── */
    if (showCategorySelection) {
        return (
            <div className="container">
                <div className="start-screen" style={{ maxWidth: '900px' }}>
                    <Particles />
                    <h1>🔥 Select Your Topic 🔥</h1>
                    <p className="subtitle">Choose your area of expertise</p>

                    <div className="category-grid">
                        {CATEGORIES.map((cat) => (
                            <div
                                key={cat.id}
                                className="category-card"
                                onClick={() => confirmGameStart(cat.id)}
                            >
                                <div className="cat-icon">{cat.icon}</div>
                                <div className="cat-name">{cat.name}</div>
                            </div>
                        ))}
                    </div>

                    <button
                        className="restart-btn"
                        onClick={() => setShowCategorySelection(false)}
                        style={{ marginTop: '20px' }}
                    >
                        ⬅️ Back
                    </button>
                </div>
            </div>
        );
    }


    if (jackpotWon || (gameOver && score >= 10000000)) {
        return <WinnerScreen amount={score} playerName={playerName} onRestart={restartGame} />;
    }

    /* ── Fastest Finger First Phase ── */
    if (gameStarted && gamePhase === 'fff') {
        return (
            <div className="container" style={{ position: 'relative' }}>
                <Particles />

                {/* Profile Header */}
                <div className="profile-header">
                    <div className="profile-avatar">{avatar}</div>
                    <div className="profile-info">
                        <div className="profile-name">{playerName}</div>
                        <div className="profile-rank">Contestant</div>
                    </div>
                </div>

                <FastestFinger
                    questionData={fffQuestion}
                    onComplete={handleFffComplete}
                />
            </div>
        );
    }



    /* ── ⑩ Upgraded Game Over ─────────────────────────── */
    if (gameOver) {
        const isWin = score > 0;
        return (
            <div className={`container ${isWin ? "difficulty-8" : "difficulty-0"}`}>
                <div className={`game-over ${isWin ? "won" : "lost"}`}>
                    <Particles />
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.5, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        {isWin ? "🏆 Game Over" : "💔 Game Over"}
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Final Score: ₹{score.toLocaleString('en-IN')}
                    </motion.h2>

                    {leaderboard.length > 0 && (
                        <>
                            <h3>🏆 Global Top 3</h3>
                            {/* Global Top 3 Cards */}
                            <div className="top-three-container">
                                {leaderboard.slice(0, 3).map((entry, i) => (
                                    <div key={i} className={`top-card rank-${i + 1}`}>
                                        <div className="top-avatar" style={{ overflow: 'hidden' }}>{renderAvatar(entry.avatar)}</div>
                                        <div className="top-name">{entry.name}</div>
                                        <div className="top-prize">₹{entry.amount.toLocaleString('en-IN')}</div>
                                        <div className="top-badge">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Category Tabs */}
                            <div className="leaderboard-tabs">
                                {['All', ...CATEGORIES.map(c => c.id)].map(catId => (
                                    <button
                                        key={catId}
                                        className={`tab-btn ${category === catId ? 'active' : ''}`}
                                        onClick={() => setCategory(catId)}
                                    >
                                        {catId === 'All' ? '🌍 All' : CATEGORIES.find(c => c.id === catId)?.name}
                                    </button>
                                ))}
                            </div>

                            <table className="leaderboard-table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Player</th>
                                        <th>Prize</th>
                                        <th>Lifelines</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard
                                        .filter(entry => category === 'All' || entry.category === category)
                                        .slice(0, 10)
                                        .map((entry, index) => (
                                            <tr key={index}>
                                                <td className="rank-cell">#{index + 1}</td>
                                                <td className="player-cell">
                                                    <span className="leaderboard-avatar" style={{ overflow: 'hidden' }}>{renderAvatar(entry.avatar)}</span>
                                                    {entry.name}
                                                </td>
                                                <td className="prize-cell">₹{entry.amount.toLocaleString('en-IN')}</td>
                                                <td className="lifeline-cell">
                                                    {entry.lifelinesUsed !== undefined
                                                        ? `${entry.lifelinesUsed}/5`
                                                        : '-'}
                                                </td>
                                                <td className="time-cell">
                                                    {entry.timeTaken
                                                        ? `${Math.floor(entry.timeTaken / 60)}m ${Math.floor(entry.timeTaken % 60)}s`
                                                        : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </>
                    )}

                    {stats.length > 0 && (
                        <div className="chart-container">
                            <Bar
                                data={{
                                    labels: stats.map((_, i) => `Q${i + 1}`),
                                    datasets: [
                                        {
                                            label: "Prize Won",
                                            data: stats,
                                            backgroundColor: "rgba(255, 215, 0, 0.7)",
                                            borderColor: "#ffd700",
                                            borderWidth: 1,
                                            borderRadius: 6
                                        }
                                    ]
                                }}
                                options={{
                                    plugins: {
                                        legend: { labels: { color: "rgba(200,220,255,0.8)", font: { family: "Outfit" } } }
                                    },
                                    scales: {
                                        x: { ticks: { color: "rgba(200,220,255,0.6)" }, grid: { color: "rgba(255,255,255,0.05)" } },
                                        y: { ticks: { color: "rgba(200,220,255,0.6)" }, grid: { color: "rgba(255,255,255,0.05)" } }
                                    }
                                }}
                            />
                        </div>
                    )}

                    <button className="restart-btn" onClick={restartGame}>
                        🔄 Play Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`container 
        ${score >= 10000 ? "jackpot-mode" : ""}  
        ${isLocking ? "lock-dim" : ""}
        ${isDoubleDipActive ? "double-dip-mode" : ""}
        difficulty-${current}
    `.trim()}
            onMouseMove={handleMouseMove}
        >

            {/* ① Floating particles */}
            <Particles />

            {/* Profile Header (Always visible in game) */}
            <div className="profile-header">
                <div className="profile-avatar">{avatar}</div>
                <div className="profile-info">
                    <div className="profile-name">{playerName}</div>
                    <div className="profile-rank">Question {current + 1}/16</div>
                </div>
            </div>

            <div className="game-layout">
                <div className="left-panel">
                    <h1 className="title">🔥 KBC INSANE 🔥</h1>

                    {/* ⑧ Progress indicator */}
                    <div className="progress-indicator">
                        Q{current + 1} of {ladder.length}
                    </div>

                    <div className="timer-wrapper">
                        <svg width="70" height="70">
                            <circle
                                cx="35"
                                cy="35"
                                r="28"
                                stroke="#333"
                                strokeWidth="6"
                                fill="none"
                            />
                            <circle
                                cx="35"
                                cy="35"
                                r="28"
                                stroke={getTimerColor()}
                                strokeWidth="6"
                                fill="none"
                                strokeDasharray="176"
                                strokeDashoffset={timer === null ? 0 : 176 - (timer / (current < 5 ? 30 : 60)) * 176}
                                style={{ transition: "stroke-dashoffset 1s linear" }}
                            />
                        </svg>
                        <div
                            className={`timer-text ${timer <= 5 && !isReading ? "danger" : ""} ${isReading ? "reading" : ""}`}
                            onClick={() => {
                                if (isReading) {
                                    // Manual override to skip reading
                                    if (window.speechSynthesis) window.speechSynthesis.cancel();
                                    setVisibleOptions(4);
                                    setIsReading(false);
                                    isReadingRef.current = false;
                                    setTimer(30);
                                    setQuestionStartTime(Date.now()); // Start timer on skip
                                }
                            }}
                            style={{ cursor: isReading ? 'pointer' : 'default' }}
                            title={isReading ? "Click to skip reading" : ""}
                        >
                            {isReading ? "⏭️" : (timer === null ? "∞" : `${timer}s`)}
                        </div>
                    </div>
                    <div className="center-panel">
                        <h3 className="question-header">QUESTION {current + 1} OF {questions.length}</h3>
                        {/* ⑥ AnimatePresence for smooth question transitions */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                className={`question-box ${revealing ? "spotlight" : ""}`}
                                key={`${current}-${questions[current]?.question}-${flipUsed ? 'flipped' : ''}`} // Force re-render on Flip
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                                style={{ perspective: 1000, rotateX, rotateY }}
                            >
                                {/* Multimedia Support */}
                                {questions[current].type === 'image' && questions[current].mediaUrl && (
                                    <div className="question-media-container">
                                        <img
                                            src={questions[current].mediaUrl}
                                            alt="Question Visual"
                                            className="question-media"
                                        />
                                    </div>
                                )}
                                {questions[current].type === 'video' && questions[current].mediaUrl && (
                                    <div className="question-media-container">
                                        <video
                                            src={questions[current].mediaUrl}
                                            controls
                                            autoPlay
                                            className="question-media"
                                        />
                                    </div>
                                )}

                                <h2>{questions[current]?.question}</h2>

                                {audiencePoll && (
                                    <div className="ai-box" style={{ width: '100%', marginBottom: '50px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
                                        <h4>🧠 Audience Poll</h4>

                                        {questions[current].options.map((opt, i) =>
                                            opt && (
                                                <div key={i} className="poll-row">
                                                    <span className="poll-option">{String.fromCharCode(65 + i)}. {opt}</span>

                                                    <div className="poll-bar-container">
                                                        <div
                                                            className="poll-bar"
                                                            style={{
                                                                width: `${audiencePoll[i]}%`
                                                            }}
                                                        ></div>
                                                    </div>

                                                    <span className="poll-percent">{audiencePoll[i]}%</span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}

                                <div className="options">

                                    {questions[current]?.options.map((opt, i) =>
                                        opt !== null && i < visibleOptions ? (
                                            <motion.button
                                                key={i}
                                                disabled={revealing || isReading || isLocking}
                                                className={`
                                    ${selected === i && !revealing ? "selected" : ""}
                                    ${selected === i && isLocking ? "locking" : ""}
                                    ${revealing && i + 1 === questions[current].correct ? "correct" : ""}
                                    ${revealing && i === selected && i + 1 !== questions[current].correct ? "wrong" : ""}
                                    ${eliminatedOptions.includes(i) ? "eliminated" : ""}
                                `}
                                                onClick={() => {
                                                    if (shouldForceLock()) {
                                                        setIsLocking(true);
                                                        setPendingAnswer(i);
                                                    } else {
                                                        handleAnswer(i);
                                                    }
                                                }}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.35, ease: "backOut" }}
                                            >
                                                {String.fromCharCode(65 + i)}. {opt}
                                            </motion.button>
                                        ) : (
                                            /* Hidden placeholder to keep grid layout */
                                            <div key={i} style={{ visibility: "hidden", minHeight: 52 }} />
                                        )
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* AI Commentary Banner */}
                        <CommentaryBanner text={commentary} speechEnabled={speechEnabled} onToggleSpeech={toggleSpeech} />

                        <div className="lifeline-container">
                            <button
                                className={`lifeline-circle ${fiftyFiftyUsed ? "used" : ""}`}
                                onClick={fiftyFifty}
                                disabled={fiftyFiftyUsed || lifelineUsed || isReading}
                                title="50-50"
                            >
                                50-50
                            </button>

                            <button
                                className="lifeline-circle"
                                onClick={audiencePollLifeline}
                                disabled={audienceUsed || isReading}
                                title="Audience Poll"
                            >
                                📊
                            </button>

                            <button
                                className="lifeline-circle"
                                onClick={phoneFriend}
                                disabled={phoneUsed || isReading}
                                title="Phone a Friend"
                            >
                                📞
                            </button>
                            <button
                                className={`lifeline-circle ${flipUsed ? "used" : ""}`}
                                onClick={handleFlip}
                                disabled={flipUsed || isReading || lifelineUsed}
                                title="Flip Question"
                            >
                                🔄
                            </button>
                            <button
                                className={`lifeline-circle ${doubleDipUsed ? "used" : ""}`}
                                onClick={handleDoubleDip}
                                disabled={doubleDipUsed || isReading || lifelineUsed}
                                title="Double Dip"
                            >
                                x2
                            </button>
                        </div>
                        <button
                            className="walk-away"
                            disabled={isReading}
                            onClick={() => setShowWalkAwayConfirm(true)}
                        >
                            🚪 Walk Away
                        </button>
                        <div className="score">💰 ₹{score}</div>
                    </div>  {/*close center-panel */}
                </div>  {/*close left-pane */}
                <div className="right-panel">
                    <h3 className="ladder-header">PRIZE LADDER</h3>
                    <div className="money-ladder">
                        {[...ladder].reverse().map((item, ri) => {
                            const i = ladder.length - 1 - ri;
                            return (
                                <div
                                    key={i}
                                    className={`money-item ${current === i ? "active" : ""} 
                                    ${i < current ? "completed" : ""}
                                    ${item.milestone ? "milestone" : ""}`}
                                >
                                    <span className="index">{i + 1}</span>
                                    <span className="amount">
                                        {item.milestone && <span style={{ marginRight: '5px' }}>⭐</span>}
                                        ₹{item.prize.toLocaleString('en-IN')}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div> {/*close right-pane */}

            </div> {/*close game-layout */}
            {showPollModal && (
                <div className="modal-overlay" onClick={() => setShowPollModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>📊 Audience Poll</h3>

                        {questions[current].options.map((opt, i) =>
                            opt && (
                                <div key={i} className="poll-row">
                                    <span className="poll-option">{String.fromCharCode(65 + i)}. {opt}</span>
                                    <div className="poll-bar-container">
                                        <div
                                            className="poll-bar"
                                            style={{ width: `${audiencePoll[i]}%` }}
                                        ></div>
                                    </div>
                                    <span className="poll-percent">{audiencePoll[i]}%</span>
                                </div>
                            )
                        )}

                        <button className="lifeline" onClick={() => setShowPollModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showWalkAwayConfirm && (
                <div className="modal-overlay" onClick={() => setShowWalkAwayConfirm(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>🚪 Walk Away?</h3>
                        <p style={{ fontSize: '1.1rem', margin: '16px 0' }}>
                            Are you sure you want to walk away with <strong style={{ color: '#ffd700' }}>₹{score.toLocaleString('en-IN')}</strong>?
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button
                                className="lifeline"
                                style={{ background: 'linear-gradient(135deg, #e53935, #b71c1c)', flex: 1 }}
                                onClick={() => {
                                    setShowWalkAwayConfirm(false);
                                    handleWalkAway();
                                }}
                            >
                                Yes, Walk Away
                            </button>
                            <button
                                className="lifeline"
                                style={{ background: 'linear-gradient(135deg, #43a047, #1b5e20)', flex: 1 }}
                                onClick={() => setShowWalkAwayConfirm(false)}
                            >
                                No, Keep Playing
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showPhoneModal && (
                <div
                    className="modal-overlay"
                    onClick={() => {
                        if (ringSound.current) {
                            ringSound.current.pause();
                            ringSound.current.currentTime = 0;
                            ringSound.current.loop = false;
                        }
                        setShowPhoneModal(false);
                    }}
                >

                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>📞 Phone a Friend</h3>

                        <p className={`phone-text ${phoneMessage.includes("Calling") ? "calling" : ""}`}>
                            {phoneMessage}
                        </p>

                        <button
                            className="lifeline"
                            onClick={() => {
                                if (ringSound.current) {
                                    ringSound.current.pause();
                                    ringSound.current.currentTime = 0;
                                    ringSound.current.loop = false;
                                }
                                setShowPhoneModal(false);
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {pendingAnswer !== null && (
                <div className="modal-overlay">
                    <div className={`modal ${questions[current]?.jackpot ? "jackpot-modal" : ""
                        }`}>
                        <h3>
                            {questions[current]?.jackpot
                                ? "🔥 FINAL ANSWER? THIS IS FOR ₹7 CRORE!"
                                : questions[current]?.milestone
                                    ? "⭐ This is a milestone question. Lock it?"
                                    : "🔒 Lock this answer?"}
                        </h3>


                        <button
                            className={`lifeline ${questions[current]?.jackpot ? "jackpot-lock" : ""
                                }`}
                            onClick={() => {
                                setIsLocking(false);
                                handleAnswer(pendingAnswer);
                                setPendingAnswer(null);
                            }}
                        >
                            {questions[current]?.jackpot
                                ? "🔥 FINAL ANSWER"
                                : questions[current]?.milestone
                                    ? "⭐ Lock Milestone Answer"
                                    : "Yes, Lock It"}
                        </button>


                        <button
                            className="lifeline"
                            onClick={() => {
                                setIsLocking(false);
                                setPendingAnswer(null);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* ── Admin Modal ── */}
            {showAdminModal && (
                <div className="modal-overlay" onClick={() => setShowAdminModal(false)}>
                    <div className="modal admin-modal" onClick={e => e.stopPropagation()}>
                        <h3>🛠️ Admin Panel</h3>

                        <div className="admin-tabs">
                            <button
                                className={`tab-btn ${adminView === "add" ? "active" : ""}`}
                                onClick={() => setAdminView("add")}
                            >
                                ➕ Add New
                            </button>
                            <button
                                className={`tab-btn ${adminView === "list" ? "active" : ""}`}
                                onClick={() => setAdminView("list")}
                            >
                                📋 Manage Questions
                            </button>
                        </div>

                        {adminView === "add" ? (
                            <div className="admin-grid">
                                <label>Level (1-16):</label>
                                <select
                                    value={adminForm.level}
                                    onChange={e => setAdminForm({ ...adminForm, level: e.target.value })}
                                >
                                    {Array.from({ length: 16 }, (_, i) => i + 1).map(num => (
                                        <option key={num} value={num}>Level {num}</option>
                                    ))}
                                </select>

                                <label>Category:</label>
                                <select
                                    value={adminForm.category}
                                    onChange={e => setAdminForm({ ...adminForm, category: e.target.value })}
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                                    ))}
                                </select>

                                <label>Question:</label>
                                <textarea
                                    value={adminForm.question}
                                    onChange={e => setAdminForm({ ...adminForm, question: e.target.value })}
                                    placeholder="Enter the question here..."
                                    rows="3"
                                />

                                <label>Option A:</label>
                                <input
                                    type="text"
                                    value={adminForm.optionA}
                                    onChange={e => setAdminForm({ ...adminForm, optionA: e.target.value })}
                                    placeholder="Option A"
                                />

                                <label>Option B:</label>
                                <input
                                    type="text"
                                    value={adminForm.optionB}
                                    onChange={e => setAdminForm({ ...adminForm, optionB: e.target.value })}
                                    placeholder="Option B"
                                />

                                <label>Option C:</label>
                                <input
                                    type="text"
                                    value={adminForm.optionC}
                                    onChange={e => setAdminForm({ ...adminForm, optionC: e.target.value })}
                                    placeholder="Option C"
                                />

                                <label>Option D:</label>
                                <input
                                    type="text"
                                    value={adminForm.optionD}
                                    onChange={e => setAdminForm({ ...adminForm, optionD: e.target.value })}
                                    placeholder="Option D"
                                />

                                <label>Correct Option:</label>
                                <select
                                    value={adminForm.correct}
                                    onChange={e => setAdminForm({ ...adminForm, correct: e.target.value })}
                                >
                                    <option value="1">Option A</option>
                                    <option value="2">Option B</option>
                                    <option value="3">Option C</option>
                                    <option value="4">Option D</option>
                                </select>
                            </div>
                        ) : (
                            <div className="admin-list-view">
                                <div className="level-selector">
                                    <div className="admin-form-group">
                                        <label>Category:</label>
                                        <select
                                            value={adminForm.category}
                                            onChange={e => setAdminForm({ ...adminForm, category: e.target.value })}
                                        >
                                            {CATEGORIES.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <label>Select Level to View:</label>
                                    <select
                                        value={adminForm.level}
                                        onChange={e => setAdminForm({ ...adminForm, level: e.target.value })}
                                    >
                                        {Array.from({ length: 16 }, (_, i) => i + 1).map(num => (
                                            <option key={num} value={num}>Level {num}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="questions-list">
                                    {adminQuestions.length === 0 ? (
                                        <p className="no-data">No questions found for Level {adminForm.level}</p>
                                    ) : (
                                        adminQuestions.map((q, idx) => (
                                            <div key={idx} className="question-item">
                                                <div className="q-content">
                                                    <strong>Q: {q.question}</strong>
                                                    <div className="q-options">
                                                        {q.options.map((opt, i) => (
                                                            <span key={i} className={i + 1 === q.correct ? "correct-opt" : ""}>
                                                                {String.fromCharCode(65 + i)}: {opt}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteQuestion(idx)}
                                                    title="Delete Question"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="modal-actions">
                            {adminView === "add" && (
                                <button className="lifeline" onClick={handleAdminSubmit}>
                                    💾 Save Question
                                </button>
                            )}
                            <button
                                className="lifeline"
                                style={{ background: '#444', color: '#ccc' }}
                                onClick={() => setShowAdminModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
