import { sleep } from "@/components/auth/auth";
import { THEME_CONFIGS } from "@/routes/_app/theme";
import { queryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const ThemesApi = {
    getThemes: async () => {
        await sleep(700);
        const random = Math.random();
        if (random < 1 / 3) {
            return Promise.resolve(THEME_CONFIGS);
        } else if (random < 2 / 3) {
            return Promise.resolve([]);
        } else {
            return Promise.reject(new AxiosError(""));
        }
    },
};

export const ThemeKeys = {
    themes: () =>
        queryOptions({
            queryKey: ["themes"],
            queryFn: () => ThemesApi.getThemes(),
            refetchOnWindowFocus: false,
            retry: 0, // remove
            refetchOnMount: false,
        }),
};
