import {
    axiosDataloomInstance,
    handleError,
    handleResponse,
} from "@/domain/http/api";
import { queryOptions } from "@tanstack/react-query";
import { UrnKeyValueList } from "../commons/type";

export const DataloomStatisticsApi = {
    getStatistics: () =>
        axiosDataloomInstance
            .get<UrnKeyValueList>(`data/dashboard/urn:`)
            .then(handleResponse)
            .catch(handleError),
};

export const DataloomStatisticsKeys = {
    statistics: () =>
        queryOptions({
            queryKey: ["dataloom-statistics"],
            queryFn: () => DataloomStatisticsApi.getStatistics(),
            refetchOnWindowFocus: false,
            retry: 0,
            refetchOnMount: false,
            // staleTime: 5_000,
            // refetchInterval: 5_000,
        }),
};
