import React from 'react';

import PropTypes from "prop-types";
import {useGetStaffMemberQuery} from "./slices/staffSlice.js";
import {useParams} from "react-router-dom";

const ProfilePage = () => {
    // Fetch staff member details using the provided employee number
    const { id } = useParams();

    const { data: staffMember, error, isLoading } = useGetStaffMemberQuery(id);

    if (isLoading) return <p>Loading...</p>; // Loading state
    if (error) return <p>Error fetching staff member data.</p>; // Error handling

    return (
        <section id="page-section">
            <div className="row mb-4">
                <div className="col-lg-9 mb-0 mb-lg-0">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="h6 text-uppercase mb-0">Profile Page</h2>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{`${staffMember.surname} ${staffMember.other_names}`}</h5>
                            <div className="mb-3">
                                <label htmlFor="employeeNumber" className="form-label">Employee Number:</label>
                                <input type="text" id="employeeNumber" className="form-control" value={staffMember.employee_number} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dateOfBirth" className="form-label">Date of Birth:</label>
                                <input type="date" id="dateOfBirth" className="form-control" value={staffMember.date_of_birth} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="idPhoto" className="form-label">ID Photo:</label>
                                <div>
                                    <img src={staffMember.id_photo} alt="ID Photo" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

ProfilePage.propTypes = {
    employeeNumber: PropTypes.string,
};

export default ProfilePage;
