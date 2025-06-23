import React, { useState, useEffect, useCallback } from 'react';
import TimerSection from './TimerSection';
import { UserSettings } from '../types';

interface TimerContainerProps {
  userSettings: UserSettings;
  onPomodoroComplete?: () => void;
}

const TimerContainer: React.FC<TimerContainerProps> = ({ userSettings, onPomodoroComplete }) => {
  const [activeTab, setActiveTab] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');

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

  // Reset timer when activeTab or userSettings change
  useEffect(() => {
    setSecondsLeft(getCurrentPhaseDuration());
  }, [activeTab, userSettings]);

  // Timer countdown effect
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  // Handle timer end
  useEffect(() => {
    if (secondsLeft === 0) {
      if (activeTab === 'pomodoro' && onPomodoroComplete) {
        onPomodoroComplete();
      }
      // Auto-switch logic can be added here if needed
    }
  }, [secondsLeft, activeTab, onPomodoroComplete]);

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

  return (
    <TimerSection
      minutesDisplay={minutesDisplay}
      secondsDisplay={secondsDisplay}
      progressPercentage={progressPercentage}
      currentPhase={currentPhase}
      handleSessionTypeChange={handleSessionTypeChange}
    />
  );
};

export default TimerContainer; 