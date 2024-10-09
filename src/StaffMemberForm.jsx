import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {useAddStaffMemberMutation} from "./slices/staffSlice.js";
import {errorParser} from "./utils/helpers.js";


const StaffMemberForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [photoBase64, setPhotoBase64] = useState(null);

    // Using the mutation hook to add a new staff member
    const [addStaffMember, { isLoading, isError, isSuccess, error }] = useAddStaffMemberMutation();

    // Function to handle file upload and convert it to base64
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

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            const staffData = { ...data, id_photo: photoBase64 };

            await addStaffMember(staffData).unwrap();

            reset();
            setPhotoBase64(null);

            toast.success("Staff Member added successfully");

        } catch (error) {
            if (parseInt(error.status) !== error.status) {
                toast.error("Network Error, Please check your internet connection");
            } else {
                const message = errorParser(error.data);
                toast.error(message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="employee_number">Unique Staff Code</label>
                <input
                    id="unique_code"
                    {...register("unique_code", { required: "Unique Staff Code is required" })}
                    className="form-control"
                />
                {errors.unique_code && <p className="text-danger">{errors.unique_code.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input
                    id="surname"
                    {...register("surname", { required: "Surname is required" })}
                    className="form-control"
                />
                {errors.surname && <p className="text-danger">{errors.surname.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="other_names">Other Names</label>
                <input
                    id="other_names"
                    {...register("other_names", { required: "Other names are required" })}
                    className="form-control"
                />
                {errors.other_names && <p className="text-danger">{errors.other_names.message}</p>}
            </div>

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
                {photoBase64 && <p>Photo uploaded successfully!</p>}
            </div>

            <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Staff Member'}
            </button>

            {isError && <p className="text-danger">Error: {error?.data?.message || 'Failed to create staff member'}</p>}
            {isSuccess && <p className="text-success">Staff member created successfully!</p>}
        </form>
    );
};

export default StaffMemberForm;
