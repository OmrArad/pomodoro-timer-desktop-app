import React from 'react';
import './TimerSection.css';
import TimerDisplay from './TimerDisplay';
import ProgressBar from './ProgressBar';
import SessionTypeSelector from './SessionTypeSelector';

interface TimerSectionProps {
    minutesDisplay: string;
    secondsDisplay: string;
    progressPercentage: number;
    currentPhase: string;
    handleSessionTypeChange: (phase: 'Work' | 'Short Break' | 'Long Break') => void;
    children?: React.ReactNode;
}

const TimerSection: React.FC<TimerSectionProps> = ({
    minutesDisplay,
    secondsDisplay,
    progressPercentage,
    currentPhase,
    handleSessionTypeChange,
    children,
}) => {
    return (
        <div className="timer-section">
            <TimerDisplay minutes={minutesDisplay} seconds={secondsDisplay} />
            <ProgressBar progressPercentage={progressPercentage} currentPhase={currentPhase} />
            <SessionTypeSelector currentPhase={currentPhase} onSessionTypeChange={handleSessionTypeChange} />
            {children}
        </div>
    );
};

export default TimerSection;