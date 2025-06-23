import React from 'react';

interface TimerDisplayProps {
    minutes: string;
    seconds: string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ minutes, seconds }) => {
    return (
        <div className="timer-display">
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
        </div>
    );
};

export default TimerDisplay;