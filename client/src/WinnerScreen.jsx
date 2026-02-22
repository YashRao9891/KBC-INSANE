import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import html2canvas from 'html2canvas';
import "./WinnerScreen.css";

export default function WinnerScreen({ amount, playerName, onRestart }) {
    const { width, height } = useWindowSize();
    const chequeRef = useRef(null);
    const [isSharing, setIsSharing] = useState(false);

    const getAmountWords = (amt) => {
        if (amt >= 70000000) return "SEVEN CRORE RUPEES ONLY";
        if (amt >= 10000000) return "ONE CRORE RUPEES ONLY";
        return `${amt.toLocaleString('en-IN')} RUPEES ONLY`; // Fallback
    };

    const handleShare = async () => {
        if (!chequeRef.current) return;
        setIsSharing(true);

        try {
            const canvas = await html2canvas(chequeRef.current, {
                backgroundColor: "#02050a", // Match deep navy background
                scale: 2, // High resolution
            });

            canvas.toBlob(async (blob) => {
                if (!blob) return;
                const file = new File([blob], "kbc_winner.png", { type: "image/png" });

                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            title: 'KBC Insane Winner!',
                            text: `I just won ₹${amount.toLocaleString('en-IN')} on KBC Insane! 🏆🔥`,
                            files: [file],
                        });
                    } catch (err) {
                        console.log("User cancelled share or share failed", err);
                    }
                } else {
                    // Fallback: Download the image
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "kbc_crorepati_winner.png";
                    a.click();
                    URL.revokeObjectURL(url);
                }
                setIsSharing(false);
            }, "image/png");

        } catch (error) {
            console.error("Failed to generate image", error);
            setIsSharing(false);
        }
    };

    const title = amount >= 70000000 ? "MAHA CROREPATI" : "CROREPATI";

    return (
        <div className="winner-container" ref={chequeRef}>
            {/* Hide confetti during screenshot for cleaner image */}
            {!isSharing && (
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={800}
                    gravity={0.15}
                    colors={['#ffd700', '#ffaa00', '#ffffff', '#00a8ff', '#ff3d3d']}
                />
            )}
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

                {/* Hide buttons from the generated screenshot */}
                {!isSharing && (
                    <div className="winner-actions">
                        <motion.button
                            className="restart-btn winner-btn share-btn"
                            onClick={handleShare}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.5 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ background: 'linear-gradient(45deg, #25D366, #128C7E)', color: 'white', marginRight: '15px' }}
                        >
                            📸 Share Score
                        </motion.button>

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
                )}
            </div>
        </div>
    );
}
