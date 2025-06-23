import React from 'react';
import './TaskInput.css';

interface TaskInputProps {
    newTaskName: string;
    setNewTaskName: (name: string) => void;
    onAddTask: () => void;
    error?: string;
}

const TaskInput: React.FC<TaskInputProps> = ({ newTaskName, setNewTaskName, onAddTask, error }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddTask();
        }
    };

    return (
        <div className="task-input-container">
            <input
                value={newTaskName}
                onChange={e => setNewTaskName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a new task..."
                className="task-input-field"
            />
            <button onClick={onAddTask} className="task-input-button">Add</button>
            {error && <div className="task-input-error">{error}</div>}
        </div>
    );
};

export default TaskInput;