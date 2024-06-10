import React from 'react';
import styles from './styles/App.module.css';
import ToDoList from './ToDoList';

function App() {
  return (
    <div className={styles.app}>
      <ToDoList tasks={[]} />
    </div>
  );
}

export default App;