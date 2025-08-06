import { ICON_MAP } from "@/components/const/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import DataLoaderSpinner from "@/components/ui/custom/DataLoader";
import EmptyList from "@/components/ui/custom/EmptyList";
import ErrorSoftner from "@/components/ui/custom/ErrorSoftner";
import useInvalidateQuery from "@/components/ui/custom/Invalidate.hook";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AnalysisApi, AnalysisKeys } from "@/domain/analysis/api";
import { mapToBasic } from "@/domain/analysis/state";
import {
    AnalysisRequestResultBasic,
    AnalysisStatus,
    GENRE_MAP,
    ScoreCountStatus,
    ScoreCountStatusValues,
} from "@/domain/analysis/type";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery.hook";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import axios from "axios";
import clsx from "clsx";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { LuArrowRight, LuFrown, LuSmile, LuTrash2 } from "react-icons/lu";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

type IHomeScreen = {};
export function HomeScreen({}: IHomeScreen) {
    return (
        <div className='flex flex-1 grow flex-col max-w-2xl space-y-5 mt-4 md:mt-24 mb-5'>
            <div className='md:flex md:justify-end gap-2'>
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
                {/* <div className='grow' /> */}
                <div className='flex flex-col md:flex-row gap-2 '>
                    <Link to='/theme'>
                        <Button variant='outline' className='w-full'>
                            Theme Configuration
                        </Button>
                    </Link>
                    <Link to='/request'>
                        <Button className='w-full'>Request Analysis</Button>
                    </Link>
                </div>
            </div>
            <AnalysesLoading />
        </div>
    );
}

const generatePages = (current: number, total: number, siblings: number) => {
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

type IAnalysesLoading = {};
function AnalysesLoading({}: IAnalysesLoading) {
    const { page, category, query, score } = useSearch({ from: "/_app/" });
    const navigate = useNavigate({ from: "/" });
    const [queryStr, setQueryStr] = useState(query || "");

    const { data, isLoading, error } = useQuery(
        AnalysisKeys.analyses(page, category, query, score)
    );

    const isDesktop = useMediaQuery("(min-width: 767px)");

    const debouncedQuery = useDebouncedCallback((value) => {
        navigate({
            search: (prev) => ({
                ...prev,
                query: value === "" ? undefined : value,
                page: 1,
            }),
        });
    }, 1000);

    const { invs } = useInvalidateQuery();

    useEffect(() => {
        invs(AnalysisKeys.analyses(page, category, query, score).queryKey);
    }, [page, category, query, score]);

    const getPaginationItems = useCallback(
        () => generatePages(page, data?.totalPages || 1, 1),
        [page, category, query, score, data]
    );

    if (isLoading) return <DataLoaderSpinner title='Loading your analyses.' />;

    if (error)
        return (
            <ErrorSoftner
                title="Couldn't load your analyses."
                queryKeys={
                    AnalysisKeys.analyses(1, category, query, score).queryKey
                }
            />
        );

    if (!data)
        return (
            <EmptyList title='No analyses done yet.'>
                <p>
                    Click on{" "}
                    <span className='font-medium'>Request Analysis</span> to get
                    started.
                </p>
            </EmptyList>
        );

    const navToPage = (newPage: number) => {
        navigate({ search: (prev) => ({ ...prev, page: newPage }) });
    };

    const selectCategory = (cat: string) => {
        navigate({
            search: (prev) => ({
                ...prev,
                category: cat === "all:All" ? undefined : cat,
                page: 1,
            }),
        });
    };

    const selectScore = (sc: string) => {
        navigate({
            search: (prev) => ({
                ...prev,
                score: sc === "allscore" ? undefined : sc,
                page: 1,
            }),
        });
    };

    const updateSearchQuery = (query: string) => {
        setQueryStr(query);
        debouncedQuery(query);
    };

    return (
        <div className='space-y-4'>
            <div className='flex flex-col md:flex-row gap-3'>
                <Input
                    placeholder={`Search for analysis request`}
                    onChange={(e) => updateSearchQuery(e.target.value)}
                    value={queryStr}
                    className='rounded-xl basis-1 md:basis-7/12'
                />
                <div className='flex flex-row gap-3 justify-evenly basis-1 md:basis-5/12'>
                    <Select
                        onValueChange={(cat) => selectCategory(cat)}
                        defaultValue={category}
                    >
                        <SelectTrigger className='rounded-xl w-full'>
                            <SelectValue placeholder='Select a genre' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key='all:All' value='all:All'>
                                All categories
                            </SelectItem>
                            {Object.keys(GENRE_MAP).map((gkey) => (
                                <SelectGroup key={gkey}>
                                    <SelectLabel className='capitalize'>
                                        {gkey}
                                    </SelectLabel>
                                    {GENRE_MAP[gkey].map((cat) => (
                                        <SelectItem
                                            key={`${gkey}:${cat}`}
                                            value={`${gkey}:${cat}`}
                                        >
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={(sc) => selectScore(sc)}
                        defaultValue={score}
                    >
                        <SelectTrigger className='rounded-xl w-full'>
                            <SelectValue placeholder='Select a score' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key='allscore' value='allscore'>
                                All scores
                            </SelectItem>
                            {ScoreCountStatusValues.map((sckStatus) => (
                                <SelectItem
                                    key={sckStatus}
                                    value={sckStatus}
                                    className='capitalize'
                                >
                                    {sckStatus.toLowerCase()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='flex flex-1 flex-col space-y-3'>
                {data.analyses.length === 0 && (
                    <EmptyList title='No analyses found.'></EmptyList>
                )}
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
                    {isDesktop && (
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() =>
                                    page > 1 ? navToPage(page - 1) : {}
                                }
                            />
                        </PaginationItem>
                    )}
                    {getPaginationItems().map((item, i) => (
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
                    {isDesktop && (
                        <PaginationItem>
                            <PaginationNext
                                onClick={() =>
                                    page < data.totalPages
                                        ? navToPage(page + 1)
                                        : {}
                                }
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
}

const statusMap: Record<AnalysisStatus, ReactNode> = {
    waiting: <p>Waiting</p>,
    error: <p>Error</p>,
    inprogress: <p>In Progress</p>,
    finished: <p>Finished</p>,
};

const borderColorMap: Record<ScoreCountStatus, string> = {
    GOOD: clsx(`border-emerald-400 shadow-green-200`),
    BAD: clsx(`border-red-400 shadow-red-200`),
    MIXED: clsx(`border-orange-400 shadow-orange-200`),
    NEUTRAL: clsx(`border-gray-400 shadow-gray-200`),
};

type IAnalysis = {
    analysisRequest: AnalysisRequestResultBasic;
};
function AnalysisItem({ analysisRequest }: IAnalysis) {
    const { invs } = useInvalidateQuery();
    const {
        page,
        category,
        query,
        score: scoreCrit,
    } = useSearch({ from: "/_app/" });

    const status = useCallback((): ReactNode => {
        if (
            analysisRequest.status === "finished" &&
            analysisRequest.scoreCount.status() === "NEUTRAL"
        ) {
            return <p>Reporting</p>;
        }
        return statusMap[analysisRequest.status];
    }, [analysisRequest]);

    const icon = useCallback(() => {
        const IconComponent = ICON_MAP[analysisRequest.contentType];
        return <IconComponent className='size-6' strokeWidth={1.5} />;
    }, [analysisRequest]);

    const borderColor = useCallback((): string => {
        if (analysisRequest.status === "finished") {
            return borderColorMap[analysisRequest.scoreCount.status()];
        } else if (analysisRequest.status === "error") {
            return clsx(`border-gray-400 shadow-gray-200`);
        }
        return clsx(``);
    }, [analysisRequest]);

    const isInProgress = analysisRequest.status === "inprogress";
    const isProcessing = isInProgress || analysisRequest.status === "waiting";

    const updateScore = (score: number) => {
        axios
            .all(
                analysisRequest.analysisIds.map((aid) =>
                    AnalysisApi.updateAnalysisScore({ id: aid, score: score })
                )
            )
            .then(
                axios.spread((_) => {
                    toast.success("Analysis Updated");
                    invs(
                        AnalysisKeys.analyses(page, category, query, scoreCrit)
                            .queryKey
                    );
                })
            );
    };

    const { mutate: deleteAnalysisRequest } = useMutation({
        mutationFn: () => AnalysisApi.deleteAnalysisRequest(analysisRequest.id),
        onSuccess: () => {
            toast.success("Analysis Deleted");
            invs(
                AnalysisKeys.analyses(page, category, query, scoreCrit).queryKey
            );
        },
        onError: (_) => {
            toast.error("Analysis not Deleted. Please try again");
        },
    });

    return (
        <ContextMenu>
            <ContextMenuTrigger>
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
                                    <span className='text-muted-foreground font-light tracking-wider ml-2'>
                                        &#x2022; {analysisRequest.category}
                                    </span>
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

                                <LuArrowRight
                                    className='size-6 max-[600px]:hidden '
                                    strokeWidth={1.5}
                                />
                            </div>
                        </Card>
                    </div>
                </Link>
            </ContextMenuTrigger>
            <ContextMenuContent>
                {analysisRequest.scoreCount.status() !== "GOOD" ? (
                    <ContextMenuItem onClick={() => updateScore(1)}>
                        <LuSmile /> Mark as Approved
                    </ContextMenuItem>
                ) : (
                    <ContextMenuItem onClick={() => updateScore(-1)}>
                        <LuFrown /> Mark as Flagged
                    </ContextMenuItem>
                )}

                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => deleteAnalysisRequest()}>
                    <LuTrash2 /> Delete Analysis Request
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}
