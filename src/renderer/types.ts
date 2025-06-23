// src/types.ts
export interface Task {
    id: string;
    name: string;
    completed: boolean;
    pomodorosCompleted: number;
    estimatedPomodoros: number;
  }
  
  export interface UserSettings {
    pomodoro: number; // in seconds
    shortBreak: number; // in seconds
    longBreak: number; // in seconds
    autoStartPomodoros: boolean;
    autoStartBreaks: boolean;
    longBreakInterval: number;
  }