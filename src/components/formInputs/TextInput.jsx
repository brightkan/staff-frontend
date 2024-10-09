import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ label, name, register, error, ...rest }) => {
    return (
        <div className="mb-3">
            <div className={`form-group ${error ? "has-error" : ""}`}>
                <label className="mb-2" htmlFor={name}>
                    {label}
                </label>
                <input
                    type="text"
                    name={name}
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    id={name}
                    {...register(name)}
                    {...rest}
                />
                {error && <div className="invalid-feedback">{error.message}</div>}
            </div>
        </div>
    );
};

export default TextInput;

TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    error: PropTypes.object,
};
