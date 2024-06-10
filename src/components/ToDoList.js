import React, { useState, useEffect } from 'react';
import styles from './styles/ToDoList.module.css'
import CompleteTasks from './CompleteTasks';

const ToDoList = (props) => {
    const [incompleteTasks, setIncompleteTasks] = useState(props.tasks.map(task => ({ text: task, completed: false })));
    const [newTask, setNewTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editTask, setEditTask] = useState('');
    const [completedTasks, setCompletedTasks] = useState([]);

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

    const handleAddTask = () => {
        if (newTask.trim()) {
            setIncompleteTasks([...incompleteTasks, { text: newTask, completed: false }])
            setNewTask('')
        }
    }

    const handleToggleTask = (index) => {
        const taskToToggle = incompleteTasks[index];
        taskToToggle.completed = !taskToToggle.completed;

        if (taskToToggle.completed) {
            setCompletedTasks([...completedTasks, taskToToggle]);
            setIncompleteTasks(incompleteTasks.filter((_, i) => i !== index));
        } else {
            setIncompleteTasks([...incompleteTasks, taskToToggle]);
            setCompletedTasks(completedTasks.filter((_, i) => i !== index));
        }
    };

    const handleUndoTask = (index) => {
        const taskToUndo = completedTasks[index];
        taskToUndo.completed = false;

        setCompletedTasks(completedTasks.filter((_, i) => i !== index));
        setIncompleteTasks([...incompleteTasks, taskToUndo]);
    };

    const handleRemoveTask = (index) => {
        const newTasks = incompleteTasks.filter((_, i) => i !== index)
        setIncompleteTasks(newTasks)
    }

    const handleEditTask = (index) => {
        setEditIndex(index);
        setEditTask(incompleteTasks[index].text)
    }

    const handleSaveTask = (index) => {
        const newTasks = [...incompleteTasks];
        newTasks[index].text = editTask;
        setIncompleteTasks(newTasks);
        setEditIndex(null);
        setEditTask('');
    }


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Lista To-Do</h1>
            <ul className={styles.list}>
                {incompleteTasks.map((task, index) => (
                    <li className={styles.listItem} key={index}>
                        {editIndex === index ? (
                            <>
                                <input
                                    className={styles.input}
                                    type="text"
                                    value={editTask}
                                    onChange={(e) => setEditTask(e.target.value)}
                                />
                                <button className={styles.botaoSaveTask} onClick={() => handleSaveTask(index)}>Salvar</button>
                            </>
                        ) : (
                            <>
                                <span className={`${styles.taskText} ${task.completed ? styles.completed : ''}`}>{task.text}</span>
                                {!task.completed ? (
                                    <button className={styles.botaoCompleteTask} onClick={() => handleToggleTask(index)}>Concluir</button>
                                ) : (
                                    <button className={styles.botaoUncompleteTask} onClick={() => handleToggleTask(index)}>Desfazer</button>
                                )}
                                <button className={styles.botaoEditTask} onClick={() => handleEditTask(index)}>Editar</button>
                                <button className={styles.botaoRemoveTask} onClick={() => handleRemoveTask(index)}>Remover</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <input
                className={styles.input}
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Nova Tarefa"
            />
            <button className={styles.botaoAddTask} onClick={handleAddTask}>Adicionar Tarefa</button>
            {completedTasks.length > 0 && <CompleteTasks tasks={completedTasks} onUndoTask={handleUndoTask} />}
        </div >
    )
}

export default ToDoList;