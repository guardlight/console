import { useState } from "react";

export function DataloomSearchScreen() {
    return SearchPage();
}

interface SearchResult {
    urn: string;
    value: string;
}

const exampleData: SearchResult[] = [
    {
        urn: "urn:dataloom:books:book:e44996c4c137f29d1cfac990478b14bb:9780451414847:da265912e6ac5fc205e896aaaab404d7",
        value: "Supervolcano by Harry Turtledove, via: annasarchive, downloaded: no, submitted: no",
    },
    {
        urn: "urn:dataloom:books:book:ed7a5bc39594a87cabbbf7e7abe59a46:9780451208149:d0119efdd6a9291f2e63c41aee113d89",
        value: "Lord Harry by Catherine Coulter, via: annasarchive, downloaded: no, submitted: no",
    },
    {
        urn: "urn:dataloom:books:book:87fc754ec036f686e077856dff66f3cd:9781805221678:614aa3ae9318e2cf1210a91848bc9e35",
        value: "The Assault by Harry Mulisch, via: annasarchive, downloaded: yes, submitted: yes",
    },
    {
        urn: "urn:dataloom:books:book:27267b631cf3a80c6aaa53cbf98818d6:9780755340385:f96355230c1099c62eb6f200ee65a1a5",
        value: "Gaslight in Page Street by Harry Bowling, via: annasarchive, downloaded: no, submitted: no",
    },
    {
        urn: "urn:dataloom:books:book:985ae49da590d1fb1a8c147999d5f30b:9798369436356:NO_MD5_HASH`",
        value: "Inversions by Harry Hadlock, via: annasarchive, downloaded: no, submitted: no",
    },
    {
        urn: "urn:dataloom:books:book:b568e344d6fe2538b4b7f3d7c1a8775e:9781473205314:41186e5100fb9ae9a5e8b4a1f99a3d1b",
        value: "Bill, the Galactic Hero by Harry Harrison, via: annasarchive, downloaded: yes, submitted: yes",
    },
    {
        urn: "urn:dataloom:books:book:1fe7fd01e1cb49036d30c54d92bfa1e9:9781473227682:94f8ad9e4c67284ae43a73821a70ef05",
        value: "The Stainless Steel Rat by Harry Harrison, via: annasarchive, downloaded: no, submitted: no",
    },
    {
        urn: "urn:dataloom:books:book:97fc810063629f9717653cff1ab8378a:9781530411955:4fee8671f0d22abde92ff08469499f5e",
        value: "Farewell to the Master by BATES, Harry, via: annasarchive, downloaded: no, submitted: no",
    },
    {
        urn: "urn:dataloom:books:book:cf795c076bc9a95a619b8ab134dafad8:9780575081710:1ce8ee259c0ebdeaa370baeb4ab67928",
        value: "The Stainless Steel Rat Omnibus by Harry Harrison, via: annasarchive, downloaded: no, submitted: no",
    },
    {
        urn: "urn:dataloom:books:book:557a6f3bcb1c05fe11c60a439a392d23:9780765302786:dbbb95fd4699418777ecb07726963069",
        value: "A Stainless Steel Trio by Harry Harrison, via: annasarchive, downloaded: no, submitted: no",
    },
];

function SearchPage() {
    const [query, setQuery] = useState("");

    const filteredResults = exampleData.filter((item) =>
        item.value.toLowerCase().includes(query.toLowerCase())
    );

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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {filteredResults.length === 0 ? (
                <p className='text-gray-600'>No results found.</p>
            ) : (
                <ul className='space-y-2 rounded-xl'>
                    {filteredResults.map(({ urn, value }) => {
                        const parts = urn.split(":");
                        const urnDisplay = parts.slice(3).join(":"); // show from namespace:resource:type:... for clarity

                        return (
                            <li
                                key={urn}
                                className='p-3 border rounded-xl border-gray-300 border-dashed transition shrink'
                                title={urn}
                            >
                                <h2 className='text-lg font-medium  mb-1'>
                                    {value}
                                </h2>
                                <p className='text-sm font-light text-gray-500 truncate break-all whitespace-normal'>
                                    {urnDisplay}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            )}
        </main>
    );
}
