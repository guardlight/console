import { ICON_MAP } from "@/components/const/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DataLoaderSpinner from "@/components/ui/custom/DataLoader";
import EmptyList from "@/components/ui/custom/EmptyList";
import ErrorSoftner from "@/components/ui/custom/ErrorSoftner";
import InvalidateQuery from "@/components/ui/custom/Invalidate.hook";
import { AnalysisKeys } from "@/domain/analysis/api";
import { AnalysisRequestResult, AnalysisStatus } from "@/domain/analysis/type";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { ReactNode, useCallback } from "react";
import { LuArrowRight, LuRefreshCw } from "react-icons/lu";

type IHomeScreen = {};
export function HomeScreen({}: IHomeScreen) {
    const { data, isFetching, isRefetching, error } = useQuery(
        AnalysisKeys.analyses()
    );

    const { invs } = InvalidateQuery();

    return (
        <div className='flex flex-1 grow flex-col max-w-2xl space-y-5 mt-24'>
            <div className='flex justify-end gap-2'>
                <Button
                    variant='ghost'
                    className='text-muted-foreground'
                    onClick={() => invs(AnalysisKeys.analyses().queryKey)}
                >
                    <LuRefreshCw
                        strokeWidth={1.25}
                        className={isRefetching ? "animate-spin" : ""}
                    />
                    Refresh
                </Button>
                <div className='grow' />
                <Link to='/theme'>
                    <Button variant='outline'>Theme Configuration</Button>
                </Link>
                <Link to='/request'>
                    <Button>Request Analysis</Button>
                </Link>
            </div>
            <div className='flex flex-1 flex-col space-y-3'>
                <AnalysesLoading
                    isFetching={isFetching}
                    analyses={data}
                    error={error}
                />
            </div>
        </div>
    );
}

type IAnalysesLoading = {
    error: Error | null;
    isFetching: boolean;
    analyses?: Array<AnalysisRequestResult>;
};
function AnalysesLoading({ isFetching, analyses, error }: IAnalysesLoading) {
    if (isFetching) return <DataLoaderSpinner title='Loading your analyses.' />;

    if (error)
        return (
            <ErrorSoftner
                title="Couldn't load your analyses."
                queryKeys={AnalysisKeys.analyses().queryKey}
            />
        );

    if (!analyses || analyses.length === 0)
        return (
            <EmptyList title='No analyses done yet.'>
                <p>
                    Click on{" "}
                    <span className='font-medium'>Request Analysis</span> to get
                    started.
                </p>
            </EmptyList>
        );

    return analyses.map((analysis) => (
        <AnalysisItem key={analysis.id} analysisRequest={analysis} />
    ));
}

const statusMap: Record<AnalysisStatus, ReactNode> = {
    waiting: <p>Waiting</p>,
    error: <p className='text-red-400'>Error</p>,
    inprogress: <p className='animate-pulse'>In Progress</p>,
    finished: <p>Finished</p>,
};

const borderColorMap: Record<"good" | "bad" | "neutral", string> = {
    good: clsx(`border-emerald-400 shadow-green-200`),
    bad: clsx(`border-red-400 shadow-red-200`),
    neutral: clsx(``),
};

type IAnalysis = {
    analysisRequest: AnalysisRequestResult;
};
function AnalysisItem({ analysisRequest }: IAnalysis) {
    const statusComputed = useCallback((): AnalysisStatus => {
        const statuses = analysisRequest.themes
            .flatMap((t) => t.analyzers)
            .map((a) => a.status);
        if (statuses.includes("error")) {
            return "error";
        } else if (statuses.every((status) => status === "waiting")) {
            return "waiting";
        } else if (statuses.includes("inprogress")) {
            return "inprogress";
        } else if (statuses.every((status) => status === "finished")) {
            return "finished";
        } else {
            return "waiting";
        }
    }, [analysisRequest]);

    const status = useCallback((): ReactNode => {
        return statusMap[statusComputed()];
    }, [analysisRequest]);

    const icon = useCallback(() => {
        const IconComponent = ICON_MAP[analysisRequest.contentType];
        return <IconComponent className='size-6' strokeWidth={1.5} />;
    }, [analysisRequest]);

    const borderColor = useCallback((): string => {
        if (statusComputed() == "finished") {
            const overThreshold = analysisRequest.themes
                .flatMap((t) => t.analyzers)
                .some(
                    (a) =>
                        a.score >
                        +(
                            a.inputs.find((i) => i.key === "threshold")
                                ?.value || "0"
                        )
                );
            if (overThreshold) {
                return borderColorMap["bad"];
            }
            return borderColorMap["good"];
        }
        return borderColorMap["neutral"];
    }, [analysisRequest]);

    const isProcessing =
        statusComputed() === "inprogress" || statusComputed() === "waiting";

    return (
        <Link
            to='/analysis/$analysisId'
            params={{ analysisId: analysisRequest.id }}
        >
            <div
                className={cn(
                    "rounded-xl cursor-pointer transform transition-transform duration-50 active:scale-97 hover:scale-99",
                    isProcessing ? "progressing-effect" : ""
                )}
            >
                <Card
                    className={cn(
                        "p-4 flex flex-row grow items-center justify-between ",
                        borderColor()
                    )}
                >
                    <div className='flex items-center space-x-5'>
                        <div>{icon()}</div>
                        <div className='text tracking-wider'>
                            {analysisRequest.title}
                        </div>
                    </div>
                    <div className='flex items-center space-x-8'>
                        {status()}
                        <LuArrowRight className='size-6' strokeWidth={1.5} />
                    </div>
                </Card>
            </div>
        </Link>
    );
}
