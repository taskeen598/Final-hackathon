import React, { useState, useEffect } from "react";
import useFakeNewsStore from "../../../zustand/fakenews.zustand";

const Pagination = ({ totalPages, setCurrentPage, currentPage }) => {
  const { getAllFakeNews, getTotal } = useFakeNewsStore()

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getAllFakeNews(page)

  };

  // Create an array with page numbers from 1 to totalPages
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>

      <nav aria-label="Page navigation example" >
        <ul className="flex items-center -space-x-px h-8text-sm">
          <li className="">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg"
            >
              <span className="text-blue-500 ">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180 text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {/* Render page buttons dynamically based on totalPages */}
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button
                onClick={() => handlePageChange(pageNumber)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === pageNumber ? "text-blue-600 border-blue-300 bg-blue-50" : ""
                  }`}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          <li>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="text-blue-500">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180 text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
      <div className="text-blue-500 font-bold">
        {`${currentPage} out of ${Math.ceil(getTotal / 10)}`}
      </div>
    </div>
  );
};

export default Pagination;