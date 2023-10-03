import React, { useRef } from 'react';
import styles from './Drop.module.scss';
import { useDispatch } from 'react-redux';
import { setSort } from '../../redux/slices/filter';

export const sortList = [
  { name: 'By creation date (ASC)', BY_CREATION_DATE: 'ASC' },
  { name: 'By creation date (DESC)', BY_CREATION_DATE: 'DESC' },
];

export const DropDown = ({ value }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const sortRef = React.useRef(null);

  const onClickListItem = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

   React.useEffect(() => {
     const handleClickOutside = (event) => {
       const path = event.composedPath ? event.composedPath() : null;

       if (sortRef.current && !path.includes(sortRef.current)) {
         setOpen(false);
       }
     };
     document.body.addEventListener('click', handleClickOutside);
   }, []);
  
  const valueName = value?.name;
  return (
    <div className={styles.sort__up}>
      <div className={styles.sort__div}>
        <h4>Sort by:</h4>
        <div ref={sortRef} className={styles.sort__name}>
          <p onClick={() => setOpen(!open)}>{valueName}</p>
          {open && (
            <div className={`${styles.list__elm} ${styles.active}`}>
              <ul>
                {sortList.map((obj, i) => (
                  <li
                    key={i}
                    onClick={() => onClickListItem(obj)}
                    className={
                      value.BY_CREATION_DATE === obj.BY_CREATION_DATE ? `${styles.active}` : ''
                    }
                  >
                    {obj.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
