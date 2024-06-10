import React, { useState } from 'react';
import styles from './styles/ToDoList.module.css'

const ToDoList = (props) => {
    const [tasks, setTasks] = useState(props.tasks.map(task => ({ text: task, completed: false })))
    const [newTask, setNewTask] = useState('')
    const [editIndex, setEditIndex] = useState(null)
    const [editTask, setEditTask] = useState('')

    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, completed: false }])
            setNewTask('')
        }
    }

    const handleToggleTask = (index) => {
        const newTask = [...tasks]
        newTask[index].completed = !newTask[index].completed
        setTasks(newTask)
    }

    const handleRemoveTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index)
        setTasks(newTasks)
    }

    const handleEditTask = (index) => {
        setEditIndex(index);
        setEditTask(tasks[index].text)
    }

    const handleSaveTask = (index) => {
        const newTasks = [...tasks];
        newTasks[index].text = editTask;
        setTasks(newTasks);
        setEditIndex(null);
        setEditTask('');
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Lista To-Do</h1>
            <ul className={styles.list}>
                {tasks.map((task, index) => (
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
        </div >
    )
}

export default ToDoList;