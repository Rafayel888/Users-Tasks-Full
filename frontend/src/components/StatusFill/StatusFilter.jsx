import React from 'react';
import style from './StatusFil.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../../redux/slices/filter';

const list = [
  { originName: 'All Tasks' },
  { name: 'inProgress', originName: 'In Progress' },
  { name: 'todo', originName: 'To Do' },
  { name: 'done', originName: 'Done' },
];

export const StatusFilter = () => {
  const dispatch = useDispatch();
  const statusFilter = useSelector((state) => state.filter.statusFilter);

  const onClickListItem = (status) => {
    dispatch(setStatus({ name: status }));
  };

  return (
    <div className={style.category__div}>
      {list.map((obj, idx) => {
        return (
          <div
            key={idx}
            onClick={() => onClickListItem(obj.name)}
            className={statusFilter.name === obj.name ? style.active : ''}
          >
            <span>{obj.originName}</span>
          </div>
        );
      })}
    </div>
  );
};
