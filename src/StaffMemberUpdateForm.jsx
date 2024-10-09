import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {toast} from "react-hot-toast";

import PropTypes from "prop-types";
import {useEditStaffMemberMutation, useGetStaffMemberQuery} from "./slices/staffSlice.js";


const StaffMemberUpdateForm = ({ employeeNumber }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [photoBase64, setPhotoBase64] = useState(null);

    // Fetch the current staff member's data
    const { data: staffMember, isLoading, isError } = useGetStaffMemberQuery(employeeNumber);

    // Mutation to edit the staff member
    const [editStaffMember, { isLoading: isEditing, isError: isEditError, isSuccess }] = useEditStaffMemberMutation();

    // Handle file upload and convert it to base64
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPhotoBase64(reader.result); // Save base64 string in state
        };

        if (file) {
            reader.readAsDataURL(file); // Convert the image file to base64
        }
    };

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            const updatedData = {
                date_of_birth: data.date_of_birth,
                id_photo: photoBase64,
            };

            await editStaffMember({ employeeNumber, data: updatedData }).unwrap();

            // Reset form after successful update
            reset();
            setPhotoBase64(null);
            toast.success('Staff member updated successfully!');
        } catch (err) {
            toast.error('Failed to update staff member:', err);
        }
    };

    // Set form values when staff member data is loaded
    useEffect(() => {
        if (staffMember) {
            reset({
                date_of_birth: staffMember.date_of_birth || '',
            });
            setPhotoBase64(staffMember.id_photo || null);
        }
    }, [staffMember, reset]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching staff member data.</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="date_of_birth">Date of Birth</label>
                <input
                    type="date"
                    id="date_of_birth"
                    {...register("date_of_birth", { required: "Date of birth is required" })}
                    className="form-control"
                />
                {errors.date_of_birth && <p className="text-danger">{errors.date_of_birth.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="id_photo">ID Photo</label>
                <input
                    type="file"
                    id="id_photo"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileUpload}
                />
                {photoBase64 && <img src={staffMember.id_photo} height={50} width={100}/>}
            </div>

            <button type="submit" className="btn btn-primary mt-3" disabled={isEditing}>
                {isEditing ? 'Updating...' : 'Update Staff Member'}
            </button>

            {isEditError && <p className="text-danger">Error: Failed to update staff member.</p>}
            {isSuccess && <p className="text-success">Staff member updated successfully!</p>}
        </form>
    );
};

StaffMemberUpdateForm.propTypes = {
    employeeNumber: PropTypes.string,
};


export default StaffMemberUpdateForm;
