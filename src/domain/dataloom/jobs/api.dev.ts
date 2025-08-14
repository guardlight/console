import { mockGetRoute } from "@/domain/http/api";
import MockAdapter from "axios-mock-adapter";
import { DataloomMessage, UrnKeyValueList } from "../commons/type";

export const mockDataloomJobsApi = (mock: MockAdapter) => {
    mock.onGet("scheduler").reply(async (_) => {
        return new Promise((resolve, _) => {
            setTimeout(function () {
                // const random = Math.random();
                // if (random < 1 / 3) {
                resolve([200, jobsData]);
                // } else if (random < 2 / 3) {
                //     resolve([200, []]);
                // } else {
                //     resolve([500, []]);
                // }
            }, 1000);
        });
    });
    mock.onGet(mockGetRoute("scheduler/execute/:urn")).reply(async (req) => {
        return new Promise((resolve, _) => {
            setTimeout(function () {
                const urn = req.url?.replace("scheduler/execute/", "") ?? "";

                const random = Math.random();
                if (random < 2 / 3) {
                    updateJobsData(urn, "running");

                    setTimeout(function () {
                        updateJobsData(urn, "waiting");
                    }, 3000);
                    resolve([
                        200,
                        {
                            message: `Task ${urn.replace("urn:dataloom:books:scheduler:", "")} started successfully`,
                        } as DataloomMessage,
                    ]);
                } else {
                    resolve([
                        500,
                        {
                            message: "Error during job execution",
                        } as DataloomMessage,
                    ]);
                }
            }, 3000);
        });
    });
    mock.onGet(mockGetRoute("/scheduler/stop/:urn")).reply(async (req) => {
        return new Promise((resolve, _) => {
            const urn = req.url?.replace("scheduler/stop/", "") ?? "";
            updateJobsData(urn, "stopped");
            setTimeout(function () {
                resolve([
                    200,
                    {
                        message: `Tasks ${urn.replace("urn:dataloom:books:scheduler:", "")} stopped successfully.`,
                    },
                ]);
            }, 1000);
        });
    });
    mock.onGet(mockGetRoute("/scheduler/start/:urn")).reply(async (req) => {
        return new Promise((resolve, _) => {
            const urn = req.url?.replace("scheduler/start/", "") ?? "";
            updateJobsData(urn, "waiting");
            setTimeout(function () {
                resolve([
                    200,
                    {
                        message: `Tasks ${urn.replace("urn:dataloom:books:scheduler:", "")} started successfully.`,
                    },
                ]);
            }, 1000);
        });
    });
};

type JobStatus = "stopped" | "waiting" | "running";

function updateJobsData(urn: string, status: JobStatus) {
    jobsData = [
        {
            urn: urn,
            value: `${status} - August 17, 2025 at 1:00 AM`,
        },
        ...jobsData.filter((kv) => kv.urn !== urn),
    ];
}

let jobsData: UrnKeyValueList = [
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
