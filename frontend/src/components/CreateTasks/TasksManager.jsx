import React from 'react'
import TaskForm from './TaskForm/TaskForm'
import TaskList from './TaskList/TaskList';

export const TasksManager = () => {
  return (
    
    <div className='container'>
        <TaskForm />
        <hr></hr>
        <TaskList />
      </div>
    
  );
}
