import React, { useState, useEffect, useCallback, useRef } from 'react';
import TimerSection from './TimerSection';
import TimerControls from './TimerControls';
import { UserSettings } from '../types';

interface TimerContainerProps {
  userSettings: UserSettings;
  onPomodoroComplete?: () => void;
}

const getInitialIsRunning = (activeTab: 'pomodoro' | 'shortBreak' | 'longBreak', userSettings: UserSettings) => {
  if (activeTab === 'pomodoro') return userSettings.autoStartPomodoros;
  if (activeTab === 'shortBreak' || activeTab === 'longBreak') return userSettings.autoStartBreaks;
  return false;
};

const TimerContainer: React.FC<TimerContainerProps> = ({ userSettings, onPomodoroComplete }) => {
  const [activeTab, setActiveTab] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');
  const [isRunning, setIsRunning] = useState(() => getInitialIsRunning('pomodoro', userSettings));

  // Timer logic
  const getCurrentPhaseDuration = () => {
    switch (activeTab) {
      case 'pomodoro':
        return userSettings.pomodoro;
      case 'shortBreak':
        return userSettings.shortBreak;
      case 'longBreak':
        return userSettings.longBreak;
      default:
        return userSettings.pomodoro;
    }
  };

  const [secondsLeft, setSecondsLeft] = useState(getCurrentPhaseDuration());
  const hasFiredRef = useRef(false);

  // Reset timer when activeTab or userSettings change
  useEffect(() => {
    setSecondsLeft(getCurrentPhaseDuration());
    hasFiredRef.current = false; // Reset the flag when timer resets
    // Set running state based on auto-start settings
    setIsRunning(getInitialIsRunning(activeTab, userSettings));
  }, [activeTab, userSettings]);

  // Timer countdown effect
  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  // Handle timer end
  useEffect(() => {
    if (secondsLeft === 0 && !hasFiredRef.current) {
      hasFiredRef.current = true;
      setIsRunning(false); // Stop timer at end
      if (activeTab === 'pomodoro' && onPomodoroComplete) {
        onPomodoroComplete();
      }
      // Auto-switch logic can be added here if needed
    }
  }, [secondsLeft, activeTab, onPomodoroComplete]);

  // Timer control handlers
  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setSecondsLeft(getCurrentPhaseDuration());
    hasFiredRef.current = false;
    setIsRunning(false);
  };
  const skipPhase = () => {
    if (activeTab === 'pomodoro') setActiveTab('shortBreak');
    else if (activeTab === 'shortBreak') setActiveTab('longBreak');
    else setActiveTab('pomodoro');
  };

  // Format minutes and seconds for display
  const minutesDisplay = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secondsDisplay = String(secondsLeft % 60).padStart(2, '0');

  // Calculate progress percentage
  const progressPercentage = 100 * (1 - secondsLeft / getCurrentPhaseDuration());

  // Map activeTab to currentPhase string
  const currentPhase =
    activeTab === 'pomodoro'
      ? 'Work'
      : activeTab === 'shortBreak'
      ? 'Short Break'
      : 'Long Break';

  // Handler for session type change
  const handleSessionTypeChange = (phase: 'Work' | 'Short Break' | 'Long Break') => {
    if (phase === 'Work') setActiveTab('pomodoro');
    else if (phase === 'Short Break') setActiveTab('shortBreak');
    else if (phase === 'Long Break') setActiveTab('longBreak');
  };

  const shouldShowControls = !((activeTab === 'pomodoro' && userSettings.autoStartPomodoros) ||
    ((activeTab === 'shortBreak' || activeTab === 'longBreak') && userSettings.autoStartBreaks));

  return (
    <div>
      <TimerSection
        minutesDisplay={minutesDisplay}
        secondsDisplay={secondsDisplay}
        progressPercentage={progressPercentage}
        currentPhase={currentPhase}
        handleSessionTypeChange={handleSessionTypeChange}
      />
      {shouldShowControls && (
        <TimerControls
          isRunning={isRunning}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          resetTimer={resetTimer}
          skipPhase={skipPhase}
        />
      )}
    </div>
  );
};

export default TimerContainer; 