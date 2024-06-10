import React from 'react'
import styles from './styles/CompleteTasks.module.css'

const CompleteTasks = ({ tasks, onUndoTask }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Tarefas Concluídas</h2>
            <ul className={styles.list}>
                {tasks.map((task, index) => (
                    <li key={index} className={styles.listItem}>
                        <span className={styles.taskText}>{task.text}</span>
                        <button className={styles.botaoUndoTask} onClick={() => onUndoTask(index)}>Desfazer</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CompleteTasks