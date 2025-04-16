import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { axiosInstance, handleError, handleResponse } from "../http/api";
import {
    AnalysisRequest,
    AnalysisRequestResult,
    AnalysisRequestResultPaginated,
} from "./type";

export const AnalysisApi = {
    getAnalyses: (page: number) =>
        axiosInstance
            .get<AnalysisRequestResultPaginated>(
                `/analysis?limit=6&page=${page}`
            )
            .then(handleResponse)
            .catch(handleError),
    requestAnalysis: (ar: AnalysisRequest) =>
        axiosInstance
            .post<Array<AnalysisRequestResult>>("/analysis", ar)
            .then(handleResponse)
            .catch(handleError),
};

export const AnalysisKeys = {
    analyses: (page: number) =>
        queryOptions({
            queryKey: ["analyses", page],
            queryFn: () => AnalysisApi.getAnalyses(page),
            refetchOnWindowFocus: false,
            retry: 0, // remove
            refetchOnMount: false,
            staleTime: 30 * 1_000,
            placeholderData: keepPreviousData,
        }),
};
