// src/components/SettingsModalContent.tsx
import React, { useState, useEffect } from 'react';
import './SettingsModalContent.css';
import { UserSettings } from '../types'; // Import UserSettings interface

interface SettingsModalContentProps {
  currentSettings: UserSettings;
  onSave: (newSettings: UserSettings) => void;
}

const SettingsModalContent: React.FC<SettingsModalContentProps> = ({
  currentSettings,
  onSave,
}) => {
  const [pomodoro, setPomodoro] = useState(currentSettings.pomodoro / 60); // in minutes
  const [shortBreak, setShortBreak] = useState(currentSettings.shortBreak / 60); // in minutes
  const [longBreak, setLongBreak] = useState(currentSettings.longBreak / 60); // in minutes
  const [longBreakInterval, setLongBreakInterval] = useState(currentSettings.longBreakInterval);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(currentSettings.autoStartPomodoros);
  const [autoStartBreaks, setAutoStartBreaks] = useState(currentSettings.autoStartBreaks);

  // Update local state when currentSettings prop changes
  useEffect(() => {
    setPomodoro(currentSettings.pomodoro / 60);
    setShortBreak(currentSettings.shortBreak / 60);
    setLongBreak(currentSettings.longBreak / 60);
    setLongBreakInterval(currentSettings.longBreakInterval);
    setAutoStartPomodoros(currentSettings.autoStartPomodoros);
    setAutoStartBreaks(currentSettings.autoStartBreaks);
  }, [currentSettings]);


  const handleSaveSettings = async () => {
    const newSettings: UserSettings = {
      pomodoro: pomodoro * 60,
      shortBreak: shortBreak * 60,
      longBreak: longBreak * 60,
      longBreakInterval,
      autoStartPomodoros,
      autoStartBreaks,
    };
    onSave(newSettings); // Call the onSave callback passed from App.tsx
  };

  return (
    <div className="settings-content">
      <h2>Timer Settings</h2>
      <div className="setting-group">
        <label>Pomodoro (minutes)</label>
        <input
          type="number"
          min="1"
          value={pomodoro}
          onChange={(e) => setPomodoro(parseInt(e.target.value))}
        />
      </div>
      <div className="setting-group">
        <label>Short Break (minutes)</label>
        <input
          type="number"
          min="1"
          value={shortBreak}
          onChange={(e) => setShortBreak(parseInt(e.target.value))}
        />
      </div>
      <div className="setting-group">
        <label>Long Break (minutes)</label>
        <input
          type="number"
          min="1"
          value={longBreak}
          onChange={(e) => setLongBreak(parseInt(e.target.value))}
        />
      </div>
      <div className="setting-group">
        <label>Long Break Interval</label>
        <input
          type="number"
          min="1"
          value={longBreakInterval}
          onChange={(e) => setLongBreakInterval(parseInt(e.target.value))}
        />
      </div>
      <div className="setting-group checkbox-group">
        <input
          type="checkbox"
          id="autoStartPomodoros"
          checked={autoStartPomodoros}
          onChange={(e) => setAutoStartPomodoros(e.target.checked)}
        />
        <label htmlFor="autoStartPomodoros">Auto Start Pomodoros</label>
      </div>
      <div className="setting-group checkbox-group">
        <input
          type="checkbox"
          id="autoStartBreaks"
          checked={autoStartBreaks}
          onChange={(e) => setAutoStartBreaks(e.target.checked)}
        />
        <label htmlFor="autoStartBreaks">Auto Start Breaks</label>
      </div>
      <button className="save-settings-button" onClick={handleSaveSettings}>
        Save
      </button>
    </div>
  );
};

export default SettingsModalContent;