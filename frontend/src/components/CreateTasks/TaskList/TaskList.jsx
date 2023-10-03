import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import styles from './Task.module.scss';
import { getTasksAndSearch } from '../../../redux/action/task-act';
import { SearchTask } from '../../Search/Search';
import { Tasks } from '../Tasks';
import { StatusFilter } from '../../StatusFill/StatusFilter';
import { DropDown, sortList } from '../../DropDown/DropDown';
import { setFilters } from '../../../redux/slices/filter';
import Pagination from '../../Pagination/Pagination';

function TaskList() {
  const { tasks } = useSelector((state) => state.tasks);
  const { searchValue, statusFilter, sort } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = React.useRef(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const tasksPerPage = 3;

  const lastTasksIndex = currentPage * tasksPerPage;
  const firstTasksIndex = lastTasksIndex - tasksPerPage;
  const currentTasks = tasks.slice(firstTasksIndex, lastTasksIndex);

  const Requests = async () => {
    const sortBy = sort.BY_CREATION_DATE ? sort.BY_CREATION_DATE : '';
    const search = searchValue;
    const categoryStatus = statusFilter.name ? statusFilter.name : '';

    await dispatch(
      getTasksAndSearch({
        sortBy,
        categoryStatus,
        search,
      }),
    );
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        order: sort.BY_CREATION_DATE,
        status: statusFilter?.name,
        search: searchValue,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [statusFilter.name, sort.BY_CREATION_DATE, searchValue]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortObj = sortList.find((obj) => obj.BY_CREATION_DATE === params.order);
      dispatch(
        setFilters({
          ...params,
          sort: sortObj,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      Requests();
    }

    isSearch.current = false;
  }, [statusFilter.name, sort.BY_CREATION_DATE, searchValue]);

  const tasksBlock = currentTasks
    .filter((obj) => {
      const searchPrev = obj.title.toLowerCase();

      if (searchPrev.includes(searchValue) || searchPrev.toUpperCase().includes(searchValue)) {
        return true;
      }

      return false;
    })
    .map((obj) => {
      return (
        <div key={obj.id}>
          <Tasks {...obj} />
        </div>
      );
    });

  return (
    <div className={styles['task-list-container']}>
      <h1>My Tasks</h1>
      <DropDown value={sort} />
      <div className={styles.wrapper_filter}>
        <SearchTask />
        <StatusFilter />
      </div>

      {tasks.length === 0 ? (
        <div className={styles['no-tasks']}>
          <img src='/svg/No_data.svg' alt='No Task' width='400px' height='400px' />
          <p>No tasks found. Add tasks to get started!</p>
        </div>
      ) : (
        tasksBlock
      )}
      <Pagination
        currentPage={currentPage}
        tasksPerPage={tasksPerPage}
        totalCountries={tasks.length}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default TaskList;
