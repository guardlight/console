import axios, { AxiosError, AxiosResponse, HttpStatusCode } from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
});

export const handleResponse = <T extends unknown>(
    response: AxiosResponse<T>
): Promise<T> => {
    return Promise.resolve(response.data);
};

export type OrbitError = {
    status: HttpStatusCode;
};
export const handleError = (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            // Server responded with a status other than 2xx
            return Promise.reject({ status: error.response.status }); // Return the status code
        } else if (error.request) {
            // Request was made, but no response received (e.g., network issue)
            return Promise.reject({
                status: HttpStatusCode.ServiceUnavailable,
            }); // Example: returning 503 for network errors
        } else {
            // Something happened while setting up the request
            return Promise.reject({
                status: HttpStatusCode.InternalServerError,
            }); // Example: returning 500 for client-side errors
        }
    } else {
        return Promise.reject({ status: HttpStatusCode.InternalServerError });
    }
};

export type GuardlightServerError = {
    error: string;
    code: number;
    message: string;
};
