// src/components/Pagination.jsx
import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
        </li>

        <li className="page-item disabled">
          <span className="page-link">
            Página {currentPage} de {totalPages}
          </span>
        </li>

        <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
