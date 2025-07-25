import MockAdapter from "axios-mock-adapter";
import { GuardlightServerError } from "../http/api";
import { AnalysisRequestResult, AnalysisRequestResultPaginated } from "./type";

export const mockAnalysisApi = (mock: MockAdapter) => {
    mock.onGet("/analysis").reply(async (_) => {
        return new Promise((resolve, _) => {
            setTimeout(function () {
                const random = Math.random();
                if (random < 1 / 3) {
                    resolve([
                        200,
                        {
                            analyses: ANALYSES,
                            limit: 6,
                            page: 1,
                            totalPages: 1,
                        } as AnalysisRequestResultPaginated,
                    ]);
                } else if (random < 2 / 3) {
                    resolve([
                        200,
                        {
                            analyses: [],
                            limit: 6,
                            page: 0,
                            totalPages: 1,
                        } as AnalysisRequestResultPaginated,
                    ]);
                } else {
                    resolve([
                        500,
                        {
                            analyses: [],
                            limit: 6,
                            page: 0,
                            totalPages: 1,
                        } as AnalysisRequestResultPaginated,
                    ]);
                }
            }, 1000);
        });
    });
    mock.onGet(route("/analysis/:id")).reply(async (_) => {
        return new Promise((resolve, _) => {
            setTimeout(function () {
                const random = Math.random();
                if (random < 1 / 3) {
                    resolve([200, ANALYSES[0]]);
                } else if (random < 2 / 3) {
                    resolve([
                        200,
                        {
                            analyses: [],
                            limit: 6,
                            page: 0,
                            totalPages: 1,
                        } as AnalysisRequestResultPaginated,
                    ]);
                } else {
                    resolve([
                        500,
                        {
                            analyses: [],
                            limit: 6,
                            page: 0,
                            totalPages: 1,
                        } as AnalysisRequestResultPaginated,
                    ]);
                }
            }, 1000);
        });
    });
    mock.onPost("/analysis").reply(async (_) => {
        return new Promise((resolve, _) => {
            setTimeout(function () {
                const random = Math.random();
                if (random < 1 / 2) {
                    resolve([200, {}]);
                } else {
                    resolve([
                        500,
                        {
                            code: 500,
                            error: "",
                            message: "",
                        } as GuardlightServerError,
                    ]);
                }
            }, 1000);
        });
    });
};

function route(path = "") {
    return typeof path === "string"
        ? new RegExp(path.replace(/:\w+/g, "[^/]+"))
        : path;
}

export const ANALYSES: Array<AnalysisRequestResult> = [
    {
        id: "d3bcda0f-e731-4de1-ae4a-3e604168ec63",
        title: "Alice in Wonderland",
        category: "Fantasy",
        requestOrigin: "user",
        contentType: "book",
        createdAt: new Date(),
        themes: [
            {
                id: "25681972-0638-4a8d-8144-105b403456cd",
                title: "Acts of Violence",
                analyzers: [
                    {
                        id: "5a1abc7a-c098-4a67-a796-cdf17e73b282",
                        key: "word_search",
                        name: "Word Search",
                        status: "inprogress",
                        score: 0.24,
                        content: [],
                        inputs: [
                            {
                                key: "strict_words",
                                name: "Strict Words",
                                value: "Fighting, Walking",
                            },
                            {
                                key: "threshold",
                                name: "Threshold",
                                value: "0.9",
                            },
                        ],
                        jobs: [
                            {
                                status: "inprogress",
                            },
                            {
                                status: "finished",
                            },
                        ],
                    },
                    {
                        id: "9b0e2fdd-bfab-4e25-b681-05ebc1fadb49",
                        key: "sentiment_analysis",
                        name: "Sentiment Analysis",
                        status: "finished",
                        score: 0.24,
                        content: [],
                        inputs: [
                            {
                                key: "contextual_words",
                                name: "Contextual Words",
                                value: "Fighting, Walking",
                            },
                            {
                                key: "threshold",
                                name: "Threshold",
                                value: "0.9",
                            },
                        ],
                        jobs: [
                            {
                                status: "finished",
                            },
                            {
                                status: "finished",
                            },
                        ],
                    },
                ],
            },
            {
                id: "d3be4fb5-9345-42d3-8d1a-ba7b3680d75e",
                title: "Relegious Sensitivity",
                analyzers: [
                    {
                        id: "dabffa63-d115-450a-9d6d-1c3feaa80cdf",
                        key: "word_search",
                        name: "Word Search",
                        status: "finished",
                        score: 0.24,
                        content: [],
                        inputs: [
                            {
                                key: "strict_words",
                                name: "Strict Words",
                                value: "Fighting, Walking",
                            },
                            {
                                key: "threshold",
                                name: "Threshold",
                                value: "0.9",
                            },
                        ],
                        jobs: [
                            {
                                status: "finished",
                            },
                            {
                                status: "finished",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "2cbb1156-6211-4580-b770-89d8ea65c003",
        title: "Jack Reacher",
        contentType: "series",
        category: "Thriller",
        requestOrigin: "user",
        createdAt: new Date(),
        themes: [
            {
                id: "25681972-0638-4a8d-8144-105b403456cd",
                title: "Acts of Violence",
                analyzers: [
                    {
                        id: "8e1f8e9f-5522-491f-8440-88d25a66723d",
                        key: "word_search",
                        name: "Word Search",
                        status: "waiting",
                        score: 0.24,
                        content: [],
                        inputs: [
                            {
                                key: "strict_words",
                                name: "Strict Words",
                                value: "Fighting, Walking",
                            },
                            {
                                key: "threshold",
                                name: "Threshold",
                                value: "0.9",
                            },
                        ],
                        jobs: [
                            {
                                status: "waiting",
                            },
                            {
                                status: "waiting",
                            },
                        ],
                    },
                    {
                        id: "32aeb690-303f-45cb-8bc6-f7b81716c17d",
                        key: "sentiment_analysis",
                        name: "Sentiment Analysis",
                        status: "waiting",
                        score: 0.24,
                        content: [
                            "When Peter suddenly asked him the question he decided all at once to do the meanest and most spiteful thing he could think of.",
                        ],
                        inputs: [
                            {
                                key: "contextual_words",
                                name: "Contextual Words",
                                value: "Fighting, Walking",
                            },
                            {
                                key: "threshold",
                                name: "Threshold",
                                value: "0.9",
                            },
                        ],
                        jobs: [
                            {
                                status: "waiting",
                            },
                            {
                                status: "waiting",
                            },
                        ],
                    },
                ],
            },
            {
                id: "c5770399-dec1-4065-bd3d-8ebab9893a7a",
                title: "Relegious Sensitivity",
                analyzers: [
                    {
                        id: "8dd7251b-f6d4-4247-8379-38c0c0c20f75",
                        key: "word_search",
                        name: "Word Search",
                        status: "finished",
                        score: 0.24,
                        content: [
                            '"It\'s only just round the corner," said the Faun, "and there\'ll be a roaring fire—and toast—and sardines—and cake."',
                            "\"Taken service under the White Witch. That's what I am. I'm in the pay of the White Witch.\"",
                            "In this way it led them on, slightly down hill.",
                            "They had been travelling in this way for about half an hour, with the two girls in front, when Edmund said to Peter.",
                        ],
                        inputs: [
                            {
                                key: "strict_words",
                                name: "Strict Words",
                                value: "Lords",
                            },
                            {
                                key: "threshold",
                                name: "Threshold",
                                value: "0.2",
                            },
                        ],
                        jobs: [
                            {
                                status: "finished",
                            },
                            {
                                status: "finished",
                            },
                        ],
                    },
                    {
                        id: "b0df207e-843b-4e2c-b6c4-e5ba14a6fad6",
                        key: "sentiment_analysis",
                        name: "Sentiment Analysis",
                        status: "waiting",
                        score: 0.24,
                        content: [
                            "When Peter suddenly asked him the question he decided all at once to do the meanest and most spiteful thing he could think of.",
                        ],
                        inputs: [
                            {
                                key: "contextual_words",
                                name: "Contextual Words",
                                value: "Fighting, Walking",
                            },
                            {
                                key: "threshold",
                                name: "Threshold",
                                value: "0.9",
                            },
                        ],
                        jobs: [
                            {
                                status: "waiting",
                            },
                            {
                                status: "waiting",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "16cacb82-56aa-4eb7-b49f-c95d87211cbe",
        title: "Alice in Wonderland",
        contentType: "movie",
        category: "Fantasy",
        requestOrigin: "user",
        createdAt: new Date(),
        themes: [
            {
                id: "25681972-0638-4a8d-8144-105b403456cd",
                title: "Acts of Violence",
                analyzers: [
                    {
                        id: "26f24b8d-70ff-4ba3-8fea-a9d70bd8428c",
                        key: "word_search",
                        name: "Word Search",
                        status: "finished",
                        score: 0.24,
                        content: [],
                        inputs: [
                            {
                                key: "strict_words",
                                name: "Strict Words",
                                value: "Fighting, Walking",
                            },
                            {
                                key: "threshold",
                                name: "Threshold",
                                value: "0.6",
                            },
                        ],
                        jobs: [
                            {
                                status: "finished",
                            },
                            {
                                status: "finished",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "b15697a8-e83e-489f-b52d-eeb7c3b38e48",
        title: "American Horror Show",
        contentType: "series",
        category: "Horror",
        requestOrigin: "user",
        createdAt: new Date(),
        themes: [
            {
                id: "25681972-0638-4a8d-8144-105b403456cd",
                title: "Acts of Violence",
                analyzers: [
                    {
                        id: "466c6043-b08d-4e3e-8e83-29e8b211ceb9",
                        key: "word_search",
                        name: "Word Search",
                        status: "finished",
                        score: 0.24,
                        content: [
                            "They had been travelling in this way for about half an hour, with the two girls in front, when Edmund said to Peter.",
                        ],
                        inputs: [
                            {
                                key: "strict_words",
                                name: "Strict Words",
                                value: "Fighting, Walking",
                            },
                            {
                                key: "threshold",
                                name: "Threshold",
                                value: "0",
                            },
                        ],
                        jobs: [
                            {
                                status: "finished",
                            },
                            {
                                status: "finished",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
