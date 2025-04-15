import { create } from "zustand";
import { AnalysisRequestResult, AnalysisRequestResultBasic } from "./type";

type AnalysisStore = {
    analysisRequestResults: Array<AnalysisRequestResult>;
};
type AnalysisStoreActions = {
    addAnalysisRequestResults: (results: Array<AnalysisRequestResult>) => void;
    getBasicAnalysisRequestResults: () => Array<AnalysisRequestResultBasic>;
};

export const useAnalysisStore = create<AnalysisStore & AnalysisStoreActions>(
    (set, get) => ({
        analysisRequestResults: [],
        addAnalysisRequestResults: (ars: Array<AnalysisRequestResult>) =>
            set(() => ({ analysisRequestResults: ars })),
        getBasicAnalysisRequestResults: () =>
            get().analysisRequestResults.map((ar) => mapToBasic(ar)),
    })
);

export function mapToBasic(
    ar: AnalysisRequestResult
): AnalysisRequestResultBasic {
    const overThreshold = ar.themes
        .flatMap((t) => t.analyzers)
        .some(
            (a) =>
                a.score >
                +(a.inputs.find((i) => i.key === "threshold")?.value || "0")
        );

    const status = (() => {
        const analysisStatuses = ar.themes
            .flatMap((t) => t.analyzers)
            .map((a) => a.status);
        if (analysisStatuses.includes("error")) {
            return "error";
        } else if (analysisStatuses.every((status) => status === "waiting")) {
            return "waiting";
        } else if (analysisStatuses.includes("inprogress")) {
            return "inprogress";
        } else if (analysisStatuses.every((status) => status === "finished")) {
            return "finished";
        } else {
            return "waiting";
        }
    })();

    const percentageCompleted = (() => {
        const analysisJobStatuses = ar.themes.flatMap((t) =>
            t.analyzers.flatMap((a) => a.jobs.flatMap((j) => j.status))
        );
        const done = analysisJobStatuses.filter(
            (status) => status === "finished"
        ).length;
        return Math.round((done / analysisJobStatuses.length) * 100) || 0;
    })();

    return {
        id: ar.id,
        title: ar.title,
        contentType: ar.contentType,
        overThreshold: overThreshold,
        status: status,
        percentageCompleted: percentageCompleted,
        createdAt: ar.createdAt,
    } as AnalysisRequestResultBasic;
}
