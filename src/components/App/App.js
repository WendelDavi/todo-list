import React from 'react';
import styles from './App.module.css'
import ToDoList from '../ToDoList/ToDoList';
import { TaskProvider } from '../../contexts/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div>
        <header className={styles.header}>
          <h1 className={styles.title}>Lista ToDo</h1>
        </header>
        <ToDoList />
        <footer className={styles.footer}>
          <p className={styles.footerContent}>&copy; Wendel Davi - 2024</p>
        </footer>
      </div>
    </TaskProvider>
  );
}

export default App;