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

export const ANALYSES: Array<AnalysisRequestResult> = [
    {
        id: "d3bcda0f-e731-4de1-ae4a-3e604168ec63",
        title: "Alice in Wonderland",
        contentType: "book",
        createdAt: new Date(),
        themes: [
            {
                id: "25681972-0638-4a8d-8144-105b403456cd",
                title: "Acts of Violence",
                analyzers: [
                    {
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
        createdAt: new Date(),
        themes: [
            {
                id: "25681972-0638-4a8d-8144-105b403456cd",
                title: "Acts of Violence",
                analyzers: [
                    {
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
        createdAt: new Date(),
        themes: [
            {
                id: "25681972-0638-4a8d-8144-105b403456cd",
                title: "Acts of Violence",
                analyzers: [
                    {
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
        createdAt: new Date(),
        themes: [
            {
                id: "25681972-0638-4a8d-8144-105b403456cd",
                title: "Acts of Violence",
                analyzers: [
                    {
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
