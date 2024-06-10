import React from 'react';
import styles from './styles/App.module.css';
import ToDoList from './ToDoList';
import { TaskProvider } from '../TaskContext';

function App() {
  return (
    <TaskProvider>
      <div className={styles.app}>
        <ToDoList />
      </div>
    </TaskProvider>
  );
}

export default App;