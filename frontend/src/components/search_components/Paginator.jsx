import React from 'react';

const Paginator = ({ items, itemsPerPage , setCurrentPage, currentPage}) => {



  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });    
  };

  return (
    <div>

      <nav aria-label="Pagination">
        <ul className="pagination">


          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              aria-current={currentPage === index + 1 ? 'page' : undefined}
            >
              <span className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </span>
            </li>
          ))}


        </ul>
      </nav>


    </div>
  );
};

export default Paginator;