import React from 'react';

interface SessionTypeSelectorProps {
    currentPhase: string;
    onSessionTypeChange: (phase: 'Work' | 'Short Break' | 'Long Break') => void;
}

const sessionTypes: Array<'Work' | 'Short Break' | 'Long Break'> = [
    'Work',
    'Short Break',
    'Long Break',
];

const SessionTypeSelector: React.FC<SessionTypeSelectorProps> = ({ currentPhase, onSessionTypeChange }) => {
    return (
        <div className="session-type-selector">
            <div className="session-type-label">Session Type</div>
            <div className="session-type-pills">
                {sessionTypes.map((type) => (
                    <button
                        key={type}
                        className={`session-type-pill${currentPhase === type ? ' active' : ''}`}
                        onClick={() => onSessionTypeChange(type)}
                        type="button"
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SessionTypeSelector;