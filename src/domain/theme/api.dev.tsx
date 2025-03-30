import { NIL_UUID } from "@/components/const/const";
import { THEME_CONFIGS } from "@/routes/_app/theme";
import MockAdapter from "axios-mock-adapter";
import { GuardlightServerError } from "../http/api";

export const mockThemesApi = (mock: MockAdapter) => {
    mock.onGet("/theme").reply(async (_) => {
        return new Promise((resolve, _) => {
            setTimeout(function () {
                const random = Math.random();
                if (random < 1 / 3) {
                    resolve([200, THEME_CONFIGS]);
                } else if (random < 2 / 3) {
                    resolve([
                        200,
                        THEME_CONFIGS.filter((t) => t.id === NIL_UUID),
                    ]);
                } else {
                    resolve([500, []]);
                }
            }, 1000);
        });
    });

    mock.onPost("/theme").reply(async (_) => {
        return new Promise((resolve, _) => {
            setTimeout(function () {
                const random = Math.random();
                if (random < 1 / 2) {
                    resolve([200, {}]);
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
