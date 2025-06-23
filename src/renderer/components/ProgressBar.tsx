import React from 'react';

interface ProgressBarProps {
    progressPercentage: number;
    currentPhase: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressPercentage, currentPhase }) => {
    return (
        <div className="progress-bar-wrapper">
            <div className="progress-label">{currentPhase} Session Progress</div>
            <div className="progress-bar">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;