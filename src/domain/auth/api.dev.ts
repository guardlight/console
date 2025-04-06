import MockAdapter from "axios-mock-adapter";
import { GuardlightServerError } from "../http/api";
import { LoginResponse } from "./type";

export const mockAuthApi = (mock: MockAdapter) => {
    mock.onPost("/auth/login").reply(async (_) => {
        return new Promise((resolve, _) => {
            setTimeout(function () {
                const random = Math.random();
                if (random < 1 / 4) {
                    resolve([
                        200,
                        {
                            authenticationStatus: "authenticated",
                        } as LoginResponse,
                    ]);
                } else if (random < 3 / 4) {
                    resolve([
                        401,
                        {
                            code: 401,
                            error: "",
                            message: "",
                        } as GuardlightServerError,
                    ]);
                } else {
                    resolve([
                        500,
                        {
                            code: 500,
                            error: "",
                            message: "",
                        } as GuardlightServerError,
                    ]);
                }
            }, 1000);
        });
    });
};
