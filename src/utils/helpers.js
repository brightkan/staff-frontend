

export function errorParser(error) {
    // parse different django rest framework error formats

    //   if error is null or undefined, return Internal Server Error
    if (!error) {
        return "Oops! Something went wrong. Please try again later.";
    }

    // if error is not an object, return it
    if (typeof error !== "object") {
        return error;
    }

    // if error is like {"detail": "error message"}, return error message
    let parsedError = "";

    if (error.message) {
        return error.message;
    }

    if (error.detail) {
        return error.detail;
    }

    if (error.error) {
        return error.error;
    }

    for (const [key, value] of Object.entries(error)) {
        parsedError += `Error in ${key}: ${value}. `;
    }

    return parsedError;
}



export function parseDRFErrors(errors) {
    if (!errors || typeof errors !== "object") {
        return {};
    }

    return Object.fromEntries(
        Object.entries(errors).map(([key, value]) => {
            if (Array.isArray(value)) {
                if (value.length > 0 && typeof value[0] === "object") {
                    return [key, parseDRFErrors(value[0])];
                }
                return [key, value[0]];
            } else if (typeof value === "object") {
                return [key, parseDRFErrors(value)];
            } else {
                return [key, value];
            }
        })
    );
}

export function generateCode(sheetName) {
    const codeLength = 8;
    const prefix = sheetName.length > 3 ? sheetName.slice(0, 3) : sheetName;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let randomString = "";
    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    const code = prefix.toUpperCase() + "-" + randomString;
    return code;
}

export function getStartEndDateForProject(tasks, projectId) {
    const projectTasks = tasks.filter((t) => t.project === projectId);
    let start = projectTasks[0].start;
    let end = projectTasks[0].end;

    for (let i = 0; i < projectTasks.length; i++) {
        const task = projectTasks[i];
        if (start.getTime() > task.start.getTime()) {
            start = task.start;
        }
        if (end.getTime() < task.end.getTime()) {
            end = task.end;
        }
    }
    return [start, end];
}

export const generateRandomColor = () => {
    // only generate light colors
    const letters = "89ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }

    return color;
};

export const toUserRole = (role) => {
    switch (role) {
        case "Surveyor":
            return "is_surveyor";
        case "Supervisor":
            return "is_supervisor";
        case "Field Manager":
            return "is_fm";
        case "General Manager":
            return "is_gm";
        case "Finance Office":
            return "is_finance_officer";
        case "Warehouse Manager":
            return "is_wh";
        case "Project Manager":
            return "is_pm";
        case "QHSE Officer":
            return "is_qhse";
        case "Project Coordinator":
            return "is_pc";
        case "Office Admin":
            return "is_office_admin";
        case "Maintenance Officer":
            return "is_maintenance";
        case "Transport Officer":
            return "is_transport";
        default:
            return null;
    }
};

export const getRoles = (user) => {
    const roles = [];
    if (user.is_surveyor) roles.push("Surveyor");
    if (user.is_supervisor) roles.push("Supervisor");
    if (user.is_fm) roles.push("Field Manager");
    if (user.is_gm) roles.push("General Manager");
    if (user.is_finance_officer) roles.push("Finance Office");
    if (user.is_wh) roles.push("Warehouse Manager");
    if (user.is_pm) roles.push("Project Manager");
    if (user.is_qhse) roles.push("QHSE Officer");
    if (user.is_pc) roles.push("Project Coordinator");
    if (user.is_office_admin) roles.push("Office Admin");
    if (user.is_maintenance) roles.push("Maintenance Officer");
    if (user.is_transport) roles.push("Transport Officer");
    return roles;
};

export const userRoles = [
    { label: "Surveyor", value: "is_surveyor" },
    { label: "Supervisor", value: "is_supervisor" },
    { label: "Field Manager", value: "is_fm" },
    { label: "General Manager", value: "is_gm" },
    { label: "Finance Office", value: "is_finance_officer" },
    { label: "Warehouse Manager", value: "is_wh" },
    { label: "Project Manager", value: "is_pm" },
    { label: "QHSE Officer", value: "is_qhse" },
    { label: "Project Coordinator", value: "is_pc" },
    { label: "Office Admin", value: "is_office_admin" },
    { label: "Maintenance Officer", value: "is_maintenance" },
    { label: "Transport Officer", value: "is_transport" },
];

function parseApiError(error) {
    const parsedErrors = [];

    const parseNestedErrors = (errors, parentField) => {
        for (const field in errors) {
            const fieldValue = errors[field];
            const currentField = parentField ? `${parentField}.${field}` : field;

            if (Array.isArray(fieldValue)) {
                for (const message of fieldValue) {
                    if (typeof message === "string") {
                        parsedErrors.push({
                            field: currentField,
                            message,
                        });
                    } else if (typeof message === "object" && message !== null) {
                        parseNestedErrors(message, currentField);
                    }
                }
            } else if (typeof fieldValue === "object" && fieldValue !== null) {
                parseNestedErrors(fieldValue, currentField);
            } else {
                parsedErrors.push({
                    field: currentField,
                    message: fieldValue,
                });
            }
        }
    };

    if (typeof error === "object" && error !== null) {
        parseNestedErrors(error, "");
    } else {
        parsedErrors.push({ field: "non_field_errors", message: error });
    }

    const combinedErrorMessage = parsedErrors
        .map((error) => `${error.field}: ${error.message}`)
        .join("; ");

    return {
        field: "non_field_errors",
        message: combinedErrorMessage,
    };
}

const toSentenceCase = (str) => {
    str = str.replace(/_/g, " ");
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const monthMap = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
};

export { parseApiError, toSentenceCase, monthMap };
