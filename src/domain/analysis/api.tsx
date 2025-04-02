import { queryOptions } from "@tanstack/react-query";
import { axiosInstance, handleError, handleResponse } from "../http/api";
import { AnalysisRequest, AnalysisRequestResult } from "./type";

export const AnalysisApi = {
    getAnalyses: () =>
        axiosInstance
            .get<Array<AnalysisRequestResult>>("/analysis")
            .then(handleResponse)
            .catch(handleError),
    requestAnalysis: (ar: AnalysisRequest) =>
        axiosInstance
            .post<Array<AnalysisRequestResult>>("/analysis", ar)
            .then(handleResponse)
            .catch(handleError),
};

export const AnalysisKeys = {
    analyses: () =>
        queryOptions({
            queryKey: ["analyses"],
            queryFn: () => AnalysisApi.getAnalyses(),
            refetchOnWindowFocus: false,
            retry: 0, // remove
            refetchOnMount: false,
            staleTime: 30 * 1_000,
        }),
};
