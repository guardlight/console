import { Card } from "@/components/ui/card";
import DataLoaderSpinner from "@/components/ui/custom/DataLoader";
import EmptyList from "@/components/ui/custom/EmptyList";
import ErrorSoftner from "@/components/ui/custom/ErrorSoftner";
import { UrnKeyValueList } from "@/domain/dataloom/commons/type";
import { DataloomStatisticsKeys } from "@/domain/dataloom/stats/api";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useCallback, useState } from "react";

export function DataloomStatsScreen() {
    const { data, isLoading, error } = useQuery(
        DataloomStatisticsKeys.statistics()
    );

    if (isLoading)
        return <DataLoaderSpinner title='Loading dataloom statistics.' />;

    if (error)
        return (
            <ErrorSoftner
                title="Couldn't load dataloom statistics."
                queryKeys={DataloomStatisticsKeys.statistics().queryKey}
            />
        );

    if (!data)
        return (
            <EmptyList title='No dataloom statistics.'>
                <p></p>
            </EmptyList>
        );

    return <DataloomStats data={data} />;
}
function DataloomStats({ data }: { data: UrnKeyValueList }) {
    const grouped = useCallback(() => groupByResourceAndNextId(data), [data]);

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
            {Object.entries(grouped()).map(([resource, nextIdGroups], idx) => {
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

type GroupedByNextId = {
    [nextId: string]: { ids: string; value: string; urn: string }[];
};

type GroupedByResource = {
    [resource: string]: GroupedByNextId;
};

function groupByResourceAndNextId(results: UrnKeyValueList): GroupedByResource {
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
