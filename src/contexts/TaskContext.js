import React, { createContext, useState, useEffect } from 'react';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [incompleteTasks, setIncompleteTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editingTask, setEditingTask] = useState('');

    useEffect(() => {
        const storedIncompleteTasks = JSON.parse(localStorage.getItem('incompleteTasks')) || [];
        const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
        
        setIncompleteTasks(storedIncompleteTasks);
        setCompletedTasks(storedCompletedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('incompleteTasks', JSON.stringify(incompleteTasks));
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }, [incompleteTasks, completedTasks]);

    const addTask = () => {
        if (newTask.trim()) {
            setIncompleteTasks([...incompleteTasks, { text: newTask, completed: false }])
            setNewTask('')
        }
    }

    const toggleTask = (index) => {
        const taskToToggle = incompleteTasks[index];
        taskToToggle.completed = !taskToToggle.completed;
    
        if (taskToToggle.completed) {
            setCompletedTasks([...completedTasks, taskToToggle]);
        } else {
            setIncompleteTasks([...incompleteTasks, taskToToggle]);
        }
    
        setIncompleteTasks(incompleteTasks.filter((_, i) => i !== index));
    };

    const undoTask = (index) => {
        const taskToUndo = completedTasks[index];
        taskToUndo.completed = false;

        setCompletedTasks(completedTasks.filter((_, i) => i !== index));
        setIncompleteTasks([...incompleteTasks, taskToUndo]);
    };

    const removeTask = (index) => {
        const newTasks = incompleteTasks.filter((_, i) => i !== index)
        setIncompleteTasks(newTasks)
    }

    const editTask = (index) => {
        setEditIndex(index);
        setEditingTask(incompleteTasks[index].text)
    }

    const saveTask = (index) => {
        const newTasks = [...incompleteTasks];
        newTasks[index].text = editingTask;
        setIncompleteTasks(newTasks);
        setEditIndex(null);
        setEditingTask('');
    }

    return (
        <TaskContext.Provider value={{incompleteTasks, completedTasks, editIndex, editingTask, setEditingTask, newTask, setNewTask, addTask, toggleTask, undoTask, removeTask, editTask, saveTask}}>
            {children}
        </TaskContext.Provider>
    )
}

export { TaskContext, TaskProvider };
