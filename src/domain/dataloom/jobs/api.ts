import {
    axiosDataloomInstance,
    handleError,
    handleResponse,
} from "@/domain/http/api";
import { queryOptions } from "@tanstack/react-query";
import { DataloomMessage, UrnKeyValueList } from "../commons/type";

export const DataloomJobsApi = {
    getJobs: () =>
        axiosDataloomInstance
            .get<UrnKeyValueList>(`scheduler`)
            .then(handleResponse)
            .catch(handleError),
    executeJob: (urn: string) =>
        axiosDataloomInstance
            .get<DataloomMessage>(`scheduler/execute/${urn}`)
            .then(handleResponse)
            .catch(handleError),
    startJob: (urn: string) =>
        axiosDataloomInstance
            .get<DataloomMessage>(`scheduler/start/${urn}`)
            .then(handleResponse)
            .catch(handleError),
    stopJob: (urn: string) =>
        axiosDataloomInstance
            .get<DataloomMessage>(`scheduler/stop/${urn}`)
            .then(handleResponse)
            .catch(handleError),
};

export const DataloomJobsKeys = {
    jobs: () =>
        queryOptions({
            queryKey: ["dataloom-jobs"],
            queryFn: () => DataloomJobsApi.getJobs(),
            // refetchOnWindowFocus: false,
            retry: 0,
            // refetchOnMount: false,
            // staleTime: 5_000,
            refetchInterval: 5_000,
        }),
};
