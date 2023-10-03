import React from 'react'
import styles from './Pagination.module.scss';

const Pagination = ({ tasksPerPage, totalCountries, currentPage, setCurrentPage }) => {
  const pageNum = [];

  for (let i = 1; i <= Math.ceil(totalCountries / tasksPerPage); i++) {
    pageNum.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <ul className={styles.pagination}>
        {pageNum.map((num) => (
          <li key={num} className={currentPage === num ? `${styles.activePage}` : ''}>
            <button onClick={() => handlePageClick(num)}>{num}</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Pagination