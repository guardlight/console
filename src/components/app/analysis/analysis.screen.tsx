import { ICON_MAP } from "@/components/const/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnalysisRequestResult, AnalysisStatus } from "@/domain/analysis/type";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { ReactNode, useCallback } from "react";
import { RxArrowRight } from "react-icons/rx";

type IAnalysisScreen = {
    analyses: Array<AnalysisRequestResult>;
};
export function AnalysisScreen({ analyses }: IAnalysisScreen) {
    return (
        <div className='flex flex-1 grow flex-col max-w-3xl space-y-5 mt-24'>
            <div className='flex justify-end'>
                <Link to='/request'>
                    <Button>Request Analysis</Button>
                </Link>
            </div>
            <div className='flex flex-1 flex-col space-y-3'>
                {analyses.map((analyses) => (
                    <AnalysisItem
                        key={analyses.id}
                        analysisRequest={analyses}
                    />
                ))}
            </div>
        </div>
    );
}

const statusMap: Record<AnalysisStatus, ReactNode> = {
    waiting: <p>Waiting</p>,
    error: <p className='text-red-400'>Error</p>,
    inprogress: <p className='animate-pulse'>In Progress</p>,
    finished: <p>Finished</p>,
};

const borderColorMap: Record<"good" | "bad" | "neutral", string> = {
    good: clsx(`border-green-400 shadow-green-100`),
    bad: clsx(`border-red-400 shadow-red-100`),
    neutral: clsx(``),
};

type IAnalysis = {
    analysisRequest: AnalysisRequestResult;
};
function AnalysisItem({ analysisRequest }: IAnalysis) {
    const statusComputed = useCallback((): AnalysisStatus => {
        const statuses = analysisRequest.analysis.map((a) => a.status);
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
        return <IconComponent className='size-7' strokeWidth={1.5} />;
    }, [analysisRequest]);

    const borderColor = useCallback((): string => {
        if (
            statusComputed() === "inprogress" ||
            statusComputed() == "finished"
        ) {
            const overThreshold = analysisRequest.analysis.some(
                (a) => a.score > a.threshold
            );
            if (overThreshold) {
                return borderColorMap["bad"];
            }
            return borderColorMap["good"];
        }
        return borderColorMap["neutral"];
    }, [analysisRequest]);

    return (
        <Link
            to='/analysis/$analysisId'
            params={{ analysisId: analysisRequest.id }}
        >
            <Card
                className={cn(
                    " p-4 flex flex-row grow items-center justify-between cursor-pointer transform transition-transform duration-50 active:scale-97 hover:scale-99",
                    borderColor()
                )}
            >
                <div className='flex items-center space-x-5'>
                    <div>{icon()}</div>
                    <div className='text-lg tracking-wider'>
                        {analysisRequest.title}
                    </div>
                </div>
                <div className='flex items-center space-x-8'>
                    {status()}
                    <RxArrowRight />
                </div>
            </Card>
        </Link>
    );
}
