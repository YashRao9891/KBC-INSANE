import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FastestFinger.css';
import './App.css';

const FastestFinger = ({ onComplete, onPlayGame, questionData }) => {
    if (!questionData) return <div className="fastest-finger-loading">Loading Challenge...</div>;

    const [selectedOrder, setSelectedOrder] = useState([]);
    const [isLocked, setIsLocked] = useState(false);
    const [result, setResult] = useState(null); // 'correct', 'wrong'
    const [timer, setTimer] = useState(15);
    const [showResult, setShowResult] = useState(false);

    // Sounds
    const tickSound = useRef(new Audio("/sounds/heartbeat.mp3")); // Reuse heartbeat or add tick

    useEffect(() => {
        if (!isLocked && timer > 0) {
            const interval = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(interval);
        } else if (timer === 0 && !isLocked) {
            handleLock();
        }
    }, [timer, isLocked]);

    const handleOptionClick = (id) => {
        if (isLocked) return;

        if (selectedOrder.includes(id)) {
            // Deselect if already selected (allow correction)
            setSelectedOrder(prev => prev.filter(item => item !== id));
        } else {
            // Select
            if (selectedOrder.length < 4) {
                setSelectedOrder(prev => [...prev, id]);
            }
        }
    };

    const handleLock = () => {
        setIsLocked(true);
        // dramatic pause
        setTimeout(() => {
            const userSequence = selectedOrder.join('');
            const correctSequence = questionData.correctOrder.join('');

            if (userSequence === correctSequence) {
                setResult('correct');
                setTimeout(() => onComplete(true), 3000); // 3s delay then transition
            } else {
                setResult('wrong');
            }
            setShowResult(true);
        }, 2000);
    };

    // Helper to get order badge (1, 2, 3, 4)
    const getOrderBadge = (id) => {
        const index = selectedOrder.indexOf(id);
        return index !== -1 ? index + 1 : null;
    };

    return (
        <div className="fastest-finger-container">
            <h2 className="ff-title">FASTEST FINGER FIRST</h2>

            <div className="ff-timer" style={{ color: timer <= 5 ? '#ff3d3d' : '#ffd700' }}>
                {timer}
            </div>

            <div className="question-box ff-question">
                {questionData.question}
            </div>

            <div className="ff-options-grid">
                {questionData.options.map((opt) => {
                    const isSelected = selectedOrder.includes(opt.id);
                    const badge = getOrderBadge(opt.id);

                    let statusClass = "";
                    if (showResult) {
                        const correctIndex = questionData.correctOrder.indexOf(opt.id);
                        const userIndex = selectedOrder.indexOf(opt.id);

                        if (correctIndex === userIndex) {
                            statusClass = "ff-correct";
                        } else {
                            statusClass = "ff-wrong";
                        }
                    }

                    return (
                        <motion.div
                            key={opt.id}
                            className={`ff-option ${isSelected ? 'selected' : ''} ${statusClass}`}
                            onClick={() => handleOptionClick(opt.id)}
                            whileHover={{ scale: isLocked ? 1 : 1.02 }}
                            whileTap={{ scale: isLocked ? 1 : 0.98 }}
                        >
                            <div className="ff-option-badge">
                                {String.fromCharCode(65 + questionData.options.indexOf(opt))}
                            </div>
                            <div className="ff-option-text">{opt.text}</div>
                            {badge && <div className="ff-order-badge">{badge}</div>}
                        </motion.div>
                    );
                })}
            </div>

            <div className="ff-controls">
                {!isLocked && (
                    <button
                        className="lifeline"
                        onClick={handleLock}
                        disabled={selectedOrder.length < 4}
                        style={{ opacity: selectedOrder.length < 4 ? 0.5 : 1 }}
                    >
                        🔒 Lock Answer
                    </button>
                )}

                {result === 'wrong' && (
                    <div className="ff-result-actions">
                        <button className="lifeline" onClick={() => window.location.reload()}>
                            Try Again
                        </button>
                    </div>
                )}
            </div>

            {result === 'wrong' && (
                <div className="ff-correct-order-display">
                    <h3>Correct Order:</h3>
                    <div className="ff-correct-sequence">
                        {questionData.correctOrder.map(id => {
                            const opt = questionData.options.find(o => o.id === id);
                            return <span key={id}>{opt.text}</span>;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FastestFinger;
