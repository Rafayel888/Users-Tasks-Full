import React from 'react';
import debounce from 'lodash.debounce';

import { useDispatch } from 'react-redux';
import style from './Search.module.scss';
import { setSearchValue } from '../../redux/slices/filter';

export const SearchTask = () => {
  const dispatch = useDispatch();
  const inputRef = React.useRef();
  const [value, setValue] = React.useState('');

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const clearInput = () => {
    setValue('');
    updateSearchValue('');
    inputRef.current.focus();
  };

  return (
    <>
      <div className={style['search-container']}>
        <input
          ref={inputRef}
          className={style.search_inp}
          onChange={onChangeInput}
          value={value}
          type='text'
          placeholder='Search...'
        />
        {value && (
          <button className={style['clear-button']} onClick={clearInput}>
            X
          </button>
        )}
      </div>
    </>
  );
};
