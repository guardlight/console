import { queryOptions } from "@tanstack/react-query";
import { axiosInstance, handleError, handleResponse } from "../http/api";
import { Parser } from "./type";

export const ParserApi = {
    getParsers: () =>
        axiosInstance
            .get<Array<Parser>>("parser")
            .then(handleResponse)
            .catch(handleError),
};

export const ParserKeys = {
    parsers: () =>
        queryOptions({
            queryKey: ["parsers"],
            queryFn: () => ParserApi.getParsers(),
            refetchOnWindowFocus: false,
            staleTime: 1_000 * 10,
            refetchOnMount: false,
        }),
};
