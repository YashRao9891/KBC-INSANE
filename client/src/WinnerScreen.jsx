import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import "./WinnerScreen.css";

export default function WinnerScreen({ amount, playerName, onRestart }) {
    useEffect(() => {
        // Continuous confetti shower
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const getAmountWords = (amt) => {
        if (amt >= 70000000) return "SEVEN CRORE RUPEES ONLY";
        if (amt >= 10000000) return "ONE CRORE RUPEES ONLY";
        return `${amt.toLocaleString('en-IN')} RUPEES ONLY`; // Fallback
    };

    const title = amount >= 70000000 ? "MAHA CROREPATI" : "CROREPATI";

    return (
        <div className="winner-container">
            <div className="winner-content">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, type: "spring", bounce: 0.5 }}
                    className="trophy-icon"
                >
                    🏆
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="winner-title"
                >
                    {title}
                </motion.h1>

                <motion.div
                    className="cheque-container"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <div className="cheque">
                        <div className="cheque-header">
                            <span>STATE BANK OF KBC</span>
                            <span>DATE: {new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="cheque-body">
                            <div className="pay-line">
                                <span>PAY</span>
                                <span className="payee-name">{playerName}</span>
                            </div>
                            <div className="amount-line">
                                <span>THE SUM OF</span>
                                <span className="amount-words">{getAmountWords(amount)}</span>
                            </div>
                            <div className="amount-box">
                                ₹{amount.toLocaleString('en-IN')}/-
                            </div>
                        </div>
                        <div className="cheque-footer">
                            <div className="signature">Team KBC Insane</div>
                        </div>
                    </div>
                </motion.div>

                <motion.button
                    className="restart-btn winner-btn"
                    onClick={onRestart}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    🔄 Play Again
                </motion.button>
            </div>
        </div>
    );
}
