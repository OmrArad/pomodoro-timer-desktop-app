import React, { useState } from 'react';
import './TaskItem.css';
import { Task } from '../types';

interface TaskItemProps {
    task: Task;
    isEditing: boolean;
    onStartEdit: (taskId: string) => void;
    onSaveEdit: (taskId: string, newName: string) => void;
    onCancelEdit: () => void;
    onDelete: (taskId: string) => void;
    onToggleComplete: (taskId: string, currentStatus: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
    task,
    isEditing,
    onStartEdit,
    onSaveEdit,
    onCancelEdit,
    onDelete,
    onToggleComplete,
}) => {
    const [editedName, setEditedName] = useState(task.name);

    const handleSave = () => {
        onSaveEdit(task.id, editedName);
        onCancelEdit(); // Exit edit mode after saving
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            onCancelEdit();
            setEditedName(task.name); // Reset
        }
    };

    return (
        <div className="task-item">
            <div className="task-item-content">
                {isEditing ? (
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onBlur={handleSave} // Save on blur
                        onKeyDown={handleKeyDown}
                        className="task-item-edit-input"
                        autoFocus // Focus when in edit mode
                    />
                ) : (
                    <span
                        className={`task-item-text${task.completed ? ' completed' : ''}`}
                        onDoubleClick={() => onStartEdit(task.id)} // Enable edit on double click
                    >
                        {task.name}
                    </span>
                )}
            </div>
            <div className="task-item-actions">
                {!task.completed && !isEditing && (
                    <button
                        onClick={() => onToggleComplete(task.id, task.completed)}
                        className="task-item-action task-item-done"
                        title="Mark as done"
                    >
                        Done
                    </button>
                )}
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        className="task-item-action task-item-save"
                        title="Save"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => onStartEdit(task.id)}
                        className="task-item-action task-item-edit"
                        title="Edit"
                        disabled={task.completed}
                    >
                        Edit
                    </button>
                )}
                <button
                    onClick={() => onDelete(task.id)}
                    className="task-item-action task-item-delete"
                    title="Delete"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;