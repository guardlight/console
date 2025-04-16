import { ICON_MAP } from "@/components/const/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DataLoaderSpinner from "@/components/ui/custom/DataLoader";
import EmptyList from "@/components/ui/custom/EmptyList";
import ErrorSoftner from "@/components/ui/custom/ErrorSoftner";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { AnalysisKeys } from "@/domain/analysis/api";
import { mapToBasic } from "@/domain/analysis/state";
import {
    AnalysisRequestResultBasic,
    AnalysisStatus,
} from "@/domain/analysis/type";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { ReactNode, useCallback, useState } from "react";
import { LuArrowRight } from "react-icons/lu";

type IHomeScreen = {};
export function HomeScreen({}: IHomeScreen) {
    return (
        <div className='flex flex-1 grow flex-col max-w-2xl space-y-5 mt-4 md:mt-24'>
            <div className='flex justify-end gap-2'>
                {/* <Button
                    variant='ghost'
                    className='text-muted-foreground'
                    onClick={() => invs(AnalysisKeys.analyses().queryKey)}
                >
                    <LuRefreshCw
                        strokeWidth={1.25}
                        className={isRefetching ? "animate-spin" : ""}
                    />
                    Refresh
                </Button> */}
                <div className='grow' />
                <Link to='/theme'>
                    <Button variant='outline'>Theme Configuration</Button>
                </Link>
                <Link to='/request'>
                    <Button>Request Analysis</Button>
                </Link>
            </div>
            <AnalysesLoading />
        </div>
    );
}

type IAnalysesLoading = {};
function AnalysesLoading({}: IAnalysesLoading) {
    const [page, setPage] = useState(1);

    const { data, isLoading, error } = useQuery(AnalysisKeys.analyses(page));

    if (isLoading) return <DataLoaderSpinner title='Loading your analyses.' />;

    if (error)
        return (
            <ErrorSoftner
                title="Couldn't load your analyses."
                queryKeys={AnalysisKeys.analyses(1).queryKey}
            />
        );

    if (!data || data.analyses.length === 0)
        return (
            <EmptyList title='No analyses done yet.'>
                <p>
                    Click on{" "}
                    <span className='font-medium'>Request Analysis</span> to get
                    started.
                </p>
            </EmptyList>
        );

    return (
        <div className='space-y-4'>
            <div className='flex flex-1 flex-col space-y-3'>
                {data.analyses
                    .map((ar) => mapToBasic(ar))
                    .sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                    .map((analysis) => (
                        <AnalysisItem
                            key={analysis.id}
                            analysisRequest={analysis}
                        />
                    ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => (page > 0 ? setPage(page - 1) : {})}
                        />
                    </PaginationItem>
                    {Array.from(
                        { length: data.totalPages || 0 },
                        (_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    onClick={() => setPage(index + 1)}
                                    isActive={index + 1 === page}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    )}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                page < data.totalPages ? setPage(page + 1) : {}
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

const statusMap: Record<AnalysisStatus, ReactNode> = {
    waiting: <p>Waiting</p>,
    error: <p className='text-red-400'>Error</p>,
    inprogress: <p>In Progress</p>,
    finished: <p>Finished</p>,
};

const borderColorMap: Record<"good" | "bad" | "neutral", string> = {
    good: clsx(`border-emerald-400 shadow-green-200`),
    bad: clsx(`border-red-400 shadow-red-200`),
    neutral: clsx(``),
};

type IAnalysis = {
    analysisRequest: AnalysisRequestResultBasic;
};
function AnalysisItem({ analysisRequest }: IAnalysis) {
    const status = useCallback((): ReactNode => {
        return statusMap[analysisRequest.status];
    }, [analysisRequest]);

    const icon = useCallback(() => {
        const IconComponent = ICON_MAP[analysisRequest.contentType];
        return <IconComponent className='size-6' strokeWidth={1.5} />;
    }, [analysisRequest]);

    const borderColor = useCallback((): string => {
        if (analysisRequest.status == "finished") {
            if (analysisRequest.overThreshold) {
                return borderColorMap["bad"];
            }
            return borderColorMap["good"];
        }
        return borderColorMap["neutral"];
    }, [analysisRequest]);

    const isInProgress = analysisRequest.status === "inprogress";
    const isProcessing = isInProgress || analysisRequest.status === "waiting";

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
                        {isInProgress ? (
                            <div className='animate-pulse'>
                                {analysisRequest.percentageCompleted}%
                            </div>
                        ) : (
                            <div>{status()}</div>
                        )}

                        <LuArrowRight className='size-6' strokeWidth={1.5} />
                    </div>
                </Card>
            </div>
        </Link>
    );
}
