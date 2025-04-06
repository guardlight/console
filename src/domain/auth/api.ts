import { axiosInstance, handleError, handleResponse } from "../http/api";
import { LoginRequest, LoginResponse } from "./type";

export const AuthApi = {
    login: (req: LoginRequest) =>
        axiosInstance
            .post<LoginResponse>("/auth/login", req)
            .then(handleResponse)
            .catch(handleError),
};
