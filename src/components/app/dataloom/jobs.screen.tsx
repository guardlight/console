import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DataLoaderSpinner from "@/components/ui/custom/DataLoader";
import EmptyList from "@/components/ui/custom/EmptyList";
import ErrorSoftner from "@/components/ui/custom/ErrorSoftner";
import useInvalidateQuery from "@/components/ui/custom/Invalidate.hook";
import { Urn } from "@/domain/common/urn";
import {
    DataloomMessage,
    UrnKeyValue,
    UrnKeyValueList,
} from "@/domain/dataloom/commons/type";
import { DataloomJobsApi, DataloomJobsKeys } from "@/domain/dataloom/jobs/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronDown, LoaderCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export function DataloomJobsScreen() {
    const { data, isLoading, error } = useQuery(DataloomJobsKeys.jobs());

    if (isLoading) return <DataLoaderSpinner title='Loading dataloom jobs.' />;

    if (error)
        return (
            <ErrorSoftner
                title="Couldn't load dataloom jobs."
                queryKeys={DataloomJobsKeys.jobs().queryKey}
            />
        );

    if (!data)
        return (
            <EmptyList title='No dataloom jobs.'>
                <p>You need to defined jobs in Dataloom.</p>
            </EmptyList>
        );

    return <SchedulerJobsPage jobs={data} />;
}

type JobStatus = "stopped" | "waiting" | "running";

const parseJob = (job: UrnKeyValue) => {
    const parts = job.urn.split(":");
    // urn:dataloom:books:scheduler:<jobType>:<category parts>...
    const jobType = parts[4] || "-"; // e.g. scraper, downloader, submit
    const category = parts.slice(5).join(":") || "-";

    const [statusRaw, nextRunRaw] = job.value.split(" - ");
    const status = (statusRaw || "stopped").toLowerCase() as JobStatus;
    const nextRun = nextRunRaw || "";

    return { jobType, category, status, nextRun, urn: job.urn };
};

const StatusBadge: React.FC<{ status: JobStatus }> = ({ status }) => {
    const baseClasses =
        "inline-block px-3 py-1 rounded-full text-xs font-semibold select-none";
    switch (status) {
        case "running":
            return (
                <span className={`${baseClasses} bg-green-100 text-green-800`}>
                    RUNNING
                </span>
            );
        case "waiting":
            return (
                <span
                    className={`${baseClasses} bg-yellow-100 text-yellow-800`}
                >
                    WAITING
                </span>
            );
        case "stopped":
        default:
            return (
                <span className={`${baseClasses} bg-red-100 text-red-800`}>
                    STOPPED
                </span>
            );
    }
};

type Props = {
    jobs: UrnKeyValueList;
};

export default function SchedulerJobsPage({ jobs }: Props) {
    // Group jobs by jobType (part after scheduler)
    const grouped = useMemo(
        () =>
            jobs.reduce(
                (acc, job) => {
                    const { jobType, category, status, nextRun, urn } =
                        parseJob(job);

                    if (!acc[jobType]) acc[jobType] = [];
                    acc[jobType].push({ category, status, nextRun, urn });
                    return acc;
                },
                {} as Record<
                    string,
                    {
                        category: string;
                        status: JobStatus;
                        nextRun: string;
                        urn: string;
                    }[]
                >
            ),
        [jobs]
    );

    const [expandedJobTypes, setExpandedJobTypes] = useState<
        Record<string, boolean>
    >({});

    const toggleJobType = (jobType: string) =>
        setExpandedJobTypes((prev) => ({ ...prev, [jobType]: !prev[jobType] }));

    return (
        <div className='flex flex-col gap-3'>
            {Object.entries(grouped).map(([jobType, jobs]) => {
                const expanded = expandedJobTypes[jobType] ?? true;
                return (
                    <Card key={jobType} className='p-0 gap-0'>
                        <button
                            onClick={() => toggleJobType(jobType)}
                            className='flex justify-between items-center w-full p-4 cursor-pointer'
                        >
                            <h2 className='text-3xl font-semibold capitalize'>
                                {jobType}
                            </h2>
                            <ChevronDown
                                className={`transform transition-transform duration-200 ${
                                    expanded ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {expanded && (
                            <div className='px-6 mb-4 space-y-2 '>
                                {jobs.map((job) => (
                                    <JobItem
                                        key={`${job.urn}-${job.status}`}
                                        {...job}
                                    />
                                ))}
                            </div>
                        )}
                    </Card>
                );
            })}
        </div>
    );
}

type IJobItem = {
    category: string;
    status: JobStatus;
    nextRun: string;
    urn: string;
};
function JobItem({ category, status: statusOriginal, nextRun, urn }: IJobItem) {
    const { invs } = useInvalidateQuery();

    const [status, setStatus] = useState(statusOriginal);

    const { mutate: executeJob, isPending: isExecuting } = useMutation({
        mutationFn: (urn: string) => DataloomJobsApi.executeJob(urn),
        onSuccess: (data: DataloomMessage) => {
            toast.success(data.message);
            setStatus(statusOriginal);
            invs(DataloomJobsKeys.jobs().queryKey);
        },
        onError: (err) => {
            setStatus(statusOriginal);
            // You can check for a property or use a type guard here
            toast.error("Could not execute job", {
                description:
                    typeof err === "object" && err && "message" in err
                        ? (err as any).message
                        : "Unknown error",
            });
        },
    });

    const { mutate: startJob, isPending: isStarting } = useMutation({
        mutationFn: (urn: string) => DataloomJobsApi.startJob(urn),
        onSuccess: (data: DataloomMessage) => {
            toast.success(data.message);
            invs(DataloomJobsKeys.jobs().queryKey);
        },
        onError: (err) => {
            // You can check for a property or use a type guard here
            toast.error("Could not start job", {
                description:
                    typeof err === "object" && err && "message" in err
                        ? (err as any).message
                        : "Unknown error",
            });
        },
    });

    const { mutate: stopJob, isPending: isStopping } = useMutation({
        mutationFn: (urn: string) => DataloomJobsApi.stopJob(urn),
        onSuccess: (data: DataloomMessage) => {
            toast.success(data.message);
            invs(DataloomJobsKeys.jobs().queryKey);
        },
        onError: (err) => {
            // You can check for a property or use a type guard here
            toast.error("Could not start job", {
                description:
                    typeof err === "object" && err && "message" in err
                        ? (err as any).message
                        : "Unknown error",
            });
        },
    });

    const onStartJob = (urnString: string) => {
        startJob(urnString);
    };
    const onStopJob = (urnString: string) => {
        stopJob(urnString);
    };
    const runOnceJob = (urnString: string) => {
        const urn = Urn.parse(urnString);
        const id = urn.getIds().slice(1, urn.getIds().length).join(":");
        toast.success("Executing task", { description: id });
        setStatus("running");
        executeJob(urnString);
    };

    return (
        <div
            key={urn}
            title={urn}
            className='flex px-6 items-center flex-col md:flex-row gap-3 md:gap-0 justify-between bg-white p-2 rounded-xl border border-gray-300 border-dashed transition'
        >
            <div className='flex-1 min-w-0'>
                <h3 className='text-lg font-medium text-gray-900 truncate'>
                    {category}
                </h3>
            </div>
            <div className='mx-4 flex-shrink-0'>
                <StatusBadge status={status} />
            </div>
            <div className='flex-1 min-w-0 text-gray-700 truncate'>
                Next run: <span>{nextRun}</span>
            </div>
            <div className='flex items-center space-x-2 flex-shrink-0 w-full md:w-auto'>
                <Button
                    onClick={() => runOnceJob(urn)}
                    variant='outline'
                    size='sm'
                    className='w-full md:w-auto'
                    disabled={status === "running" || isExecuting}
                >
                    Run Once
                    {isExecuting && <LoaderCircle className='animate-spin' />}
                </Button>

                {status === "stopped" ? (
                    <Button
                        onClick={() => onStartJob(urn)}
                        variant='default'
                        size='sm'
                        className='bg-green-600 w-full md:w-auto hover:bg-green-600/90'
                        disabled={isStarting}
                    >
                        Start
                        {isStarting && (
                            <LoaderCircle className='animate-spin' />
                        )}
                    </Button>
                ) : (
                    <Button
                        onClick={() => onStopJob(urn)}
                        variant='destructive'
                        size='sm'
                        className='w-full md:w-auto'
                        disabled={
                            status === "running" || isExecuting || isStopping
                        }
                    >
                        Stop
                        {isStopping && (
                            <LoaderCircle className='animate-spin' />
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
}
