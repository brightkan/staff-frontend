import React from 'react';
import { useParams} from 'react-router-dom';
import StaffMemberUpdateForm from './StaffMemberUpdateForm';

const UpdateStaffMemberPage = () => {
    // Get the employeeNumber from the route parameters
    const { id } = useParams();

    return (
    <section id="page-section">
        <div className="row mb-4">
            <div className="col-lg-9 mb-0 mb-lg-0">
                <div className="card">
                    <div className="card-header">
                        <h2 className="h6 text-uppercase mb-0">Update Staff Member</h2>
                    </div>
                    <div className="card-body">
                        <StaffMemberUpdateForm employeeNumber={id}/>
                    </div>
                </div>
            </div>
        </div>
    </section>
)
    ;
};

export default UpdateStaffMemberPage;
