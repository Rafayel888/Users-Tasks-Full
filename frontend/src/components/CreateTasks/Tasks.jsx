import React from 'react';
import { deleteTasks, taskEdit } from '../../redux/action/task-act';
import { updateTask } from '../../redux/slices/tasks';
import { useDispatch } from 'react-redux';
import styles from './TaskList/Task.module.scss';

export const Tasks = ({ id, title, description, deadline, status }) => {
  const dispatch = useDispatch();

  const handleUpdate = (taskId, updatedTaskData) => {
    console.log(taskId, 'taskId');
    dispatch(taskEdit({ taskId, updatedTaskData }));
    dispatch(updateTask({ taskId, updatedTaskData }));
  };

  const handleDelete = async (taskId) => {
    await dispatch(deleteTasks(taskId));
  };
  return (
    <>
      <ul>
        <li
          key={id}
          className={` ${
            status === 'done'
              ? styles['task-completed']
              : status === 'inProgress'
              ? styles['task-started']
              : ''
          }`}
        >
          <div>
            <strong>{title}</strong>
            <p className={styles['description']}>{description}</p>
            <p
              className={`${styles['deadline']} ${
                status === 'done'
                  ? styles['dead-end']
                  : status === 'inProgress'
                  ? styles['dead-start']
                  : ''
              }`}
            >
              Deadline: {deadline.substring(0,10)}
            </p>
            <p className={styles['status']}>Status: {status}</p>
          </div>
          <div className={styles['buttons']}>
            <button
              onClick={() => handleUpdate(id, { status: 'inProgress' })}
              className={`${styles.button} ${styles.start}`}
            >
              Start
            </button>
            <button
              onClick={() => handleUpdate(id, { status: 'done' })}
              className={`${styles['button']} ${styles['complete']}`}
            >
              Complete
            </button>
            <button
              onClick={() => handleDelete(id)}
              className={`${styles['button']} ${styles['delete']}`}
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </>
  );
};
