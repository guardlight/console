import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function DataloomStatsScreen() {
    return (
        <div>
            <SimpleGroupedView />
        </div>
    );
}

type ResultItem = {
    urn: string;
    value: string;
};

const data: ResultItem[] = [
    { urn: "urn:dataloom:books:statistic:processed:fantasy", value: "2575" },
    {
        urn: "urn:dataloom:books:statistic:processed:classiccrimemystery",
        value: "1158",
    },
    {
        urn: "urn:dataloom:books:statistic:processed:cozymystery",
        value: "1420",
    },
    { urn: "urn:dataloom:books:statistic:processed:romans", value: "3427" },
    { urn: "urn:dataloom:books:statistic:processed:thriller", value: "742" },
    { urn: "urn:dataloom:books:statistic:processed:literatuur", value: "1790" },
    {
        urn: "urn:dataloom:books:statistic:processed:sciencefiction",
        value: "1970",
    },
    { urn: "urn:dataloom:books:statistic:processed:truecrime", value: "17" },
    {
        urn: "urn:dataloom:books:statistic:processed:psychthriller",
        value: "68",
    },
    { urn: "urn:dataloom:books:statistic:processed:youngadult", value: "18" },
    {
        urn: "urn:dataloom:books:statistic:processed:historycrimemystery",
        value: "1266",
    },
    { urn: "urn:dataloom:books:statistic:processed:mystery", value: "1729" },
    { urn: "urn:dataloom:books:statistic:processed:total", value: "16180" },
    {
        urn: "urn:dataloom:books:statistic:downloaded:annasarchive:fantasy",
        value: "16",
    },
    {
        urn: "urn:dataloom:books:statistic:downloaded:annasarchive:total",
        value: "16",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:fantasy",
        value: "3463",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:classiccrimemystery",
        value: "108",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:cozymystery",
        value: "770",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:romans",
        value: "1428",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:thriller",
        value: "136",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:sciencefiction",
        value: "1319",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:literatuur",
        value: "4242",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:psychthriller",
        value: "1",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:historycrimemystery",
        value: "548",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:mystery",
        value: "4980",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:total",
        value: "16995",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:fantasy",
        value: "3463",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:classiccrimemystery",
        value: "108",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:cozymystery",
        value: "770",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:romans",
        value: "1428",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:thriller",
        value: "136",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:sciencefiction",
        value: "1319",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:literatuur",
        value: "4242",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:psychthriller",
        value: "1",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:historycrimemystery",
        value: "548",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:mystery",
        value: "4980",
    },
    {
        urn: "urn:dataloom:books:statistic:collected:annasarchive:total",
        value: "16995",
    },
];

type GroupedByNextId = {
    [nextId: string]: { ids: string; value: string; urn: string }[];
};

type GroupedByResource = {
    [resource: string]: GroupedByNextId;
};

function groupByResourceAndNextId(results: ResultItem[]): GroupedByResource {
    return results.reduce<GroupedByResource>((acc, { urn, value }) => {
        const parts = urn.split(":");
        const resource = parts[2] || "-";
        const statisticPrefix = parts[3];
        const nextId = parts[4] || "-";
        const restIds = parts.slice(5).join(":") || "-";

        if (statisticPrefix !== "statistic") return acc;

        if (!acc[resource]) acc[resource] = {};
        if (!acc[resource][nextId]) acc[resource][nextId] = [];

        acc[resource][nextId].push({ ids: restIds, value, urn });

        return acc;
    }, {});
}

export default function SimpleGroupedView() {
    const grouped = groupByResourceAndNextId(data);

    const [expandedResources, setExpandedResources] = useState<
        Record<string, boolean>
    >({});
    const [expandedNextIds, setExpandedNextIds] = useState<
        Record<string, Record<string, boolean>>
    >({});

    function toggleResource(resource: string) {
        setExpandedResources((prev) => ({
            ...prev,
            [resource]: !prev[resource],
        }));
    }

    function toggleNextId(resource: string, nextId: string) {
        setExpandedNextIds((prev) => ({
            ...prev,
            [resource]: {
                ...prev[resource],
                [nextId]: !prev[resource]?.[nextId],
            },
        }));
    }

    return (
        <div className=''>
            {Object.entries(grouped).map(([resource, nextIdGroups], idx) => {
                const isResourceExpanded = expandedResources[resource] ?? true; // default expanded

                return (
                    <div key={resource}>
                        <Card className='mb-10 py-0 gap-0'>
                            <button
                                type='button'
                                onClick={() => toggleResource(resource)}
                                className='flex items-center justify-between w-full cursor-pointer px-5 py-4'
                            >
                                <h2 className='text-3xl font-medium capitalize text-gray-900'>
                                    {resource}
                                </h2>
                                <ChevronDown
                                    className={`w-6 h-6 transition-transform duration-200 ${
                                        isResourceExpanded
                                            ? "rotate-180"
                                            : "rotate-0"
                                    }`}
                                />
                            </button>

                            {isResourceExpanded && (
                                <div className='px-5 pb-5'>
                                    {Object.entries(nextIdGroups).map(
                                        ([nextId, items]) => {
                                            const isNextIdExpanded =
                                                expandedNextIds[resource]?.[
                                                    nextId
                                                ] ?? false;

                                            return (
                                                <div key={nextId}>
                                                    <button
                                                        type='button'
                                                        onClick={() =>
                                                            toggleNextId(
                                                                resource,
                                                                nextId
                                                            )
                                                        }
                                                        className=' flex items-center justify-between w-full px-3 py-2 cursor-pointer'
                                                    >
                                                        <h3 className='text-2xl font-medium capitalize text-gray-800'>
                                                            {nextId}
                                                        </h3>
                                                        <ChevronDown
                                                            className={`w-5 h-5 transition-transform duration-200 ${
                                                                isNextIdExpanded
                                                                    ? "rotate-180"
                                                                    : "rotate-0"
                                                            }`}
                                                        />
                                                    </button>

                                                    {isNextIdExpanded && (
                                                        <div className='grid grid-cols-1 md:grid-cols-6 gap-4 mb-6 px-6'>
                                                            {items.map(
                                                                ({
                                                                    ids,
                                                                    value,
                                                                    urn,
                                                                }) => (
                                                                    <Stat
                                                                        key={
                                                                            idx
                                                                        }
                                                                        name={
                                                                            ids
                                                                        }
                                                                        value={
                                                                            value
                                                                        }
                                                                        title={
                                                                            urn
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        </Card>
                    </div>
                );
            })}
        </div>
    );
}

interface StatProps {
    name: string;
    value: string;
    title?: string;
}

export function Stat({ name, value, title }: StatProps) {
    const segments = name.split(":").reverse();
    return (
        <div
            className='flex flex-col items-center p-2 border border-gray-300 rounded-xl border-dashed'
            title={title}
        >
            <span className='font-medium text-3xl'>{value}</span>
            <div className='mt-2 text-center'>
                {segments.map((segment, idx) => (
                    <h3
                        key={idx}
                        className={cn(
                            "text-gray-800 select-text",
                            idx === 0 ? " " : "font-extralight"
                        )}
                    >
                        {segment}
                    </h3>
                ))}
            </div>
        </div>
    );
}
