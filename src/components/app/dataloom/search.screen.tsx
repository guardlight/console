import DataLoaderSpinner from "@/components/ui/custom/DataLoader";
import EmptyList from "@/components/ui/custom/EmptyList";
import ErrorSoftner from "@/components/ui/custom/ErrorSoftner";
import { UrnKeyValueList } from "@/domain/dataloom/commons/type";
import { DataloomSearchKeys } from "@/domain/dataloom/search/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function DataloomSearchScreen() {
    const debouncedQuery = useDebouncedCallback((value) => {
        setQuery(value);
    }, 1000);

    const [localSearch, setLocalSearch] = useState("");

    const [query, setQuery] = useState("");

    const { data, isLoading, error } = useQuery(
        DataloomSearchKeys.search(query)
    );

    const updateQuery = (value: string) => {
        setLocalSearch(value);
        debouncedQuery(value);
    };

    return (
        <main className=''>
            <h1 className='text-3xl font-semibold mb-5'>
                Search All Resources
            </h1>
            <input
                type='search'
                aria-label='Search all resources'
                placeholder='Type to search...'
                className='w-full p-3 rounded-xl border border-gray-300 mb-6 focus:border-gray-400 focus:ring focus:ring-gray-200 focus:outline-none'
                value={localSearch}
                onChange={(e) => updateQuery(e.target.value)}
            />
            {isLoading ? (
                <DataLoaderSpinner title='Loading dataloom search results.' />
            ) : (
                <SearchData data={data} error={error} query={query} />
            )}
        </main>
    );
}

type ISearchData = {
    data: UrnKeyValueList | undefined;
    query: string;
    error: any;
};
function SearchData({ data, error, query }: ISearchData) {
    if (error)
        return (
            <ErrorSoftner
                title="Couldn't load dataloom search results."
                queryKeys={DataloomSearchKeys.search(query).queryKey}
            />
        );

    if (!data)
        return (
            <EmptyList title='No dataloom results found.'>
                <p></p>
            </EmptyList>
        );

    return (
        <ul className='space-y-2 rounded-xl'>
            {data.map(({ urn, value }) => {
                const parts = urn.split(":");
                const urnDisplay = parts.slice(3).join(":"); // show from namespace:resource:type:... for clarity

                return (
                    <li
                        key={urn}
                        className='p-3 border rounded-xl border-gray-300 border-dashed transition shrink'
                        title={urn}
                    >
                        <h2 className='text-lg font-medium  mb-1'>{value}</h2>
                        <p className='text-sm font-light text-gray-500 truncate break-all whitespace-normal'>
                            {urnDisplay}
                        </p>
                    </li>
                );
            })}
        </ul>
    );
}
