const isProduction = import.meta.env.PROD;
const baseURL = isProduction ? "/api/v1" : "http://localhost:8000/api/v1";
const baseImageURL = (image) => {
    const productionUrl = "";
    const url = isProduction ? productionUrl : "http://localhost:8000";
    const imageWithoutBaseUrl =
        !isProduction && image.replace("http://localhost:5173", "");
    return isProduction ? image : `${url}${imageWithoutBaseUrl}`;
};

const config = {
    baseURL,
    baseImageURL,
};

export default config;
