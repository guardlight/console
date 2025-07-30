import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { axiosInstance, handleError, handleResponse } from "../http/api";
import {
    AnalysisRequest,
    AnalysisRequestResult,
    AnalysisRequestResultPaginated,
    AnalysisUpdateScore,
} from "./type";

export const AnalysisApi = {
    getAnalyses: (
        page: number,
        category: string | undefined,
        query: string | undefined,
        score: string | undefined
    ) =>
        axiosInstance
            .get<AnalysisRequestResultPaginated>(
                `/analysis?limit=6&page=${page}&category=${category || ""}&query=${query || ""}&score=${score || ""}`
            )
            .then(handleResponse)
            .catch(handleError),
    getAnalysisById: (id: string) =>
        axiosInstance
            .get<AnalysisRequestResult>(`/analysis/${id}`)
            .then(handleResponse)
            .catch(handleError),
    requestAnalysis: (ar: AnalysisRequest) =>
        axiosInstance
            .post<Array<AnalysisRequestResult>>("/analysis", ar)
            .then(handleResponse)
            .catch(handleError),
    updateAnalysisScore: (scoreUpdate: AnalysisUpdateScore) =>
        axiosInstance
            .post<{}>("/analysis/update/score", scoreUpdate)
            .then(handleResponse)
            .catch(handleError),

    deleteAnalysisRequest: (analysisRequestId: string) =>
        axiosInstance
            .delete<{}>(`/analysis/${analysisRequestId}`)
            .then(handleResponse)
            .catch(handleError),
};

export const AnalysisKeys = {
    analyses: (
        page: number,
        category: string | undefined,
        query: string | undefined,
        score: string | undefined
    ) =>
        queryOptions({
            queryKey: ["analyses", page],
            queryFn: () =>
                AnalysisApi.getAnalyses(page, category, query, score),
            refetchOnWindowFocus: false,
            retry: 0, // remove
            refetchOnMount: false,
            staleTime: 30 * 1_000,
            placeholderData: keepPreviousData,
        }),
    analysisById: (id: string) =>
        queryOptions({
            queryKey: ["analysis", id],
            queryFn: () => AnalysisApi.getAnalysisById(id),
            refetchOnWindowFocus: false,
            retry: 0, // remove
            refetchOnMount: false,
            staleTime: 30 * 1_000,
        }),
};
