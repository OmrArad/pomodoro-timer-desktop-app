import React from 'react';

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
        <div className="flex justify-center">
            <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
                <button
                    onClick={isRunning ? pauseTimer : startTimer}
                    className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 ${
                        isRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#3889f4] hover:bg-blue-500'
                    } text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] grow`}
                >
                    <span className="truncate">{isRunning ? 'Pause' : 'Start'}</span>
                </button>
                <button
                    onClick={resetTimer}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e7ecf4] text-[#0d131c] text-sm font-bold leading-normal tracking-[0.015em] grow"
                >
                    <span className="truncate">Reset</span>
                </button>
                <button
                    onClick={skipPhase}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e7ecf4] text-[#0d131c] text-sm font-bold leading-normal tracking-[0.015em] grow"
                >
                    <span className="truncate">Skip</span>
                </button>
            </div>
        </div>
    );
};

export default TimerControls;