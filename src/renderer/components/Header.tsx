import React from 'react';
import './Header.css';
import { CogIcon, ChartBarIcon } from '@heroicons/react/24/solid';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenStatistics: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings, onOpenStatistics }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <h1>Pomodoro App</h1>
      </div>
      <div className="header-actions">
        <button className="header-button" onClick={onOpenStatistics} aria-label="Open Statistics">
          <ChartBarIcon className="h-6 w-6" />
        </button>
        <button className="header-button" onClick={onOpenSettings} aria-label="Open Settings">
          <CogIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;