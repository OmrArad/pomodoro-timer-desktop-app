# API Documentation

## Components

---

### TaskInput
**Props:**
- `newTaskName: string` — The current value of the task input.
- `setNewTaskName: (name: string) => void` — Handler to update the input value.
- `onAddTask: () => void` — Handler to add a new task.
- `error?: string` — Optional error message to display below the input.

---

### TaskList
**Props:**
- `tasks: Task[]` — Array of task objects to display.
- `editingTask: string | null` — ID of the task currently being edited.
- `setEditingTask: (taskId: string | null) => void` — Handler to set the editing task.
- `onUpdateTask: (taskId: string, newName: string) => void` — Handler to update a task's name.
- `onDeleteTask: (taskId: string) => void` — Handler to delete a task.
- `onToggleTaskCompletion: (taskId: string, currentStatus: boolean) => void` — Handler to mark a task as done/undone.
- `onIncrementPomodoro: (taskId: string) => void` — Handler to increment pomodoros for a task.

---

### TaskItem
**Props:**
- `task: Task` — The task object.
- `isEditing: boolean` — Whether this task is being edited.
- `onStartEdit: (taskId: string) => void` — Handler to start editing.
- `onSaveEdit: (taskId: string, newName: string) => void` — Handler to save edits.
- `onCancelEdit: () => void` — Handler to cancel editing.
- `onDelete: (taskId: string) => void` — Handler to delete the task.
- `onToggleComplete: (taskId: string, currentStatus: boolean) => void` — Handler to mark as done/undone.

---

### Header
**Props:**
- `onOpenSettings: () => void` — Handler to open the settings modal.
- `onOpenStatistics: () => void` — Handler to open the statistics modal.

---

### SettingsModal / StatisticsModal
**Props:**
- `isOpen: boolean` — Whether the modal is open.
- `onClose: () => void` — Handler to close the modal.
- `currentSettings: UserSettings` (SettingsModal only) — Current user settings.
- `onSave: (newSettings: UserSettings) => void` (SettingsModal only) — Handler to save settings.
- `pomodoroCount: number` (StatisticsModal only) — Number of pomodoros completed.
- `completedTasksCount: number` (StatisticsModal only) — Number of completed tasks.
- `totalTasksCount: number` (StatisticsModal only) — Total number of tasks.

---

### SettingsModalContent
**Props:**
- `currentSettings: UserSettings` — Current user settings.
- `onSave: (newSettings: UserSettings) => void` — Handler to save new settings.

---

### TimerContainer
**Props:**
- `userSettings: UserSettings` — Current timer settings.
- `onPomodoroComplete?: () => void` — Handler called when a pomodoro is completed.

---

### TimerSection
**Props:**
- `minutesDisplay: string` — Minutes to display.
- `secondsDisplay: string` — Seconds to display.
- `progressPercentage: number` — Progress of the current session (0-100).
- `currentPhase: string` — Current phase label (e.g., 'Work', 'Short Break').
- `handleSessionTypeChange: (phase: 'Work' | 'Short Break' | 'Long Break') => void` — Handler to change session type.

---

### ProgressBar
**Props:**
- `progressPercentage: number` — Progress of the current session (0-100).
- `currentPhase: string` — Current phase label.

---

### TimerDisplay
**Props:**
- `minutes: string` — Minutes to display.
- `seconds: string` — Seconds to display.

---

### SessionTypeSelector
**Props:**
- `currentPhase: string` — Current phase label.
- `onSessionTypeChange: (phase: 'Work' | 'Short Break' | 'Long Break') => void` — Handler to change session type.

---

### Modal (Generic)
**Props:**
- `children: React.ReactNode` — Modal content.
- `onClose: () => void` — Handler to close the modal.
- `title: string` — Modal title.

---

### ConfirmationModal
**Props:**
- `message: string` — Confirmation message.
- `onConfirm: () => void` — Handler for confirming the action.
- `onCancel: () => void` — Handler for cancelling.

---

## Types

- `Task` — `{ id: string; name: string; completed: boolean; pomodorosCompleted: number; estimatedPomodoros: number; }`
- `UserSettings` — `{ pomodoro: number; shortBreak: number; longBreak: number; autoStartPomodoros: boolean; autoStartBreaks: boolean; longBreakInterval: number; }` 