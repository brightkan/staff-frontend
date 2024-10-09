import * as yup from "yup";

export const loginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup
        .string()
        .required()
        .min(6, "Password must be at least 6 characters"),
});