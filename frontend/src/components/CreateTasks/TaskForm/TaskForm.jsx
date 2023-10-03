import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Tasks.module.scss';
import { selectedUs } from '../../../redux/slices/auth';
import { createTask } from '../../../redux/action/task-act';

function TaskForm() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const userId = useSelector(selectedUs);

  const currentData = new Date().toISOString().substring(0, 10);

  const onSubmit = async (data) => {
    const taskDataUserId = {
      ...data,
      id: userId,
    };
    await dispatch(createTask(taskDataUserId));
    reset();
  };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        type='text'
        placeholder='Title'
        {...register('title', { required: true })}
      />
      <input
        className={styles.input}
        type='text'
        placeholder='Description'
        {...register('description')}
      />
      <input
        className={styles.input}
        type='date'
        defaultValue={currentData}
        placeholder='Deadline'
        {...register('deadline')}
      />

      <select className={styles.select} {...register('status')}>
        <option value='todo'>To Do</option>
        <option value='inProgress'>In Progress</option>
      </select>
      <button className={styles.submitButton} type='submit'>
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
