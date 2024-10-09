function parseDRFErrorResponse(error) {
    // Check if the response contains errors
    let errorMessage = 'An error occurred.';

    // err.data.message

    if (error && error.data) {
        const errorData = error.data;

        if (errorData.message) {
            errorMessage = errorData.message;
        } else if (errorData.detail) {
            errorMessage = errorData.detail;
        } else if (errorData && typeof errorData === 'object') {
            const fieldErrors = Object.values(errorData);
            if (fieldErrors.length > 0) {
                errorMessage = fieldErrors[0];
            }
        }
    }

    if(error.originalStatus && parseInt(error.originalStatus) >= 500){
        errorMessage = "The server is broken";
    }



    return errorMessage;
}

export { parseDRFErrorResponse };
