import { queryOptions } from "@tanstack/react-query";
import { axiosInstance, handleError, handleResponse } from "../http/api";
import { ThemeConfig, ThemeConfigCreateResponse } from "./type";

export const ThemesApi = {
    getThemes: () =>
        axiosInstance
            .get<Array<ThemeConfig>>("theme")
            .then(handleResponse)
            .catch(handleError),

    createTheme: (theme: ThemeConfig) =>
        axiosInstance
            .post<ThemeConfigCreateResponse>("theme", theme)
            .then(handleResponse)
            .catch(handleError),
};

export const ThemeKeys = {
    themes: () =>
        queryOptions({
            queryKey: ["themes"],
            queryFn: () => ThemesApi.getThemes(),
            refetchOnWindowFocus: false,
            staleTime: 1_000 * 10,
            retry: 0, // remove
            refetchOnMount: false,
        }),
    create: (theme: ThemeConfig) =>
        queryOptions({
            queryKey: ["theme-create"],
            queryFn: () => ThemesApi.createTheme(theme),
        }),
};
