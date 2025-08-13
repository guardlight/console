import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Urn } from "@/domain/common/urn";
import { ChevronDown, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const jobsData = [
    {
        urn: "urn:dataloom:books:scheduler:scraper:vendervelde:fantasy",
        value: "stopped - August 17, 2025 at 1:00 AM",
    },
    {
        urn: "urn:dataloom:books:scheduler:scraper:vendervelde:sciencefiction",
        value: "stopped - August 17, 2025 at 2:00 AM",
    },
    {
        urn: "urn:dataloom:books:scheduler:scraper:vendervelde:romans",
        value: "stopped - August 17, 2025 at 3:00 AM",
    },
    {
        urn: "urn:dataloom:books:scheduler:scraper:vendervelde:literatuur",
        value: "stopped - August 17, 2025 at 4:00 AM",
    },
    {
        urn: "urn:dataloom:books:scheduler:scraper:vendervelde:thriller",
        value: "stopped - August 17, 2025 at 5:00 AM",
    },
    {
        urn: "urn:dataloom:books:scheduler:scraper:vendervelde:mystery",
        value: "stopped - August 17, 2025 at 6:00 AM",
    },
    {
        urn: "urn:dataloom:books:scheduler:scraper:vendervelde:cozymystery",
        value: "stopped - August 17, 2025 at 7:00 AM",
    },
    {
        urn: "urn:dataloom:books:scheduler:scraper:vendervelde:truecrime",
        value: "running - August 17, 2025 at 8:00 AM",
    },
    {
        urn: "urn:dataloom:books:scheduler:scraper:vendervelde:psychthriller",
        value: "stopped - August 17, 2025 at 9:00 AM",
    },
    {
        urn: "urn:dataloom:books:scheduler:scraper:vendervelde:classiccrimemystery",
        value: "waiting - August 17, 2025 at 10:00 AM",
    },
    {
        urn: "urn:dataloom:books:scheduler:scraper:vendervelde:historycrimemystery",
        value: "stopped - August 17, 2025 at 11:00 AM",
    },
    {
        urn: "urn:dataloom:books:scheduler:scraper:vendervelde:youngadult",
        value: "stopped - August 17, 2025 at 12:00 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:scraper:vendervelde:teenager",
        value: "stopped - August 17, 2025 at 1:00 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:scraper:vendervelde:children",
        value: "stopped - August 17, 2025 at 1:00 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:downloader:annasarchive:fantasy",
        value: "stopped - August 13, 2025 at 3:00 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:downloader:annasarchive:sciencefiction",
        value: "stopped - August 13, 2025 at 3:05 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:downloader:annasarchive:romans",
        value: "stopped - August 13, 2025 at 3:10 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:downloader:annasarchive:literatuur",
        value: "stopped - August 13, 2025 at 3:15 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:downloader:annasarchive:thriller",
        value: "stopped - August 13, 2025 at 3:20 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:downloader:annasarchive:mystery",
        value: "stopped - August 13, 2025 at 3:25 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:downloader:annasarchive:cozymystery",
        value: "stopped - August 13, 2025 at 3:30 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:downloader:annasarchive:truecrime",
        value: "stopped - August 13, 2025 at 3:35 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:downloader:annasarchive:psychthriller",
        value: "stopped - August 13, 2025 at 3:40 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:downloader:annasarchive:classiccrimemystery",
        value: "stopped - August 13, 2025 at 3:45 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:downloader:annasarchive:historycrimemystery",
        value: "stopped - August 13, 2025 at 3:50 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:downloader:annasarchive:youngadult",
        value: "stopped - August 13, 2025 at 3:50 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:submit:annasarchive:fantasy",
        value: "stopped - August 13, 2025 at 3:00 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:submit:annasarchive:sciencefiction",
        value: "stopped - August 13, 2025 at 3:08 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:submit:annasarchive:romans",
        value: "stopped - August 13, 2025 at 3:14 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:submit:annasarchive:literatuur",
        value: "stopped - August 13, 2025 at 3:21 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:submit:annasarchive:thriller",
        value: "stopped - August 13, 2025 at 3:27 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:submit:annasarchive:mystery",
        value: "stopped - August 13, 2025 at 3:31 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:submit:annasarchive:cozymystery",
        value: "stopped - August 13, 2025 at 3:35 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:submit:annasarchive:truecrime",
        value: "stopped - August 13, 2025 at 3:38 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:submit:annasarchive:psychthriller",
        value: "stopped - August 13, 2025 at 3:40 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:submit:annasarchive:classiccrimemystery",
        value: "stopped - August 13, 2025 at 3:43 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:submit:annasarchive:historycrimemystery",
        value: "stopped - August 13, 2025 at 3:46 PM",
    },
    {
        urn: "urn:dataloom:books:scheduler:submit:annasarchive:youngadult",
        value: "stopped - August 13, 2025 at 3:48 PM",
    },
];

export function DataloomJobsScreen() {
    const startJob = (urnString: string) => {
        const urn = Urn.parse(urnString);
        const id = urn.getIds().slice(1, urn.getIds().length).join(":");
        toast.success("Starting task", { description: id });
    };
    const stopJob = (urnString: string) => {
        const urn = Urn.parse(urnString);
        const id = urn.getIds().slice(1, urn.getIds().length).join(":");
        toast.success("Stopping task", { description: id });
    };
    const runOnceJob = (urnString: string) => {
        const urn = Urn.parse(urnString);
        const id = urn.getIds().slice(1, urn.getIds().length).join(":");
        toast.success("Executing task", { description: id });
    };

    return (
        <SchedulerJobsPage
            jobs={jobsData}
            onStart={startJob}
            onStop={stopJob}
            onRunOnce={runOnceJob}
        />
    );
}

type CronJob = {
    urn: string;
    value: string; // e.g. "stopped - August 17, 2025 at 1:00 AM GMT+2"
};

type JobStatus = "stopped" | "waiting" | "running";

const parseJob = (job: CronJob) => {
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
    jobs: CronJob[];
    onStart: (urn: string) => void;
    onStop: (urn: string) => void;
    onRunOnce: (urn: string) => void;
};

export default function SchedulerJobsPage({
    jobs,
    onStart,
    onStop,
    onRunOnce,
}: Props) {
    // Group jobs by jobType (part after scheduler)
    const grouped = jobs.reduce(
        (acc, job) => {
            const { jobType, category, status, nextRun, urn } = parseJob(job);

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
                                {jobs.map(
                                    ({ category, status, nextRun, urn }) => (
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
                                                    onClick={() =>
                                                        onRunOnce(urn)
                                                    }
                                                    variant='outline'
                                                    size='sm'
                                                    className='w-full md:w-auto'
                                                    disabled={
                                                        status === "running"
                                                    }
                                                >
                                                    Run Once
                                                    {status === "running" && (
                                                        <LoaderCircle className='animate-spin' />
                                                    )}
                                                </Button>

                                                {status === "stopped" ? (
                                                    <Button
                                                        onClick={() =>
                                                            onStart(urn)
                                                        }
                                                        variant='default'
                                                        size='sm'
                                                        className='bg-green-600 w-full md:w-auto hover:bg-green-600/90'
                                                    >
                                                        Start
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() =>
                                                            onStop(urn)
                                                        }
                                                        variant='destructive'
                                                        size='sm'
                                                        className='w-full md:w-auto'
                                                    >
                                                        Stop
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </Card>
                );
            })}
        </div>
    );
}
