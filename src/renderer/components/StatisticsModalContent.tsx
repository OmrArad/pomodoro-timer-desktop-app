// src/components/StatisticsModalContent.tsx
import React from 'react';
import './StatisticsModalContent.css';

interface StatisticsModalContentProps {
  pomodoroCount: number;
  completedTasksCount: number;
  totalTasksCount: number;
}

const StatisticsModalContent: React.FC<StatisticsModalContentProps> = ({
  pomodoroCount,
  completedTasksCount,
  totalTasksCount
}) => {
  return (
    <div className="statistics-content">
      <h2>Your Statistics</h2>
      <p>
        Pomodoros Completed Today: <strong>{pomodoroCount}</strong>
      </p>
      <p>
        Tasks Completed: <strong>{completedTasksCount}</strong> / {totalTasksCount}
      </p>
      {/* You can add more statistics here as needed, based on local state */}
      <p className="note">Note: Statistics are reset when the application is closed.</p>
    </div>
  );
};

export default StatisticsModalContent;