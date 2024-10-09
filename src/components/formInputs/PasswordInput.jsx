import React from "react";
import PropTypes from "prop-types";

const PasswordInput = ({ label, name, register, errors, ...rest }) => {
    return (
        <div className="mb-3">
            <div className={`form-group ${errors ? "has-error" : ""}`}>
                <label className="mb-2" htmlFor={name}>
                    {label}
                </label>
                <input
                    type="password"
                    name={name}
                    className={`form-control ${errors ? "is-invalid" : ""}`}
                    id={name}
                    {...register(name)}
                    {...rest}
                />
                {errors && <div className="invalid-feedback">{errors.message}</div>}
            </div>
        </div>
    );
};

export default PasswordInput;

PasswordInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object,
};
