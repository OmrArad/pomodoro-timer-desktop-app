import React from 'react';
import './TimerControls.css';

interface TimerControlsProps {
    isRunning: boolean;
    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
    skipPhase: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    skipPhase,
}) => {
    return (
        <div className="timer-controls">
            <div className="timer-controls-inner">
                <button
                    onClick={isRunning ? pauseTimer : startTimer}
                    className={`timer-btn ${isRunning ? 'pause' : 'start'}`}
                >
                    <span>{isRunning ? 'Pause' : 'Start'}</span>
                </button>
                <button
                    onClick={resetTimer}
                    className="timer-btn reset"
                >
                    <span>Reset</span>
                </button>
                <button
                    onClick={skipPhase}
                    className="timer-btn skip"
                >
                    <span>Skip</span>
                </button>
            </div>
        </div>
    );
};

export default TimerControls;