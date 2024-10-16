import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Pagination({ currentPage, itemsPerPage, totalItems, onPageChange }) {
    if (totalItems === 0) {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="dataTables_info">No entries to show</div>
                </div>
            </div>
        );
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    const isActive = (number) => currentPage === number;

    // Calculate the range of items shown on the current page
    const startItemIndex = (currentPage - 1) * itemsPerPage + 1;
    const endItemIndex =
        currentPage * itemsPerPage > totalItems ? totalItems : currentPage * itemsPerPage;

    return totalItems > itemsPerPage ? (
        <div className="row">
            <div className="col-sm-12 col-md-5 d-flex align-items-center">
                <div className="dataTables_info">
                    <span className="me-2">Showing</span>
                    <span className="me-2">{startItemIndex}</span>
                    <span className="me-2">to</span>
                    <span className="me-2">{endItemIndex}</span>
                    <span className="me-2">of</span>
                    <span className="me-2">{totalItems}</span>
                    <span className="me-2">entries</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-7">
                <div className="dataTables_paginate paging_simple_numbers">
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-end">
                            <li
                                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => onPageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>

                            {pageNumbers.map((number) => {
                                if (pageNumbers.length > 5) {
                                    if (
                                        number === 1 ||
                                        number === pageNumbers.length ||
                                        (number >= currentPage - 1 && number <= currentPage + 1)
                                    ) {
                                        return (
                                            <li
                                                key={number}
                                                className={
                                                    isActive(number) ? "page-item active" : "page-item"
                                                }
                                            >
                                                <Link
                                                    to="#"
                                                    className={`page-link ${
                                                        isActive(number) ? "text-white" : ""
                                                    }`}
                                                    onClick={() => onPageChange(number)}
                                                >
                                                    {number}
                                                </Link>
                                            </li>
                                        );
                                    } else if (
                                        number === currentPage - 2 ||
                                        number === currentPage + 2
                                    ) {
                                        return (
                                            <li key={number} className="page-item disabled">
                                                <Link to="#" className="page-link">
                                                    ...
                                                </Link>
                                            </li>
                                        );
                                    }
                                } else {
                                    return (
                                        <li
                                            key={number}
                                            className={
                                                currentPage === number
                                                    ? "page-item active"
                                                    : "page-item"
                                            }
                                        >
                                            <Link
                                                to="#"
                                                className={`page-link ${
                                                    isActive(number) ? "text-white" : ""
                                                }`}
                                                onClick={() => onPageChange(number)}
                                            >
                                                {number}
                                            </Link>
                                        </li>
                                    );
                                }
                            })}

                            <li
                                className={`page-item ${
                                    currentPage === pageNumbers.length ? "disabled" : ""
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => onPageChange(currentPage + 1)}
                                    disabled={currentPage === pageNumbers.length}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    ) : null;
}

export default Pagination;

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
    itemsPerPage: 10,
    currentPage: 1,
};
