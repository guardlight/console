import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import DataLoaderSpinner from "@/components/ui/custom/DataLoader";
import EmptyList from "@/components/ui/custom/EmptyList";
import ErrorSoftner from "@/components/ui/custom/ErrorSoftner";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AnalysisKeys } from "@/domain/analysis/api";
import {
    AnalyzerInputResult,
    AnalyzerResult,
    NIL_ANALYSIS_RESULT,
    ThemeResult,
} from "@/domain/analysis/type";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { PropsWithChildren, useCallback, useMemo } from "react";
import { LuFileInput, LuLoaderCircle } from "react-icons/lu";

const StatusColorMap: Record<string, string> = {
    false: clsx(`border-emerald-500 shadow-green-100 text-emerald-700`),
    true: clsx(`border-red-400 shadow-red-100 text-red-700`),
};

const StatusThemeTitleMap: Record<string, string> = {
    false: "Theme approved",
    true: "Theme not approved",
};

type IAnalysisScreen = {
    analysisId: string;
};
export default function AnalysisScreen({ analysisId }: IAnalysisScreen) {
    const { data, isFetching, error } = useQuery(AnalysisKeys.analyses());

    const analysisResult = useMemo(
        () => data?.find((d) => d.id === analysisId) || NIL_ANALYSIS_RESULT,
        [analysisId, data]
    );

    if (isFetching)
        return (
            <PageWrapper>
                <DataLoaderSpinner title='Loading your analysis result.' />
            </PageWrapper>
        );

    if (error)
        return (
            <PageWrapper>
                <ErrorSoftner
                    title="Couldn't load your analysis result."
                    queryKeys={AnalysisKeys.analyses().queryKey}
                />
            </PageWrapper>
        );

    if (analysisResult.id === "")
        return (
            <PageWrapper>
                <EmptyList title='Analysis result not found.'>
                    <Link to='/'>Back to Dashboard.</Link>
                </EmptyList>
            </PageWrapper>
        );

    return (
        <PageWrapper>
            <div className='space-x-1'>
                <span className='text-3xl font-medium'>
                    {analysisResult.title}
                </span>
                <span className='text-xs text-muted-foreground font-light'>
                    Analysis Report
                </span>
            </div>
            <Accordion
                type='multiple'
                className='space-y-4'
                defaultValue={
                    analysisResult.themes.length === 1
                        ? [analysisResult.themes[0].id]
                        : []
                }
            >
                {analysisResult.themes.map((t) => (
                    <ThemeAccordion key={t.id} theme={t} />
                ))}
            </Accordion>
        </PageWrapper>
    );
}

function PageWrapper({ children }: PropsWithChildren) {
    return (
        <div className='flex flex-1 grow flex-col max-w-3xl space-y-3 my-4 md:my-24'>
            {children}
        </div>
    );
}

type IThemeAccordion = {
    theme: ThemeResult;
};
function ThemeAccordion({ theme }: IThemeAccordion) {
    const overThreshold = useCallback(() => {
        return theme.analyzers.some(
            (a) =>
                a.score >
                +(a.inputs.find((i) => i.key === "threshold")?.value || "0")
        );
    }, [theme]);

    const borderColor = StatusColorMap[String(overThreshold())];

    const statusTitle = StatusThemeTitleMap[String(overThreshold())];

    const themeProcessing = theme.analyzers.some(
        (ta) => ta.status === "inprogress" || ta.status === "waiting"
    );

    return (
        <div
            className={cn(
                "rounded-xl",
                themeProcessing ? "progressing-effect" : ""
            )}
        >
            <AccordionItem value={theme.id} className='bg-background'>
                <AccordionTrigger className='data-[state="open"]'>
                    <div className='justify-between flex flex-1 items-center'>
                        <span className='font-medium text-xl group-hover:underline'>
                            {theme.title}
                        </span>{" "}
                        {!themeProcessing && (
                            <span
                                className={cn(
                                    "border px-1.5 py-0.5 rounded-md",
                                    borderColor
                                )}
                            >
                                {statusTitle}
                            </span>
                        )}
                    </div>
                </AccordionTrigger>
                <AccordionContent className='space-y-4'>
                    {theme.analyzers.map((a) => (
                        <AnalysisSection analysis={a} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        </div>
    );
}

const StatusAnalysisColorMap: Record<string, string> = {
    false: clsx(`text-emerald-700`),
    true: clsx(`text-red-700`),
};

const contentBorderColorMap: Record<string, string> = {
    false: clsx(`border-emerald-400`),
    true: clsx(`border-red-400`),
};

const StatusAnalysisMap: Record<string, string> = {
    false: "Approved",
    true: "Not approved",
};

type IAnalysisSection = {
    analysis: AnalyzerResult;
};
function AnalysisSection({ analysis }: IAnalysisSection) {
    const overThreshold =
        analysis.score >
        +(analysis.inputs.find((i) => i.key === "threshold")?.value || "0");
    const borderColor = StatusAnalysisColorMap[String(overThreshold)];

    const statusTitle = StatusAnalysisMap[String(overThreshold)];
    const contentBorderColor = contentBorderColorMap[String(overThreshold)];

    const isProcessing =
        analysis.status === "inprogress" || analysis.status === "waiting";

    return (
        <div className='space-y-3 pl-2 pr-14'>
            <div className='w-full'>
                <div className='flex justify-between items-baseline'>
                    <div className='flex items-baseline space-x-2'>
                        <div className='font-medium text-lg'>
                            {analysis.name}
                        </div>
                        {!isProcessing ? (
                            <span
                                className={cn(
                                    "text-sm font-extralight rounded-md",
                                    borderColor
                                )}
                            >
                                {statusTitle}
                            </span>
                        ) : (
                            <></>
                        )}
                    </div>
                    <HoverCard openDelay={0}>
                        <HoverCardTrigger asChild>
                            <span className='text-muted-foreground text-sm font-extralight flex items-center gap-1 mr-1 cursor-pointer'>
                                Inputs
                                <LuFileInput
                                    className='text-muted-foreground'
                                    strokeWidth={1.25}
                                />
                            </span>
                        </HoverCardTrigger>
                        <HoverCardContent side='right'>
                            <div className='space-y-3'>
                                {analysis.inputs.map((ai) => (
                                    <AnalysisInputItem
                                        key={ai.key}
                                        input={ai}
                                    />
                                ))}
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>

                <div className='size-[1px] bg-gray-300 rounded-4xl w-full ' />
            </div>

            {isProcessing ? (
                <div className='flex items-center gap-1 text-muted-foreground animate-pulse ml-2'>
                    <LuLoaderCircle className='animate-spin' />
                    <span className='text-muted-foreground font-light'>
                        Analysis in progress
                    </span>
                </div>
            ) : (
                <div className='space-y-2'>
                    {analysis.content.length == 0 && (
                        <p className='text-muted-foreground font-light ml-2'>
                            No in-depth feedback provided by analyzer.
                        </p>
                    )}
                    {analysis.content.map((c) => (
                        <p
                            className={cn(
                                "border-l-2 font-light pl-1.5 py-0.5 ml-2",
                                contentBorderColor
                            )}
                        >
                            {c}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

type IAnalysisInputItem = {
    input: AnalyzerInputResult;
};
function AnalysisInputItem({ input }: IAnalysisInputItem) {
    return (
        <div>
            <div className='font-medium'>{input.name}</div>
            <div className='text-sm font-light'>{input.value}</div>
        </div>
    );
}
