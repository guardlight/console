import { NIL_UUID } from "@/components/const/const";
import MockAdapter from "axios-mock-adapter";
import { GuardlightServerError } from "../http/api";
import { ThemeConfig } from "./type";

export const mockThemesApi = (mock: MockAdapter) => {
    mock.onGet("/theme").reply(async (_) => {
        return new Promise((resolve, _) => {
            setTimeout(function () {
                const random = Math.random();
                if (random < 1 / 3) {
                    resolve([200, THEME_CONFIGS]);
                } else if (random < 2 / 3) {
                    resolve([
                        200,
                        THEME_CONFIGS.filter((t) => t.id === NIL_UUID),
                    ]);
                } else {
                    resolve([500, []]);
                }
            }, 1000);
        });
    });

    mock.onPost("/theme").reply(async (_) => {
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

const THEME_CONFIGS: ThemeConfig[] = [
    {
        id: NIL_UUID,
        title: "",
        description: "",
        analyzers: [
            {
                key: "word_search",
                description:
                    "Performs a basic word search on the uploaded media content.",
                name: "Word Search",
                changeStatus: "new",
                inputs: [
                    {
                        key: "strict_words",
                        value: "",
                        changeStatus: "new",
                        description:
                            "Words in this list will immediatly flag the content. Seperate words or phrases with a comma (,)",
                        name: "Strict Words",
                        type: "textarea",
                    },
                    {
                        key: "threshold",
                        value: "",
                        changeStatus: "new",
                        description:
                            "The value that will be used to measure against.",
                        name: "Threshold",
                        type: "threshold",
                    },
                ],
            },
            {
                key: "sentiment_analysis",
                description:
                    "Performs analysis on phrases where the following words/phrases are part of in the media content provided. The media content will be flagged if the combined sentiment is more negative than the threshold provided.",
                name: "Sentiment Analysis",
                changeStatus: "new",
                inputs: [
                    {
                        key: "contextual_words",
                        value: "",
                        changeStatus: "new",
                        description:
                            "Words or phrases in this list will be scanned to check if it is positive, negative or neutral.",
                        name: "Contextual Words",
                        type: "textarea",
                    },
                    {
                        key: "threshold",
                        value: "",
                        changeStatus: "new",
                        description:
                            "The value that will be used to measure against.",
                        name: "Threshold",
                        type: "threshold",
                    },
                ],
            },
        ],
    },
    {
        id: "3906e11c-67bd-46ae-9fb8-e1629ac6ed86",
        title: "Acts of Violence",
        description:
            "This theme focuses on identifying content that may depict or promote acts of violence. It uses various analyzers to detect violent language, sentiment, or other indicators that suggest violent behavior or intent.",
        analyzers: [
            {
                key: "word_search",
                description:
                    "Performs a basic word search on the uploaded media content.",
                name: "Word Search",
                changeStatus: "new",
                inputs: [
                    {
                        key: "strict_words",
                        value: "",
                        changeStatus: "new",
                        description:
                            "Words in this list will immediatly flag the content.",
                        name: "Strict Words",
                        type: "textarea",
                    },
                    {
                        key: "threshold",
                        value: "",
                        changeStatus: "new",
                        description:
                            "The value that will be used to measure against.",
                        name: "Threshold",
                        type: "threshold",
                    },
                ],
            },
            {
                key: "sentiment_analysis",
                description:
                    "Performs analysis on phrases where the following words/phrases are part of in the media content provided. The media content will be flagged if the combined sentiment is more negative than the threshold provided.",
                name: "Sentiment Analysis",
                changeStatus: "changed",
                inputs: [
                    {
                        key: "contextual_words",
                        value: "",
                        changeStatus: "same",
                        description:
                            "Words or phrases in this list will be scanned to check if it is positive, negative or neutral.",
                        name: "Contextual Words",
                        type: "textarea",
                    },
                    {
                        key: "threshold",
                        value: "",
                        changeStatus: "removed",
                        description:
                            "The value that will be used to measure against.",
                        name: "Threshold",
                        type: "threshold",
                    },
                ],
            },
            {
                key: "ai_gpt_3o",
                description: "EMPTY",
                name: "EMPTY",
                changeStatus: "removed",
                inputs: [
                    {
                        key: "prompt",
                        value: "",
                        changeStatus: "removed",
                        description: "REMOVED",
                        name: "REMOVED",
                        type: "REMOVED",
                    },
                ],
            },
        ],
    },
    {
        id: "6f38fbd4-0011-49ce-bb81-1522198e99af",
        title: "Religious Sensitivity",
        description:
            "This theme is designed to identify content that may be offensive or insensitive to religious beliefs and practices. It aims to ensure that media content respects diverse religious perspectives and avoids promoting intolerance or discrimination.",
        analyzers: [],
    },
    {
        id: "0124384c-dacf-45f5-a294-e435dced3f86",
        title: "Usable Theme",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        analyzers: [
            {
                key: "word_search",
                description:
                    "Performs a basic word search on the uploaded media content.",
                name: "Word Search",
                changeStatus: "same",
                inputs: [
                    {
                        key: "strict_words",
                        value: "Walking, Running",
                        changeStatus: "same",
                        description:
                            "Words in this list will immediatly flag the content. Seperate words or phrases with a comma (,)",
                        name: "Strict Words",
                        type: "textarea",
                    },
                    {
                        key: "threshold",
                        value: "0.1",
                        changeStatus: "same",
                        description:
                            "The value that will be used to measure against.",
                        name: "Threshold",
                        type: "threshold",
                    },
                ],
            },
            {
                key: "sentiment_analysis",
                description:
                    "Performs analysis on phrases where the following words/phrases are part of in the media content provided. The media content will be flagged if the combined sentiment is more negative than the threshold provided.",
                name: "Sentiment Analysis",
                changeStatus: "same",
                inputs: [
                    {
                        key: "contextual_words",
                        value: "Crawling",
                        changeStatus: "same",
                        description:
                            "Words or phrases in this list will be scanned to check if it is positive, negative or neutral.",
                        name: "Contextual Words",
                        type: "textarea",
                    },
                    {
                        key: "threshold",
                        value: "0.25",
                        changeStatus: "same",
                        description:
                            "The value that will be used to measure against.",
                        name: "Threshold",
                        type: "threshold",
                    },
                ],
            },
        ],
    },
];
