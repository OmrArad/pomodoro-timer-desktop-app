import React from 'react';
import './TaskList.css';
import TaskItem from './TaskItem'; // Import Task interface
import { Task as TaskType } from '../types';

interface TaskListProps {
    tasks: TaskType[];
    editingTask: string | null;
    setEditingTask: (taskId: string | null) => void;
    onUpdateTask: (taskId: string, newName: string) => void;
    onDeleteTask: (taskId: string) => void;
    onToggleTaskCompletion: (taskId: string, currentStatus: boolean) => void;
    onIncrementPomodoro: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    editingTask,
    setEditingTask,
    onUpdateTask,
    onDeleteTask,
    onToggleTaskCompletion,
    onIncrementPomodoro,
}) => {
    return (
        <div className="task-list">
            <h3 className="task-list-title">Your Tasks</h3>
            {tasks.length === 0 ? (
                <p className="task-list-empty">No tasks yet. Add one above!</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        isEditing={editingTask === task.id}
                        onStartEdit={setEditingTask}
                        onSaveEdit={onUpdateTask}
                        onCancelEdit={() => setEditingTask(null)}
                        onDelete={onDeleteTask}
                        onToggleComplete={onToggleTaskCompletion}
                    />
                ))
            )}
        </div>
    );
};

export default TaskList;