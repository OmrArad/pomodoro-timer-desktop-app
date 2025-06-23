// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import TimerContainer from './components/TimerContainer';
import TaskList from './components/TaskList';
import SettingsModal from './components/SettingsModal';
import StatisticsModal from './components/StatisticsModal';
import TaskInput from './components/TaskInput';
import { Task, UserSettings } from './types'; // Assuming types.ts defines these interfaces
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs for tasks

function App() {
  const [activeTab, setActiveTab] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isStatisticsModalOpen, setIsStatisticsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [taskInputError, setTaskInputError] = useState('');

  // Default user settings, managed locally
  const [userSettings, setUserSettings] = useState<UserSettings>({
    pomodoro: 25 * 60, // 25 minutes in seconds
    shortBreak: 5 * 60,  // 5 minutes in seconds
    longBreak: 15 * 60,  // 15 minutes in seconds
    autoStartPomodoros: false,
    autoStartBreaks: false,
    longBreakInterval: 4,
  });

  // Timer logic for TimerSection
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

  const handleOpenSettingsModal = () => {
    setIsSettingsModalOpen(true);
    setIsStatisticsModalOpen(false);
  };
  const handleCloseSettingsModal = () => setIsSettingsModalOpen(false);

  const handleOpenStatisticsModal = () => {
    setIsStatisticsModalOpen(true);
    setIsSettingsModalOpen(false);
  };
  const handleCloseStatisticsModal = () => setIsStatisticsModalOpen(false);

  // Callback to update settings from the SettingsModalContent
  const handleSaveSettings = useCallback((newSettings: UserSettings) => {
    setUserSettings(newSettings);
  }, []);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Error handling for empty task input
  const handleAddTask = useCallback(() => {
    if (!newTaskName.trim()) {
      setTaskInputError('Task name cannot be empty.');
      return;
    }
    const newTask: Task = {
      id: uuidv4(),
      name: newTaskName,
      completed: false,
      pomodorosCompleted: 0,
      estimatedPomodoros: 1,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setNewTaskName('');
    setTaskInputError('');
  }, [newTaskName]);

  const handleTaskInputChange = (name: string) => {
    setNewTaskName(name);
    if (taskInputError) setTaskInputError('');
  };

  const handleUpdateTask = useCallback((taskId: string, newText: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  }, []);

  const handleToggleTaskCompletion = useCallback((taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleDeleteTask = useCallback((taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  // Function to increment pomodoros completed for a task
  const incrementTaskPomodoro = useCallback((taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, pomodorosCompleted: task.pomodorosCompleted + 1 }
          : task
      )
    );
  }, []);

  const handlePomodoroComplete = useCallback(() => {
    setPomodoroCount(prevCount => prevCount + 1);

    // Logic for auto-starting breaks or long breaks
    if (pomodoroCount + 1 < userSettings.longBreakInterval) {
      if (userSettings.autoStartBreaks) {
        setActiveTab('shortBreak');
      }
    } else {
      if (userSettings.autoStartBreaks) { // Auto-start long break after long break interval
        setActiveTab('longBreak');
        setPomodoroCount(0); // Reset pomodoro count for long break cycle
      }
    }
  }, [pomodoroCount, userSettings.autoStartBreaks, userSettings.longBreakInterval]);

  const handleTimerEnd = useCallback(() => {
    if (activeTab === 'pomodoro') {
      handlePomodoroComplete();
    }
    // No explicit action needed for break ends unless auto-starting pomodoro
    if ((activeTab === 'shortBreak' || activeTab === 'longBreak') && userSettings.autoStartPomodoros) {
      setActiveTab('pomodoro');
    }
  }, [activeTab, handlePomodoroComplete, userSettings.autoStartPomodoros]);

  return (
    <div className="App">
      <Header
        onOpenSettings={handleOpenSettingsModal}
        onOpenStatistics={handleOpenStatisticsModal}
        // No userId prop needed anymore
      />
      <main className="main-content">
        <TimerContainer
          userSettings={userSettings}
          onPomodoroComplete={() => setPomodoroCount(prev => prev + 1)}
        />
        <TaskInput
          newTaskName={newTaskName}
          setNewTaskName={handleTaskInputChange}
          onAddTask={handleAddTask}
          error={taskInputError}
        />
        <TaskList
          tasks={tasks}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          onUpdateTask={handleUpdateTask}
          onToggleTaskCompletion={handleToggleTaskCompletion}
          onDeleteTask={handleDeleteTask}
          onIncrementPomodoro={incrementTaskPomodoro}
        />
      </main>

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={handleCloseSettingsModal}
        currentSettings={userSettings}
        onSave={handleSaveSettings} // Pass the callback for saving settings
      />

      <StatisticsModal
        isOpen={isStatisticsModalOpen}
        onClose={handleCloseStatisticsModal}
        pomodoroCount={pomodoroCount} // Pass pomodoro count for statistics
        completedTasksCount={tasks.filter(task => task.completed).length}
        totalTasksCount={tasks.length}
        // No userId prop needed
      />
    </div>
  );
}

export default App;