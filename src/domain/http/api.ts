import { EVENT_AUTHENTICATION_LOGOUT } from "@/components/const/const";
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
});

export const axiosDataloomInstance = axios.create({
    baseURL: `${import.meta.env.VITE_DATALOOM_URL}/api`,
    withCredentials: true,
});

export const handleResponse = <T extends unknown>(
    response: AxiosResponse<T>
): Promise<T> => {
    return Promise.resolve(response.data);
};

export type GuardlightError = {
    status: HttpStatusCode;
};
export const handleError = (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            if (error.response.status === 401) {
                window.dispatchEvent(new Event(EVENT_AUTHENTICATION_LOGOUT));
            }
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

// Dev
export function mockGetRoute(path = "") {
    return typeof path === "string"
        ? new RegExp(path.replace(/:\w+/g, "[^/]+"))
        : path;
}
