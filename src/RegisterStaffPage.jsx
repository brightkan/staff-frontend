import React from 'react';
import StaffMemberForm from "./StaffMemberForm.jsx";

const RegisterStaffPage = () => {
    return (
        <section id="page-section">
            <div className="row mb-4">
                <div className="col-lg-9 mb-0 mb-lg-0">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="h6 text-uppercase mb-0">Register Staff</h2>
                        </div>
                        <div className="card-body">
                           <StaffMemberForm/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterStaffPage;