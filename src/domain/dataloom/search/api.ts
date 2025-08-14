import {
    axiosDataloomInstance,
    handleError,
    handleResponse,
} from "@/domain/http/api";
import { queryOptions } from "@tanstack/react-query";
import { UrnKeyValueList } from "../commons/type";

export const DataloomSearchApi = {
    searchResources: (query: string) =>
        axiosDataloomInstance
            .get<UrnKeyValueList>(`data/search/urn:?query=${query}`)
            .then(handleResponse)
            .catch(handleError),
};

export const DataloomSearchKeys = {
    search: (query: string) =>
        queryOptions({
            queryKey: ["dataloom-search", query],
            queryFn: () => DataloomSearchApi.searchResources(query),
            refetchOnWindowFocus: false,
            retry: 0,
            refetchOnMount: false,
            // staleTime: 5_000,
            // refetchInterval: 5_000,
        }),
};
