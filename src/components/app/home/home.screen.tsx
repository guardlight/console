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
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import clsx from "clsx";
import { ReactNode, useCallback } from "react";
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
    const { page } = useSearch({ from: "/_app/" });
    const navigate = useNavigate({ from: "/" });

    // const [page, setPage] = useState(1);

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

    const generatePages = (
        current: number,
        total: number,
        siblings: number
    ) => {
        // current = 10
        // siblings = 1
        // total = 20

        // siblins = 1 then totalNumbers = 5
        const totalNumbers = siblings * 2 + 3;
        // totalBlocks = 7
        const totalBlocks = totalNumbers + 2;

        // Show all pages if total is less or equal than 7
        if (total <= totalBlocks) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        // current = 10, so 9 is the max
        const startPage = Math.max(current - siblings, 1);
        // current + siblings = 11, total is 20, so 11 is the minimum
        const endPage = Math.min(current + siblings, total);

        // Array of pages ( considering siblings is 1 )
        const pages = [
            //startPage = 9, so starts with [1,'...']
            ...(startPage > 2 ? [1, "..."] : startPage === 1 ? [] : [1]),
            ...Array.from(
                // startPage = 9 endPage = 11 then [3 items]
                { length: endPage - startPage + 1 },
                // [9,10,11]
                (_, i) => startPage + i
            ),
            // total - 1 = 19, and endPage is 11
            ...(endPage < total - 1
                ? // show ['...', 20]
                  ["...", total]
                : // if endPage is 20, show nothing at the end
                  endPage === total
                  ? []
                  : // show total after all that
                    [total]),
        ];

        return pages;
    };

    const items = generatePages(page, data.totalPages, 1);

    const navToPage = (newPage: number) => {
        navigate({ search: (prev) => ({ ...prev, page: newPage }) });
    };

    return (
        <div className='space-y-4'>
            <div className='flex flex-1 flex-col space-y-3'>
                {data.analyses
                    .map((ar) => mapToBasic(ar))
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
                            onClick={() =>
                                page > 1 ? navToPage(page - 1) : {}
                            }
                        />
                    </PaginationItem>
                    {items.map((item, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                onClick={() =>
                                    item != "..."
                                        ? navToPage(item as number)
                                        : {}
                                }
                                isActive={item === page}
                            >
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                page < data.totalPages
                                    ? navToPage(page + 1)
                                    : {}
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
