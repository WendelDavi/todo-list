import React from 'react';
import ToDoList from '../ToDoList/ToDoList';
import { TaskProvider } from '../../contexts/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div>
        <ToDoList />
      </div>
    </TaskProvider>
  );
}

export default App;