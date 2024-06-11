import React, { useContext } from 'react';
import styles from './ToDoList.module.css'
import CompleteTasks from '../CompleteTasks/CompleteTasks';
import { TaskContext } from '../../contexts/TaskContext'

const ToDoList = () => {
    const { incompleteTasks, completedTasks, editIndex, editingTask, setEditingTask, newTask, setNewTask, addTask, toggleTask, undoTask, removeTask, editTask, saveTask } = useContext(TaskContext)


    const handleAddTask = () => {
        addTask(newTask);
        setNewTask('');
    };

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
                                    value={editingTask}
                                    onChange={(e) => setEditingTask(e.target.value)}
                                />
                                <button className={styles.botaoSaveTask} onClick={() => saveTask(index)}>Salvar</button>
                            </>
                        ) : (
                            <>
                                <span className={`${styles.taskText} ${task.completed ? styles.completed : ''}`}>{task.text}</span>
                                {!task.completed ? (
                                    <button className={styles.botaoCompleteTask} onClick={() => toggleTask(index)}>Concluir</button>
                                ) : (
                                    <button className={styles.botaoUncompleteTask} onClick={() => toggleTask(index)}>Desfazer</button>
                                )}
                                <button className={styles.botaoEditTask} onClick={() => editTask(index)}>Editar</button>
                                <button className={styles.botaoRemoveTask} onClick={() => removeTask(index)}>Remover</button>
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
            {completedTasks.length > 0 && <CompleteTasks tasks={completedTasks} onUndoTask={undoTask} />}
        </div >
    )
}

export default ToDoList;