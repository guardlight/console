export type AnalysisStatus = "waiting" | "inprogress" | "finished" | "error";
export type ContentType = "book" | "movie" | "series" | "lyrics";

// Analysis Request

export type AnalysisRequest = {
    title: string;
    contentType: ContentType;
    file: File;
    themes: Array<Theme>;
};

export type File = {
    content: string;
    mimetype: string;
};

export type Theme = {
    title: string;
    id: string;
    analyzers: Array<Analyzer>;
};

export type Analyzer = {
    key: string;
    name: string;
    description: string;
    inputs: Array<AnalyzerInput>;
};

export type AnalyzerInput = {
    key: string;
    value: string;
};

// Analysis Results

export type AnalysisRequestResult = {
    id: string;
    title: string;
    contentType: ContentType;
    themes: Array<ThemeResult>;
};

export type ThemeResult = {
    id: string;
    title: string;
    analyzers: Array<AnalyzerResult>;
};

export type AnalyzerResult = {
    key: string;
    name: string;
    status: AnalysisStatus;
    score: number;
    content: Array<string>;
    inputs: Array<AnalyzerInputResult>;
    jobs: Array<JobProgress>;
};

export type AnalyzerInputResult = {
    key: string;
    name: string;
    value: string;
};

export type JobProgress = {
    status: AnalysisStatus;
};

export const NIL_ANALYSIS_RESULT: AnalysisRequestResult = {
    id: "",
    title: "",
    contentType: "book",
    themes: [],
};

export const ANALYSES: Array<AnalysisRequestResult> = [
    {
        id: "d3bcda0f-e731-4de1-ae4a-3e604168ec63",
        title: "Alice in Wonderland",
        contentType: "book",
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
