import React, {useState} from 'react';
import Pagination from "./components/Pagination.jsx";
import Table from "./components/Table.jsx";
import {useGetStaffQuery} from "./slices/staffSlice.js";
import {Link} from "react-router-dom";

const StaffManagementPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const {
        data: staff,
        isLoading,
        isFetching,
    } = useGetStaffQuery(pageNumber);
    const onPageChange = (page) => {
        setPageNumber(page);
    };
    console.log("The staff is here", staff)
    return (
        <section id="page-section">
            <div className="row mb-4">
                <div className="col-lg-9 mb-0 mb-lg-0">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="h6 text-uppercase mb-0">Staff Management</h2>
                        </div>
                        <div className="card-body">
                            <Link to={"/register_staff"}>
                                <button className={"btn btn-primary mb-5"}>Register Staff</button>
                            </Link>
                            <Table
                                columns={[
                                    "#",
                                    "Employee Number",
                                    "Surname",
                                    "Other Names",
                                    "Date of Birth",
                                    "Actions",
                                ]}
                                data={staff && staff?.results?.map((staffMember) => ({
                                    "#": staffMember?.id,
                                    "Employee Number": staffMember?.employee_number,
                                    "Surname": staffMember?.surname,
                                    "Other Names": staffMember?.other_names,
                                    "Date of Birth": new Date(staffMember?.date_of_birth).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    }),
                                    "Actions": (
                                        <>
                                            <Link to={`/update_staff_member/${staffMember?.employee_number}`}><i className="fas fa-pencil-alt" style={{ cursor: "pointer", color: "#007bff", marginRight: "10px" }}></i></Link>
                                            <Link to={`/profile/${staffMember?.employee_number}`}><i className="fas fa-user" style={{ cursor: "pointer", color: "#6c757d" }}></i></Link>
                                        </>
                                    ),
                                }))}
                                isFetching={isFetching || isLoading}
                            />




                            {staff && staff?.count && (
                                <Pagination
                                    currentPage={pageNumber}
                                    totalItems={staff?.count}
                                    onPageChange={onPageChange}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StaffManagementPage;