export function DataloomHomeScreen() {
    return (
        <div className=' flex flex-col items-center '>
            <header className='mb-8 '>
                <h1 className='text-4xl font-bold text-gray-900 text-center'>
                    Guardlight - Dataloom Integration
                </h1>
                <p className='mt-2 text-gray-600 max-w-xl text-center px-4'>
                    This section provides insights and controls related to
                    Dataloom’s orchestration of various data sources and its
                    submission of analysis requests to Guardlight.
                </p>
            </header>

            <main className='w-full max-w-4xl bg-white rounded-lg border border-gray-300 border-dashed p-6 space-y-6'>
                <section>
                    <h2 className='text-2xl font-semibold mb-2'>
                        Statistics & Resources
                    </h2>
                    <p className='text-gray-700'>
                        View detailed statistics about the data managed in the
                        dataloom and its associated resources.
                    </p>
                </section>

                <section>
                    <h2 className='text-2xl font-semibold mb-2'>
                        Search Sources
                    </h2>
                    <p className='text-gray-700'>
                        Search across various data sources integrated within the
                        dataloom to quickly find relevant information.
                    </p>
                </section>

                <section>
                    <h2 className='text-2xl font-semibold mb-2'>
                        Job Management
                    </h2>
                    <p className='text-gray-700'>
                        Monitor the status of dataloom jobs. You can execute
                        jobs or stop currently running ones.
                    </p>
                </section>
            </main>
        </div>
    );
}
