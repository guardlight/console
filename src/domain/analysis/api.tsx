import { sleep } from "@/components/auth/auth";
import { queryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ANALYSES } from "./type";

// export const AnalysisApi = {
//     getAnalyses: () =>
//         axiosInstance
//             .post<Array<AnalysisRequestResult>>("/analyses")
//             .then(handleResponse)
//             .catch(handleError),
// };

export const AnalysisApi = {
    getAnalyses: async () => {
        await sleep(700);
        const random = Math.random();
        if (random < 1 / 3) {
            return Promise.resolve(ANALYSES);
        } else if (random < 2 / 3) {
            return Promise.resolve([]);
        } else {
            return Promise.reject(new AxiosError(""));
        }
    },
};

export const AnalysisKeys = {
    analyses: () =>
        queryOptions({
            queryKey: ["analyses"],
            queryFn: () => AnalysisApi.getAnalyses(),
            refetchOnWindowFocus: false,
            retry: 0, // remove
            refetchOnMount: false,
        }),
};
